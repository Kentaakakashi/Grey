<?php
require_once __DIR__ . '/config.php';

function normalize_origin($origin)
{
    if (!is_string($origin) || trim($origin) === '') {
        return '';
    }

    $parts = parse_url(trim($origin));
    if (!$parts || empty($parts['scheme']) || empty($parts['host'])) {
        return '';
    }

    $scheme = strtolower($parts['scheme']);
    $host = strtolower($parts['host']);
    $port = isset($parts['port']) ? (int)$parts['port'] : null;

    $normalized = $scheme . '://' . $host;
    if ($port !== null) {
        $normalized .= ':' . $port;
    }

    return $normalized;
}

function get_request_origin()
{
    return normalize_origin((string)($_SERVER['HTTP_ORIGIN'] ?? ''));
}

function get_allowed_request_origin()
{
    $origin = get_request_origin();
    if ($origin === '') {
        return '';
    }

    foreach (CORS_ALLOWED_ORIGINS as $allowedOrigin) {
        if ($origin === normalize_origin($allowedOrigin)) {
            return $origin;
        }
    }

    return '';
}

function handle_cors($allowedMethods = ['GET', 'POST', 'OPTIONS'], $allowCredentials = false)
{
    $origin = get_allowed_request_origin();

    if ($origin !== '') {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');

        if ($allowCredentials) {
            header('Access-Control-Allow-Credentials: true');
        }
    }

    header('Access-Control-Allow-Methods: ' . implode(', ', $allowedMethods));
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Access-Control-Max-Age: 86400');

    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
        http_response_code(204);
        exit();
    }
}

function json_response($payload, $statusCode = 200)
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=UTF-8');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit();
}

function require_method($method)
{
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== $method) {
        json_response(['success' => false, 'message' => 'Method not allowed'], 405);
    }
}

function is_https_request()
{
    if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
        return true;
    }

    if (($_SERVER['SERVER_PORT'] ?? '') === '443') {
        return true;
    }

    if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
        return true;
    }

    return false;
}

function start_admin_session()
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $origin = get_allowed_request_origin();
    $sameSite = $origin !== '' ? 'None' : 'Strict';

    $secureCookie = is_https_request();
    if ($sameSite === 'None' && !$secureCookie) {
        // SameSite=None requires Secure; fallback if HTTPS is not available.
        $sameSite = 'Lax';
    }

    ini_set('session.use_strict_mode', '1');
    session_name(SESSION_COOKIE_NAME);
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $secureCookie,
        'httponly' => true,
        'samesite' => $sameSite,
    ]);

    session_start();
}

function require_admin_session()
{
    start_admin_session();

    if (empty($_SESSION['admin_user_id'])) {
        json_response(['success' => false, 'message' => 'Unauthorized'], 401);
    }
}

function read_json_body($allowEmpty = false)
{
    $raw = file_get_contents('php://input');

    if ($raw === false || trim($raw) === '') {
        if ($allowEmpty) {
            return [];
        }

        json_response(['success' => false, 'message' => 'Request body is required'], 400);
    }

    $data = json_decode($raw, true);

    if (!is_array($data)) {
        json_response(['success' => false, 'message' => 'Invalid JSON data'], 400);
    }

    return $data;
}

function get_db_connection()
{
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conn->connect_error) {
        error_log('Database connection error: ' . $conn->connect_error);
        json_response(['success' => false, 'message' => 'Database connection failed'], 500);
    }

    if (!$conn->set_charset('utf8mb4')) {
        error_log('Database charset error: ' . $conn->error);
        json_response(['success' => false, 'message' => 'Database setup failed'], 500);
    }

    return $conn;
}

function ensure_admin_users_table($conn)
{
    $sql = "CREATE TABLE IF NOT EXISTS admin_users (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

    if (!$conn->query($sql)) {
        error_log('Error creating admin_users table: ' . $conn->error);
        json_response(['success' => false, 'message' => 'Database setup failed'], 500);
    }
}

function ensure_app_state_table($conn)
{
    $sql = "CREATE TABLE IF NOT EXISTS app_state (
        id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
        json_data LONGTEXT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

    if (!$conn->query($sql)) {
        error_log('Error creating app_state table: ' . $conn->error);
        json_response(['success' => false, 'message' => 'Database setup failed'], 500);
    }
}
