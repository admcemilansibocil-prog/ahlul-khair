import { PaymentGatewayConfig, GatewayProviderType } from '../types';

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options: {
          onSuccess?: (result: any) => void;
          onPending?: (result: any) => void;
          onError?: (result: any) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

const CONFIG_STORAGE_KEY = 'ahlul_khair_payment_config';

export const DEFAULT_GATEWAY_CONFIG: PaymentGatewayConfig = {
  activeProvider: 'smart',
  isProduction: false,
  midtrans: {
    clientKey: 'SB-Mid-client-demo12345678',
    serverKey: 'SB-Mid-server-demo12345678',
    merchantId: 'G123456789'
  },
  xendit: {
    publicKey: 'xnd_public_development_demo12345678',
    secretKey: 'xnd_development_demo12345678',
    webhookToken: 'xnd_webhook_verification_token'
  }
};

export function getStoredGatewayConfig(): PaymentGatewayConfig {
  try {
    const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_GATEWAY_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Failed to parse gateway config from localStorage', e);
  }
  return DEFAULT_GATEWAY_CONFIG;
}

export function saveStoredGatewayConfig(config: PaymentGatewayConfig): void {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save gateway config', e);
  }
}

export function loadMidtransSnapScript(clientKey: string, isProduction: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    const scriptId = 'midtrans-snap-script';
    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = isProduction
      ? 'https://app.midtrans.com/snap/snap.js'
      : 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', clientKey);
    script.async = true;

    script.onload = () => resolve();
    script.onerror = (err) => reject(err);

    document.head.appendChild(script);
  });
}

export interface CreateTransactionParams {
  orderId: string;
  amount: number;
  campaignId: string;
  campaignTitle: string;
  donorName: string;
  donorEmail?: string;
  donorPhone?: string;
}

export async function requestMidtransSnapToken(
  params: CreateTransactionParams,
  config: PaymentGatewayConfig
): Promise<{ token: string; redirectUrl?: string }> {
  try {
    const response = await fetch('/api/midtrans-create-transaction.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: params.orderId,
        gross_amount: params.amount,
        customer_name: params.donorName,
        customer_email: params.donorEmail,
        customer_phone: params.donorPhone,
        campaign_id: params.campaignId,
        campaign_title: params.campaignTitle,
        server_key: config.midtrans.serverKey,
        is_production: config.isProduction
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.token) {
        return { token: data.token, redirectUrl: data.redirect_url };
      }
    }
  } catch (e) {
    console.warn('PHP API endpoint not available or network error, fallback to simulated token', e);
  }

  return {
    token: 'SNAP-SANDBOX-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    redirectUrl: 'https://app.sandbox.midtrans.com/snap/v2/vtweb/' + Math.random().toString(36).substring(2, 8)
  };
}

export async function requestXenditInvoice(
  params: CreateTransactionParams,
  config: PaymentGatewayConfig
): Promise<{ id: string; invoiceUrl: string; expiryDate: string }> {
  try {
    const response = await fetch('/api/xendit-create-invoice.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        external_id: params.orderId,
        amount: params.amount,
        payer_email: params.donorEmail,
        customer_name: params.donorName,
        customer_phone: params.donorPhone,
        campaign_title: params.campaignTitle,
        secret_key: config.xendit.secretKey
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.invoice_url) {
        return {
          id: data.id || 'xendit_' + Date.now(),
          invoiceUrl: data.invoice_url,
          expiryDate: data.expiry_date || new Date(Date.now() + 86400000).toISOString()
        };
      }
    }
  } catch (e) {
    console.warn('PHP API endpoint error, fallback to simulated Xendit invoice', e);
  }

  return {
    id: 'xen_inv_' + Math.random().toString(36).substring(2, 9),
    invoiceUrl: 'https://checkout.xendit.co/web/' + Math.random().toString(36).substring(2, 10),
    expiryDate: new Date(Date.now() + 86400000).toISOString()
  };
}
