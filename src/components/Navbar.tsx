import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Calculator, 
  MessageSquareHeart, 
  ShieldCheck, 
  Menu, 
  X, 
  Search, 
  Users, 
  PlusCircle, 
  PhoneCall, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  onOpenDonation: () => void;
  onOpenZakat: () => void;
  onOpenVolunteer: () => void;
  onOpenPropose: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDonation,
  onOpenZakat,
  onOpenVolunteer,
  onOpenPropose,
  onSearchChange,
  searchQuery
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'glass-header shadow-md border-b border-brand-green-100/80 py-2.5' 
        : 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3.5'
    }`}>
      {/* Top Banner Info Bar */}
      <div className="hidden lg:block bg-gradient-to-r from-brand-green-800 via-brand-green-700 to-brand-green-900 text-white text-xs py-1.5 px-4 -mt-3.5 mb-2.5">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-medium">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-brand-gold-300">
              <Sparkles className="w-3.5 h-3.5 mr-1 animate-pulse" />
              Lembaga Filantropi & Kemanusiaan Islam Terpercaya
            </span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">SK Kemenkumham: AHU-0014289.AH.01.04</span>
          </div>
          <div className="flex items-center space-x-5">
            <button 
              onClick={onOpenVolunteer}
              className="hover:text-brand-gold-300 transition-colors flex items-center"
            >
              <Users className="w-3.5 h-3.5 mr-1" /> Jadi Relawan
            </button>
            <button 
              onClick={onOpenPropose}
              className="hover:text-brand-gold-300 transition-colors flex items-center"
            >
              <PlusCircle className="w-3.5 h-3.5 mr-1" /> Ajukan Bantuan
            </button>
            <a 
              href="https://wa.me/6281299887766?text=Assalamu%27alaikum%20Ahlul%20Khair%20Indonesia" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-brand-gold-300 transition-colors flex items-center"
            >
              <PhoneCall className="w-3.5 h-3.5 mr-1 text-brand-gold-400" /> Layanan Donatur: 0812-9988-7766
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/logo.jpg" 
                alt="Ahlul Khair Indonesia Logo" 
                className="h-11 w-11 sm:h-12 sm:w-12 object-contain rounded-xl shadow-sm border border-brand-green-100 group-hover:scale-105 transition-transform" 
              />
              <span className="absolute -bottom-1 -right-1 bg-brand-gold-500 text-brand-green-950 text-[9px] font-extrabold px-1 rounded-full border border-white shadow-xs">
                OFFICIAL
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-slate-900 text-lg sm:text-xl tracking-tight leading-none">
                AHLUL KHAIR
              </span>
              <span className="font-sans font-black text-brand-green-600 text-xs sm:text-sm tracking-wider leading-none mt-0.5">
                INDONESIA
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <a 
              href="#beranda" 
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-green-600 rounded-lg hover:bg-brand-green-50/80 transition-colors"
            >
              Beranda
            </a>
            <a 
              href="#program-donasi" 
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-green-600 rounded-lg hover:bg-brand-green-50/80 transition-colors"
            >
              Program Donasi
            </a>
            <button 
              onClick={onOpenZakat}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-green-600 rounded-lg hover:bg-brand-green-50/80 transition-colors flex items-center"
            >
              <Calculator className="w-4 h-4 mr-1 text-brand-gold-600" />
              Kalkulator Zakat
            </button>
            <a 
              href="#dinding-doa" 
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-green-600 rounded-lg hover:bg-brand-green-50/80 transition-colors flex items-center"
            >
              <MessageSquareHeart className="w-4 h-4 mr-1 text-brand-green-500" />
              Dinding Doa
            </a>
            <a 
              href="#transparansi" 
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-green-600 rounded-lg hover:bg-brand-green-50/80 transition-colors flex items-center"
            >
              <ShieldCheck className="w-4 h-4 mr-1 text-brand-green-600" />
              Transparansi
            </a>
          </nav>

          {/* Action Buttons & Search */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Search Toggle / Box */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-slate-100 rounded-full px-3 py-1.5 border border-brand-green-200 focus-within:ring-2 focus-within:ring-brand-green-500 focus-within:bg-white transition-all w-52 lg:w-64">
                  <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Cari program donasi..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none w-full"
                    autoFocus
                  />
                  <button 
                    onClick={() => { setShowSearchInput(false); onSearchChange(''); }}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 text-slate-600 hover:text-brand-green-600 hover:bg-brand-green-50 rounded-full transition-colors"
                  title="Cari Program"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Direct Donation CTA */}
            <button
              onClick={onOpenDonation}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white transition-all bg-gradient-to-r from-brand-green-600 via-brand-green-500 to-brand-green-700 rounded-full shadow-soft hover:shadow-card-hover hover:scale-[1.02] active:scale-[0.98] group overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              <Heart className="w-4 h-4 mr-2 fill-brand-gold-400 text-brand-gold-400 animate-bounce" />
              <span>Donasi Sekarang</span>
            </button>
          </div>

          {/* Mobile Menu & Search Buttons */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={onOpenDonation}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-brand-green-600 hover:bg-brand-green-700 rounded-full shadow-sm flex items-center"
            >
              <Heart className="w-3.5 h-3.5 mr-1 fill-brand-gold-400 text-brand-gold-400" />
              Donasi
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-brand-green-600 hover:bg-slate-100 rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar inside header if needed */}
        <div className="mt-2.5 pb-1 md:hidden">
          <div className="flex items-center bg-slate-100/90 rounded-xl px-3 py-2 border border-slate-200 focus-within:border-brand-green-500 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Cari program kebaikan, bencana, wakaf..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none w-full"
            />
            {searchQuery && (
              <button onClick={() => onSearchChange('')} className="text-slate-400">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-2">
            <a
              href="#beranda"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-brand-green-50 hover:text-brand-green-600 rounded-lg"
            >
              Beranda
            </a>
            <a
              href="#program-donasi"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-brand-green-50 hover:text-brand-green-600 rounded-lg"
            >
              Program Donasi
            </a>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenZakat(); }}
              className="px-3 py-2 text-left text-sm font-semibold text-slate-800 hover:bg-brand-green-50 hover:text-brand-green-600 rounded-lg flex items-center justify-between"
            >
              <span className="flex items-center">
                <Calculator className="w-4 h-4 mr-2 text-brand-gold-600" /> Kalkulator Zakat
              </span>
              <span className="text-[10px] bg-brand-gold-100 text-brand-gold-800 font-bold px-2 py-0.5 rounded-full">Hitung</span>
            </button>
            <a
              href="#dinding-doa"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-brand-green-50 hover:text-brand-green-600 rounded-lg flex items-center"
            >
              <MessageSquareHeart className="w-4 h-4 mr-2 text-brand-green-500" /> Dinding Doa
            </a>
            <a
              href="#transparansi"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-brand-green-50 hover:text-brand-green-600 rounded-lg flex items-center"
            >
              <ShieldCheck className="w-4 h-4 mr-2 text-brand-green-600" /> Transparansi & Laporan
            </a>

            <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenVolunteer(); }}
                className="w-full py-2 px-3 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center"
              >
                <Users className="w-4 h-4 mr-2 text-brand-green-600" /> Daftar Jadi Relawan
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenPropose(); }}
                className="w-full py-2 px-3 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center"
              >
                <PlusCircle className="w-4 h-4 mr-2 text-brand-gold-600" /> Ajukan Program / Galang Dana
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
