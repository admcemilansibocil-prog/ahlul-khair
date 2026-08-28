import React, { useState, useEffect } from 'react';
import { 
  X, Heart, Check, Copy, ArrowLeft, ArrowRight, 
  QrCode, Building2, Smartphone, Clock, ShieldCheck, 
  Sparkles, Download, Share2, CheckCircle2, Lock 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Campaign, PaymentMethodType, CompletedTransaction } from '../types';
import { PAYMENT_METHODS } from '../data/paymentMethods';
import { formatRupiah, generateInvoiceNumber } from '../utils/formatters';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaigns: Campaign[];
  initialCampaignId?: string;
  initialAmount?: number;
  onDonationSuccess?: (transaction: CompletedTransaction) => void;
}

const PRESET_AMOUNTS = [25000, 50000, 100000, 250000, 500000, 1000000];

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  campaigns,
  initialCampaignId,
  initialAmount,
  onDonationSuccess
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('');
  const [amount, setAmount] = useState<number>(100000);
  const [customAmountStr, setCustomAmountStr] = useState<string>('');
  const [isCustomAmount, setIsCustomAmount] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [prayer, setPrayer] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('qris');
  const [uniqueCode, setUniqueCode] = useState<number>(0);
  const [transactionData, setTransactionData] = useState<CompletedTransaction | null>(null);
  const [isCheckingPayment, setIsCheckingPayment] = useState<boolean>(false);
  const [copiedVa, setCopiedVa] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(24 * 3600);

  useEffect(() => {
    if (isOpen) {
      const campId = initialCampaignId || campaigns[0]?.id || '';
      setSelectedCampaignId(campId);
      const initAmt = initialAmount && initialAmount >= 10000 ? initialAmount : 100000;
      setAmount(initAmt);
      if (!PRESET_AMOUNTS.includes(initAmt)) {
        setIsCustomAmount(true);
        setCustomAmountStr(initAmt.toString());
      } else {
        setIsCustomAmount(false);
        setCustomAmountStr('');
      }
      setStep(1);
      setUniqueCode(Math.floor(100 + Math.random() * 899));
      setIsCheckingPayment(false);
      setTimeLeft(24 * 3600);
    }
  }, [isOpen, initialCampaignId, initialAmount, campaigns]);

  useEffect(() => {
    if (step === 4 && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  if (!isOpen) return null;
  const currentCampaign = campaigns.find(c => c.id === selectedCampaignId) || campaigns[0];
  const currentPaymentMethod = PAYMENT_METHODS.find(m => m.id === selectedMethod) || PAYMENT_METHODS[0];

  const formatTimer = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleGoToStep3 = () => {
    if (!isAnonymous && !donorName.trim()) {
      alert('Silakan masukkan nama Anda atau pilih Donasi sebagai Hamba Allah (Anonim).');
      return;
    }
    setStep(3);
  };

  const handleProceedToPayment = () => {
    const totalPayment = amount + (currentPaymentMethod.category === 'va' || currentPaymentMethod.category === 'qris' ? uniqueCode : 0);
    const newTx: CompletedTransaction = {
      transactionId: 'TX-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      invoiceNumber: generateInvoiceNumber(),
      campaignId: currentCampaign?.id || '',
      campaignTitle: currentCampaign?.title || 'Donasi Umum Ahlul Khair Indonesia',
      amount: amount,
      uniqueCode: uniqueCode,
      totalPayment: totalPayment,
      donorName: isAnonymous ? 'Hamba Allah' : (donorName.trim() || 'Hamba Allah'),
      isAnonymous: isAnonymous,
      donorEmail: donorEmail.trim(),
      donorPhone: donorPhone.trim(),
      prayer: prayer.trim(),
      paymentMethod: selectedMethod,
      paymentMethodName: currentPaymentMethod.name,
      vaNumber: currentPaymentMethod.accountNumber,
      createdAt: new Date().toISOString(),
      expiredAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      status: 'pending'
    };
    setTransactionData(newTx);
    setStep(4);
  };

  const handleConfirmPaymentSimulate = () => {
    setIsCheckingPayment(true);
    setTimeout(() => {
      setIsCheckingPayment(false);
      if (transactionData) {
        const verifiedTx = { ...transactionData, status: 'verified' as const };
        setTransactionData(verifiedTx);
        if (onDonationSuccess) onDonationSuccess(verifiedTx);
      }
      setStep(5);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#008744', '#e5a812', '#056839', '#facc15', '#ffffff']
        });
      } catch (e) {}
    }, 1500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedVa(true);
    setTimeout(() => setCopiedVa(false), 2000);
  };

  const handleShareWa = () => {
    if (!transactionData) return;
    const text = `Alhamdulillah, saya telah berdonasi sebesar ${formatRupiah(transactionData.totalPayment)} untuk program "${transactionData.campaignTitle}" melalui Yayasan Ahlul Khair Indonesia. Mari kita salurkan sedekah dan kebaikan bersama di: ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[95vh] relative animate-scaleUp" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-green-800 via-brand-green-700 to-brand-green-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-brand-green-900">
          <div className="flex items-center space-x-3">
            {step > 1 && step < 5 && (
              <button onClick={() => setStep((prev) => (prev - 1) as any)} className="p-1.5 hover:bg-white/10 rounded-lg text-white/90">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h3 className="font-bold font-serif text-base sm:text-lg flex items-center">
                <Heart className="w-4 h-4 mr-1.5 fill-brand-gold-400 text-brand-gold-400" />
                {step === 5 ? 'Donasi Berhasil' : 'Salurkan Donasi Kebaikan'}
              </h3>
              <p className="text-xs text-brand-gold-200">
                {step === 1 && 'Langkah 1: Tentukan Nominal & Program'}
                {step === 2 && 'Langkah 2: Data Diri & Titipan Doa'}
                {step === 3 && 'Langkah 3: Pilih Metode Pembayaran'}
                {step === 4 && 'Langkah 4: Selesaikan Pembayaran'}
                {step === 5 && 'Alhamdulillah, Jazakumullahu Khairan'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step < 5 && (
          <div className="w-full bg-slate-100 h-1.5">
            <div className="bg-brand-gold-500 h-full transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
        )}

        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Program Yang Dibantu</label>
                <select value={selectedCampaignId} onChange={(e) => setSelectedCampaignId(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-brand-green-500 outline-none">
                  {campaigns.map((camp) => (
                    <option key={camp.id} value={camp.id}>[{camp.categoryLabel}] {camp.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Pilih Nominal Donasi</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {PRESET_AMOUNTS.map((val) => (
                    <button key={val} type="button" onClick={() => { setAmount(val); setIsCustomAmount(false); setCustomAmountStr(''); }} className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center ${!isCustomAmount && amount === val ? 'bg-brand-green-600 text-white border-brand-green-600 shadow-sm scale-[1.02]' : 'bg-slate-50 hover:bg-brand-green-50 text-slate-700 border-slate-200'}`}>
                      {formatRupiah(val).replace(',00', '')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Atau Masukkan Nominal Kustom</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
                  <input type="text" inputMode="numeric" placeholder="Contoh: 150.000" value={customAmountStr ? parseInt(customAmountStr, 10).toLocaleString('id-ID') : ''} onChange={(e) => { const raw = e.target.value.replace(/\D/g, ''); setCustomAmountStr(raw); setAmount(parseInt(raw, 10) || 0); setIsCustomAmount(true); }} className={`w-full bg-slate-50 border rounded-xl pl-12 pr-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none ${isCustomAmount ? 'border-brand-green-600 bg-white' : 'border-slate-200'}`} />
                </div>
                {amount < 10000 && <p className="text-xs text-red-500 mt-1 font-medium">Minimal donasi adalah Rp 10.000</p>}
              </div>

              <button type="button" disabled={amount < 10000} onClick={() => setStep(2)} className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-green-600 to-brand-green-700 hover:from-brand-green-700 text-white font-bold rounded-xl shadow-soft flex items-center justify-center space-x-2 text-sm sm:text-base">
                <span>Lanjutkan ({formatRupiah(amount).replace(',00', '')})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-brand-green-50/70 p-3.5 rounded-2xl border border-brand-green-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs sm:text-sm text-brand-green-900">Donasi Sebagai Hamba Allah</p>
                  <p className="text-[11px] text-brand-green-700">Nama disamarkan pada daftar donatur publik</p>
                </div>
                <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="w-5 h-5 accent-brand-green-600 rounded cursor-pointer" />
              </div>

              {!isAnonymous && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Contoh: Fulan bin Fulan" value={donorName} onChange={(e) => setDonorName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none" />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp / HP</label>
                  <input type="tel" placeholder="08123456789" value={donorPhone} onChange={(e) => setDonorPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email (Opsional)</label>
                  <input type="email" placeholder="email@anda.com" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Titipan Doa & Harapan</span>
                  <span className="text-slate-400 font-normal text-[11px]">(Tampil di Dinding Doa)</span>
                </label>
                <textarea rows={3} placeholder="Tuliskan doa kebaikan Anda..." value={prayer} onChange={(e) => setPrayer(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"></textarea>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button type="button" onClick={() => setStep(1)} className="py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 text-xs sm:text-sm">Kembali</button>
                <button type="button" onClick={handleGoToStep3} className="py-3 px-4 bg-brand-green-600 hover:bg-brand-green-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-1.5">
                  <span>Pilih Pembayaran</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-500">Nominal Donasi:</span>
                  <p className="font-bold text-brand-green-700 text-base">{formatRupiah(amount).replace(',00', '')}</p>
                </div>
                <span className="px-2.5 py-1 bg-brand-green-100 text-brand-green-800 font-bold rounded-full text-[10px]">Bebas Biaya Admin</span>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center">
                  <QrCode className="w-3.5 h-3.5 mr-1 text-brand-green-600" /> Rekomendasi Instan (QRIS)
                </p>
                <div onClick={() => setSelectedMethod('qris')} className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${selectedMethod === 'qris' ? 'border-brand-green-600 bg-brand-green-50/50 ring-1 ring-brand-green-600' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-xs"><QrCode className="w-6 h-6 text-slate-800" /></div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs sm:text-sm">QRIS (Semua E-Wallet & Bank)</h4>
                      <p className="text-[11px] text-slate-500">BCA, Mandiri, BSI, GoPay, OVO, DANA, ShopeePay</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'qris' ? 'border-brand-green-600 bg-brand-green-600' : 'border-slate-300'}`}>
                    {selectedMethod === 'qris' && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center">
                  <Building2 className="w-3.5 h-3.5 mr-1 text-brand-green-600" /> Virtual Account Bank
                </p>
                <div className="space-y-2">
                  {PAYMENT_METHODS.filter(m => m.category === 'va').map((method) => (
                    <div key={method.id} onClick={() => setSelectedMethod(method.id)} className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${selectedMethod === method.id ? 'border-brand-green-600 bg-brand-green-50/50 ring-1 ring-brand-green-600' : 'border-slate-200 bg-white'}`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                          {method.id.replace('va_', '').toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{method.name}</h4>
                          <p className="text-[10px] text-slate-500">Verifikasi otomatis 24 jam</p>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedMethod === method.id ? 'border-brand-green-600 bg-brand-green-600' : 'border-slate-300'}`}>
                        {selectedMethod === method.id && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button type="button" onClick={handleProceedToPayment} className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-green-600 to-brand-green-700 hover:from-brand-green-700 text-white font-bold rounded-xl shadow-soft flex items-center justify-center space-x-2 text-sm sm:text-base">
                <span>Buka Halaman Pembayaran</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 4 && transactionData && (
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-brand-green-900 to-brand-green-950 text-white p-4 sm:p-5 rounded-2xl border border-brand-gold-400/30 text-center space-y-2">
                <div className="flex items-center justify-center space-x-1.5 text-xs text-brand-gold-300 font-semibold">
                  <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Selesaikan sebelum: <strong>{formatTimer(timeLeft)}</strong></span>
                </div>
                <p className="text-xs text-slate-300">Total Pembayaran Donasi</p>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-serif gold-gradient-text">
                  {formatRupiah(transactionData.totalPayment).replace(',00', '')}
                </div>
                {transactionData.uniqueCode > 0 && (
                  <p className="text-[11px] text-brand-gold-300">*Termasuk kode verifikasi unik: <strong>+{transactionData.uniqueCode}</strong></p>
                )}
              </div>

              {currentPaymentMethod.id === 'qris' ? (
                <div className="bg-white p-5 rounded-2xl border-2 border-dashed border-brand-green-300 text-center space-y-3">
                  <div className="inline-block p-3 bg-white rounded-2xl shadow-md border border-slate-200">
                    <div className="w-48 h-48 mx-auto bg-slate-900 p-2 rounded-xl flex items-center justify-center relative">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                        <path d="M0 0h30v30H0zm4 4v22h22V4zm6 6h10v10H10zM70 0h30v30H70zm4 4v22h22V4zm6 6h10v10H80zM0 70h30v30H0zm4 4v22h22V74zm6 6h10v10H10zM35 10h10v10H35zm15 0h15v5H50zm0 10h5v10h-5zm-15 15h10v10H35zm15 0h10v5H50zm15 0h15v5H65zm0 10h10v10H65zm-30 15h10v5H35zm15 0h10v15H50zm15 5h10v5H65zm15-5h10v10H80zm-45 15h5v10h-5zm20 0h10v5H55zm15 5h10v10H70zm15 0h10v5H85z" />
                      </svg>
                      <div className="absolute inset-0 m-auto w-10 h-10 bg-white rounded-lg p-0.5 shadow flex items-center justify-center">
                        <img src="/logo.jpg" alt="Ahlul Khair" className="w-full h-full object-contain rounded" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-800">Scan QRIS via BCA, Mandiri, BSI, GoPay, OVO, DANA, ShopeePay</p>
                  <p className="text-[11px] text-slate-500">Merchant: <strong>YAYASAN AHLUL KHAIR INDONESIA</strong></p>
                </div>
              ) : (
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div>
                    <span className="text-xs text-slate-500">Nomor Virtual Account / Rekening:</span>
                    <div className="mt-1 flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-base sm:text-lg font-bold font-mono text-brand-green-800">{currentPaymentMethod.accountNumber}</span>
                      <button onClick={() => handleCopy(currentPaymentMethod.accountNumber || '')} className="px-3 py-1.5 bg-brand-green-50 hover:bg-brand-green-100 text-brand-green-700 text-xs font-bold rounded-lg flex items-center space-x-1">
                        {copiedVa ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedVa ? 'Disalin' : 'Salin'}</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-xs"><p className="text-slate-500">Atas Nama: <strong className="text-slate-800">{currentPaymentMethod.accountName}</strong></p></div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                    <p className="font-bold text-slate-800">Petunjuk:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      {currentPaymentMethod.instructions.map((inst, i) => <li key={i}>{inst}</li>)}
                    </ol>
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-2">
                <button type="button" disabled={isCheckingPayment} onClick={handleConfirmPaymentSimulate} className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-green-600 via-brand-green-500 to-brand-green-700 hover:from-brand-green-700 text-white font-bold rounded-xl shadow-soft flex items-center justify-center space-x-2 text-sm sm:text-base">
                  {isCheckingPayment ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>Memverifikasi Pembayaran...</span></>
                  ) : (
                    <><CheckCircle2 className="w-5 h-5 text-brand-gold-300" /><span>Saya Sudah Bayar (Cek Otomatis)</span></>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-400">Verifikasi otomatis real-time tanpa upload bukti.</p>
              </div>
            </div>
          )}

          {step === 5 && transactionData && (
            <div className="space-y-5 text-center">
              <div className="inline-flex p-4 bg-brand-green-100 text-brand-green-700 rounded-full shadow-inner animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">Donasi Anda Telah Diterima!</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Jazakumullahu Khairan Katsiran. Semoga Allah SWT memberkahi harta Anda dan melipatgandakan pahala kebaikan.
                </p>
              </div>

              <div className="bg-slate-50 border-2 border-brand-green-200 rounded-2xl p-5 text-left space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-brand-green-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase">Lunas / Terverifikasi</div>
                <div className="flex items-center space-x-2 pb-3 border-b border-slate-200">
                  <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-lg object-contain" />
                  <div>
                    <p className="font-bold text-xs text-slate-900">Kwitansi Donasi Resmi</p>
                    <p className="text-[10px] text-slate-500 font-mono">{transactionData.invoiceNumber}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div><span className="text-slate-400">Donatur:</span><p className="font-bold text-slate-800">{transactionData.donorName}</p></div>
                  <div><span className="text-slate-400">Metode:</span><p className="font-bold text-slate-800">{transactionData.paymentMethodName}</p></div>
                  <div className="col-span-2"><span className="text-slate-400">Program:</span><p className="font-bold text-brand-green-800">{transactionData.campaignTitle}</p></div>
                  <div className="col-span-2 bg-brand-green-50 p-2.5 rounded-xl border border-brand-green-100 flex justify-between items-center">
                    <span className="font-semibold text-slate-600">Total Donasi:</span>
                    <span className="font-extrabold text-brand-green-800 text-base">{formatRupiah(transactionData.totalPayment).replace(',00', '')}</span>
                  </div>
                </div>

                {transactionData.prayer && (
                  <div className="pt-1 text-xs">
                    <span className="text-slate-400">Doa Kebaikan:</span>
                    <p className="italic text-slate-700 bg-white p-2 rounded-lg border border-slate-200 mt-0.5">&quot;{transactionData.prayer}&quot;</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button type="button" onClick={handleShareWa} className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2">
                  <Share2 className="w-4 h-4" /><span>Bagikan ke WhatsApp</span>
                </button>
                <button type="button" onClick={onClose} className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs sm:text-sm">
                  Tutup & Selesai
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
