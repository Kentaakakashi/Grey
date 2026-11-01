# Admin Panel Setup Guide

> **Template:** Graphic Designer Portfolio Website  
> **By Airflute Technologies** — [patamde.com](https://patamde.com)  
> **Support:** [business@patamde.com](mailto:business@patamde.com)

This guide walks you through setting up the admin panel so you can edit your portfolio content directly from your browser — no coding required after setup.

---

## Prerequisites

Before running setup, ensure you have:

- ✅ A hosting account with **PHP 8.0+** and **MySQL** (e.g., Hostinger)
- ✅ A database created in your hosting control panel
- ✅ The site deployed to your server (see [README.md](../README.md) for deployment steps)
- ✅ Your `api/config.php` filled in with your real database credentials

---

## Step 1 — Configure `api/config.php`

Open `api/config.php` on your **server** (via FTP/File Manager) and fill in your database credentials:

```php
define('DB_HOST', 'localhost');              // Usually 'localhost'
define('DB_USER', 'your_db_username');       // From hosting control panel
define('DB_PASS', 'your_db_password');       // Strong password
define('DB_NAME', 'your_db_name');           // Your database name

define('SESSION_COOKIE_NAME', 'portfolio_admin_session');

// Generate this with: php -r "echo bin2hex(random_bytes(32));"
define('SETUP_KEY', 'your-long-random-secret-key-here');

define('CORS_ALLOWED_ORIGINS', [
    'https://your-domain.com',
    'https://www.your-domain.com',
]);
```

> ⚠️ **Security**: Never commit `config.php` with real credentials to version control. Add it to `.gitignore`.

---

## Step 2 — Run One-Time Setup

The `setup.php` endpoint creates your admin account and initialises the database tables. Run this **once** using `curl` or a tool like [Hoppscotch](https://hoppscotch.io/):

```bash
curl -X POST https://your-domain.com/api/setup.php \
  -H "Content-Type: application/json" \
  -d '{
    "setup_key": "your-long-random-secret-key-here",
    "username": "admin",
    "password": "UseAVeryStrongPassword123!"
  }'
```

**Expected response on success:**
```json
{
  "success": true,
  "message": "Admin user created and database initialized."
}
```

> 💡 You can also include `initial_data` in the payload to pre-seed your portfolio content on first run. See `api/setup.txt` for the full schema.

---

## Step 3 — Rotate the Setup Key

After running setup successfully, **change your `SETUP_KEY`** in `config.php` to a different value (or a random string). This prevents the setup endpoint from being called again.

---

## Step 4 — Log In to the Admin Panel

1. Open your browser and visit: `https://your-domain.com/admin/login`
2. Enter your **username** and **password** from Step 2
3. You're in! 🎉

---

## Step 5 — Edit Your Portfolio Content

Inside the admin panel you can edit:

| Section | What you can change |
|---------|---------------------|
| **Hero** | Name, tagline, background image |
| **About** | Bio text, profile photo, skills |
| **Work / Projects** | Project images, titles, descriptions, links |
| **Services** | Service offerings and descriptions |
| **Testimonials** | Client quotes and names |
| **Contact** | Email address, social links, contact form settings |

After editing, click **Save & Publish** to make your changes live on the website.

---

## Logging Out

Click the **Logout** button in the admin panel, or visit:  
`https://your-domain.com/api/logout.php`

Sessions are secured with **HttpOnly + SameSite=Strict** cookies. They expire automatically after inactivity.

---

## Security Checklist

- [ ] `config.php` contains your real credentials (not placeholder values)
- [ ] `SETUP_KEY` has been rotated after first setup
- [ ] Strong admin password set (12+ characters, mixed case, numbers, symbols)
- [ ] CORS origins updated to your production domain only
- [ ] `api/config.php` is **not** committed to git

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `401 Unauthorized` on setup | Wrong `setup_key` — check `config.php` |
| `500 Internal Server Error` | Check DB credentials in `config.php` |
| Login page shows but login fails | Wrong username/password; re-run setup |
| Content not updating | Check if session cookie is set (browser dev tools) |
| CORS error in browser console | Add your domain to `CORS_ALLOWED_ORIGINS` in `config.php` |

---

## Need Help?

Having trouble with setup? We offer **free setup support** and **custom website builds** for graphic designers.

📧 [business@patamde.com](mailto:business@patamde.com)  
🌐 [patamde.com](https://patamde.com)
