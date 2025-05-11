<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require "../Db_Connection.php";

try {
    // Fetch all fines from the database
    $stmt = $conn->prepare("SELECT fine_id, EnrollmentNo, book_id, due_date, fine_amount, status FROM fines");
    $stmt->execute();
    $fines = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($fines) {
        echo json_encode(["status" => "success", "data" => $fines]);
    } else {
        echo json_encode(["status" => "error", "message" => "No fines found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
