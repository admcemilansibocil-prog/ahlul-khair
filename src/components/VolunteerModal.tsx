import React, { useState } from 'react';
import { X, Users, CheckCircle2, Heart, Sparkles, Send } from 'lucide-react';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [skill, setSkill] = useState('Tim Lapangan & Logistik SAR');
  const [reason, setReason] = useState('');
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
            <div className="p-2 bg-white/10 rounded-xl">
              <Users className="w-5 h-5 text-brand-gold-400" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg font-serif">Gabung Relawan Kebaikan</h3>
              <p className="text-xs text-brand-gold-200">Ahlul Khair Indonesia Volunteer Corps</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-white/80 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 bg-brand-green-100 text-brand-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-serif">Pendaftaran Diterima!</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                Jazakallahu khair. Tim koordinator relawan Ahlul Khair Indonesia akan menghubungi Anda melalui WhatsApp untuk proses orientasi dan penempatan.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Rian"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / No. HP <span className="text-red-500">*</span></label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kota / Domisili <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Padang / Jakarta"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Peminatan Divisi Relawan</label>
                <select
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                >
                  <option value="Tim Lapangan & Logistik SAR">Tim Lapangan, Dapur Umum & Logistik SAR Bencana</option>
                  <option value="Tenaga Medis & Kesehatan">Tenaga Medis, Perawat & Dokter</option>
                  <option value="Dokumentasi, Foto & Media Sosial">Dokumentasi, Desain & Media Komunikasi</option>
                  <option value="Pengajar Quran & Pendidikan Santri">Pengajar Tahfidz & Guru Pendamping Santri</option>
                  <option value="Administrasi & Layanan Donatur">Layanan Donatur & Administrasi Program</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Motivasi Bergabung (Singkat)</label>
                <textarea
                  rows={2}
                  placeholder="Ceritakan motivasi atau pengalaman kebaikan Anda..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-brand-green-600 hover:bg-brand-green-700 text-white font-bold rounded-xl shadow-soft transition-all flex items-center justify-center space-x-2 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Formulir Relawan</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
