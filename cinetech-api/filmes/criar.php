<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require '../config.php';

$titulo = $_POST['titulo'];
$descricao = $_POST['descricao'];
$genero_id = $_POST['genero_id'];
$lancamento = $_POST['lancamento'];
$duracao = $_POST['duracao'];
$trailer = $_POST['trailer'] ?? null; // ✅ Agora o trailer é capturado
$imagem = null;

// Verificar e mover imagem, se enviada
if (!empty($_FILES['imagem']['name'])) {
    $tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp'];
    $tipoImagem = mime_content_type($_FILES['imagem']['tmp_name']);

    if (!in_array($tipoImagem, $tiposPermitidos)) {
        echo json_encode(["error" => "Tipo de imagem não permitido. Use JPEG, PNG ou WEBP."]);
        exit;
    }

    $nomeImagem = uniqid() . '_' . basename($_FILES['imagem']['name']);
    $caminho = __DIR__ . '/../uploads/' . $nomeImagem;
    move_uploaded_file($_FILES['imagem']['tmp_name'], $caminho);
    $imagem = $nomeImagem;
}

$sql = "INSERT INTO filmes (titulo, descricao, imagem, genero_id, lancamento, duracao, trailer)
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $pdo->prepare($sql);
$stmt->execute([$titulo, $descricao, $imagem, $genero_id, $lancamento, $duracao, $trailer]);

echo json_encode(["message" => "Filme cadastrado com sucesso!"]);
