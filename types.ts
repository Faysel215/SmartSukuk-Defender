export enum CryptoType {
  LEGACY_RSA = 'Legacy RSA-2048',
  PQC_KYBER = 'Kyber-1024 (PQC)',
  PQC_DILITHIUM = 'Dilithium-5 (PQC)'
}

export enum SukukType {
  IJARAH = 'Ijarah (Lease)',
  MURABAHAH = 'Murabahah (Cost-Plus)',
  MUDARABAH = 'Mudarabah (Partnership)'
}

export interface SukukAsset {
  id: string;
  name: string;
  type: SukukType;
  value: number; // In USD
  securityLevel: CryptoType;
  issueDate: string;
  maturityDate: string;
  ownershipProof: string; // Hash of the Milkiyah
}

export interface Transaction {
  id: string;
  assetId: string;
  type: 'BUY' | 'SELL' | 'MIGRATE';
  amount: number;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'SECURED';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  WALLET = 'WALLET',
  MIGRATION = 'MIGRATION',
  ADVISOR = 'ADVISOR',
}