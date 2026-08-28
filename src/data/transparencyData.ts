export interface SectorDistribution {
  sector: string;
  amount: number;
  percentage: number;
  color: string;
  description: string;
}

export interface TransparencyMetric {
  title: string;
  value: string;
  subtext: string;
  icon: string;
}

export const TRANSPARENCY_METRICS: TransparencyMetric[] = [
  {
    title: 'Total Dana Terhimpun',
    value: 'Rp 14.85 Milyar',
    subtext: 'Akumulasi periode 2024 - 2026',
    icon: 'TrendingUp'
  },
  {
    title: 'Tingkat Penyaluran',
    value: '94.2%',
    subtext: 'Tersalurkan langsung ke program',
    icon: 'CheckCircle2'
  },
  {
    title: 'Penerima Manfaat',
    value: '185.400+ Jiwa',
    subtext: 'Tersebar di 24 Provinsi Indonesia',
    icon: 'Users'
  },
  {
    title: 'Opini Audit Keuangan',
    value: 'WTP (Wajar Tanpa Pengecualian)',
    subtext: 'Diaudit oleh KAP Independen Terdaftar',
    icon: 'ShieldCheck'
  }
];

export const SECTOR_DISTRIBUTION: SectorDistribution[] = [
  {
    sector: 'Kemanusiaan & Tanggap Bencana',
    amount: 5200000000,
    percentage: 35,
    color: '#056839',
    description: 'Dapur umum, evakuasi, shelter sementara, dan logistik darurat bencana.'
  },
  {
    sector: 'Pendidikan & Beasiswa Santri',
    amount: 3700000000,
    percentage: 25,
    color: '#008744',
    description: 'Biaya hidup, SPP, sarana asrama, dan pembinaan tahfidz Quran.'
  },
  {
    sector: 'Wakaf Produktif & Sarana Ibadah',
    amount: 2980000000,
    percentage: 20,
    color: '#E5A812',
    description: 'Pengeboran sumur air bersih, renovasi masjid pelosok, dan mushaf Quran.'
  },
  {
    sector: 'Pemberdayaan Ekonomi & Pangan',
    amount: 1780000000,
    percentage: 12,
    color: '#F5B726',
    description: 'Modal usaha mikro dhuafa, tebar beras berkah, dan paket sembako lansia.'
  },
  {
    sector: 'Layanan Medis & Kesehatan',
    amount: 1190000000,
    percentage: 8,
    color: '#10B981',
    description: 'Rumah singgah pasien, operasi balita prasejahtera, dan ambulans gratis.'
  }
];

export const LEGAL_BADGES = [
  {
    title: 'Kemenkumham RI',
    number: 'AHU-0014289.AH.01.04.Tahun 2021',
    desc: 'Pengesahan Akta Pendirian Yayasan'
  },
  {
    title: 'Rekomendasi BAZNAS',
    number: 'No. 320/BAZNAS/LAZ/VIII/2023',
    desc: 'Mitra Pengelola Zakat & Infaq Resmi'
  },
  {
    title: 'Izin PUB Kemensos RI',
    number: 'SK Kemensos No. 412/HUK-PS/2024',
    desc: 'Izin Penyelenggaraan Pengumpulan Uang & Barang'
  }
];
