<?php
require_once __DIR__ . '/bootstrap.php';

handle_cors(['POST', 'OPTIONS'], true);

require_method('POST');
start_admin_session();

$_SESSION = [];

if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', [
        'expires' => time() - 42000,
        'path' => $params['path'],
        'domain' => $params['domain'],
        'secure' => $params['secure'],
        'httponly' => $params['httponly'],
        'samesite' => $params['samesite'] ?? 'Strict',
    ]);
}

session_destroy();

json_response([
    'success' => true,
    'message' => 'Logged out',
]);
