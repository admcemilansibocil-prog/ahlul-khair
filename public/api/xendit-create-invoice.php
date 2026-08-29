<?php
// Xendit Invoice Creator API for Hostinger
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input']);
    exit();
}

$secretKey = isset($input['secret_key']) && !empty($input['secret_key']) 
    ? $input['secret_key'] 
    : getenv('XENDIT_SECRET_KEY');

if (!$secretKey) {
    // If no secret key is supplied yet, return mock Xendit Invoice response
    echo json_encode([
        'status' => 'mock',
        'id' => 'xendit_mock_' . bin2hex(random_bytes(8)),
        'invoice_url' => 'https://checkout.xendit.co/web/MOCK-' . bin2hex(random_bytes(6)),
        'expiry_date' => date('c', strtotime('+24 hours')),
        'amount' => (int)($input['amount'] ?? 100000),
        'message' => 'Simulasi Xendit Invoice aktif (Isi Secret Key di Pengaturan untuk Live Transaksi)'
    ]);
    exit();
}

$apiUrl = 'https://api.xendit.co/v2/invoices';

$payload = [
    'external_id' => $input['external_id'] ?? ('AK-XEN-' . time() . '-' . rand(100, 999)),
    'amount' => (int)($input['amount'] ?? 100000),
    'description' => 'Donasi: ' . ($input['campaign_title'] ?? 'Ahlul Khair Indonesia'),
    'payer_email' => !empty($input['payer_email']) ? $input['payer_email'] : 'donatur@ahlulkhair.id',
    'customer' => [
        'given_names' => $input['customer_name'] ?? 'Hamba Allah',
        'mobile_number' => $input['customer_phone'] ?? '08123456789'
    ],
    'invoice_duration' => 86400, // 24 hours
    'currency' => 'IDR',
    'payment_methods' => ['BCA', 'BNI', 'BRI', 'MANDIRI', 'PERMATA', 'BSI', 'QRIS', 'OVO', 'DANA', 'SHOPEEPAY', 'ALFAMART']
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Basic ' . base64_encode($secretKey . ':')
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode(['error' => 'cURL Error: ' . $curlError]);
    exit();
}

http_response_code($httpCode);
echo $response;
