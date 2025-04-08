<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require '../config.php';

$id = $_GET['id'];
$titulo = $_POST['titulo'];
$descricao = $_POST['descricao'];
$genero_id = $_POST['genero_id'];
$lancamento = $_POST['lancamento'];
$duracao = $_POST['duracao'];

// Buscar imagem atual
$sql = "SELECT imagem FROM filmes WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);
$filme = $stmt->fetch(PDO::FETCH_ASSOC);

$imagem = $filme['imagem'];

// Se houver nova imagem, substituir
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

$sql = "UPDATE filmes SET titulo=?, descricao=?, imagem=?, genero_id=?, lancamento=?, duracao=? WHERE id=?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$titulo, $descricao, $imagem, $genero_id, $lancamento, $duracao, $id]);

echo json_encode(["message" => "Filme atualizado com sucesso!"]);
