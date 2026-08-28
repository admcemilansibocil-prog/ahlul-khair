import React, { useState } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Users, 
  FileDown, 
  Building2, 
  Award, 
  PieChart,
  Check
} from 'lucide-react';
import { TRANSPARENCY_METRICS, SECTOR_DISTRIBUTION, LEGAL_BADGES } from '../data/transparencyData';
import { formatRupiah } from '../utils/formatters';

export const TransparencySection: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadReport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }, 1200);
  };

  const getMetricIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-brand-gold-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-brand-green-400" />;
      case 'Users': return <Users className="w-5 h-5 text-brand-gold-400" />;
      default: return <ShieldCheck className="w-5 h-5 text-brand-green-400" />;
    }
  };

  return (
    <section id="transparansi" className="py-16 sm:py-20 bg-gradient-to-b from-slate-900 via-brand-green-950 to-slate-950 text-white relative overflow-hidden">
      
      {/* Subtle Grid Accent */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md text-brand-gold-300 border border-brand-gold-400/30 px-4 py-1.5 rounded-full text-xs font-bold shadow-inner-light">
            <ShieldCheck className="w-4 h-4 text-brand-gold-400" />
            <span>Akuntabilitas & Tata Kelola Filantropi</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white tracking-tight">
            Transparansi Nyata, <span className="gold-gradient-text">Amanah Terjaga</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Setiap rupiah amanah dari donatur dicatat secara profesional, diaudit oleh Kantor Akuntan Publik independen dengan opini Wajar Tanpa Pengecualian (WTP), dan dipertanggungjawabkan secara berkala.
          </p>
        </div>

        {/* 4 Stat Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {TRANSPARENCY_METRICS.map((metric, idx) => (
            <div 
              key={idx}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-brand-gold-400/40 transition-all hover:bg-white/10 group"
            >
              <div className="p-2.5 bg-white/10 rounded-xl inline-block mb-3 group-hover:scale-110 transition-transform">
                {getMetricIcon(metric.icon)}
              </div>
              <p className="text-xs text-slate-400 font-medium">{metric.title}</p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-serif mt-1">
                {metric.value}
              </h3>
              <p className="text-[11px] text-brand-gold-300/80 mt-1 font-medium">{metric.subtext}</p>
            </div>
          ))}
        </div>

        {/* Sector Distribution & Legal Credentials Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Sector Distribution Bars */}
          <div className="lg:col-span-7 bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-brand-green-500/20 text-brand-green-400 rounded-xl">
                  <PieChart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg">Distribusi Alokasi Dana Program</h3>
                  <p className="text-xs text-slate-400">Penyaluran komprehensif tahun berjalan</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {SECTOR_DISTRIBUTION.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-baseline text-xs sm:text-sm">
                    <span className="font-bold text-slate-200">{item.sector}</span>
                    <span className="font-mono font-bold text-brand-gold-300">
                      {item.percentage}% ({formatRupiah(item.amount).replace(',00', '')})
                    </span>
                  </div>
                  
                  <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-700"
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: item.color 
                      }}
                    ></div>
                  </div>

                  <p className="text-[11px] text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Download Report Button */}
            <div className="pt-2">
              <button
                onClick={handleDownloadReport}
                disabled={downloading}
                className="w-full py-3.5 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center justify-center space-x-2 transition-all"
              >
                {downloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Menyiapkan Laporan Audit...</span>
                  </>
                ) : downloaded ? (
                  <>
                    <Check className="w-4 h-4 text-brand-gold-400" />
                    <span>Laporan Tahunan 2025/2026 Berhasil Diunduh (PDF)</span>
                  </>
                ) : (
                  <>
                    <FileDown className="w-4 h-4 text-brand-gold-400" />
                    <span>Unduh Laporan Keuangan & Audit Publik (PDF)</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right: Legal & Certification Badges */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center space-x-2 pb-3 border-b border-white/10">
                <Award className="w-5 h-5 text-brand-gold-400" />
                <h3 className="font-bold text-white text-base">Legalitas & Izin Operasional</h3>
              </div>

              <div className="space-y-3">
                {LEGAL_BADGES.map((badge, i) => (
                  <div key={i} className="bg-white/5 p-3.5 rounded-xl border border-white/5 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-brand-gold-300 text-xs sm:text-sm">{badge.title}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-xs font-mono text-slate-200">{badge.number}</p>
                    <p className="text-[11px] text-slate-400">{badge.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Bank Account Card for Manual Transfer */}
            <div className="bg-gradient-to-br from-brand-green-800 to-brand-green-900 rounded-3xl p-6 border border-brand-green-600 shadow-soft space-y-3">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-brand-gold-400" />
                <h4 className="font-bold text-white text-sm">Rekening Resmi Donasi</h4>
              </div>
              <p className="text-xs text-slate-200">
                Yayasan Ahlul Khair Indonesia menerima transfer langsung ke rekening giro syariah:
              </p>
              <div className="bg-brand-green-950/60 p-3 rounded-xl border border-white/10 text-xs space-y-1 font-mono">
                <p className="text-brand-gold-300 font-bold">Bank Syariah Indonesia (BSI): 7890-0123-4567</p>
                <p className="text-slate-300">a.n. YAYASAN AHLUL KHAIR INDONESIA</p>
              </div>
              <p className="text-[10px] text-slate-300">
                Konfirmasi WhatsApp: 0812-9988-7766
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
