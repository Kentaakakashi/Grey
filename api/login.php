<?php
require_once __DIR__ . '/bootstrap.php';

handle_cors(['POST', 'OPTIONS'], true);

require_method('POST');

$data = read_json_body();
$username = trim((string)($data['username'] ?? ''));
$password = (string)($data['password'] ?? '');

if ($username === '' || $password === '') {
    json_response(['success' => false, 'message' => 'Missing credentials'], 400);
}

if (strlen($username) > 100 || strlen($password) > 255) {
    json_response(['success' => false, 'message' => 'Invalid credentials format'], 400);
}

$conn = get_db_connection();
ensure_admin_users_table($conn);

$stmt = $conn->prepare('SELECT id, username, password_hash FROM admin_users WHERE username = ? LIMIT 1');

if (!$stmt) {
    error_log('Login prepare failed: ' . $conn->error);
    $conn->close();
    json_response(['success' => false, 'message' => 'Login failed'], 500);
}

$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();

if (!$result || $result->num_rows === 0) {
    usleep(350000);
    $stmt->close();
    $conn->close();
    json_response(['success' => false, 'message' => 'Invalid username or password'], 401);
}

$row = $result->fetch_assoc();

if (!password_verify($password, $row['password_hash'])) {
    usleep(350000);
    $stmt->close();
    $conn->close();
    json_response(['success' => false, 'message' => 'Invalid username or password'], 401);
}

start_admin_session();
session_regenerate_id(true);
$_SESSION['admin_user_id'] = (int)$row['id'];
$_SESSION['admin_username'] = $row['username'];
$_SESSION['logged_in_at'] = time();

$stmt->close();
$conn->close();

json_response(['success' => true, 'message' => 'Login successful']);