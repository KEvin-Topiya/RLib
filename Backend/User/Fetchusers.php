<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");


include "../Db_Connection.php"; // Include database connection

try {
    // Fetch all books
    $stmt = $conn->prepare("SELECT * FROM users");
    $stmt->execute();
    
    $books = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($books) > 0) {
        echo json_encode(["status" => "success", "data" => $books]);
    } else {
        echo json_encode(["status" => "error", "message" => "No books found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
