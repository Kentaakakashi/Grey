<?php
require_once __DIR__ . '/bootstrap.php';

handle_cors(['GET', 'OPTIONS'], true);

start_admin_session();

if (empty($_SESSION['admin_user_id'])) {
    json_response([
        'success' => true,
        'authenticated' => false,
    ]);
}

json_response([
    'success' => true,
    'authenticated' => true,
    'username' => $_SESSION['admin_username'] ?? null,
]);
