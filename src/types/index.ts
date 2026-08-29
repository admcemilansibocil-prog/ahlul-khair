export type CategoryId = 
  | 'all'
  | 'darurat'
  | 'pendidikan'
  | 'kesehatan'
  | 'wakaf'
  | 'yatim-dhuafa'
  | 'pangan'
  | 'zakat';

export interface CampaignUpdate {
  id: string;
  date: string;
  title: string;
  content: string;
  image?: string;
}

export interface BudgetBreakdown {
  item: string;
  cost: number;
}

export interface DonorItem {
  id: string;
  name: string;
  isAnonymous: boolean;
  amount: number;
  date: string;
  prayer?: string;
  avatar?: string;
}

export interface Campaign {
  id: string;
  title: string;
  slug: string;
  category: CategoryId;
  categoryLabel: string;
  image: string;
  targetAmount: number;
  collectedAmount: number;
  donorCount: number;
  daysLeft: number;
  isUrgent?: boolean;
  isVerified: boolean;
  location: string;
  organizer: string;
  organizerRole: string;
  organizerAvatar: string;
  summary: string;
  story: string[];
  updates: CampaignUpdate[];
  budgetBreakdown: BudgetBreakdown[];
  recentDonors: DonorItem[];
}

export type PaymentMethodType = 
  | 'qris'
  | 'va_bsi'
  | 'va_bca'
  | 'va_mandiri'
  | 'va_bri'
  | 'va_bni'
  | 'va_permata'
  | 'credit_card'
  | 'gopay'
  | 'ovo'
  | 'dana'
  | 'shopeepay'
  | 'alfamart';

export interface PaymentMethodOption {
  id: PaymentMethodType;
  name: string;
  category: 'qris' | 'va' | 'ewallet' | 'card' | 'retail';
  icon: string;
  accountNumber?: string;
  accountName?: string;
  fee: number;
  instructions: string[];
}

export type GatewayProviderType = 'midtrans' | 'xendit' | 'direct';

export interface PaymentGatewayConfig {
  activeProvider: GatewayProviderType | 'smart';
  isProduction: boolean;
  midtrans: {
    clientKey: string;
    serverKey: string;
    merchantId: string;
  };
  xendit: {
    publicKey: string;
    secretKey: string;
    webhookToken: string;
  };
}

export interface CompletedTransaction {
  transactionId: string;
  invoiceNumber: string;
  campaignId: string;
  campaignTitle: string;
  amount: number;
  uniqueCode: number;
  totalPayment: number;
  donorName: string;
  isAnonymous: boolean;
  donorEmail: string;
  donorPhone: string;
  prayer?: string;
  paymentMethod: PaymentMethodType;
  paymentMethodName: string;
  vaNumber?: string;
  qrCodeData?: string;
  createdAt: string;
  expiredAt: string;
  status: 'pending' | 'verified';
  gatewayProvider?: GatewayProviderType;
  gatewayTransactionId?: string;
  gatewayPaymentUrl?: string;
  gatewaySnapToken?: string;
}

export interface PrayerItem {
  id: string;
  donorName: string;
  isAnonymous: boolean;
  campaignTitle: string;
  prayerText: string;
  aamiinCount: number;
  hasAamiined?: boolean;
  createdAt: string;
  amount?: number;
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  iconName: string;
  description: string;
  count: number;
}
