<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'cinetech');
define('DB_USER', 'root');
define('DB_PASS', '');


$pdo = new PDO("mysql:host=localhost;dbname=cinetech;charset=utf8", "root", "");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

