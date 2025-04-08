<?php


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");


require_once '../db.php';
require '../config.php';



$stmt = $pdo->query("
    SELECT f.*, g.nome AS genero_nome 
    FROM filmes f
    LEFT JOIN generos g ON f.genero_id = g.id
    ORDER BY f.id DESC
");

$filmes = $stmt->fetchAll();
echo json_encode($filmes);
