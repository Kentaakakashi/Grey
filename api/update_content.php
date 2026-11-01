<?php
require_once __DIR__ . '/bootstrap.php';

handle_cors(['POST', 'OPTIONS'], true);

require_method('POST');
require_admin_session();

$payload = read_json_body();

$requiredArrayKeys = ['content', 'services', 'case_studies'];
foreach ($requiredArrayKeys as $key) {
    if (!array_key_exists($key, $payload) || !is_array($payload[$key])) {
        json_response(['success' => false, 'message' => "Missing or invalid field: {$key}"], 400);
    }
}

if (!array_key_exists('faqs', $payload) || !is_array($payload['faqs'])) {
    $payload['faqs'] = [];
}

if (!array_key_exists('brand_logos', $payload) || !is_array($payload['brand_logos'])) {
    $payload['brand_logos'] = [];
}

if (!array_key_exists('settings', $payload) || !is_array($payload['settings'])) {
    json_response(['success' => false, 'message' => 'Missing or invalid field: settings'], 400);
}

$jsonData = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
if ($jsonData === false) {
    json_response(['success' => false, 'message' => 'Could not encode payload'], 400);
}

$conn = get_db_connection();
ensure_app_state_table($conn);

$stmt = $conn->prepare('INSERT INTO app_state (id, json_data) VALUES (1, ?) ON DUPLICATE KEY UPDATE json_data = VALUES(json_data)');

if (!$stmt) {
    error_log('update_content prepare failed: ' . $conn->error);
    $conn->close();
    json_response(['success' => false, 'message' => 'Database error'], 500);
}

$stmt->bind_param('s', $jsonData);

if (!$stmt->execute()) {
    error_log('update_content execute failed: ' . $stmt->error);
    $stmt->close();
    $conn->close();
    json_response(['success' => false, 'message' => 'Database error'], 500);
}

$stmt->close();
$conn->close();

json_response(['success' => true, 'message' => 'Content updated successfully']);