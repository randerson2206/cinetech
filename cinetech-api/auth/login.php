<?php
header("Content-Type: application/json");
require_once '../db.php';

$input = json_decode(file_get_contents("php://input"), true);
$usuario = $input['usuario'] ?? '';
$senha = $input['senha'] ?? '';

$stmt = $pdo->prepare("SELECT * FROM administradores WHERE usuario = ?");
$stmt->execute([$usuario]);
$admin = $stmt->fetch();

if ($admin && password_verify($senha, $admin['senha'])) {
    $token = base64_encode(json_encode([
        "user" => $admin['usuario'],
        "exp" => time() + 3600
    ]));
    echo json_encode(["token" => $token]);
} else {
    http_response_code(401);
    echo json_encode(["error" => "Credenciais inválidas"]);
}
?>
