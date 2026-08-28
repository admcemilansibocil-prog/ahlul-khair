import { PaymentMethodOption } from '../types';

export const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 'qris',
    name: 'QRIS (Semua E-Wallet & Mobile Banking)',
    category: 'qris',
    icon: 'QrCode',
    fee: 0,
    instructions: [
      'Buka aplikasi e-wallet (GoPay, OVO, DANA, ShopeePay, LinkAja) atau Mobile Banking apa saja yang mendukung QRIS.',
      'Pindai (scan) kode QR yang tertera pada layar.',
      'Periksa nominal yang muncul, pastikan nama penerima adalah YAYASAN AHLUL KHAIR INDONESIA.',
      'Selesaikan pembayaran dengan memasukkan PIN aplikasi Anda.'
    ]
  },
  {
    id: 'va_bsi',
    name: 'Bank Syariah Indonesia (BSI)',
    category: 'va',
    icon: 'Building2',
    accountNumber: '7890 0123 4567 8901',
    accountName: 'YYS AHLUL KHAIR INDONESIA',
    fee: 0,
    instructions: [
      'Buka aplikasi BSI Mobile atau ATM BSI.',
      'Pilih menu Bayar / Beli > Virtual Account / Pembayaran Institusi.',
      'Masukkan nomor Virtual Account BSI di atas.',
      'Periksa detail pembayaran dan konfirmasi dengan PIN.'
    ]
  },
  {
    id: 'va_bca',
    name: 'BCA Virtual Account',
    category: 'va',
    icon: 'CreditCard',
    accountNumber: '8277 0812 3456 7890',
    accountName: 'AHLUL KHAIR - DONASI',
    fee: 0,
    instructions: [
      'Buka aplikasi BCA Mobile / myBCA / KlikBCA / ATM BCA.',
      'Pilih menu Transfer > BCA Virtual Account.',
      'Masukkan nomor Virtual Account di atas.',
      'Pastikan jumlah nominal sesuai total pembayaran lalu masukkan PIN.'
    ]
  },
  {
    id: 'va_mandiri',
    name: 'Mandiri Virtual Account (Livin)',
    category: 'va',
    icon: 'CreditCard',
    accountNumber: '8912 3001 9876 5432',
    accountName: 'YYS AHLUL KHAIR INDONESIA',
    fee: 0,
    instructions: [
      'Buka aplikasi Livin by Mandiri.',
      'Pilih menu Bayar > Multi Payment / Penyedia Jasa Ahlul Khair.',
      'Masukkan nomor Virtual Account Mandiri.',
      'Konfirmasi rincian pembayaran dan masukkan PIN.'
    ]
  },
  {
    id: 'va_bri',
    name: 'BRI Virtual Account (BRIVA)',
    category: 'va',
    icon: 'CreditCard',
    accountNumber: '1289 0081 2345 6789',
    accountName: 'AHLUL KHAIR INDONESIA',
    fee: 0,
    instructions: [
      'Buka aplikasi BRImo atau ATM BRI.',
      'Pilih menu Pembayaran > BRIVA.',
      'Masukkan nomor BRIVA yang tertera.',
      'Periksa data dan selesaikan transaksi dengan PIN BRImo.'
    ]
  },
  {
    id: 'gopay',
    name: 'GoPay',
    category: 'ewallet',
    icon: 'Smartphone',
    accountNumber: '0812-9988-7766',
    accountName: 'Ahlul Khair Official',
    fee: 0,
    instructions: [
      'Buka aplikasi GoPay atau Gojek.',
      'Pilih menu Transfer atau Scan QRIS.',
      'Verifikasi detail pembayaran dan konfirmasi.'
    ]
  },
  {
    id: 'dana',
    name: 'DANA',
    category: 'ewallet',
    icon: 'Smartphone',
    accountNumber: '0812-9988-7766',
    accountName: 'Ahlul Khair Official',
    fee: 0,
    instructions: [
      'Buka aplikasi DANA Anda.',
      'Pilih menu Kirim atau Scan QRIS Ahlul Khair.',
      'Pastikan saldo mencukupi dan selesaikan dengan PIN.'
    ]
  },
  {
    id: 'ovo',
    name: 'OVO Cash',
    category: 'ewallet',
    icon: 'Smartphone',
    accountNumber: '0812-9988-7766',
    accountName: 'Ahlul Khair Official',
    fee: 0,
    instructions: [
      'Buka aplikasi OVO.',
      'Pilih menu Transfer / QRIS.',
      'Konfirmasi pembayaran donasi Ahlul Khair.'
    ]
  }
];
