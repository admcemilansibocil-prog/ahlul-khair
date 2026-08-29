<?php
// Xendit Webhook Listener for Hostinger
header('Content-Type: application/json');

$callbackToken = getenv('XENDIT_WEBHOOK_TOKEN');
$receivedToken = $_SERVER['HTTP_X_CALLBACK_TOKEN'] ?? '';

if ($callbackToken && $receivedToken !== $callbackToken) {
    http_response_code(403);
    echo json_encode(['status' => 'unauthorized']);
    exit();
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data) {
    $externalId = $data['external_id'] ?? $data['id'] ?? 'unknown';
    $status = $data['status'] ?? 'PAID';
    $amount = $data['amount'] ?? 0;
    
    $logData = date('Y-m-d H:i:s') . " | XENDIT | ID: $externalId | Status: $status | Amount: $amount\n";
    file_put_contents(__DIR__ . '/transactions.log', $logData, FILE_APPEND);
}

http_response_code(200);
echo json_encode(['status' => 'success']);
