<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/config.php';

$serverDsn = sprintf('mysql:host=%s;port=%s;charset=%s', DB_HOST, DB_PORT, DB_CHARSET);
$serverPdo = new PDO($serverDsn, DB_USER, DB_PASS, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
]);

$serverPdo->exec(
    'CREATE DATABASE IF NOT EXISTS `' . DB_NAME . '` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'
);

require_once __DIR__ . '/../config/db.php';

$pdo = db();

$pdo->exec(
    "CREATE TABLE IF NOT EXISTS admins (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password_md5 CHAR(32) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
);

$pdo->exec(
    "CREATE TABLE IF NOT EXISTS site_hero (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        lang VARCHAR(10) NOT NULL DEFAULT 'vi',
        eyebrow VARCHAR(255) DEFAULT NULL,
        title VARCHAR(255) DEFAULT NULL,
        description TEXT DEFAULT NULL,
        primary_cta VARCHAR(255) DEFAULT NULL,
        secondary_cta VARCHAR(255) DEFAULT NULL,
        image_url VARCHAR(500) DEFAULT NULL,
        campaign_url VARCHAR(500) DEFAULT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_lang (lang)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
);

$pdo->exec(
    "CREATE TABLE IF NOT EXISTS site_content_meta (
        lang VARCHAR(10) NOT NULL PRIMARY KEY,
        stats_eyebrow VARCHAR(255) DEFAULT NULL,
        stats_title VARCHAR(255) DEFAULT NULL,
        programs_title VARCHAR(255) DEFAULT NULL,
        programs_subtitle TEXT DEFAULT NULL,
        testimonials_eyebrow VARCHAR(255) DEFAULT NULL,
        testimonials_title VARCHAR(255) DEFAULT NULL,
        gallery_eyebrow VARCHAR(255) DEFAULT NULL,
        gallery_title VARCHAR(255) DEFAULT NULL,
        teachers_eyebrow VARCHAR(255) DEFAULT NULL,
        teachers_title VARCHAR(255) DEFAULT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
);

$pdo->exec(
    "CREATE TABLE IF NOT EXISTS site_nav (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        lang VARCHAR(10) NOT NULL DEFAULT 'vi',
        label VARCHAR(255) NOT NULL,
        sort_order INT UNSIGNED NOT NULL DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_lang_sort (lang, sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
);

$pdo->exec(
    "CREATE TABLE IF NOT EXISTS site_stats (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        lang VARCHAR(10) NOT NULL DEFAULT 'vi',
        section_eyebrow VARCHAR(255) DEFAULT NULL,
        section_title VARCHAR(255) DEFAULT NULL,
        stat_value VARCHAR(100) NOT NULL,
        stat_label VARCHAR(500) NOT NULL,
        sort_order INT UNSIGNED NOT NULL DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_lang_sort (lang, sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
);

$pdo->exec(
    "CREATE TABLE IF NOT EXISTS site_programs (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        lang VARCHAR(10) NOT NULL DEFAULT 'vi',
        section_title VARCHAR(255) DEFAULT NULL,
        section_description TEXT DEFAULT NULL,
        program_name VARCHAR(255) NOT NULL,
        program_description TEXT DEFAULT NULL,
        tag VARCHAR(100) DEFAULT NULL,
        image_url VARCHAR(500) DEFAULT NULL,
        sort_order INT UNSIGNED NOT NULL DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_lang_sort (lang, sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
);

$pdo->exec(
    "CREATE TABLE IF NOT EXISTS site_teacher_highlights (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        lang VARCHAR(10) NOT NULL DEFAULT 'vi',
        text_value VARCHAR(500) NOT NULL,
        sort_order INT UNSIGNED NOT NULL DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_lang_sort (lang, sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
);

$pdo->exec(
    "CREATE TABLE IF NOT EXISTS site_teachers (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        lang VARCHAR(10) NOT NULL DEFAULT 'vi',
        section_eyebrow VARCHAR(255) DEFAULT NULL,
        section_title VARCHAR(255) DEFAULT NULL,
        teacher_name VARCHAR(255) NOT NULL,
        role VARCHAR(255) DEFAULT NULL,
        school VARCHAR(255) DEFAULT NULL,
        score VARCHAR(100) DEFAULT NULL,
        image_url VARCHAR(500) DEFAULT NULL,
        sort_order INT UNSIGNED NOT NULL DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_lang_sort (lang, sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
);

$pdo->exec(
    "CREATE TABLE IF NOT EXISTS site_testimonials (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        lang VARCHAR(10) NOT NULL DEFAULT 'vi',
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) DEFAULT NULL,
        quote_text TEXT DEFAULT NULL,
        result VARCHAR(255) DEFAULT NULL,
        image_url VARCHAR(500) DEFAULT NULL,
        sort_order INT UNSIGNED NOT NULL DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_lang_sort (lang, sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
);

$pdo->exec(
    "CREATE TABLE IF NOT EXISTS site_galleries (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        lang VARCHAR(10) NOT NULL DEFAULT 'vi',
        title VARCHAR(255) NOT NULL,
        description TEXT DEFAULT NULL,
        sort_order INT UNSIGNED NOT NULL DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_lang_sort (lang, sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
);

$pdo->exec(
    "CREATE TABLE IF NOT EXISTS site_gallery_images (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        gallery_id INT UNSIGNED NOT NULL,
        image_url VARCHAR(500) NOT NULL,
        sort_order INT UNSIGNED NOT NULL DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_gallery_sort (gallery_id, sort_order),
        CONSTRAINT fk_site_gallery_images_gallery
            FOREIGN KEY (gallery_id) REFERENCES site_galleries(id)
            ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
);

$pdo->exec(
    "CREATE TABLE IF NOT EXISTS site_contact_footer (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        lang VARCHAR(10) NOT NULL DEFAULT 'vi',
        form_title VARCHAR(255) DEFAULT NULL,
        hotline VARCHAR(50) DEFAULT NULL,
        address TEXT DEFAULT NULL,
        form_description TEXT DEFAULT NULL,
        button_text VARCHAR(255) DEFAULT NULL,
        map_url TEXT DEFAULT NULL,
        footer_text TEXT DEFAULT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_lang (lang)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
);

try {
    $pdo->exec("ALTER TABLE site_contact_footer ADD COLUMN button_text VARCHAR(255) DEFAULT NULL AFTER form_description");
} catch (Throwable $exception) {
    if (!str_contains($exception->getMessage(), 'Duplicate column')) {
        throw $exception;
    }
}

try {
    $pdo->exec("ALTER TABLE site_contact_footer ADD COLUMN address TEXT DEFAULT NULL AFTER hotline");
} catch (Throwable $exception) {
    if (!str_contains($exception->getMessage(), 'Duplicate column')) {
        throw $exception;
    }
}

try {
    $pdo->exec("ALTER TABLE site_contact_footer ADD COLUMN map_url TEXT DEFAULT NULL AFTER button_text");
} catch (Throwable $exception) {
    if (!str_contains($exception->getMessage(), 'Duplicate column')) {
        throw $exception;
    }
}

echo "Database tables are ready." . PHP_EOL;
echo "Create admin manually in phpMyAdmin." . PHP_EOL;
