import { PaymentDetails, PaymentMethod } from '../types';

export interface PaymentGatewaysInfo {
  id: PaymentMethod;
  name: string;
  shortName: string;
  logoColor: string;
  bgColor: string;
  accountNumber?: string;
  instructions: string;
}

export const ETHIOPIAN_PAYMENT_GATEWAYS: PaymentGatewaysInfo[] = [
  {
    id: 'telebirr',
    name: 'Telebirr (Ethio Telecom)',
    shortName: 'Telebirr',
    logoColor: '#00a651',
    bgColor: '#f0fdf4',
    accountNumber: '1000982741 (MediFlow Merchant ID)',
    instructions: 'Open Telebirr App -> Pay Merchant -> Enter Shortcode 100098 or dial *127#.',
  },
  {
    id: 'cbe_birr',
    name: 'CBE Birr / Commercial Bank of Ethiopia',
    shortName: 'CBE Birr',
    logoColor: '#00529b',
    bgColor: '#eff6ff',
    accountNumber: '1000 4892 1029 3 (CBE Account)',
    instructions: 'Use CBE Mobile Banking app or dial *889# to transfer to account.',
  },
  {
    id: 'chapa',
    name: 'Chapa / LuckyPay Gateway',
    shortName: 'Chapa / LuckyPay',
    logoColor: '#7c3aed',
    bgColor: '#f5f3ff',
    instructions: 'Pay instantly via Card, Telebirr, CBE Birr or Awash Birr checkout popup.',
  },
  {
    id: 'lc_voucher',
    name: 'Letter of Credit (LC) / Govt Voucher',
    shortName: 'LC / Voucher',
    logoColor: '#b45309',
    bgColor: '#fef3c7',
    instructions: 'Upload approved Ministry of Health / Hospital procurement voucher reference.',
  },
];

export function generateTransactionRef(method: PaymentMethod): string {
  const prefixMap: Record<PaymentMethod, string> = {
    telebirr: 'TLB',
    cbe_birr: 'CBE',
    chapa: 'CHP',
    lc_voucher: 'LCR',
    cash_on_delivery: 'COD',
  };
  const prefix = prefixMap[method] || 'TXN';
  const randNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${new Date().getFullYear()}-${randNum}`;
}

export function processMockPayment(
  method: PaymentMethod,
  amount: number,
  customRef?: string
): Promise<PaymentDetails> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const ref = customRef && customRef.trim().length > 3
        ? customRef.toUpperCase()
        : generateTransactionRef(method);

      resolve({
        method,
        status: 'paid',
        transactionRef: ref,
        paidAt: new Date().toISOString(),
        amount,
        receiptUrl: `https://mediflow.et/receipts/${ref}.pdf`,
      });
    }, 1200);
  });
}
