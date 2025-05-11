<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

include "Db_Connection.php"; // Include database connection

// Handle GET request to fetch grid data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $conn->query("SELECT * FROM grids ORDER BY created_at DESC LIMIT 1");
        $grid = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($grid) {
            echo json_encode(["status" => "success", "data" => $grid]);
        } else {
            echo json_encode(["status" => "error", "message" => "No grid data found"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
    exit;
}

// Handle POST request to save or update grid data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON data from the request
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate required fields
    if (!isset($data["title"], $data["rows"], $data["cols"], $data["grid"])) {
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit;
    }

    // Sanitize input data
    $title = htmlspecialchars(strip_tags($data["title"]));
    $rows = (int)$data["rows"];
    $cols = (int)$data["cols"];
    $grid = json_encode($data["grid"]);

    try {
        // Check if the grid data already exists
        $stmt = $conn->query("SELECT COUNT(*) as count FROM grids");
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result['count'] == 0) {
            // No data found, insert the new grid
            $stmt = $conn->prepare("INSERT INTO grids (grid_data) VALUES (:grid_data)");
            $stmt->execute([":grid_data" => json_encode([
                "title" => $title,
                "rows" => $rows,
                "cols" => $cols,
                "grid" => json_decode($grid)
            ])]);
            echo json_encode(["status" => "success", "message" => "Grid saved successfully"]);
        } else {
            // Data exists, update the existing grid
            $stmt = $conn->prepare("UPDATE grids SET grid_data = :grid_data, updated_at = NOW() LIMIT 1");
            $stmt->execute([":grid_data" => json_encode([
                "title" => $title,
                "rows" => $rows,
                "cols" => $cols,
                "grid" => json_decode($grid)
            ])]);
            echo json_encode(["status" => "success", "message" => "Grid updated successfully"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
    exit;
}

echo json_encode(["status" => "error", "message" => "Invalid request method"]);
?>
