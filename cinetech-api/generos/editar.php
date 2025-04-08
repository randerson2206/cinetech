<?php

header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once('../config.php'); // ajuste o caminho conforme seu projeto





$id = $_GET['id'] ?? null;
$data = json_decode(file_get_contents("php://input"), true);

if (!$id || !isset($data['nome'])) {
    echo json_encode(['error' => 'Dados incompletos']);
    exit;
}

$nome = trim($data['nome']);

$stmt = $pdo->prepare("UPDATE generos SET nome = :nome WHERE id = :id");
$stmt->bindParam(':nome', $nome);
$stmt->bindParam(':id', $id);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Gênero atualizado com sucesso']);
} else {
    echo json_encode(['error' => 'Erro ao atualizar gênero']);
}
