<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require "../Db_Connection.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["fine_id"])) {
    echo json_encode(["status" => "error", "message" => "Missing fine ID"]);
    exit;
}

$fine_id = htmlspecialchars(strip_tags($data["fine_id"]));

try {
    // Update the fine status to 'paid'
    $stmt = $conn->prepare("UPDATE fines SET status = 'paid' WHERE fine_id = :fine_id");
    $stmt->execute(["fine_id" => $fine_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["status" => "success", "message" => "Fine status updated to paid."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Fine not found or already paid."]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
