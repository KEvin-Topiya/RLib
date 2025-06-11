<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

include "../Db_Connection.php"; // Include database connection

try {
    // Get the input data
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if both ID and role are provided
    if (!isset($data["id"]) || !isset($data["role"])) {
        echo json_encode(["status" => "error", "message" => "Missing ID or role"]);
        exit;
    }

    $id = htmlspecialchars(strip_tags($data["id"]));
    $role = htmlspecialchars(strip_tags($data["role"]));

    // Prepare SQL query based on the role
    if ($role === "user") {
        $stmt = $conn->prepare("SELECT EnrollmentNo, StudentName, PhoneStudent, Email, EmailAlternate, AcademicYearName, ProgramName, Semester, profile FROM users WHERE EnrollmentNo = :id");
    } elseif ($role === "admin" || $role === "library") {
        $stmt = $conn->prepare("SELECT EID, name, email, phone, current_address, permanent_address, DOB, profile, user_role FROM administrator WHERE EID = :id");
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid role"]);
        exit;
    }

    // Execute the query
    $stmt->execute(["id" => $id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if user data was found
    if ($user) {
        echo json_encode(["status" => "success", "data" => $user]);
    } else {
        echo json_encode(["status" => "error", "message" => "User not found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
}
?>
