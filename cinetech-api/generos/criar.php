<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Resposta para requisições OPTIONS (preflight)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once('../config.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Captura o corpo da requisição
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['nome']) || empty(trim($data['nome']))) {
    echo json_encode(['erro' => 'Nome do gênero é obrigatório']);
    exit;
}

$nome = trim($data['nome']);

$stmt = $pdo->prepare("INSERT INTO generos (nome) VALUES (:nome)");
$stmt->bindParam(':nome', $nome);

if ($stmt->execute()) {
    echo json_encode(['mensagem' => 'Gênero criado com sucesso']);
} else {
    echo json_encode(['erro' => 'Erro ao criar gênero']);
}
