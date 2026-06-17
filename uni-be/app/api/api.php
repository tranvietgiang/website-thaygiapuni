<?php

declare(strict_types=1);

session_start();

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/db.php';

header('Content-Type: application/json; charset=utf-8');
$requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigin = in_array($requestOrigin, CORS_ALLOWED_ORIGINS, true)
    ? $requestOrigin
    : CORS_ALLOWED_ORIGINS[0];
header('Access-Control-Allow-Origin: ' . $allowedOrigin);
header('Vary: Origin');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function base64url_encode(string $value): string
{
    return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
}

function base64url_decode(string $value): string|false
{
    $padding = strlen($value) % 4;
    if ($padding > 0) {
        $value .= str_repeat('=', 4 - $padding);
    }

    return base64_decode(strtr($value, '-_', '+/'), true);
}

function create_jwt(array $payload): string
{
    $header = ['alg' => 'HS256', 'typ' => 'JWT'];
    $now = time();
    $payload = array_merge($payload, [
        'iss' => JWT_ISSUER,
        'iat' => $now,
        'exp' => $now + JWT_TTL_SECONDS,
    ]);

    $segments = [
        base64url_encode(json_encode($header, JSON_UNESCAPED_UNICODE)),
        base64url_encode(json_encode($payload, JSON_UNESCAPED_UNICODE)),
    ];
    $signature = hash_hmac('sha256', implode('.', $segments), JWT_SECRET, true);
    $segments[] = base64url_encode($signature);

    return implode('.', $segments);
}

function verify_jwt(string $token): array
{
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        json_response(['message' => 'JWT không hợp lệ.'], 401);
    }

    [$headerPart, $payloadPart, $signaturePart] = $parts;
    $expected = base64url_encode(hash_hmac('sha256', $headerPart . '.' . $payloadPart, JWT_SECRET, true));

    if (!hash_equals($expected, $signaturePart)) {
        json_response(['message' => 'JWT không hợp lệ.'], 401);
    }

    $payloadJson = base64url_decode($payloadPart);
    $payload = $payloadJson === false ? null : json_decode($payloadJson, true);

    if (!is_array($payload) || ($payload['iss'] ?? '') !== JWT_ISSUER || (int)($payload['exp'] ?? 0) < time()) {
        json_response(['message' => 'Phiên admin đã hết hạn.'], 401);
    }

    return $payload;
}

function require_admin(): array
{
    $authorization = $_SERVER['HTTP_AUTHORIZATION']
        ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
        ?? $_SERVER['Authorization']
        ?? '';

    if (!$authorization && function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        $authorization = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    }

    if (!$authorization && function_exists('getallheaders')) {
        $headers = getallheaders();
        $authorization = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    }

    if (!preg_match('/^Bearer\s+(.+)$/i', $authorization, $matches)) {
        json_response(['message' => 'Thiếu JWT admin.'], 401);
    }

    $payload = verify_jwt($matches[1]);
    if (($payload['role'] ?? '') !== 'admin') {
        json_response(['message' => 'Không có quyền admin.'], 403);
    }

    return $payload;
}

function request_json(): array
{
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '{}', true);
    return is_array($data) ? $data : [];
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf_token'];
}

function require_csrf(): void
{
    $headerToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $sessionToken = $_SESSION['csrf_token'] ?? '';

    if (!$headerToken || !$sessionToken || !hash_equals($sessionToken, $headerToken)) {
        json_response(['message' => 'CSRF token không hợp lệ.'], 419);
    }
}

function verify_admin_login(string $username, string $password): ?array
{
    $stmt = db()->prepare('SELECT id, username, password_md5, role FROM admins WHERE username = :username LIMIT 1');
    $stmt->execute(['username' => $username]);
    $admin = $stmt->fetch();

    if (!$admin || !hash_equals((string)$admin['password_md5'], md5($password))) {
        return null;
    }

    return $admin;
}

