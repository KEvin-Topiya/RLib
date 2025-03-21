<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

include "../Db_Connection.php"; // Include database connection

$response = [];

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["EnrollmentNo"])) {
    echo json_encode(["status" => "error", "message" => "Missing EnrollmentNo"]);
    exit;
}

$EnrollmentNo = htmlspecialchars(strip_tags($data["EnrollmentNo"]));

// Fields that can be updated
$allowedFields = ["StudentName", "PhoneStudent", "Email", "EmailAlternate", "AcademicYearName", "ProgramName", "Semester", "password"];
$updateFields = [];

foreach ($allowedFields as $field) {
    if (isset($data[$field])) {
        $updateFields[$field] = htmlspecialchars(strip_tags($data[$field]));
    }
}

// If no data to update, return error
if (empty($updateFields)) {
    echo json_encode(["status" => "error", "message" => "No data provided for update"]);
    exit;
}

try {
    // Construct the SQL query dynamically
    $setClause = implode(", ", array_map(fn($key) => "$key = :$key", array_keys($updateFields)));
    $updateFields["EnrollmentNo"] = $EnrollmentNo; // Add EnrollmentNo to the binding array

    $stmt = $conn->prepare("UPDATE users SET $setClause WHERE EnrollmentNo = :EnrollmentNo");

    if ($stmt->execute($updateFields)) {
        echo json_encode(["status" => "success", "message" => "User updated successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to update user"]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
}
?>
