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
}

export interface VendorOffer {
  id: string | number;
  name: string;
  position: number;
  symbol: string;
  mass: number;
  status?: 'pending' | 'accepted' | 'declined';
}