function load_content_by_lang(PDO $pdo, string $lang): array
{
    $content = [];

    $stmt = $pdo->prepare('SELECT * FROM site_hero WHERE lang = :lang LIMIT 1');
    $stmt->execute(['lang' => $lang]);
    $hero = $stmt->fetch();
    if ($hero) {
        $content['hero'] = [
            'eyebrow' => $hero['eyebrow'] ?? '',
            'title' => $hero['title'] ?? '',
            'description' => $hero['description'] ?? '',
            'primaryCta' => $hero['primary_cta'] ?? '',
            'secondaryCta' => $hero['secondary_cta'] ?? '',
            'image' => $hero['image_url'] ?? '',
            'campaign' => $hero['campaign_url'] ?? '',
            'overlay' => '',
        ];
    }

    $stmt = $pdo->prepare('SELECT * FROM site_content_meta WHERE lang = :lang LIMIT 1');
    $stmt->execute(['lang' => $lang]);
    $meta = $stmt->fetch();
    if ($meta) {
        $content['statsEyebrow'] = $meta['stats_eyebrow'] ?? '';
        $content['statsTitle'] = $meta['stats_title'] ?? '';
        $content['programsTitle'] = $meta['programs_title'] ?? '';
        $content['programsSubtitle'] = $meta['programs_subtitle'] ?? '';
        $content['testimonialsEyebrow'] = $meta['testimonials_eyebrow'] ?? '';
        $content['testimonialsTitle'] = $meta['testimonials_title'] ?? '';
        $content['galleryEyebrow'] = $meta['gallery_eyebrow'] ?? '';
        $content['galleryTitle'] = $meta['gallery_title'] ?? '';
        $content['teachersEyebrow'] = $meta['teachers_eyebrow'] ?? '';
        $content['teachersTitle'] = $meta['teachers_title'] ?? '';
    }

    $stmt = $pdo->prepare('SELECT label FROM site_nav WHERE lang = :lang ORDER BY sort_order, id');
    $stmt->execute(['lang' => $lang]);
    $nav = array_column($stmt->fetchAll(), 'label');
    if ($nav) {
        $content['nav'] = $nav;
    }

    $stmt = $pdo->prepare('SELECT stat_value, stat_label FROM site_stats WHERE lang = :lang ORDER BY sort_order, id');
    $stmt->execute(['lang' => $lang]);
    $stats = array_map(
        fn(array $row): array => ['value' => $row['stat_value'], 'label' => $row['stat_label']],
        $stmt->fetchAll()
    );
    if ($stats) {
        $content['stats'] = $stats;
    }

    $stmt = $pdo->prepare('SELECT program_name, program_description, tag, image_url FROM site_programs WHERE lang = :lang ORDER BY sort_order, id');
    $stmt->execute(['lang' => $lang]);
    $programs = array_map(
        fn(array $row): array => [
            'title' => $row['program_name'],
            'description' => $row['program_description'] ?? '',
            'tag' => $row['tag'] ?? '',
            'image' => $row['image_url'] ?? '',
        ],
        $stmt->fetchAll()
    );
    if ($programs) {
        $content['programs'] = $programs;
    }

    $stmt = $pdo->prepare('SELECT text_value FROM site_teacher_highlights WHERE lang = :lang ORDER BY sort_order, id');
    $stmt->execute(['lang' => $lang]);
    $highlights = array_column($stmt->fetchAll(), 'text_value');
    if ($highlights) {
        $content['highlights'] = $highlights;
    }

    $stmt = $pdo->prepare('SELECT teacher_name, role, school, score, image_url FROM site_teachers WHERE lang = :lang ORDER BY sort_order, id');
    $stmt->execute(['lang' => $lang]);
    $teachers = array_map(
        fn(array $row): array => [
            'name' => $row['teacher_name'],
            'role' => $row['role'] ?? '',
            'school' => $row['school'] ?? '',
            'score' => $row['score'] ?? '',
            'image' => $row['image_url'] ?? '',
        ],
        $stmt->fetchAll()
    );
    if ($teachers) {
        $content['teachers'] = $teachers;
    }

    $stmt = $pdo->prepare('SELECT name, role, quote_text, result, image_url FROM site_testimonials WHERE lang = :lang ORDER BY sort_order, id');
    $stmt->execute(['lang' => $lang]);
    $testimonials = array_map(
        fn(array $row): array => [
            'name' => $row['name'],
            'role' => $row['role'] ?? '',
            'quote' => $row['quote_text'] ?? '',
            'result' => $row['result'] ?? '',
            'image' => $row['image_url'] ?? '',
        ],
        $stmt->fetchAll()
    );
    if ($testimonials) {
        $content['testimonials'] = $testimonials;
    }

    $stmt = $pdo->prepare('SELECT id, title, description FROM site_galleries WHERE lang = :lang ORDER BY sort_order, id');
    $stmt->execute(['lang' => $lang]);
    $galleryRows = $stmt->fetchAll();
    if ($galleryRows) {
        $imageStmt = $pdo->prepare('SELECT image_url FROM site_gallery_images WHERE gallery_id = :gallery_id ORDER BY sort_order, id');
        $content['galleries'] = array_map(static function (array $row) use ($imageStmt): array {
            $imageStmt->execute(['gallery_id' => $row['id']]);
            return [
                'title' => $row['title'],
                'description' => $row['description'] ?? '',
                'images' => array_column($imageStmt->fetchAll(), 'image_url'),
            ];
        }, $galleryRows);
    }

    $stmt = $pdo->prepare('SELECT form_title, hotline, address, form_description, button_text, map_url, footer_text FROM site_contact_footer WHERE lang = :lang LIMIT 1');
    $stmt->execute(['lang' => $lang]);
    $contact = $stmt->fetch();
    if ($contact) {
        $content['contact'] = [
            'title' => $contact['form_title'] ?? '',
            'hotline' => $contact['hotline'] ?? '',
            'address' => $contact['address'] ?? '',
            'description' => $contact['form_description'] ?? '',
            'button' => $contact['button_text'] ?? '',
            'mapUrl' => $contact['map_url'] ?? '',
        ];
        $content['footer'] = $contact['footer_text'] ?? '';
    }

    return $content;
}

