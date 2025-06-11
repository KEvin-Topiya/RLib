<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

include "../Db_Connection.php"; 

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["EnrollmentNo"])) {
    echo json_encode(["status" => "error", "message" => "Missing EnrollmentNo"]);
    exit;
}

$enrollmentNo = htmlspecialchars(strip_tags($data["EnrollmentNo"]));

try {
    // Check if user exists in either users or administrator table
    $stmt = $conn->prepare("SELECT EnrollmentNo FROM users WHERE EnrollmentNo = :enrollmentNo
                            UNION
                            SELECT EID FROM administrator WHERE EID = :enrollmentNo");
    $stmt->execute(["enrollmentNo" => $enrollmentNo]);
    $userExists = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$userExists) {
        echo json_encode(["status" => "error", "message" => "User not found in the database."]);
        exit;
    }

    // Check current status (in or out)
    $stmt = $conn->prepare("SELECT * FROM library_entry WHERE EnrollmentNo = :enrollmentNo AND status = 'in'");
    $stmt->execute(["enrollmentNo" => $enrollmentNo]);
    $activeLog = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($activeLog) {
        // Check-out (if the user is currently checked in)
        $stmt = $conn->prepare("UPDATE library_entry SET exit_time = NOW(), status = 'out' WHERE id = :id");
        $stmt->execute(["id" => $activeLog["id"]]);

        echo json_encode(["status" => "success", "message" => "User checked out successfully."]);
    } else {
        // Check-in (if the user is not currently checked in)
        $stmt = $conn->prepare("INSERT INTO library_entry (EnrollmentNo, entry_time, status) VALUES (:enrollmentNo, NOW(), 'in')");
        $stmt->execute(["enrollmentNo" => $enrollmentNo]);

        echo json_encode(["status" => "success", "message" => "User checked in successfully."]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
