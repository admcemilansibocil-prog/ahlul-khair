import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Clock, 
  Share2, 
  CheckCircle, 
  FileText, 
  History, 
  PieChart, 
  MessageSquareHeart,
  Copy,
  Check
} from 'lucide-react';
import { Campaign } from '../types';
import { formatRupiah, calculatePercentage, formatDateIndo, timeAgo } from '../utils/formatters';

interface CampaignDetailModalProps {
  campaign: Campaign | null;
  onClose: () => void;
  onOpenDonation: (campaignId: string) => void;
}

export const CampaignDetailModal: React.FC<CampaignDetailModalProps> = ({
  campaign,
  onClose,
  onOpenDonation
}) => {
  const [activeTab, setActiveTab] = useState<'story' | 'updates' | 'budget' | 'donors'>('story');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!campaign) return null;

  const percentage = calculatePercentage(campaign.collectedAmount, campaign.targetAmount);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: campaign.title,
        text: `Mari bantu program "${campaign.title}" bersama Ahlul Khair Indonesia.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fadeIn">
      
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button Floating */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-all shadow-md"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          
          {/* Hero Banner Section in Modal */}
          <div className="relative aspect-[16/8] sm:aspect-[21/9] bg-slate-900">
            <img 
              src={campaign.image} 
              alt={campaign.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
            
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-brand-green-600/90 backdrop-blur-md text-white text-xs font-bold rounded-full">
                  {campaign.categoryLabel}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full flex items-center">
                  <MapPin className="w-3 h-3 mr-1 text-brand-gold-400" />
                  {campaign.location}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold font-serif leading-snug">
                {campaign.title}
              </h2>
            </div>
          </div>

          {/* Organizer & Progress Overview */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            
            {/* Top Bar inside modal */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              
              <div className="flex items-center space-x-3">
                <img 
                  src={campaign.organizerAvatar} 
                  alt={campaign.organizer} 
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-brand-green-200 shadow-sm"
                />
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{campaign.organizer}</h4>
                    {campaign.isVerified && (
                      <ShieldCheck className="w-4 h-4 text-brand-green-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-brand-green-700 font-medium">{campaign.organizerRole}</p>
                </div>
              </div>

              {/* Share & Campaign ID */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? 'Tautan Disalin' : 'Bagikan'}</span>
                </button>
              </div>

            </div>

            {/* Target & Donation Stats Grid */}
            <div className="bg-gradient-to-br from-brand-green-50/50 via-white to-brand-gold-50/30 rounded-2xl p-5 sm:p-6 border border-brand-green-100 shadow-sm space-y-4">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Terkumpul</p>
                  <p className="text-lg sm:text-xl font-extrabold text-brand-green-700 font-serif">
                    {formatRupiah(campaign.collectedAmount).replace(',00', '')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Target Dana</p>
                  <p className="text-base sm:text-lg font-bold text-slate-800">
                    {formatRupiah(campaign.targetAmount).replace(',00', '')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Total Donatur</p>
                  <p className="text-base sm:text-lg font-bold text-slate-800 flex items-center">
                    <Users className="w-4 h-4 text-slate-400 mr-1" />
                    {campaign.donorCount.toLocaleString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Sisa Waktu</p>
                  <p className="text-base sm:text-lg font-bold text-amber-700 flex items-center">
                    <Clock className="w-4 h-4 text-brand-gold-600 mr-1" />
                    {campaign.daysLeft} Hari Lagi
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="w-full bg-slate-200/80 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-brand-green-600 via-brand-green-500 to-brand-gold-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right text-slate-500 font-semibold mt-1">
                  Progres: {percentage}%
                </p>
              </div>

            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 space-x-1 sm:space-x-3 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab('story')}
                className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                  activeTab === 'story'
                    ? 'border-brand-green-600 text-brand-green-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Cerita Lengkap</span>
              </button>

              <button
                onClick={() => setActiveTab('updates')}
                className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                  activeTab === 'updates'
                    ? 'border-brand-green-600 text-brand-green-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <History className="w-4 h-4" />
                <span>Kabar Penyaluran</span>
                <span className="bg-brand-green-100 text-brand-green-800 text-[10px] px-1.5 py-0.5 rounded-full font-extrabold">
                  {campaign.updates.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('budget')}
                className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                  activeTab === 'budget'
                    ? 'border-brand-green-600 text-brand-green-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <PieChart className="w-4 h-4" />
                <span>Rencana Anggaran</span>
              </button>

              <button
                onClick={() => setActiveTab('donors')}
                className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                  activeTab === 'donors'
                    ? 'border-brand-green-600 text-brand-green-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <MessageSquareHeart className="w-4 h-4" />
                <span>Donatur & Doa</span>
                <span className="bg-brand-gold-100 text-brand-gold-800 text-[10px] px-1.5 py-0.5 rounded-full font-extrabold">
                  {campaign.recentDonors.length}
                </span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-2 min-h-[220px]">
              
              {/* Tab 1: Story */}
              {activeTab === 'story' && (
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  {campaign.story.map((paragraph, index) => (
                    <p key={index} className="bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                      {paragraph}
                    </p>
                  ))}
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-1">
                    <p className="font-bold flex items-center">
                      <ShieldCheck className="w-4 h-4 mr-1.5 text-brand-gold-600" />
                      Jaminan Keamanan & Akuntabilitas Ahlul Khair Indonesia
                    </p>
                    <p className="text-amber-800/90 text-xs">
                      Setiap rupiah donasi yang Anda salurkan akan dikelola secara amanah dan dilaporkan berkala melalui menu Kabar Penyaluran serta Laporan Audit Publik.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: Updates */}
              {activeTab === 'updates' && (
                <div className="space-y-6">
                  {campaign.updates.map((update, idx) => (
                    <div key={update.id} className="relative pl-6 border-l-2 border-brand-green-400 space-y-2">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-green-600 border-2 border-white"></div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-brand-green-700 bg-brand-green-50 px-2.5 py-0.5 rounded-full">
                          Update #{campaign.updates.length - idx}
                        </span>
                        <span className="text-xs text-slate-400">
                          {formatDateIndo(update.date)}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base">{update.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{update.content}</p>
                      {update.image && (
                        <div className="rounded-xl overflow-hidden aspect-[16/9] max-w-md border border-slate-200 mt-2">
                          <img src={update.image} alt={update.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Budget Breakdown */}
              {activeTab === 'budget' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 font-medium">
                    Rencana alokasi anggaran program kemanusiaan ini dirinci secara transparan:
                  </p>
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                    {campaign.budgetBreakdown.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3.5 bg-white hover:bg-slate-50 text-xs sm:text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 bg-brand-green-100 text-brand-green-800 rounded-full flex items-center justify-center text-[10px] font-bold">
                            {index + 1}
                          </span>
                          <span className="font-medium text-slate-800">{item.item}</span>
                        </div>
                        <span className="font-bold text-slate-900">{formatRupiah(item.cost).replace(',00', '')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Donors & Prayers */}
              {activeTab === 'donors' && (
                <div className="space-y-3">
                  {campaign.recentDonors.map((donor) => (
                    <div key={donor.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-brand-green-100 text-brand-green-700 flex items-center justify-center font-bold text-xs">
                            {donor.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-xs sm:text-sm text-slate-800">
                              {donor.name}
                            </p>
                            <p className="text-[10px] text-slate-400">{timeAgo(donor.date)}</p>
                          </div>
                        </div>
                        <span className="font-bold text-brand-green-700 text-xs sm:text-sm">
                          {formatRupiah(donor.amount).replace(',00', '')}
                        </span>
                      </div>
                      {donor.prayer && (
                        <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded-xl border border-slate-100">
                          &quot;{donor.prayer}&quot;
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Modal Bottom Sticky CTA Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4 z-20">
          <div>
            <p className="text-xs text-slate-500">Bantu Sekarang</p>
            <p className="text-xs sm:text-sm font-bold text-slate-800 truncate max-w-[200px] sm:max-w-xs">
              {campaign.title}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs sm:text-sm font-bold transition-all"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenDonation(campaign.id);
              }}
              className="px-6 py-3 bg-gradient-to-r from-brand-green-600 to-brand-green-700 hover:from-brand-green-700 hover:to-brand-green-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center space-x-2 text-xs sm:text-sm"
            >
              <Heart className="w-4 h-4 fill-brand-gold-400 text-brand-gold-400" />
              <span>Donasi Sekarang</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
