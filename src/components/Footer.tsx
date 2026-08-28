import React from 'react';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowUp,
  Sparkles,
  CheckCircle2,
  Globe,
  Share2
} from 'lucide-react';

interface FooterProps {
  onOpenZakat: () => void;
  onOpenVolunteer: () => void;
  onOpenPropose: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenZakat,
  onOpenVolunteer,
  onOpenPropose
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 relative overflow-hidden border-t border-slate-800">
      
      {/* Decorative Top Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-brand-green-700 via-brand-gold-500 to-brand-green-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pb-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.jpg" 
                alt="Ahlul Khair Indonesia Logo" 
                className="h-12 w-12 object-contain rounded-xl border border-brand-green-500/40 shadow-sm"
              />
              <div>
                <span className="font-serif font-bold text-white text-lg tracking-tight block leading-none">
                  AHLUL KHAIR
                </span>
                <span className="font-sans font-black text-brand-green-400 text-xs tracking-wider block leading-none mt-1">
                  INDONESIA
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              Lembaga filantropi Islam dan kemanusiaan independen terdaftar yang berdedikasi menjembatani kebaikan donatur untuk kaum dhuafa, yatim, korban bencana, dan sarana ibadah di seluruh pelosok Indonesia.
            </p>

            <div className="bg-white/5 p-3 rounded-2xl border border-white/5 space-y-1 text-xs">
              <p className="font-bold text-brand-gold-300 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1 text-emerald-400" />
                Legalitas Yayasan Resmi
              </p>
              <p className="text-slate-400 text-[11px]">SK Kemenkumham: AHU-0014289.AH.01.04.Tahun 2021</p>
              <p className="text-slate-400 text-[11px]">Rekomendasi BAZNAS No. 320/LAZ/VIII/2023</p>
            </div>
          </div>

          {/* Col 2: Program & Layanan (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              Program Kebaikan
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#program-donasi" className="hover:text-brand-gold-300 transition-colors">
                  Tanggap Darurat Bencana Alam
                </a>
              </li>
              <li>
                <a href="#program-donasi" className="hover:text-brand-gold-300 transition-colors">
                  Wakaf Sumur Air & Masjid
                </a>
              </li>
              <li>
                <a href="#program-donasi" className="hover:text-brand-gold-300 transition-colors">
                  Beasiswa Santri Yatim Tahfidz
                </a>
              </li>
              <li>
                <a href="#program-donasi" className="hover:text-brand-gold-300 transition-colors">
                  Tebar Beras & Sembako Dhuafa
                </a>
              </li>
              <li>
                <button onClick={onOpenZakat} className="hover:text-brand-gold-300 transition-colors text-left">
                  Kalkulator Zakat Profesi & Maal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Partisipasi & Bantuan (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              Partisipasi
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={onOpenVolunteer} className="hover:text-brand-gold-300 transition-colors text-left">
                  Daftar Relawan
                </button>
              </li>
              <li>
                <button onClick={onOpenPropose} className="hover:text-brand-gold-300 transition-colors text-left">
                  Ajukan Bantuan
                </button>
              </li>
              <li>
                <a href="#dinding-doa" className="hover:text-brand-gold-300 transition-colors">
                  Dinding Doa
                </a>
              </li>
              <li>
                <a href="#transparansi" className="hover:text-brand-gold-300 transition-colors">
                  Laporan Audit Publik
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontak & Kantor Pusat (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              Kantor Pusat & Layanan
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 text-brand-gold-400 shrink-0 mt-0.5" />
                <span>Gedung Dakwah & Kemanusiaan Ahlul Khair, Jl. Rasuna Said Kav. 12, Jakarta Selatan, Indonesia</span>
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-brand-gold-400 shrink-0" />
                <span>Hotline: 0812-9988-7766 / (021) 7890-1234</span>
              </p>
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-brand-gold-400 shrink-0" />
                <span>info@ahlulkhair.id</span>
              </p>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center space-x-2.5">
              <a href="#" className="p-2.5 bg-white/5 hover:bg-brand-green-600 hover:text-white rounded-xl transition-all" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="p-2.5 bg-white/5 hover:bg-brand-green-600 hover:text-white rounded-xl transition-all" title="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="p-2.5 bg-white/5 hover:bg-brand-green-600 hover:text-white rounded-xl transition-all" title="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="p-2.5 bg-white/5 hover:bg-brand-green-600 hover:text-white rounded-xl transition-all" title="Website Resmi">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Yayasan Ahlul Khair Indonesia. Seluruh hak cipta dilindungi undang-undang.
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-slate-400">Amanah • Transparan • Bermanfaat</span>
            <button
              onClick={scrollToTop}
              className="p-2 bg-white/10 hover:bg-brand-green-600 text-white rounded-xl transition-all flex items-center space-x-1"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
