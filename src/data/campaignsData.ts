import { Campaign } from '../types';

export const CAMPAIGNS_DATA: Campaign[] = [
  {
    id: 'camp-1',
    title: 'Tanggap Darurat: Bantuan Logistik & Dapur Umum Korban Erupsi & Longsor',
    slug: 'tanggap-darurat-bantuan-logistik-erupsi',
    category: 'darurat',
    categoryLabel: 'Tanggap Darurat',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    targetAmount: 250000000,
    collectedAmount: 187450000,
    donorCount: 1420,
    daysLeft: 8,
    isUrgent: true,
    isVerified: true,
    location: 'Sumatera Barat & Flores, Indonesia',
    organizer: 'Tim Siaga Bencana Ahlul Khair',
    organizerRole: 'Lembaga Resmi Terverifikasi',
    organizerAvatar: '/logo.jpg',
    summary: 'Ratusan kepala keluarga terpaksa mengungsi akibat erupsi dan longsor. Dapur umum dan posko kesehatan Ahlul Khair beroperasi 24 jam.',
    story: [
      'Bencana yang melanda saudara-saudara kita mengakibatkan ratusan rumah rusak berat, memutus akses air bersih, dan memaksa warga tidur di posko darurat dengan fasilitas sangat terbatas.',
      'Tim Relawan Kemanusiaan Ahlul Khair Indonesia saat ini telah mendirikan 2 titik Posko Tanggap Darurat dan Dapur Umum yang mendistribusikan 1.500 porsi makanan siap saji hangat setiap harinya.',
      'Kebutuhan mendesak saat ini meliputi: Beras & sembako, selimut tebal & matras, obat-obatan anak & lansia, hygiene kit, dan genset darurat untuk penerangan.'
    ],
    updates: [
      {
        id: 'upd-1',
        date: '2026-08-28',
        title: 'Distribusi 500 Paket Sembako & Makanan Hangat di Posko Pengungsian 1',
        content: 'Alhamdulillah, berkat donasi para muhsinin, tim telah menyalurkan 500 paket makanan siap santap dan air mineral kepada warga terdampak di Kecamatan Batipuh.',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'upd-2',
        date: '2026-08-25',
        title: 'Pendirian Tenda Medis & Pemeriksaan Kesehatan Gratis',
        content: 'Layanan medis darurat memeriksa lebih dari 120 lansia dan anak-anak yang mengalami ISPA dan flu akibat abu vulkanik.',
      }
    ],
    budgetBreakdown: [
      { item: 'Dapur Umum & 4.500 Porsi Makanan Siap Santap', cost: 90000000 },
      { item: 'Paket Sembako & Hygiene Kit (500 KK)', cost: 85000000 },
      { item: 'Obat-obatan & Layanan Medis Darurat', cost: 45000000 },
      { item: 'Operasional Logistik & Evakuasi Lapangan', cost: 30000000 }
    ],
    recentDonors: [
      { id: 'd-1', name: 'Hamba Allah', isAnonymous: true, amount: 1000000, date: '2026-08-28T22:30:00Z', prayer: 'Semoga saudara-saudara kita di posko diberikan kekuatan, ketabahan, dan segera pulih kembali. Aamiin.' },
      { id: 'd-2', name: 'Keluarga H. Syahrul Ramadhan', isAnonymous: false, amount: 2500000, date: '2026-08-28T20:15:00Z', prayer: 'Bismillah, semoga bermanfaat dan membawa keberkahan bagi keluarga kami.' },
      { id: 'd-3', name: 'Rina Sulistiawati', isAnonymous: false, amount: 250000, date: '2026-08-28T18:40:00Z', prayer: 'Semoga berkah untuk semua yang bertugas dan terdampak.' },
      { id: 'd-4', name: 'Hamba Allah', isAnonymous: true, amount: 500000, date: '2026-08-28T16:05:00Z' }
    ]
  },
  {
    id: 'camp-2',
    title: 'Wakaf Sumur Bor & Instalasi Air Bersih untuk 5 Desa Kekeringan NTT & Gunungkidul',
    slug: 'wakaf-sumur-bor-air-bersih-desa-kekeringan',
    category: 'wakaf',
    categoryLabel: 'Wakaf Produktif',
    image: 'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=1200&q=80',
    targetAmount: 180000000,
    collectedAmount: 145200000,
    donorCount: 980,
    daysLeft: 19,
    isUrgent: false,
    isVerified: true,
    location: 'Timor Tengah Selatan & Gunungkidul',
    organizer: 'Divisi Wakaf Ahlul Khair',
    organizerRole: 'Nadzir Wakaf Terdaftar',
    organizerAvatar: '/logo.jpg',
    summary: 'Mengalirkan pahala jariyah tanpa henti dengan membangun 5 titik sumur bor, toren penampung, dan pipanisasi ke masjid dan pemukiman.',
    story: [
      '"Sedekah apa yang paling utama?" Rasulullah SAW menjawab: "Memberi air (menggali sumur/mengalirkan air)." (HR. Abu Dawud)',
      'Selama musim kemarau, warga desa harus berjalan kaki sejauh 3-5 km melewati perbukitan terjal hanya untuk mendapatkan 2 jerigen air keruh.',
      'Program ini membangun 5 titik sumur bor dengan kedalaman 60-80 meter, dilengkapi pompa submersible bertenaga surya, tandon air 5.000 liter, dan kran distribusi umum.'
    ],
    updates: [
      {
        id: 'upd-21',
        date: '2026-08-26',
        title: 'Pengeboran Titik ke-3 di Desa Oebelo Mencapai Sumber Air Jernih',
        content: 'Alhamdulillah, pengeboran di kedalaman 68 meter telah menemukan debit air melimpah 2 liter/detik yang siap uji laboratorium kebersihan.',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
      }
    ],
    budgetBreakdown: [
      { item: 'Pengeboran Kedalaman 70m (5 Titik)', cost: 95000000 },
      { item: 'Pompa Submersible & Solar Panel Inverter', cost: 45000000 },
      { item: 'Tandon Air 5.000 Liter & Menara Besi', cost: 25000000 },
      { item: 'Pipanisasi Menuju Masjid & Warga', cost: 15000000 }
    ],
    recentDonors: [
      { id: 'd-201', name: 'dr. Hendra & drg. Maya', isAnonymous: false, amount: 5000000, date: '2026-08-28T21:10:00Z', prayer: 'Wakaf atas nama Almarhum Ayahanda H. Mochammad Anwar. Semoga mengalirkan pahala di alam kubur.' },
      { id: 'd-202', name: 'Hamba Allah', isAnonymous: true, amount: 1500000, date: '2026-08-28T19:00:00Z', prayer: 'Semoga air bersih ini membawa barakah bagi ribuan warga.' }
    ]
  },
  {
    id: 'camp-3',
    title: 'Santunan Biaya Hidup & Beasiswa Tahfidz 350 Anak Yatim Dhuafa Penghafal Al-Quran',
    slug: 'santunan-dan-beasiswa-tahfidz-anak-yatim',
    category: 'yatim-dhuafa',
    categoryLabel: 'Yatim & Dhuafa',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    targetAmount: 350000000,
    collectedAmount: 298400000,
    donorCount: 2150,
    daysLeft: 14,
    isUrgent: false,
    isVerified: true,
    location: 'Pesantren & Panti Asuhan Binaan Nusantara',
    organizer: 'Departemen Kesejahteraan Ummat',
    organizerRole: 'Lembaga Resmi Terverifikasi',
    organizerAvatar: '/logo.jpg',
    summary: 'Dukung masa depan 350 santri yatim dhuafa agar dapat belajar Al-Quran, bersekolah formal, dan tercukupi kebutuhan gizinya setiap bulan.',
    story: [
      'Menjadi yatim tidak memadamkan tekad mereka untuk menjadi para penjaga Kalamullah. Namun, keterbatasan biaya operasional pesantren dan uang saku seringkali menjadi kendala berat.',
      'Melalui program Orang Tua Asuh Yatim Ahlul Khair, setiap donasi disalurkan dalam bentuk: Beasiswa SPP sekolah, uang saku bulanan, pemenuhan gizi susu & buah, serta perlengkapan ibadah dan belajar.'
    ],
    updates: [
      {
        id: 'upd-31',
        date: '2026-08-27',
        title: 'Wisuda Tahfidz 30 Juz untuk 15 Santri Yatim Binaan',
        content: 'MasyaAllah Tabarakallah! 15 santri binaan berhasil menyelesaikan setoran hafalan 30 Juz mutqin.',
        image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80'
      }
    ],
    budgetBreakdown: [
      { item: 'Biaya Pendidikan & SPP 350 Santri (6 Bulan)', cost: 180000000 },
      { item: 'Kebutuhan Pangan Bergizi & Susu', cost: 105000000 },
      { item: 'Seragam, Kitab, & Mushaf Quran', cost: 45000000 },
      { item: 'Pemeriksaan Kesehatan Berkala', cost: 20000000 }
    ],
    recentDonors: [
      { id: 'd-301', name: 'Ibu Hj. Nurjanah', isAnonymous: false, amount: 2000000, date: '2026-08-28T17:20:00Z', prayer: 'Ya Allah jadikan anak-anak yatim ini generasi soleh solehah yang mendoakan umat.' },
      { id: 'd-302', name: 'Hamba Allah', isAnonymous: true, amount: 300000, date: '2026-08-28T15:10:00Z' }
    ]
  },
  {
    id: 'camp-4',
    title: 'Operasi & Pengobatan Gratis Balita Dhuafa Penderita Jantung Bawaan & Kanker',
    slug: 'bantuan-medis-pengobatan-anak-dhuafa',
    category: 'kesehatan',
    categoryLabel: 'Bantuan Medis',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    targetAmount: 120000000,
    collectedAmount: 104500000,
    donorCount: 890,
    daysLeft: 5,
    isUrgent: true,
    isVerified: true,
    location: 'RS Rujukan Nasional & Rumah Singgah Pasien',
    organizer: 'Layanan Medis Ahlul Khair',
    organizerRole: 'Lembaga Medis Kemanusiaan',
    organizerAvatar: '/logo.jpg',
    summary: 'Bantu ringankan biaya obat non-BPJS, akomodasi rumah singgah, dan nutrisi khusus untuk puluhan anak pejuang sembuh dari keluarga prasejahtera.',
    story: [
      'Bagi keluarga kurang mampu yang berasal dari daerah terpencil, mendampingi anak menjalani kemoterapi dan operasi di rumah sakit rujukan adalah perjuangan luar biasa.',
      'Seringkali orang tua harus menjual seluruh harta benda untuk biaya hidup harian di kota rujukan. Program ini menyediakan Rumah Singgah Gratis, subsidi nutrisi khusus medis, dan transportasi ambulans gratis.'
    ],
    updates: [
      {
        id: 'upd-41',
        date: '2026-08-24',
        title: 'Adik Fathan Berhasil Menjalani Tindakan Kateterisasi Jantung',
        content: 'Kondisi adik Fathan (3 th) stabil dan sedang dalam masa observasi di ruang pemulihan.',
      }
    ],
    budgetBreakdown: [
      { item: 'Obat & Suplemen Khusus Non-Cover BPJS', cost: 50000000 },
      { item: 'Akomodasi Rumah Singgah & Konsumsi Pasien', cost: 35000000 },
      { item: 'Ambulans Rujukan Antar Kota Gratis', cost: 20000000 },
      { item: 'Alat Bantu Medis (Kursi Roda, Nebulizer)', cost: 15000000 }
    ],
    recentDonors: [
      { id: 'd-401', name: 'Bambang Kusuma', isAnonymous: false, amount: 1000000, date: '2026-08-28T22:00:00Z', prayer: 'Lekas sembuh pejuang cilik, doa terbaik dari kami sekeluarga.' }
    ]
  },
  {
    id: 'camp-5',
    title: 'Tebar Beras & Paket Pangan Pokok untuk Lansia Dhuafa & Buruh Harian',
    slug: 'tebar-beras-pangan-pokok-lansia-dhuafa',
    category: 'pangan',
    categoryLabel: 'Pangan & Sembako',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
    targetAmount: 150000000,
    collectedAmount: 88500000,
    donorCount: 640,
    daysLeft: 22,
    isUrgent: false,
    isVerified: true,
    location: 'Jabodetabek & Jawa Timur',
    organizer: 'Lumbung Pangan Ahlul Khair',
    organizerRole: 'Lembaga Resmi Terverifikasi',
    organizerAvatar: '/logo.jpg',
    summary: 'Distribusi beras premium 10kg, minyak goreng, telur, dan lauk siap santap untuk 1.000 keluarga prasejahtera yang berjuang mencukupi pangan.',
    story: [
      'Kenaikan harga pangan sangat memukul para lansia sebatang kara dan pekerja serabutan. Tak jarang mereka hanya makan nasi bertabur garam.',
      'Program Tebar Beras Berkah menyalurkan beras langsung dari petani lokal ke rumah-rumah warga secara door-to-door dengan menjaga kehormatan penerima manfaat.'
    ],
    updates: [
      {
        id: 'upd-51',
        date: '2026-08-20',
        title: 'Tersalurkan 300 Paket Sembako di Kawasan Pesisir Marunda',
        content: 'Bantuan disambut haru oleh para janda lansia dan keluarga nelayan tradisional.',
      }
    ],
    budgetBreakdown: [
      { item: 'Beras Premium 10.000 Kg (10 Ton)', cost: 100000000 },
      { item: 'Minyak Goreng, Gula, Garam & Telur', cost: 35000000 },
      { item: 'Kemasan & Distribusi Door to Door', cost: 15000000 }
    ],
    recentDonors: [
      { id: 'd-501', name: 'Hamba Allah', isAnonymous: true, amount: 200000, date: '2026-08-28T14:40:00Z', prayer: 'Semoga tidak ada lagi saudara kita yang tidur dalam kondisi lapar.' }
    ]
  },
  {
    id: 'camp-6',
    title: 'Pembangunan Kembali Masjid Darussalam yang Rusak Akibat Gempa',
    slug: 'renovasi-dan-pembangunan-masjid-gempa',
    category: 'wakaf',
    categoryLabel: 'Wakaf Produktif',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80',
    targetAmount: 400000000,
    collectedAmount: 265000000,
    donorCount: 1670,
    daysLeft: 30,
    isUrgent: false,
    isVerified: true,
    location: 'Cianjur, Jawa Barat',
    organizer: 'Divisi Wakaf Ahlul Khair',
    organizerRole: 'Nadzir Wakaf Terdaftar',
    organizerAvatar: '/logo.jpg',
    summary: 'Bangun kembali rumah Allah yang kokoh dan ramah gempa agar 400 jamaah dan santri dapat sholat berjamaah serta mengaji dengan nyaman.',
    story: [
      'Masjid Darussalam adalah pusat kegiatan ibadah, mengaji TPA anak-anak, dan musyawarah warga. Gempa bumi meruntuhkan atap dan dinding masjid sehingga warga harus sholat di bawah tenda darurat.',
      'Ahlul Khair merancang struktur bangunan tahan gempa dengan material berkualitas, tempat wudhu higienis, serta sarana toilet ramah lansia.'
    ],
    updates: [
      {
        id: 'upd-61',
        date: '2026-08-23',
        title: 'Pemasangan Rangka Baja Ringan & Struktur Kubah Utama',
        content: 'Progres konstruksi mencapai 60%, pengecoran tiang utama telah selesai dengan baik.',
      }
    ],
    budgetBreakdown: [
      { item: 'Semen, Pasir, Besi Beton Tahan Gempa', cost: 180000000 },
      { item: 'Rangka Baja, Genteng & Plafon', cost: 110000000 },
      { item: 'Instalasi Listrik, Sound System & Karpet', cost: 60000000 },
      { item: 'Upah Tukang & Tenaga Ahli Sipil', cost: 50000000 }
    ],
    recentDonors: [
      { id: 'd-601', name: 'Komunitas Pengusaha Hijrah', isAnonymous: false, amount: 10000000, date: '2026-08-28T13:00:00Z', prayer: 'Bismillah wakaf bersama untuk bekal di yaumul akhir.' }
    ]
  }
];
