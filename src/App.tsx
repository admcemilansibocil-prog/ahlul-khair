import React, { useState, useMemo } from 'react';
import { 
  Heart, 
  Search, 
  SlidersHorizontal, 
  Flame, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  MessageSquareHeart,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryFilter } from './components/CategoryFilter';
import { CampaignCard } from './components/CampaignCard';
import { CampaignDetailModal } from './components/CampaignDetailModal';
import { DonationModal } from './components/DonationModal';
import { ZakatCalculator } from './components/ZakatCalculator';
import { PrayerWall } from './components/PrayerWall';
import { TransparencySection } from './components/TransparencySection';
import { VolunteerModal } from './components/VolunteerModal';
import { ProposeCampaignModal } from './components/ProposeCampaignModal';
import { FloatingBottomBar } from './components/FloatingBottomBar';
import { Footer } from './components/Footer';

import { Campaign, CategoryId, PrayerItem, CompletedTransaction } from './types';
import { CAMPAIGNS_DATA } from './data/campaignsData';
import { INITIAL_PRAYERS } from './data/prayersData';

export function App() {
  // Main Data States
  const [campaigns, setCampaigns] = useState<Campaign[]>(CAMPAIGNS_DATA);
  const [prayers, setPrayers] = useState<PrayerItem[]>(INITIAL_PRAYERS);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'urgent' | 'popular' | 'latest'>('urgent');

  // Modals
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [selectedCampaignForDonation, setSelectedCampaignForDonation] = useState<string | undefined>(undefined);
  const [presetDonationAmount, setPresetDonationAmount] = useState<number | undefined>(undefined);

  const [activeDetailCampaign, setActiveDetailCampaign] = useState<Campaign | null>(null);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [proposeModalOpen, setProposeModalOpen] = useState(false);

  // Filtered & Sorted Campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'urgent') {
        if (a.isUrgent && !b.isUrgent) return -1;
        if (!a.isUrgent && b.isUrgent) return 1;
        return a.daysLeft - b.daysLeft;
      }
      if (sortBy === 'popular') {
        return b.donorCount - a.donorCount;
      }
      return b.collectedAmount - a.collectedAmount;
    });
  }, [campaigns, selectedCategory, searchQuery, sortBy]);

  // Handlers for Modals
  const handleOpenGeneralDonation = () => {
    setSelectedCampaignForDonation(campaigns[0]?.id);
    setPresetDonationAmount(100000);
    setDonationModalOpen(true);
  };

  const handleOpenCampaignDonation = (campaignId: string) => {
    setSelectedCampaignForDonation(campaignId);
    setPresetDonationAmount(100000);
    setDonationModalOpen(true);
  };

  const handleOpenDonationWithConfig = (campaignId?: string, presetAmount?: number) => {
    setSelectedCampaignForDonation(campaignId || campaigns[0]?.id);
    setPresetDonationAmount(presetAmount || 100000);
    setDonationModalOpen(true);
  };

  const handlePayZakatFromCalculator = (amount: number, zakatType: string) => {
    // Find or target zakat category
    const zakatCamp = campaigns.find(c => c.category === 'yatim-dhuafa' || c.category === 'darurat') || campaigns[0];
    setSelectedCampaignForDonation(zakatCamp.id);
    setPresetDonationAmount(amount);
    setDonationModalOpen(true);
  };

  const handleScrollToZakat = () => {
    const el = document.getElementById('kalkulator-zakat');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // On successful donation: update campaign numbers & add to prayer wall!
  const handleDonationSuccess = (transaction: CompletedTransaction) => {
    // Update campaign collection
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === transaction.campaignId) {
          return {
            ...c,
            collectedAmount: c.collectedAmount + transaction.totalPayment,
            donorCount: c.donorCount + 1,
            recentDonors: [
              {
                id: 'donor-' + Date.now(),
                name: transaction.donorName,
                isAnonymous: transaction.isAnonymous,
                amount: transaction.totalPayment,
                date: new Date().toISOString(),
                prayer: transaction.prayer
              },
              ...c.recentDonors
            ]
          };
        }
        return c;
      })
    );

    // If donor left a prayer, add to prayer wall
    if (transaction.prayer) {
      const newPrayerItem: PrayerItem = {
        id: 'pray-' + Date.now(),
        donorName: transaction.donorName,
        isAnonymous: transaction.isAnonymous,
        campaignTitle: transaction.campaignTitle,
        prayerText: transaction.prayer,
        aamiinCount: 1,
        hasAamiined: false,
        createdAt: new Date().toISOString(),
        amount: transaction.totalPayment
      };
      setPrayers((prev) => [newPrayerItem, ...prev]);
    }
  };

  // Add prayer directly from Prayer Wall
  const handleAddPrayerFromWall = (newPrayerData: Omit<PrayerItem, 'id' | 'createdAt' | 'aamiinCount' | 'hasAamiined'>) => {
    const item: PrayerItem = {
      id: 'pray-' + Date.now(),
      donorName: newPrayerData.donorName,
      isAnonymous: newPrayerData.isAnonymous,
      campaignTitle: newPrayerData.campaignTitle,
      prayerText: newPrayerData.prayerText,
      aamiinCount: 1,
      hasAamiined: false,
      createdAt: new Date().toISOString(),
    };
    setPrayers((prev) => [item, ...prev]);
  };

  // Aamiin counter toggle
  const handleAamiinPrayer = (prayerId: string) => {
    setPrayers((prev) =>
      prev.map((p) => {
        if (p.id === prayerId) {
          const nextState = !p.hasAamiined;
          return {
            ...p,
            hasAamiined: nextState,
            aamiinCount: nextState ? p.aamiinCount + 1 : p.aamiinCount - 1
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Top Navbar */}
      <Navbar
        onOpenDonation={handleOpenGeneralDonation}
        onOpenZakat={handleScrollToZakat}
        onOpenVolunteer={() => setVolunteerModalOpen(true)}
        onOpenPropose={() => setProposeModalOpen(true)}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 1. Hero Section & Live Stats */}
        <HeroSection
          campaigns={campaigns}
          onOpenDonationWithConfig={handleOpenDonationWithConfig}
          onOpenZakat={handleScrollToZakat}
        />

        {/* 2. Campaign Catalog & Interactive Explorer */}
        <section id="program-donasi" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center space-x-2 bg-brand-green-100 text-brand-green-800 px-3.5 py-1 rounded-full text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold-600" />
                <span>Pilihan Program Kebaikan</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                Salurkan Donasi & <span className="green-gradient-text">Jariyah Anda</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                Pilih program donasi yang telah diverifikasi dan siap disalurkan langsung kepada penerima manfaat.
              </p>
            </div>

            {/* Sorting dropdown */}
            <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs self-start md:self-auto">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-600">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold text-slate-800 bg-transparent outline-none cursor-pointer"
              >
                <option value="urgent">Paling Mendesak</option>
                <option value="popular">Donatur Terbanyak</option>
                <option value="latest">Dana Terkumpul</option>
              </select>
            </div>
          </div>

          {/* Category Pills Filter */}
          <div className="mb-8">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Campaign Grid */}
          {filteredCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredCampaigns.map((camp) => (
                <CampaignCard
                  key={camp.id}
                  campaign={camp}
                  onOpenDetail={setActiveDetailCampaign}
                  onOpenDonation={handleOpenCampaignDonation}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Tidak ada program yang sesuai</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Coba ubah kata kunci pencarian atau pilih kategori program lainnya.
              </p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="px-4 py-2 bg-brand-green-600 text-white rounded-xl text-xs font-bold"
              >
                Tampilkan Semua Program
              </button>
            </div>
          )}

          {/* Bottom Banner Call to Action inside campaigns */}
          <div className="mt-14 bg-gradient-to-r from-brand-green-800 to-brand-green-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-300">
                Punya Rekomendasi Program / Butuh Bantuan?
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif">
                Ajukan Program Bantuan Sosial atau Galang Dana Bersama Kami
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 font-light max-w-xl">
                Tim relawan kami siap meninjau kondisi lapangan dan memfasilitasi penggalangan dana secara terverifikasi.
              </p>
            </div>

            <button
              onClick={() => setProposeModalOpen(true)}
              className="px-6 py-3.5 bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-brand-green-950 font-extrabold rounded-2xl shadow-md whitespace-nowrap transition-all hover:scale-105"
            >
              Ajukan Bantuan Sekarang
            </button>
          </div>

        </section>

        {/* 3. Zakat & Infaq Interactive Calculator */}
        <ZakatCalculator onPayZakat={handlePayZakatFromCalculator} />

        {/* 4. Real-time Prayer Wall */}
        <PrayerWall
          prayers={prayers}
          onAddPrayer={handleAddPrayerFromWall}
          onAamiin={handleAamiinPrayer}
        />

        {/* 5. Transparency, Financial Audit & Legal Section */}
        <TransparencySection />

      </main>

      {/* Footer */}
      <Footer
        onOpenZakat={handleScrollToZakat}
        onOpenVolunteer={() => setVolunteerModalOpen(true)}
        onOpenPropose={() => setProposeModalOpen(true)}
      />

      {/* Floating Action Bar for Mobile */}
      <FloatingBottomBar
        onOpenDonation={handleOpenGeneralDonation}
        onOpenZakat={handleScrollToZakat}
      />

      {/* Modals */}
      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        campaigns={campaigns}
        initialCampaignId={selectedCampaignForDonation}
        initialAmount={presetDonationAmount}
        onDonationSuccess={handleDonationSuccess}
      />

      <CampaignDetailModal
        campaign={activeDetailCampaign}
        onClose={() => setActiveDetailCampaign(null)}
        onOpenDonation={handleOpenCampaignDonation}
      />

      <VolunteerModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
      />

      <ProposeCampaignModal
        isOpen={proposeModalOpen}
        onClose={() => setProposeModalOpen(false)}
      />

    </div>
  );
}

export default App;
