export interface Medicine {
  _id: string;
  Title: string;
  City: string;
  PharmacyName?: string;
  ImageUrl: string;
  Price?: string;
  Discount?: string;
  Description?: string;
  Uses?: string;
  Contraindications?: string[];
  SideEffects?: string[];
  InStock?: boolean;
  Unit?: string;
  ExpiryDate?: string;
  Category?: string;
  isColdChain?: boolean;
  storageTemp?: string; // e.g. "2°C – 8°C"
}

export interface VendorOffer {
  id: string | number;
  name: string;
  position: number;
  symbol: string;
  mass: number;
  status?: 'pending' | 'accepted' | 'declined';
}

export type OrderStatus = 'requested' | 'approved' | 'in_transit' | 'delivered' | 'cancelled';

export type PaymentMethod = 'telebirr' | 'cbe_birr' | 'chapa' | 'lc_voucher' | 'cash_on_delivery';
export type PaymentStatus = 'pending' | 'paid' | 'verified' | 'failed';

export interface PaymentDetails {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionRef?: string;
  paidAt?: string;
  amount: number;
  receiptUrl?: string;
}

export interface OrderItem {
  medicineId: string;
  medicineName: string;
  quantity: number;
  unitPrice: number;
  unit: string;
  isColdChain?: boolean;
}

export interface Order {
  _id: string;
  orderNumber: string;
  pharmacistId: string;
  pharmacistName: string;
  vendorId: string;
  vendorName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentDetails?: PaymentDetails;
  createdAt: string;
  updatedAt: string;
  deliveryAddress: string;
  notes?: string;
  hasColdChainItems?: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'pharmacist' | 'vendor';
  organization: string;
  city: string;
  region: string;
  licenseNumber?: string;
  status: 'active' | 'pending' | 'suspended';
  joinedAt: string;
}

export interface Notification {
  _id: string;
  userId: string;
  type: 'restock_alert' | 'order_update' | 'system' | 'expiry_warning' | 'temperature_alert';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface CartItem {
  medicineId: string;
  medicineName: string;
  vendorName: string;
  unitPrice: number;
  quantity: number;
  unit: string;
  imageUrl: string;
  isColdChain?: boolean;
}

export interface ColdChainPoint {
  time: string;
  temperature: number;
  status: 'safe' | 'warning' | 'breach';
  location: string;
}

export interface ColdChainLog {
  medicineId: string;
  medicineName: string;
  batchNumber: string;
  minTemp: number;
  maxTemp: number;
  targetTemp: string;
  points: ColdChainPoint[];
  lastChecked: string;
  overallStatus: 'safe' | 'warning' | 'breach';
}
