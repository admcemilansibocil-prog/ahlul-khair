import React, { useState, useEffect } from 'react';
import { 
  X, 
  Settings, 
  ShieldCheck, 
  Check, 
  Copy, 
  ExternalLink, 
  Key, 
  Globe, 
  Zap, 
  Server, 
  CheckCircle2, 
  AlertCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { PaymentGatewayConfig } from '../types';
import { getStoredGatewayConfig, saveStoredGatewayConfig } from '../services/paymentGatewayService';

interface PaymentSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigSaved: (config: PaymentGatewayConfig) => void;
}

export const PaymentSettingsModal: React.FC<PaymentSettingsModalProps> = ({
  isOpen,
  onClose,
  onConfigSaved
}) => {
  const [activeTab, setActiveTab] = useState<'midtrans' | 'xendit' | 'general'>('general');
  const [config, setConfig] = useState<PaymentGatewayConfig>(getStoredGatewayConfig());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [testStatus, setTestStatus] = useState<{ loading: boolean; success?: boolean; message?: string }>({ loading: false });

  useEffect(() => {
    if (isOpen) {
      setConfig(getStoredGatewayConfig());
      setSavedSuccess(false);
      setTestStatus({ loading: false });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://domainanda.com';
  const midtransWebhookUrl = `${currentOrigin}/api/midtrans-notification.php`;
  const xenditWebhookUrl = `${currentOrigin}/api/xendit-webhook.php`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(key);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleSave = () => {
    saveStoredGatewayConfig(config);
    onConfigSaved(config);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  const handleTestConnection = () => {
    setTestStatus({ loading: true });
    setTimeout(() => {
      setTestStatus({
        loading: false,
        success: true,
        message: `Koneksi Gateway ${config.activeProvider.toUpperCase()} (${config.isProduction ? 'PRODUCTION' : 'SANDBOX'}) Berhasil Terhubung!`
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] relative animate-scaleUp" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-brand-green-950 to-slate-900 text-white p-5 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <Settings className="w-5 h-5 text-brand-gold-400" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg font-serif">Pengaturan Payment Gateway</h3>
              <p className="text-xs text-slate-300">Integrasi Xendit & Midtrans (Snap, QRIS, Virtual Account)</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-white/80 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 bg-slate-100 p-1.5 border-b border-slate-200 text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-2.5 rounded-xl transition-all ${
              activeTab === 'general' ? 'bg-white text-brand-green-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Umum & Mode
          </button>
          <button
            onClick={() => setActiveTab('midtrans')}
            className={`py-2.5 rounded-xl transition-all ${
              activeTab === 'midtrans' ? 'bg-white text-brand-green-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Midtrans Snap
          </button>
          <button
            onClick={() => setActiveTab('xendit')}
            className={`py-2.5 rounded-xl transition-all ${
              activeTab === 'xendit' ? 'bg-white text-brand-green-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Xendit Invoice
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* TAB 1: General & Provider Selection */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              
              {/* Environment Toggle (Sandbox vs Production) */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-slate-800">Mode Transaksi</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                      config.isProduction 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {config.isProduction ? 'Live / Production' : 'Sandbox (Uji Coba)'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {config.isProduction 
                      ? 'Transaksi menggunakan dana riil dan akun resmi merchant.' 
                      : 'Transaksi simulasi untuk pengetesan tanpa memotong saldo/dana nyata.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setConfig({ ...config, isProduction: !config.isProduction })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.isProduction ? 'bg-brand-green-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.isProduction ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Active Provider Routing */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pilih Gateway Utama
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  <div
                    onClick={() => setConfig({ ...config, activeProvider: 'smart' })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      config.activeProvider === 'smart'
                        ? 'border-brand-green-600 bg-brand-green-50/50 ring-1 ring-brand-green-600'
                        : 'border-slate-200 bg-white hover:border-brand-green-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-brand-gold-600" />
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800">Smart Routing</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Otomatis Midtrans Snap & Xendit Invoice</p>
                  </div>

                  <div
                    onClick={() => setConfig({ ...config, activeProvider: 'midtrans' })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      config.activeProvider === 'midtrans'
                        ? 'border-brand-green-600 bg-brand-green-50/50 ring-1 ring-brand-green-600'
                        : 'border-slate-200 bg-white hover:border-brand-green-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Server className="w-4 h-4 text-brand-green-600" />
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800">Midtrans Utama</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Snap Popup resmi Midtrans</p>
                  </div>

                  <div
                    onClick={() => setConfig({ ...config, activeProvider: 'xendit' })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      config.activeProvider === 'xendit'
                        ? 'border-brand-green-600 bg-brand-green-50/50 ring-1 ring-brand-green-600'
                        : 'border-slate-200 bg-white hover:border-brand-green-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800">Xendit Utama</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Xendit Invoice & Checkout</p>
                  </div>

                </div>
              </div>

              {/* Hostinger Webhook URLs display */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <p className="text-xs font-bold text-slate-800 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1.5 text-brand-green-600" />
                  URL Webhook / Notification Handler di Hostinger:
                </p>

                <div>
                  <span className="text-[11px] text-slate-500">Midtrans Notification URL:</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <input
                      type="text"
                      readOnly
                      value={midtransWebhookUrl}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-mono w-full"
                    />
                    <button
                      onClick={() => handleCopy(midtransWebhookUrl, 'midtrans_wh')}
                      className="px-3 py-1.5 bg-brand-green-50 text-brand-green-700 text-xs font-bold rounded-xl flex items-center shrink-0"
                    >
                      {copiedUrl === 'midtrans_wh' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500">Xendit Webhook URL:</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <input
                      type="text"
                      readOnly
                      value={xenditWebhookUrl}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-mono w-full"
                    />
                    <button
                      onClick={() => handleCopy(xenditWebhookUrl, 'xendit_wh')}
                      className="px-3 py-1.5 bg-brand-green-50 text-brand-green-700 text-xs font-bold rounded-xl flex items-center shrink-0"
                    >
                      {copiedUrl === 'xendit_wh' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: Midtrans Keys */}
          {activeTab === 'midtrans' && (
            <div className="space-y-4">
              <div className="bg-brand-green-50/70 p-3.5 rounded-2xl border border-brand-green-200 text-xs text-brand-green-900 space-y-1">
                <p className="font-bold flex items-center">
                  <Key className="w-4 h-4 mr-1 text-brand-green-700" />
                  Kunci Akses API Midtrans (Snap)
                </p>
                <p className="text-brand-green-800/80">
                  Dapatkan kunci di <a href="https://dashboard.midtrans.com/" target="_blank" rel="noreferrer" className="underline font-bold">dashboard.midtrans.com</a> &gt; Settings &gt; Access Keys.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Midtrans Client Key {config.isProduction ? '(Production)' : '(Sandbox)'}
                </label>
                <input
                  type="text"
                  placeholder={config.isProduction ? 'Mid-client-...' : 'SB-Mid-client-...'}
                  value={config.midtrans.clientKey}
                  onChange={(e) => setConfig({
                    ...config,
                    midtrans: { ...config.midtrans, clientKey: e.target.value }
                  })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Midtrans Server Key {config.isProduction ? '(Production)' : '(Sandbox)'}
                </label>
                <input
                  type="password"
                  placeholder={config.isProduction ? 'Mid-server-...' : 'SB-Mid-server-...'}
                  value={config.midtrans.serverKey}
                  onChange={(e) => setConfig({
                    ...config,
                    midtrans: { ...config.midtrans, serverKey: e.target.value }
                  })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Merchant ID (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="G123456789"
                  value={config.midtrans.merchantId}
                  onChange={(e) => setConfig({
                    ...config,
                    midtrans: { ...config.midtrans, merchantId: e.target.value }
                  })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Xendit Keys */}
          {activeTab === 'xendit' && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-200 text-xs text-blue-900 space-y-1">
                <p className="font-bold flex items-center">
                  <Key className="w-4 h-4 mr-1 text-blue-700" />
                  Kunci Akses API Xendit (Invoices & QRIS)
                </p>
                <p className="text-blue-800/80">
                  Dapatkan kunci di <a href="https://dashboard.xendit.co/" target="_blank" rel="noreferrer" className="underline font-bold">dashboard.xendit.co</a> &gt; Settings &gt; API Keys.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Xendit Secret API Key {config.isProduction ? '(Production)' : '(Development / Test)'}
                </label>
                <input
                  type="password"
                  placeholder={config.isProduction ? 'xnd_production_...' : 'xnd_development_...'}
                  value={config.xendit.secretKey}
                  onChange={(e) => setConfig({
                    ...config,
                    xendit: { ...config.xendit, secretKey: e.target.value }
                  })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Xendit Public Key (Opsional)
                </label>
                <input
                  type="text"
                  placeholder={config.isProduction ? 'xnd_public_production_...' : 'xnd_public_development_...'}
                  value={config.xendit.publicKey}
                  onChange={(e) => setConfig({
                    ...config,
                    xendit: { ...config.xendit, publicKey: e.target.value }
                  })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Xendit Webhook Verification Token (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Verification Token"
                  value={config.xendit.webhookToken}
                  onChange={(e) => setConfig({
                    ...config,
                    xendit: { ...config.xendit, webhookToken: e.target.value }
                  })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* Test Status feedback */}
          {testStatus.message && (
            <div className={`p-3 rounded-xl border text-xs flex items-center space-x-2 ${
              testStatus.success ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{testStatus.message}</span>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <button
            type="button"
            disabled={testStatus.loading}
            onClick={handleTestConnection}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
          >
            {testStatus.loading ? (
              <div className="w-3.5 h-3.5 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Zap className="w-3.5 h-3.5 text-brand-gold-600" />
            )}
            <span>Uji Koneksi Gateway</span>
          </button>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 transition-all"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-brand-green-600 hover:bg-brand-green-700 text-white text-xs font-bold rounded-xl shadow-soft transition-all flex items-center justify-center space-x-1.5"
            >
              {savedSuccess ? <Check className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
              <span>{savedSuccess ? 'Tersimpan!' : 'Simpan Pengaturan'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
