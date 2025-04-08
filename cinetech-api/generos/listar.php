<?php

header("Access-Control-Allow-Methods: POST");
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once '../db.php';
require_once('../config.php');

$stmt = $pdo->query("SELECT id, nome FROM generos ORDER BY nome");
$generos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($generos);