function save_content_by_lang(PDO $pdo, string $lang, array $content): void
{
    $hero = is_array($content['hero'] ?? null) ? $content['hero'] : [];
    $stmt = $pdo->prepare(
        'INSERT INTO site_hero (lang, eyebrow, title, description, primary_cta, secondary_cta, image_url, campaign_url)
         VALUES (:lang, :eyebrow, :title, :description, :primary_cta, :secondary_cta, :image_url, :campaign_url)
         ON DUPLICATE KEY UPDATE eyebrow = VALUES(eyebrow), title = VALUES(title), description = VALUES(description),
         primary_cta = VALUES(primary_cta), secondary_cta = VALUES(secondary_cta), image_url = VALUES(image_url),
         campaign_url = VALUES(campaign_url)'
    );
    $stmt->execute([
        'lang' => $lang,
        'eyebrow' => $hero['eyebrow'] ?? '',
        'title' => $hero['title'] ?? '',
        'description' => $hero['description'] ?? '',
        'primary_cta' => $hero['primaryCta'] ?? '',
        'secondary_cta' => $hero['secondaryCta'] ?? '',
        'image_url' => $hero['image'] ?? '',
        'campaign_url' => $hero['campaign'] ?? '',
    ]);

    $stmt = $pdo->prepare(
        'INSERT INTO site_content_meta
         (lang, stats_eyebrow, stats_title, programs_title, programs_subtitle, testimonials_eyebrow, testimonials_title, gallery_eyebrow, gallery_title, teachers_eyebrow, teachers_title)
         VALUES (:lang, :stats_eyebrow, :stats_title, :programs_title, :programs_subtitle, :testimonials_eyebrow, :testimonials_title, :gallery_eyebrow, :gallery_title, :teachers_eyebrow, :teachers_title)
         ON DUPLICATE KEY UPDATE stats_eyebrow = VALUES(stats_eyebrow), stats_title = VALUES(stats_title),
         programs_title = VALUES(programs_title), programs_subtitle = VALUES(programs_subtitle),
         testimonials_eyebrow = VALUES(testimonials_eyebrow), testimonials_title = VALUES(testimonials_title),
         gallery_eyebrow = VALUES(gallery_eyebrow), gallery_title = VALUES(gallery_title),
         teachers_eyebrow = VALUES(teachers_eyebrow), teachers_title = VALUES(teachers_title)'
    );
    $stmt->execute([
        'lang' => $lang,
        'stats_eyebrow' => $content['statsEyebrow'] ?? '',
        'stats_title' => $content['statsTitle'] ?? '',
        'programs_title' => $content['programsTitle'] ?? '',
        'programs_subtitle' => $content['programsSubtitle'] ?? '',
        'testimonials_eyebrow' => $content['testimonialsEyebrow'] ?? '',
        'testimonials_title' => $content['testimonialsTitle'] ?? '',
        'gallery_eyebrow' => $content['galleryEyebrow'] ?? '',
        'gallery_title' => $content['galleryTitle'] ?? '',
        'teachers_eyebrow' => $content['teachersEyebrow'] ?? '',
        'teachers_title' => $content['teachersTitle'] ?? '',
    ]);

    $deleteTables = ['site_nav', 'site_stats', 'site_programs', 'site_teacher_highlights', 'site_teachers', 'site_testimonials'];
    foreach ($deleteTables as $table) {
        $stmt = $pdo->prepare("DELETE FROM {$table} WHERE lang = :lang");
        $stmt->execute(['lang' => $lang]);
    }

    $stmt = $pdo->prepare('SELECT id FROM site_galleries WHERE lang = :lang');
    $stmt->execute(['lang' => $lang]);
    $galleryIds = array_column($stmt->fetchAll(), 'id');
    if ($galleryIds) {
        $placeholders = implode(',', array_fill(0, count($galleryIds), '?'));
        $pdo->prepare("DELETE FROM site_gallery_images WHERE gallery_id IN ({$placeholders})")->execute($galleryIds);
    }
    $stmt = $pdo->prepare('DELETE FROM site_galleries WHERE lang = :lang');
    $stmt->execute(['lang' => $lang]);

    $insertNav = $pdo->prepare('INSERT INTO site_nav (lang, label, sort_order) VALUES (:lang, :label, :sort_order)');
    foreach ((array)($content['nav'] ?? []) as $index => $label) {
        $insertNav->execute(['lang' => $lang, 'label' => (string)$label, 'sort_order' => $index]);
    }

    $insertStat = $pdo->prepare('INSERT INTO site_stats (lang, section_eyebrow, section_title, stat_value, stat_label, sort_order) VALUES (:lang, :section_eyebrow, :section_title, :stat_value, :stat_label, :sort_order)');
    foreach ((array)($content['stats'] ?? []) as $index => $item) {
        $insertStat->execute([
            'lang' => $lang,
            'section_eyebrow' => $content['statsEyebrow'] ?? '',
            'section_title' => $content['statsTitle'] ?? '',
            'stat_value' => $item['value'] ?? '',
            'stat_label' => $item['label'] ?? '',
            'sort_order' => $index,
        ]);
    }

    $insertProgram = $pdo->prepare('INSERT INTO site_programs (lang, section_title, section_description, program_name, program_description, tag, image_url, sort_order) VALUES (:lang, :section_title, :section_description, :program_name, :program_description, :tag, :image_url, :sort_order)');
    foreach ((array)($content['programs'] ?? []) as $index => $program) {
        $insertProgram->execute([
            'lang' => $lang,
            'section_title' => $content['programsTitle'] ?? '',
            'section_description' => $content['programsSubtitle'] ?? '',
            'program_name' => $program['title'] ?? '',
            'program_description' => $program['description'] ?? '',
            'tag' => $program['tag'] ?? '',
            'image_url' => $program['image'] ?? '',
            'sort_order' => $index,
        ]);
    }

    $insertHighlight = $pdo->prepare('INSERT INTO site_teacher_highlights (lang, text_value, sort_order) VALUES (:lang, :text_value, :sort_order)');
    foreach ((array)($content['highlights'] ?? []) as $index => $text) {
        $insertHighlight->execute(['lang' => $lang, 'text_value' => (string)$text, 'sort_order' => $index]);
    }

    $insertTeacher = $pdo->prepare('INSERT INTO site_teachers (lang, section_eyebrow, section_title, teacher_name, role, school, score, image_url, sort_order) VALUES (:lang, :section_eyebrow, :section_title, :teacher_name, :role, :school, :score, :image_url, :sort_order)');
    foreach ((array)($content['teachers'] ?? []) as $index => $teacher) {
        $insertTeacher->execute([
            'lang' => $lang,
            'section_eyebrow' => $content['teachersEyebrow'] ?? '',
            'section_title' => $content['teachersTitle'] ?? '',
            'teacher_name' => $teacher['name'] ?? '',
            'role' => $teacher['role'] ?? '',
            'school' => $teacher['school'] ?? '',
            'score' => $teacher['score'] ?? '',
            'image_url' => $teacher['image'] ?? '',
            'sort_order' => $index,
        ]);
    }

    $insertTestimonial = $pdo->prepare('INSERT INTO site_testimonials (lang, name, role, quote_text, result, image_url, sort_order) VALUES (:lang, :name, :role, :quote_text, :result, :image_url, :sort_order)');
    foreach ((array)($content['testimonials'] ?? []) as $index => $testimonial) {
        $insertTestimonial->execute([
            'lang' => $lang,
            'name' => $testimonial['name'] ?? '',
            'role' => $testimonial['role'] ?? '',
            'quote_text' => $testimonial['quote'] ?? '',
            'result' => $testimonial['result'] ?? '',
            'image_url' => $testimonial['image'] ?? '',
            'sort_order' => $index,
        ]);
    }

    $insertGallery = $pdo->prepare('INSERT INTO site_galleries (lang, title, description, sort_order) VALUES (:lang, :title, :description, :sort_order)');
    $insertGalleryImage = $pdo->prepare('INSERT INTO site_gallery_images (gallery_id, image_url, sort_order) VALUES (:gallery_id, :image_url, :sort_order)');
    foreach ((array)($content['galleries'] ?? []) as $index => $gallery) {
        $insertGallery->execute([
            'lang' => $lang,
            'title' => $gallery['title'] ?? '',
            'description' => $gallery['description'] ?? '',
            'sort_order' => $index,
        ]);
        $galleryId = (int)$pdo->lastInsertId();
        foreach ((array)($gallery['images'] ?? []) as $imageIndex => $imageUrl) {
            $insertGalleryImage->execute([
                'gallery_id' => $galleryId,
                'image_url' => (string)$imageUrl,
                'sort_order' => $imageIndex,
            ]);
        }
    }

    $contact = is_array($content['contact'] ?? null) ? $content['contact'] : [];
    $stmt = $pdo->prepare(
        'INSERT INTO site_contact_footer (lang, form_title, hotline, address, form_description, button_text, map_url, footer_text)
         VALUES (:lang, :form_title, :hotline, :address, :form_description, :button_text, :map_url, :footer_text)
         ON DUPLICATE KEY UPDATE form_title = VALUES(form_title), hotline = VALUES(hotline),
         address = VALUES(address), form_description = VALUES(form_description), button_text = VALUES(button_text),
         map_url = VALUES(map_url), footer_text = VALUES(footer_text)'
    );
    $stmt->execute([
        'lang' => $lang,
        'form_title' => $contact['title'] ?? '',
        'hotline' => $contact['hotline'] ?? '',
        'address' => $contact['address'] ?? '',
        'form_description' => $contact['description'] ?? '',
        'button_text' => $contact['button'] ?? '',
        'map_url' => $contact['mapUrl'] ?? '',
        'footer_text' => $content['footer'] ?? '',
    ]);
}

