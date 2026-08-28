import React from 'react';
import { Heart, Calculator, MessageSquareHeart } from 'lucide-react';

interface FloatingBottomBarProps {
  onOpenDonation: () => void;
  onOpenZakat: () => void;
}

export const FloatingBottomBar: React.FC<FloatingBottomBarProps> = ({
  onOpenDonation,
  onOpenZakat
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-2xl safe-area-bottom">
      <div className="flex items-center space-x-2 max-w-md mx-auto">
        <button
          onClick={onOpenZakat}
          className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all border border-slate-200"
        >
          <Calculator className="w-4 h-4 text-brand-gold-600" />
          <span>Kalkulator Zakat</span>
        </button>

        <button
          onClick={onOpenDonation}
          className="flex-1 py-2.5 px-3 bg-gradient-to-r from-brand-green-600 via-brand-green-500 to-brand-green-700 text-white font-extrabold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-md active:scale-95 transition-all"
        >
          <Heart className="w-4 h-4 fill-brand-gold-400 text-brand-gold-400" />
          <span>Donasi Sekarang</span>
        </button>
      </div>
    </div>
  );
};
