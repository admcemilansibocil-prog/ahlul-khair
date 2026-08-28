import { CategoryInfo } from '../types';

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'all',
    name: 'Semua Kebaikan',
    iconName: 'LayoutGrid',
    description: 'Seluruh program penggalangan dana aktif',
    count: 12
  },
  {
    id: 'darurat',
    name: 'Tanggap Darurat',
    iconName: 'AlertTriangle',
    description: 'Bencana alam & bantuan logistik darurat',
    count: 3
  },
  {
    id: 'wakaf',
    name: 'Wakaf Produktif',
    iconName: 'Landmark',
    description: 'Masjid, sumur air bersih & Quran',
    count: 2
  },
  {
    id: 'yatim-dhuafa',
    name: 'Yatim & Dhuafa',
    iconName: 'HeartHandshake',
    description: 'Santunan biaya hidup & kebahagiaan yatim',
    count: 3
  },
  {
    id: 'pendidikan',
    name: 'Pendidikan Santri',
    iconName: 'GraduationCap',
    description: 'Beasiswa tahfidz & sarana belajar',
    count: 2
  },
  {
    id: 'kesehatan',
    name: 'Bantuan Medis',
    iconName: 'Activity',
    description: 'Pengobatan gratis & alat kesehatan dhuafa',
    count: 1
  },
  {
    id: 'pangan',
    name: 'Pangan & Sembako',
    iconName: 'Utensils',
    description: 'Tebar beras berkah & paket makanan',
    count: 1
  }
];
