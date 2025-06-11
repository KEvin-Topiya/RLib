<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

include "../Db_Connection.php"; // Include database connection

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["book_id"]) || !isset($data["EnrollmentNo"])) {
        echo json_encode(["status" => "error", "message" => "Missing book ID or Enrollment No."]);
        exit;
    }

    $book_id = htmlspecialchars(strip_tags($data["book_id"]));
    $enrollmentNo = htmlspecialchars(strip_tags($data["EnrollmentNo"]));

    // Check if the book can be renewed
    $checkStmt = $conn->prepare("SELECT renew_left FROM issued_books WHERE book_id = ? AND EnrollmentNo = ?");
    $checkStmt->execute([$book_id, $enrollmentNo]);
    $book = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if (!$book) {
        echo json_encode(["status" => "error", "message" => "Book not found or not issued."]);
        exit;
    }

    if ($book['renew_left'] <= 0) {
        echo json_encode(["status" => "error", "message" => "No renewals left. Please return the book."]);
        exit;
    }

    // Update the return date and decrement renew_left
    $stmt = $conn->prepare("UPDATE issued_books 
                            SET last_date = DATE_ADD(last_date, INTERVAL 15 DAY), 
                                renew_left = renew_left - 1
                            WHERE book_id = ? AND EnrollmentNo = ?");

    if ($stmt->execute([$book_id, $enrollmentNo])) {
        echo json_encode(["status" => "success", "message" => "Book renewed successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to renew the book."]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
}
?>
