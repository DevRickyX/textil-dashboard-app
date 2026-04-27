import { useState } from 'react';
import type { FormEvent } from 'react';

import { AuthScreen } from './components/auth/AuthScreen';
import { CustomerFormDialog } from './components/customers/CustomerFormDialog';
import { CustomersView } from './components/customers/CustomersView';
import { ProductFormDialog } from './components/inventory/ProductFormDialog';
import { InventoryView } from './components/inventory/InventoryView';
import { AppHeader } from './components/layout/AppHeader';
import { AppSidebar } from './components/layout/AppSidebar';
import { initialCustomers, initialProducts } from './data/mock-data';
import { calculateInventorySummary } from './lib/format';
import type {
  AuthMode,
  Customer,
  ModuleKey,
  Product,
  ProductStatus,
  PurchaseType,
} from './types';

function deriveProductStatus(stock: number): ProductStatus {
  if (stock <= 0) {
    return 'agotado';
  }

  if (stock <= 5) {
    return 'bajo-stock';
  }

  return 'en-stock';
}

export default function App() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeModule, setActiveModule] = useState<ModuleKey>('clientes');
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCustomerId, setSelectedCustomerId] = useState(
    initialCustomers[0]?.id ?? '',
  );
  const [selectedProductId, setSelectedProductId] = useState(
    initialProducts[0]?.id ?? '',
  );
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  const selectedCustomer =
    customers.find((customer) => customer.id === selectedCustomerId) ??
    customers[0];

  const selectedProduct =
    products.find((product) => product.id === selectedProductId) ?? products[0];

  const customerSummary = {
    totalCustomers: customers.length,
    customersWithBalance: customers.filter(
      (customer) => customer.pendingBalance > 0,
    ).length,
    overdueCustomers: customers.filter((customer) => customer.status === 'vencido')
      .length,
    portfolioBalance: customers.reduce(
      (total, customer) => total + customer.pendingBalance,
      0,
    ),
  };

  const inventorySummary = calculateInventorySummary(products);

  function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsAuthenticated(true);
  }

  function handleCreateCustomer(data: {
    name: string;
    document: string;
    phone: string;
    city: string;
    neighborhood: string;
    purchaseType: PurchaseType;
    notes: string;
  }) {
    const createdCustomer: Customer = {
      id: `cl-${Date.now()}`,
      name: data.name,
      document: data.document,
      phone: data.phone,
      city: data.city,
      neighborhood: data.neighborhood,
      status: 'al-dia',
      pendingBalance: 0,
      totalPurchased: 0,
      lastPayment: 'Sin pagos registrados',
      nextReminder: 'Sin recordatorio',
      purchaseType: data.purchaseType,
      notes: data.notes || 'Cliente creado recientemente.',
    };

    setCustomers((currentCustomers) => [createdCustomer, ...currentCustomers]);
    setSelectedCustomerId(createdCustomer.id);
    setIsCustomerDialogOpen(false);
  }

  function handleCreateProduct(data: {
    name: string;
    sku: string;
    category: string;
    material: string;
    color: string;
    size: string;
    stock: number;
    price: number;
    cost: number;
    description: string;
    location: string;
    availableForCredit: boolean;
  }) {
    const createdProduct: Product = {
      id: `pr-${Date.now()}`,
      name: data.name,
      sku: data.sku,
      category: data.category,
      material: data.material,
      color: data.color,
      size: data.size,
      stock: data.stock,
      status: deriveProductStatus(data.stock),
      price: data.price,
      cost: data.cost,
      location: data.location,
      description: data.description || 'Producto agregado al inventario.',
      availableForCredit: data.availableForCredit,
      lastMovement: 'Ingreso inicial',
    };

    setProducts((currentProducts) => [createdProduct, ...currentProducts]);
    setSelectedProductId(createdProduct.id);
    setIsProductDialogOpen(false);
  }

  if (!isAuthenticated) {
    return (
      <AuthScreen
        authMode={authMode}
        onAuthModeChange={setAuthMode}
        onSubmit={handleAuthSubmit}
      />
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[linear-gradient(180deg,_#f7f3ec_0%,_#f3efe7_42%,_#eef6f3_100%)] text-slate-900">
        <div className="mx-auto grid min-h-screen max-w-[1600px] gap-6 p-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:p-6">
          <AppSidebar
            activeModule={activeModule}
            customerSummary={customerSummary}
            inventorySummary={inventorySummary}
            onModuleChange={setActiveModule}
          />

          <main className="space-y-6">
            <AppHeader
              activeModule={activeModule}
              onCreateCustomer={() => setIsCustomerDialogOpen(true)}
              onCreateProduct={() => setIsProductDialogOpen(true)}
              onLogout={() => setIsAuthenticated(false)}
            />

            {activeModule === 'clientes' ? (
              <CustomersView
                customers={customers}
                selectedCustomer={selectedCustomer}
                summary={customerSummary}
                onSelectCustomer={setSelectedCustomerId}
              />
            ) : (
              <InventoryView
                products={products}
                selectedProduct={selectedProduct}
                summary={inventorySummary}
                onSelectProduct={setSelectedProductId}
              />
            )}
          </main>
        </div>
      </div>

      <CustomerFormDialog
        open={isCustomerDialogOpen}
        onOpenChange={setIsCustomerDialogOpen}
        onSubmit={handleCreateCustomer}
      />

      <ProductFormDialog
        open={isProductDialogOpen}
        onOpenChange={setIsProductDialogOpen}
        onSubmit={handleCreateProduct}
      />
    </>
  );
}
