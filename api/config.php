<?php
// ============================================================
// Central API configuration — portfolio-website-for-graphic-designers
// by AIrflute Technologies | patamde.com
//
// ⚠️  IMPORTANT: Copy this file, fill in your values, and
//     NEVER commit real credentials to version control.
//     Add api/config.php to your .gitignore before going live.
// ============================================================

// ----------------------------------------------------------
// Database connection (required for Hostinger / shared PHP)
// ----------------------------------------------------------
// 👉 Replace with your actual database credentials from your
//    hosting control panel (e.g., Hostinger hPanel > Databases)
define('DB_HOST', 'localhost');             // usually 'localhost'
define('DB_USER', 'YOUR_DB_USERNAME');      // e.g., u123456789_admin
define('DB_PASS', 'YOUR_DB_PASSWORD');      // use a strong password
define('DB_NAME', 'YOUR_DB_NAME');          // e.g., u123456789_portfolio

// ----------------------------------------------------------
// Session cookie name
// ----------------------------------------------------------
// 👉 You may rename this to something unique for your site
define('SESSION_COOKIE_NAME', 'portfolio_admin_session');

// ----------------------------------------------------------
// Setup key — protects the one-time /api/setup.php endpoint
// ----------------------------------------------------------
// 👉 Generate a long random string before first setup.
//    Example: php -r "echo bin2hex(random_bytes(32));"
//    ROTATE this key after running setup. Keep it secret.
define('SETUP_KEY', 'REPLACE_WITH_A_LONG_RANDOM_SECRET_KEY');

// ----------------------------------------------------------
// CORS — allowed origins for API requests
// ----------------------------------------------------------
// 👉 Add your production domain and remove the localhost
//    entries once you go live.
define('CORS_ALLOWED_ORIGINS', [
    'https://your-domain.com',
    'https://www.your-domain.com',
    'http://localhost:3007',    // local dev — remove in production
    'http://127.0.0.1:3007',   // local dev — remove in production
]);
