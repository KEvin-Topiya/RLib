<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require "../Db_Connection.php"; // Include database connection

try {
    // Get JSON input
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if EnrollmentNo is provided
    if (!isset($data["id"])) {
        echo json_encode(["status" => "error", "message" => "Missing id"]);
        exit;
    }

    $EnrollmentNo = htmlspecialchars(strip_tags($data["id"]));

    // Prepare SQL query to fetch fine details
    $stmt = $conn->prepare("SELECT fine_id, EnrollmentNo, book_id, due_date, fine_amount, status FROM fines WHERE EnrollmentNo = :EnrollmentNo");
    $stmt->execute(["EnrollmentNo" => $EnrollmentNo]);
    $fines = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($fines) {
        echo json_encode([
            "status" => "success",
            "message" => "Fine details fetched successfully",
            "data" => $fines
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "No fine records found for this EnrollmentNo"]);
    }

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
