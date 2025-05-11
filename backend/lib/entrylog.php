<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

include "../Db_Connection.php";

try {
    $stmt = $conn->query("SELECT id, EnrollmentNo, entry_time, exit_time, status FROM library_entry ORDER BY id DESC");
    $log = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($log) {
        echo json_encode(["status" => "success", "data" => $log]);
    } else {
        echo json_encode(["status" => "error", "message" => "No log records found."]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
