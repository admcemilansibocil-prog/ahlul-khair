<?php
// Midtrans Webhook Notification Listener for Hostinger
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$notif = json_decode($json, true);

if (!$notif) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'No data']);
    exit();
}

$orderId = $notif['order_id'] ?? '';
$statusCode = $notif['status_code'] ?? '';
$grossAmount = $notif['gross_amount'] ?? '';
$signatureKey = $notif['signature_key'] ?? '';
$transactionStatus = $notif['transaction_status'] ?? '';
$paymentType = $notif['payment_type'] ?? '';

// Catat log notifikasi transaksi ke file log lokal di hosting
$logData = date('Y-m-d H:i:s') . " | Order: $orderId | Status: $transactionStatus | Type: $paymentType | Amount: $grossAmount\n";
file_put_contents(__DIR__ . '/transactions.log', $logData, FILE_APPEND);

// Response 200 OK to Midtrans
http_response_code(200);
echo json_encode(['status' => 'success', 'order_id' => $orderId, 'transaction_status' => $transactionStatus]);
