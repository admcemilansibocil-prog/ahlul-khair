import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle2, HeartHandshake, Send } from 'lucide-react';

interface ProposeCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProposeCampaignModal: React.FC<ProposeCampaignModalProps> = ({ isOpen, onClose }) => {
  const [proposerName, setProposerName] = useState('');
  const [phone, setPhone] = useState('');
  const [campaignTitle, setCampaignTitle] = useState('');
  const [category, setCategory] = useState('darurat');
  const [targetAmount, setTargetAmount] = useState('50000000');
  const [description, setDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative animate-scaleUp" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-green-800 to-brand-green-900 text-white p-5 flex justify-between items-center">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-brand-gold-500/20 text-brand-gold-300 rounded-xl">
              <PlusCircle className="w-5 h-5 text-brand-gold-400" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg font-serif">Ajukan Bantuan / Galang Dana</h3>
              <p className="text-xs text-brand-gold-200">Verifikasi Langsung Tim Lapangan</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-white/80 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 bg-brand-green-100 text-brand-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-serif">Pengajuan Telah Diterima!</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                Tim asesmen dan survei lapangan Ahlul Khair Indonesia akan meninjau data dokumen dan menghubungi Anda dalam 1x24 jam kerja untuk proses verifikasi.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Penanggung Jawab / Pemohon <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap / Ketua DKM / Tokoh Masyarakat"
                  value={proposerName}
                  onChange={(e) => setProposerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / No. HP Aktif <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    required
                    placeholder="08123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Program</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                  >
                    <option value="darurat">Tanggap Darurat / Bencana</option>
                    <option value="wakaf">Wakaf Masjid / Sumur Air</option>
                    <option value="kesehatan">Pengobatan Medis Dhuafa</option>
                    <option value="yatim-dhuafa">Santunan Yatim & Lansia</option>
                    <option value="pendidikan">Pendidikan & Pesantren</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Permohonan Program <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bantuan Renovasi Masjid Desa Sukatani yang Rusak"
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Estimasi Kebutuhan Dana (Rp)</label>
                <input
                  type="text"
                  placeholder="Contoh: 50.000.000"
                  value={targetAmount ? parseInt(targetAmount.replace(/\D/g, ''), 10).toLocaleString('id-ID') : ''}
                  onChange={(e) => setTargetAmount(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kronologi & Deskripsi Kebutuhan <span className="text-red-500">*</span></label>
                <textarea
                  rows={3}
                  required
                  placeholder="Jelaskan kondisi mendesak di lapangan, siapa penerima manfaat, dan lokasi lengkap..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-green-600 to-brand-green-700 hover:from-brand-green-700 text-white font-bold rounded-xl shadow-soft transition-all flex items-center justify-center space-x-2 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Permohonan Program</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
