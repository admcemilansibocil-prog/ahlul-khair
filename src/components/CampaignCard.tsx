import React from 'react';
import { 
  Heart, 
  Flame, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Users, 
  ArrowUpRight 
} from 'lucide-react';
import { Campaign } from '../types';
import { formatRupiah, calculatePercentage } from '../utils/formatters';

interface CampaignCardProps {
  campaign: Campaign;
  onOpenDetail: (campaign: Campaign) => void;
  onOpenDonation: (campaignId: string) => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onOpenDetail,
  onOpenDonation
}) => {
  const percentage = calculatePercentage(campaign.collectedAmount, campaign.targetAmount);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      
      {/* Image Header with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img 
          src={campaign.image} 
          alt={campaign.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-brand-green-800 text-xs font-bold rounded-full shadow-sm flex items-center">
            {campaign.categoryLabel}
          </span>

          {campaign.isUrgent && (
            <span className="px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded-full shadow-sm flex items-center animate-pulse">
              <Flame className="w-3.5 h-3.5 mr-1 fill-white" /> Mendesak
            </span>
          )}
        </div>

        {/* Bottom Image Location Tag */}
        <div className="absolute bottom-2.5 left-3 text-white text-xs font-medium flex items-center drop-shadow-md">
          <MapPin className="w-3.5 h-3.5 mr-1 text-brand-gold-400 shrink-0" />
          <span className="truncate max-w-[240px]">{campaign.location}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Organizer Info */}
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
            <img 
              src={campaign.organizerAvatar} 
              alt={campaign.organizer} 
              className="w-4 h-4 rounded-full object-cover border border-brand-green-200"
            />
            <span className="font-semibold text-slate-700 truncate">{campaign.organizer}</span>
            {campaign.isVerified && (
              <span title="Terverifikasi Resmi" className="inline-flex">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-green-600 shrink-0" />
              </span>
            )}
          </div>

          {/* Campaign Title */}
          <h3 
            onClick={() => onOpenDetail(campaign)}
            className="font-bold text-slate-900 text-base line-clamp-2 hover:text-brand-green-600 cursor-pointer transition-colors leading-snug"
          >
            {campaign.title}
          </h3>

          {/* Short summary */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {campaign.summary}
          </p>
        </div>

        {/* Progress & Target Section */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          
          <div>
            <div className="flex justify-between items-baseline text-xs mb-1.5">
              <span className="text-slate-500 font-medium">Terkumpul</span>
              <span className="font-bold text-brand-green-700 text-sm">
                {formatRupiah(campaign.collectedAmount).replace(',00', '')}
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-brand-green-600 via-brand-green-500 to-brand-gold-500 h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1.5 font-medium">
              <span>{percentage}% dari target</span>
              <span className="text-slate-700 font-semibold">{formatRupiah(campaign.targetAmount).replace(',00', '')}</span>
            </div>
          </div>

          {/* Donor Count & Days Left */}
          <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
            <div className="flex items-center">
              <Users className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
              <span><strong>{campaign.donorCount.toLocaleString('id-ID')}</strong> Donatur</span>
            </div>
            <div className="flex items-center text-amber-700 font-semibold">
              <Clock className="w-3.5 h-3.5 text-brand-gold-600 mr-1.5" />
              <span>{campaign.daysLeft} hari lagi</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => onOpenDetail(campaign)}
              className="py-2.5 px-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-xl transition-all flex items-center justify-center space-x-1"
            >
              <span>Detail</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onOpenDonation(campaign.id)}
              className="py-2.5 px-3 text-xs font-bold text-white bg-gradient-to-r from-brand-green-600 to-brand-green-700 hover:from-brand-green-700 hover:to-brand-green-800 rounded-xl shadow-xs hover:shadow-soft transition-all flex items-center justify-center space-x-1.5 group/btn"
            >
              <Heart className="w-3.5 h-3.5 fill-brand-gold-400 text-brand-gold-400 group-hover/btn:scale-125 transition-transform" />
              <span>Donasi</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
