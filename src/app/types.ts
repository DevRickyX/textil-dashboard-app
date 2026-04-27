export type AuthMode = 'login' | 'register';
export type ModuleKey = 'clientes' | 'inventario';
export type CustomerStatus = 'al-dia' | 'con-saldo' | 'vencido';
export type PurchaseType = 'contado' | 'credito-mixto' | 'credito-total';
export type ProductStatus = 'en-stock' | 'bajo-stock' | 'agotado';

export type Customer = {
  id: string;
  name: string;
  document: string;
  phone: string;
  city: string;
  neighborhood: string;
  status: CustomerStatus;
  pendingBalance: number;
  totalPurchased: number;
  lastPayment: string;
  nextReminder: string;
  purchaseType: PurchaseType;
  notes: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  material: string;
  color: string;
  size: string;
  stock: number;
  status: ProductStatus;
  price: number;
  cost: number;
  location: string;
  description: string;
  availableForCredit: boolean;
  lastMovement: string;
};

export type CustomerSummary = {
  totalCustomers: number;
  customersWithBalance: number;
  overdueCustomers: number;
  portfolioBalance: number;
};

export type InventorySummary = {
  totalProducts: number;
  totalUnits: number;
  lowStockCount: number;
  outOfStockCount: number;
  inventoryValue: number;
};
