import type {
  Customer,
  CustomerStatus,
  InventorySummary,
  Product,
  ProductStatus,
} from '../types';

export const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function customerStatusLabel(status: CustomerStatus) {
  if (status === 'al-dia') return 'Al dia';
  if (status === 'vencido') return 'Vencido';
  return 'Con saldo';
}

export function customerStatusClasses(status: CustomerStatus) {
  if (status === 'al-dia') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  }

  if (status === 'vencido') {
    return 'border-rose-200 bg-rose-50 text-rose-700';
  }

  return 'border-amber-200 bg-amber-50 text-amber-700';
}

export function productStatusLabel(status: ProductStatus) {
  if (status === 'en-stock') return 'En stock';
  if (status === 'bajo-stock') return 'Bajo stock';
  return 'Agotado';
}

export function productStatusClasses(status: ProductStatus) {
  if (status === 'en-stock') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  }

  if (status === 'bajo-stock') {
    return 'border-amber-200 bg-amber-50 text-amber-700';
  }

  return 'border-rose-200 bg-rose-50 text-rose-700';
}

export function buildWhatsAppLink(customer: Customer) {
  const message =
    customer.pendingBalance > 0
      ? `Hola ${customer.name}, te escribimos desde Casa Textil para recordarte tu saldo pendiente de ${formatCurrency(customer.pendingBalance)}. Si ya realizaste un abono, por favor compartenos el comprobante.`
      : `Hola ${customer.name}, gracias por tu compra en Casa Textil. Tu cuenta esta al dia.`;

  return `https://wa.me/${customer.phone}?text=${encodeURIComponent(message)}`;
}

export function calculateInventorySummary(products: Product[]): InventorySummary {
  return {
    totalProducts: products.length,
    totalUnits: products.reduce((total, product) => total + product.stock, 0),
    lowStockCount: products.filter((product) => product.status === 'bajo-stock')
      .length,
    outOfStockCount: products.filter((product) => product.status === 'agotado')
      .length,
    inventoryValue: products.reduce(
      (total, product) => total + product.stock * product.price,
      0,
    ),
  };
}
