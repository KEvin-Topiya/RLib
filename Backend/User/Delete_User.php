<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");


include "../Db_Connection.php"; // Include database connection

$data = json_decode(file_get_contents("php://input"), true);

// Validate book_id
if (!isset($data["EnrollmentNo"])) {
    echo json_encode(["status" => "error", "message" => "Missing EnrollmentNo"]);
    exit;
}

$EnrollmentNo = htmlspecialchars(strip_tags($data["EnrollmentNo"]));

try {
    // Check if the book exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE EnrollmentNo = :EnrollmentNo");
    $stmt->execute(["EnrollmentNo" => $EnrollmentNo]);

    if ($stmt->rowCount() == 0) {
        echo json_encode(["status" => "error", "message" => "user not found"]);
        exit;
    }

    // Delete user from database
    $stmt = $conn->prepare("DELETE FROM users WHERE EnrollmentNo = :EnrollmentNo");
    $stmt->execute(["EnrollmentNo" => $EnrollmentNo]);

    echo json_encode(["status" => "success", "message" => "user deleted successfully"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
