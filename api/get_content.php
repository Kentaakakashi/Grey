<?php
require_once __DIR__ . '/bootstrap.php';

handle_cors(['GET', 'OPTIONS']);

$conn = get_db_connection();
ensure_app_state_table($conn);

$result = $conn->query('SELECT json_data FROM app_state WHERE id = 1 LIMIT 1');

if (!$result) {
    error_log('get_content query failed: ' . $conn->error);
    $conn->close();
    json_response(['success' => false, 'message' => 'Unable to load content'], 500);
}

if ($result->num_rows === 0) {
    $conn->close();
    json_response(['success' => false, 'message' => 'No content found'], 404);
}

$row = $result->fetch_assoc();
$conn->close();

$payload = json_decode($row['json_data'], true);

if (!is_array($payload)) {
    error_log('Stored app_state JSON is invalid.');
    json_response(['success' => false, 'message' => 'Stored content is invalid'], 500);
}

json_response($payload);