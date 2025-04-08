<?php
// cinetech-api/filmes/buscar.php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../db.php';

$termo = $_GET['termo'] ?? '';

if ($termo === '') {
    echo json_encode([]);
    exit;
}

try {
    $sql = "SELECT * FROM filmes 
            WHERE titulo LIKE :termo 
               OR descricao LIKE :termo 
               OR categoria LIKE :termo 
            ORDER BY id DESC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':termo' => '%' . $termo . '%']);
    
    $filmes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($filmes);
} catch (PDOException $e) {
    echo json_encode(['erro' => 'Erro na busca: ' . $e->getMessage()]);
}
