<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require "../Db_Connection.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"])) {
    echo json_encode(["status" => "error", "message" => "Missing ID"]);
    exit;
}

$id = htmlspecialchars(strip_tags($data["id"]));

try {
    // Try to fetch data from the users table (assuming EnrollmentNo for users)
    $stmt = $conn->prepare("SELECT EnrollmentNo,profile, StudentName, PhoneStudent, Email, EmailAlternate, AcademicYearName, ProgramName, Semester 
                            FROM users WHERE EnrollmentNo = :id");
    $stmt->execute(["id" => $id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode([
            "status" => "success",
            "role" => "user",
            "data" => $user
        ]);
        exit;
    }

    // Try to fetch data from the administrator table (assuming EID for admins)
    $stmt = $conn->prepare("SELECT id, name, email, phone, EID, current_address, permanent_address, DOB, profile, user_role 
                            FROM administrator WHERE EID = :id");
    $stmt->execute(["id" => $id]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($admin) {
        echo json_encode([
            "status" => "success",
            "role" => "admin",
            "data" => $admin
        ]);
        exit;
    }

    // No matching record found
    echo json_encode(["status" => "error", "message" => "User not found"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
}
?>
