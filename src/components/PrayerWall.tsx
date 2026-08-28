import React, { useState } from 'react';
import { 
  MessageSquareHeart, 
  Heart, 
  Send, 
  Sparkles, 
  Check, 
  Users, 
  Flame,
  Clock
} from 'lucide-react';
import { PrayerItem } from '../types';
import { timeAgo, formatRupiah } from '../utils/formatters';

interface PrayerWallProps {
  prayers: PrayerItem[];
  onAddPrayer: (prayer: Omit<PrayerItem, 'id' | 'createdAt' | 'aamiinCount' | 'hasAamiined'>) => void;
  onAamiin: (prayerId: string) => void;
}

export const PrayerWall: React.FC<PrayerWallProps> = ({
  prayers,
  onAddPrayer,
  onAamiin
}) => {
  const [filter, setFilter] = useState<'latest' | 'popular'>('latest');
  const [newName, setNewName] = useState('');
  const [newPrayer, setNewPrayer] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmitPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayer.trim()) return;

    onAddPrayer({
      donorName: isAnonymous ? 'Hamba Allah' : (newName.trim() || 'Hamba Allah'),
      isAnonymous: isAnonymous,
      campaignTitle: 'Doa Bersama untuk Ummat',
      prayerText: newPrayer.trim()
    });

    setNewPrayer('');
    setNewName('');
    setIsAnonymous(false);
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 3000);
  };

  const displayedPrayers = [...prayers].sort((a, b) => {
    if (filter === 'popular') {
      return b.aamiinCount - a.aamiinCount;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <section id="dinding-doa" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-brand-gold-100 text-brand-gold-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs">
            <MessageSquareHeart className="w-4 h-4 text-brand-gold-600" />
            <span>Untaian Doa & Harapan Kebaikan</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-900 tracking-tight">
            Dinding Doa <span className="green-gradient-text">Para Muhsinin</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            &quot;Doa seorang muslim untuk saudaranya yang dilakukan secara diam-diam niscaya akan dikabulkan.&quot; (HR. Muslim). Mari bersama-sama mengaminkan doa kebaikan saudara kita.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Post a Prayer Form */}
          <div className="lg:col-span-4 bg-gradient-to-br from-brand-green-50/70 via-white to-brand-gold-50/40 rounded-3xl p-6 border border-brand-green-200 shadow-soft sticky top-28">
            
            <div className="flex items-center space-x-2.5 pb-4 border-b border-brand-green-100 mb-4">
              <div className="p-2 bg-brand-green-600 text-white rounded-xl">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Kirim Doa Kebaikan</h3>
                <p className="text-xs text-slate-500">Sampaikan doa tulus Anda hari ini</p>
              </div>
            </div>

            <form onSubmit={handleSubmitPrayer} className="space-y-3.5">
              
              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                <span className="font-medium text-slate-700">Kirim Sebagai Hamba Allah</span>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 accent-brand-green-600 rounded cursor-pointer"
                />
              </div>

              {!isAnonymous && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Anda
                  </label>
                  <input
                    type="text"
                    placeholder="Nama lengkap / keluarga"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Doa / Pesan Anda <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan doa kebaikan untuk sesama, keluarga, atau saudara yang sedang tertimpa musibah..."
                  value={newPrayer}
                  onChange={(e) => setNewPrayer(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-brand-green-500 outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-brand-green-600 hover:bg-brand-green-700 text-white font-bold rounded-xl shadow-soft transition-all flex items-center justify-center space-x-2 text-xs sm:text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Doa Sekarang</span>
              </button>

              {submittedSuccess && (
                <p className="text-xs text-emerald-600 font-bold text-center bg-emerald-50 py-2 rounded-lg border border-emerald-200 flex items-center justify-center">
                  <Check className="w-4 h-4 mr-1" /> Doa Anda berhasil dipublikasikan!
                </p>
              )}

            </form>

          </div>

          {/* Right Column: Prayers Feed */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Filter Tabs */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {prayers.length} Doa Terkumpul
              </span>
              
              <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setFilter('latest')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center space-x-1 ${
                    filter === 'latest'
                      ? 'bg-white text-brand-green-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>Terbaru</span>
                </button>
                <button
                  onClick={() => setFilter('popular')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center space-x-1 ${
                    filter === 'popular'
                      ? 'bg-white text-brand-green-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Flame className="w-3 h-3 text-amber-500" />
                  <span>Terbanyak Diaminkan</span>
                </button>
              </div>
            </div>

            {/* Prayers List */}
            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {displayedPrayers.map((item) => (
                <div 
                  key={item.id}
                  className="bg-slate-50 hover:bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-soft transition-all duration-200 space-y-3 group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-green-600 to-brand-green-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        {item.donorName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{item.donorName}</h4>
                          {item.amount && (
                            <span className="text-[10px] bg-brand-green-100 text-brand-green-800 font-bold px-2 py-0.5 rounded-full">
                              Donasi {formatRupiah(item.amount).replace(',00', '')}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">{timeAgo(item.createdAt)} • <span className="text-brand-green-700 font-medium">{item.campaignTitle}</span></p>
                      </div>
                    </div>

                    {/* Aamiin Action Button */}
                    <button
                      onClick={() => onAamiin(item.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-xs ${
                        item.hasAamiined
                          ? 'bg-brand-green-600 text-white shadow-sm scale-105'
                          : 'bg-white hover:bg-brand-green-50 text-brand-green-800 border border-brand-green-200 hover:border-brand-green-400'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${item.hasAamiined ? 'fill-white text-white' : 'text-brand-green-600'}`} />
                      <span>Aamiin ({item.aamiinCount})</span>
                    </button>
                  </div>

                  {/* Prayer Text */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-white p-3 rounded-xl border border-slate-100/80">
                    &quot;{item.prayerText}&quot;
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
