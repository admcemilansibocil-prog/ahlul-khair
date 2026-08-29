<?php
// Midtrans Snap Token Generator API for Hostinger
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

$serverKey = isset($input['server_key']) && !empty($input['server_key']) 
    ? $input['server_key'] 
    : getenv('MIDTRANS_SERVER_KEY');

$isProduction = isset($input['is_production']) ? (bool)$input['is_production'] : false;

if (!$serverKey) {
    // If no server key is supplied yet, return a mock Snap token so frontend can test
    echo json_encode([
        'status' => 'mock',
        'token' => 'SNAP-MOCK-' . bin2hex(random_bytes(8)),
        'redirect_url' => 'https://app.sandbox.midtrans.com/snap/v2/vtweb/MOCK-' . bin2hex(random_bytes(6)),
        'message' => 'Simulasi Snap Token aktif (Isi Server Key di Pengaturan untuk Live Transaksi)'
    ]);
    exit();
}

$apiUrl = $isProduction 
    ? 'https://app.midtrans.com/snap/v1/transactions' 
    : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

$payload = [
    'transaction_details' => [
        'order_id' => $input['order_id'] ?? ('AK-' . time() . '-' . rand(100, 999)),
        'gross_amount' => (int)($input['gross_amount'] ?? 100000)
    ],
    'customer_details' => [
        'first_name' => $input['customer_name'] ?? 'Hamba Allah',
        'email' => !empty($input['customer_email']) ? $input['customer_email'] : 'donatur@ahlulkhair.id',
        'phone' => !empty($input['customer_phone']) ? $input['customer_phone'] : '08123456789'
    ],
    'item_details' => [
        [
            'id' => $input['campaign_id'] ?? 'camp-general',
            'price' => (int)($input['gross_amount'] ?? 100000),
            'quantity' => 1,
            'name' => substr($input['campaign_title'] ?? 'Donasi Ahlul Khair Indonesia', 0, 45)
        ]
    ]
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json',
    'Authorization: Basic ' . base64_encode($serverKey . ':')
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
