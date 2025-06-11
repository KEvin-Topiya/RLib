<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require "../Db_Connection.php";

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["EnrollmentNo"])) {
        echo json_encode(["status" => "error", "message" => "Missing EnrollmentNo"]);
        exit;
    }

    $EnrollmentNo = htmlspecialchars(strip_tags($data["EnrollmentNo"]));

 if (!empty($data["markAsSeenId"])) {
    // Mark a single notification as seen
    $notiId = htmlspecialchars(strip_tags($data["markAsSeenId"]));
    $stmt = $conn->prepare("UPDATE notifications SET status = 'seen' WHERE id = ? AND EnrollmentNo = ?");
    $stmt->execute([$notiId, $EnrollmentNo]);
} elseif (!empty($data["readAll"])) {
    // Mark all notifications as seen
    $stmt = $conn->prepare("UPDATE notifications SET status = 'seen' WHERE status = 'unseen' AND EnrollmentNo = ?");
    $stmt->execute([$EnrollmentNo]);
}

    // ✅ Fetch all notifications
    $stmt = $conn->prepare("SELECT id, noti_title, description, status, created_at FROM notifications WHERE EnrollmentNo = ? ORDER BY created_at DESC");
    $stmt->execute([$EnrollmentNo]);
    $notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "message" => "Notifications processed successfully",
        "notifications" => $notifications
    ]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
}
?>
