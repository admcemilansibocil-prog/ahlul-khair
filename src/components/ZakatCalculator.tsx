import React, { useState } from 'react';
import { 
  Calculator, 
  Coins, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  Building,
  DollarSign
} from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

interface ZakatCalculatorProps {
  onPayZakat: (amount: number, zakatType: string) => void;
}

export const ZakatCalculator: React.FC<ZakatCalculatorProps> = ({ onPayZakat }) => {
  const [zakatTab, setZakatTab] = useState<'profesi' | 'maal'>('profesi');

  // Harga Emas Acuan per gram (Update BAZNAS)
  const [goldPrice, setGoldPrice] = useState<number>(1450000); // Rp 1.450.000 / gram
  const monthlyNisab = Math.round((85 * goldPrice) / 12);
  const yearlyNisab = 85 * goldPrice;

  // State Zakat Penghasilan
  const [monthlyIncome, setMonthlyIncome] = useState<number>(10000000);
  const [otherIncome, setOtherIncome] = useState<number>(2000000);
  const [monthlyExpense, setMonthlyExpense] = useState<number>(4000000);

  // State Zakat Maal
  const [savingsAmount, setSavingsAmount] = useState<number>(75000000);
  const [goldAmountVal, setGoldAmountVal] = useState<number>(30000000);
  const [investmentAmount, setInvestmentAmount] = useState<number>(25000000);
  const [debtAmount, setDebtAmount] = useState<number>(10000000);

  // Perhitungan Zakat Penghasilan (Pendekatan Bruto / Netto Syariah)
  const netIncome = Math.max(0, (monthlyIncome + otherIncome) - monthlyExpense);
  const isProfesiWajib = (monthlyIncome + otherIncome) >= monthlyNisab;
  const calculatedProfesiZakat = isProfesiWajib ? Math.round(netIncome * 0.025) : 0;

  // Perhitungan Zakat Maal (Haul 1 Tahun)
  const totalMaalAssets = Math.max(0, (savingsAmount + goldAmountVal + investmentAmount) - debtAmount);
  const isMaalWajib = totalMaalAssets >= yearlyNisab;
  const calculatedMaalZakat = isMaalWajib ? Math.round(totalMaalAssets * 0.025) : 0;

  const handlePayProfesi = () => {
    const finalAmt = calculatedProfesiZakat > 0 ? calculatedProfesiZakat : 100000;
    onPayZakat(finalAmt, 'Zakat Penghasilan / Profesi');
  };

  const handlePayMaal = () => {
    const finalAmt = calculatedMaalZakat > 0 ? calculatedMaalZakat : 500000;
    onPayZakat(finalAmt, 'Zakat Maal & Harta Simpanan');
  };

  return (
    <section id="kalkulator-zakat" className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold-100/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green-100/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-brand-green-100 text-brand-green-800 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs">
            <Coins className="w-4 h-4 text-brand-gold-600" />
            <span>Kalkulator Zakat Digital Sesuai Syariah</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-900 tracking-tight">
            Bersihkan Harta, Lipatgandakan <span className="green-gradient-text">Keberkahan</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            Hitung kewajiban Zakat Profesi dan Zakat Maal Anda secara akurat berstandar BAZNAS dengan acuan nisab 85 gram emas.
          </p>
        </div>

        {/* Calculator Main Container */}
        <div className="bg-white rounded-3xl shadow-card border border-slate-200 overflow-hidden max-w-4xl mx-auto">
          
          {/* Tab Switcher */}
          <div className="grid grid-cols-2 bg-slate-100 p-1.5 text-center font-bold text-xs sm:text-sm border-b border-slate-200">
            <button
              onClick={() => setZakatTab('profesi')}
              className={`py-3 rounded-2xl transition-all flex items-center justify-center space-x-2 ${
                zakatTab === 'profesi'
                  ? 'bg-white text-brand-green-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Zakat Penghasilan (Bulan)</span>
            </button>

            <button
              onClick={() => setZakatTab('maal')}
              className={`py-3 rounded-2xl transition-all flex items-center justify-center space-x-2 ${
                zakatTab === 'maal'
                  ? 'bg-white text-brand-green-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Zakat Maal (Tahunan)</span>
            </button>
          </div>

          {/* Calculator Body */}
          <div className="p-6 sm:p-8 lg:p-10">
            
            {/* TAB 1: ZAKAT PROFESI */}
            {zakatTab === 'profesi' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Inputs Column */}
                <div className="lg:col-span-7 space-y-4">
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Penghasilan Utama Per Bulan (Gaji/Omzet)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
                      <input
                        type="text"
                        value={monthlyIncome.toLocaleString('id-ID')}
                        onChange={(e) => setMonthlyIncome(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Penghasilan Tambahan / Bonus (Per Bulan)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
                      <input
                        type="text"
                        value={otherIncome.toLocaleString('id-ID')}
                        onChange={(e) => setOtherIncome(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                      <span>Pengeluaran Kebutuhan Pokok & Hutang Jatuh Tempo</span>
                      <span className="text-slate-400 text-[11px]">(Opsional Pengurang)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
                      <input
                        type="text"
                        value={monthlyExpense.toLocaleString('id-ID')}
                        onChange={(e) => setMonthlyExpense(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Nisab Info footnote */}
                  <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500 border border-slate-200 space-y-1">
                    <p className="flex justify-between">
                      <span>Nisab Zakat Profesi / Bulan:</span>
                      <strong className="text-slate-800">{formatRupiah(monthlyNisab).replace(',00', '')}</strong>
                    </p>
                    <p className="text-[10px] text-slate-400">
                      *Berdasarkan harga emas Rp {goldPrice.toLocaleString('id-ID')}/gr (Nisab 85 gr emas/tahun dibagi 12).
                    </p>
                  </div>

                </div>

                {/* Calculation Summary Card */}
                <div className="lg:col-span-5 bg-gradient-to-br from-brand-green-800 to-brand-green-950 text-white rounded-2xl p-6 shadow-soft space-y-5 border border-brand-green-700">
                  
                  <div>
                    <span className="text-xs text-brand-gold-300 font-semibold uppercase tracking-wider">
                      Status Kewajiban
                    </span>
                    <div className="flex items-center space-x-2 mt-1">
                      {isProfesiWajib ? (
                        <span className="inline-flex items-center text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                          Wajib Membayar Zakat
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full">
                          Belum Mencapai Nisab (Dianjurkan Infaq)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-2">
                    <p className="text-xs text-slate-300">Kewajiban Zakat Anda (2.5%)</p>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-serif gold-gradient-text">
                      {formatRupiah(calculatedProfesiZakat).replace(',00', '')}
                      <span className="text-xs text-slate-300 font-sans font-normal ml-1">/ bulan</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePayProfesi}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-brand-green-950 font-extrabold rounded-xl shadow-soft hover:shadow-card-hover transition-all flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <span>Tunaikan Zakat Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-center text-slate-300">
                    Disalurkan langsung melalui Asnaf Zakat resmi Ahlul Khair Indonesia
                  </p>

                </div>

              </div>
            )}

            {/* TAB 2: ZAKAT MAAL */}
            {zakatTab === 'maal' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Inputs Column */}
                <div className="lg:col-span-7 space-y-4">
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tabungan, Deposito & Giro (Telah Tersimpan 1 Tahun)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
                      <input
                        type="text"
                        value={savingsAmount.toLocaleString('id-ID')}
                        onChange={(e) => setSavingsAmount(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Emas, Perak, & Logam Mulia Simpanan (Rp)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
                      <input
                        type="text"
                        value={goldAmountVal.toLocaleString('id-ID')}
                        onChange={(e) => setGoldAmountVal(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Saham, Reksadana, & Aset Finansial Lainnya
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
                      <input
                        type="text"
                        value={investmentAmount.toLocaleString('id-ID')}
                        onChange={(e) => setInvestmentAmount(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hutang Pokok Jatuh Tempo (Pengurang)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
                      <input
                        type="text"
                        value={debtAmount.toLocaleString('id-ID')}
                        onChange={(e) => setDebtAmount(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Nisab Maal Footnote */}
                  <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500 border border-slate-200 space-y-1">
                    <p className="flex justify-between">
                      <span>Nisab Zakat Maal (85 gr Emas):</span>
                      <strong className="text-slate-800">{formatRupiah(yearlyNisab).replace(',00', '')}</strong>
                    </p>
                  </div>

                </div>

                {/* Summary Card */}
                <div className="lg:col-span-5 bg-gradient-to-br from-brand-green-800 to-brand-green-950 text-white rounded-2xl p-6 shadow-soft space-y-5 border border-brand-green-700">
                  
                  <div>
                    <span className="text-xs text-brand-gold-300 font-semibold uppercase tracking-wider">
                      Status Zakat Maal (Haul 1 Tahun)
                    </span>
                    <div className="flex items-center space-x-2 mt-1">
                      {isMaalWajib ? (
                        <span className="inline-flex items-center text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                          Wajib Membayar Zakat Maal
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full">
                          Harta Belum Mencapai Batas Nisab
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-2">
                    <p className="text-xs text-slate-300">Kewajiban Zakat Maal (2.5%)</p>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-serif gold-gradient-text">
                      {formatRupiah(calculatedMaalZakat).replace(',00', '')}
                      <span className="text-xs text-slate-300 font-sans font-normal ml-1">/ tahun</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePayMaal}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-brand-green-950 font-extrabold rounded-xl shadow-soft hover:shadow-card-hover transition-all flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <span>Tunaikan Zakat Maal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-center text-slate-300">
                    Ahlul Khair Indonesia menyalurkan zakat maal kepada 8 Golongan Asnaf berhak.
                  </p>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
