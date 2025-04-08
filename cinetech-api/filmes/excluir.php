<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");



require '../config.php';

$id = $_GET['id'];

$sql = "DELETE FROM filmes WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);

echo json_encode(["message" => "Filme excluído com sucesso!"]);
