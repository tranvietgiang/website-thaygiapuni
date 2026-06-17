<?php

declare(strict_types=1);

const DB_HOST = '127.0.0.1';
const DB_PORT = '3306';
const DB_NAME = 'about_uni';
const DB_USER = 'root';
const DB_PASS = '';
const DB_CHARSET = 'utf8mb4';

const JWT_SECRET = 'change-this-about-uni-secret-key';
const JWT_ISSUER = 'about-uni';
const JWT_TTL_SECONDS = 86400;

const CORS_ALLOWED_ORIGINS = [
    'http://localhost:5175',
    'http://127.0.0.1:5175',
    'http://192.168.56.1:5175',
];