function content_response_payload(PDO $pdo): array
{
    $vi = load_content_by_lang($pdo, 'vi');
    $en = load_content_by_lang($pdo, 'en');

    return [
        'vi' => $vi ?: new stdClass(),
        'en' => $en ?: new stdClass(),
    ];
}

$action = $_GET['action'] ?? '';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'csrf') {
        json_response(['csrfToken' => csrf_token()]);
    }

    if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'content') {
        $pdo = db();
        json_response(['content' => content_response_payload($pdo)]);
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'content') {
        require_csrf();
        require_admin();

        $data = request_json();
        $content = is_array($data['content'] ?? null) ? $data['content'] : [];
        if (!$content) {
            json_response(['message' => 'Thiếu dữ liệu nội dung.'], 422);
        }

        $pdo = db();
        $pdo->beginTransaction();
        foreach (['vi', 'en'] as $lang) {
            if (is_array($content[$lang] ?? null)) {
                save_content_by_lang($pdo, $lang, $content[$lang]);
            }
        }
        $pdo->commit();

        json_response([
            'message' => 'Đã lưu nội dung vào MySQL.',
            'content' => content_response_payload($pdo),
        ]);
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'login') {
        require_csrf();

        $data = request_json();
        $username = trim((string)($data['username'] ?? 'admin'));
        $password = (string)($data['password'] ?? '');

        if ($username === '' || $password === '') {
            json_response(['message' => 'Vui lòng nhập tài khoản và mật khẩu.'], 422);
        }

        $admin = verify_admin_login($username, $password);

        if (!$admin) {
            json_response(['message' => 'Sai tài khoản hoặc mật khẩu.'], 401);
        }

        session_regenerate_id(true);
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));

        $token = create_jwt([
            'sub' => (int)$admin['id'],
            'username' => $admin['username'],
            'role' => $admin['role'],
        ]);

        json_response([
            'token' => $token,
            'csrfToken' => $_SESSION['csrf_token'],
            'admin' => [
                'id' => (int)$admin['id'],
                'username' => $admin['username'],
                'role' => $admin['role'],
            ],
        ]);
    }

    json_response(['message' => 'Endpoint không tồn tại.'], 404);
} catch (Throwable $exception) {
    if (isset($pdo) && $pdo instanceof PDO && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    json_response(['message' => 'Lỗi server.', 'error' => $exception->getMessage()], 500);
}
