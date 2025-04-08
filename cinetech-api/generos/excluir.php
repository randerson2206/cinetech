<?php

header("Access-Control-Allow-Methods: POST");
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once('../config.php');
require_once '../db.php';

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["erro" => "ID do gênero não informado."]);
    exit;
}

$id = $_GET['id'];

try {
    $stmt = $pdo->prepare("DELETE FROM generos WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(["mensagem" => "Gênero excluído com sucesso."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["erro" => "Erro ao excluir o gênero: " . $e->getMessage()]);
}
