import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  HandHeart, 
  Coins, 
  Building2,
  Gift
} from 'lucide-react';
import { formatRupiah } from '../utils/formatters';
import { Campaign } from '../types';

interface HeroSectionProps {
  campaigns: Campaign[];
  onOpenDonationWithConfig: (campaignId?: string, presetAmount?: number) => void;
  onOpenZakat: () => void;
}

const PRESET_AMOUNTS = [25000, 50000, 100000, 250000, 500000, 1000000];

export const HeroSection: React.FC<HeroSectionProps> = ({
  campaigns,
  onOpenDonationWithConfig,
  onOpenZakat
}) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(campaigns[0]?.id || '');
  const [selectedAmount, setSelectedAmount] = useState<number>(100000);
  const [customAmountInput, setCustomAmountInput] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmountInput('');
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '');
    setCustomAmountInput(rawVal);
    const num = parseInt(rawVal, 10) || 0;
    setSelectedAmount(num);
    setIsCustom(true);
  };

  const handleQuickDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = selectedAmount >= 10000 ? selectedAmount : 50000;
    onOpenDonationWithConfig(selectedCampaignId, finalAmount);
  };

  return (
    <section id="beranda" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-brand-green-900 via-brand-green-800 to-brand-green-950 text-white">
      
      {/* Decorative Islamic Geometric Pattern & Glow Background */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-30 pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold-500/20 rounded-full blur-3xl pointer-events-none animate-pulseGlow"></div>
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-brand-green-400/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & Tagline */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-brand-gold-400/40 text-brand-gold-300 text-xs sm:text-sm font-semibold shadow-inner-light">
              <Sparkles className="w-4 h-4 text-brand-gold-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>AHLUL KHAIR INDONESIA • Menebar Kebaikan Berkelanjutan</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight sm:leading-tight">
              Satukan Niat Ikhlas, <br className="hidden sm:inline" />
              Alirkan <span className="gold-gradient-text">Kebaikan Abadi</span> untuk Ummat
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-200/90 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Platform resmi penyaluran <strong>Donasi Kemanusiaan, Sedekah Yatim, Wakaf Produktif,</strong> dan <strong>Zakat Terpercaya</strong>. Bersama menjangkau saudara kita di pelosok nusantara dengan amanah, transparan, dan terverifikasi.
            </p>

            {/* Trust Highlights */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-200">
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-4 h-4 text-brand-gold-400 shrink-0" />
                <span>100% Legal & Terverifikasi</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-brand-gold-400 shrink-0" />
                <span>Audit Keuangan WTP</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <Sparkles className="w-4 h-4 text-brand-gold-400 shrink-0" />
                <span>Penyaluran Cepat Tepat Sasaran</span>
              </div>
            </div>

            {/* Secondary CTA buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="#program-donasi"
                className="inline-flex items-center px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold backdrop-blur-sm border border-white/20 transition-all hover:scale-105"
              >
                <span>Jelajahi Program</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <button
                onClick={onOpenZakat}
                className="inline-flex items-center px-5 py-3 rounded-xl bg-brand-gold-500/20 hover:bg-brand-gold-500/30 text-brand-gold-300 text-sm font-bold border border-brand-gold-400/40 transition-all hover:scale-105"
              >
                <Coins className="w-4 h-4 mr-2 text-brand-gold-400" />
                <span>Hitung Zakat Anda</span>
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Quick Donation Card */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl p-6 sm:p-7 shadow-card-hover border-2 border-brand-gold-400/30 text-slate-800 relative backdrop-blur-xl bg-white/95">
              
              {/* Badge on top */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-brand-green-100 text-brand-green-700 rounded-xl">
                    <HandHeart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-tight">Donasi Cepat Kebaikan</h3>
                    <p className="text-xs text-slate-500">Mulai dari Rp 10.000, bawa manfaat besar</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold uppercase bg-brand-gold-100 text-brand-gold-800 px-2.5 py-1 rounded-full">
                  Instan
                </span>
              </div>

              <form onSubmit={handleQuickDonationSubmit} className="mt-5 space-y-4">
                
                {/* Select Program / Campaign */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Pilih Program Kebaikan
                  </label>
                  <select
                    value={selectedCampaignId}
                    onChange={(e) => setSelectedCampaignId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500 focus:bg-white transition-all outline-none"
                  >
                    {campaigns.map((camp) => (
                      <option key={camp.id} value={camp.id}>
                        {camp.categoryLabel}: {camp.title.slice(0, 50)}...
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preset Amount Chips */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Pilih Nominal Donasi
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESET_AMOUNTS.map((amount) => {
                      const isActive = !isCustom && selectedAmount === amount;
                      return (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handlePresetClick(amount)}
                          className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center ${
                            isActive
                              ? 'bg-brand-green-600 text-white border-brand-green-600 shadow-sm scale-[1.02]'
                              : 'bg-slate-50 hover:bg-brand-green-50 text-slate-700 border-slate-200 hover:border-brand-green-300'
                          }`}
                        >
                          {formatRupiah(amount).replace(',00', '')}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Amount Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Atau Masukkan Nominal Lainnya (Rp)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                      Rp
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Contoh: 150.000"
                      value={customAmountInput ? parseInt(customAmountInput, 10).toLocaleString('id-ID') : ''}
                      onChange={handleCustomInputChange}
                      className={`w-full bg-slate-50 border rounded-xl pl-10 pr-4 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green-500 focus:bg-white outline-none transition-all ${
                        isCustom ? 'border-brand-green-600 bg-white ring-1 ring-brand-green-600' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {isCustom && selectedAmount < 10000 && (
                    <p className="text-[11px] text-red-500 mt-1 font-medium">
                      Minimal donasi adalah Rp 10.000
                    </p>
                  )}
                </div>

                {/* Submit Quick Donation CTA */}
                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-brand-green-600 via-brand-green-500 to-brand-green-700 hover:from-brand-green-700 hover:to-brand-green-800 text-white font-bold rounded-xl shadow-soft hover:shadow-card-hover transition-all flex items-center justify-center space-x-2 text-sm sm:text-base group"
                >
                  <Heart className="w-4 h-4 fill-brand-gold-400 text-brand-gold-400 group-hover:scale-125 transition-transform" />
                  <span>Lanjutkan Donasi ({formatRupiah(selectedAmount).replace(',00', '')})</span>
                </button>

                {/* Security and Transparency footnote */}
                <div className="flex items-center justify-center space-x-3 text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-green-600 mr-1" /> Aman & Otomatis
                  </span>
                  <span>•</span>
                  <span>Dukungan QRIS & 5 Bank Besar</span>
                </div>

              </form>

            </div>
          </div>

        </div>

        {/* Live Impact Stats Counters Strip */}
        <div className="mt-14 pt-8 border-t border-white/15">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 text-center hover:bg-white/15 transition-all">
              <div className="inline-flex p-2.5 bg-brand-gold-500/20 text-brand-gold-300 rounded-xl mb-2">
                <Coins className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-serif">
                Rp 14.85 M+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                Total Dana Tersalurkan
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 text-center hover:bg-white/15 transition-all">
              <div className="inline-flex p-2.5 bg-brand-green-400/20 text-brand-green-300 rounded-xl mb-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-serif">
                185.400+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                Penerima Manfaat
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 text-center hover:bg-white/15 transition-all">
              <div className="inline-flex p-2.5 bg-brand-gold-500/20 text-brand-gold-300 rounded-xl mb-2">
                <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-serif">
                480+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                Program Aksi Kebaikan
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 text-center hover:bg-white/15 transition-all">
              <div className="inline-flex p-2.5 bg-brand-green-400/20 text-brand-green-300 rounded-xl mb-2">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-serif">
                24 Provinsi
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                Wilayah Jangkauan Relawan
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
