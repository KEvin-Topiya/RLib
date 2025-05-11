<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require "../Db_Connection.php"; 

$response = [];

// Check if EnrollmentNo and file are present
if (!isset($_POST["EnrollmentNo"]) || !isset($_FILES["profile"])) {
    echo json_encode(["status" => "error", "message" => "EnrollmentNo and profile image are required"]);
    exit;
}

$EnrollmentNo = htmlspecialchars(strip_tags($_POST["EnrollmentNo"]));
$targetDir = "../img/"; // Directory where images will be stored

try {
    // Handling file upload
    $fileName = basename($_FILES["profile"]["name"]);
    $targetFilePath = $targetDir . $fileName;
    $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

    // Check file type (only allow JPG, JPEG, PNG, GIF)
    $allowedTypes = ["jpg", "jpeg", "png", "gif"];
    if (!in_array($fileType, $allowedTypes)) {
        echo json_encode(["status" => "error", "message" => "Invalid file type"]);
        exit;
    }

    // Move file to the server
    if (move_uploaded_file($_FILES["profile"]["tmp_name"], $targetFilePath)) {
        // Update the profile picture in the database
        $stmt = $conn->prepare("UPDATE users SET profile = :profile WHERE EnrollmentNo = :EnrollmentNo");
        $stmt->execute([
            "profile" => $fileName,
            "EnrollmentNo" => $EnrollmentNo
        ]);

        echo json_encode(["status" => "success", "message" => "Profile image updated successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to upload image"]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
}
?>
