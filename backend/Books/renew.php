<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require "../Db_Connection.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["book_id"])) {
    echo json_encode(["status" => "error", "message" => "Missing book_id"]);
    exit;
}

$book_id = htmlspecialchars(strip_tags($data["book_id"]));

try {
    // Fetch the current renew_left value
    $stmt = $conn->prepare("SELECT renew_left FROM issued_books WHERE book_id = :book_id");
    $stmt->bindParam(':book_id', $book_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        $renew_left = $result['renew_left'];

        if ($renew_left > 0) {
            // Decrement the renew count
            $renew_left--;

            // Update the renew count in the database
            $stmt = $conn->prepare("UPDATE issued_books SET renew_left = :renew_left WHERE book_id = :book_id");
            $stmt->bindParam(':renew_left', $renew_left);
            $stmt->bindParam(':book_id', $book_id);
            $stmt->execute();

            echo json_encode(["status" => "success", "message" => "Book renewed successfully!", "renew_left" => $renew_left]);
        } else {
            echo json_encode(["status" => "error", "message" => "No renewals left, please return the book."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Book not found."]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
