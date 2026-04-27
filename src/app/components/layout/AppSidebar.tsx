import { Boxes, Home, Users, WalletCards } from 'lucide-react';

import type { CustomerSummary, InventorySummary, ModuleKey } from '../../types';
import { formatCurrency } from '../../lib/format';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type AppSidebarProps = {
  activeModule: ModuleKey;
  customerSummary: CustomerSummary;
  inventorySummary: InventorySummary;
  onModuleChange: (module: ModuleKey) => void;
};

const navigationItems = [
  { key: 'clientes' as const, label: 'Clientes', icon: Users },
  { key: 'inventario' as const, label: 'Inventario', icon: Boxes },
];

export function AppSidebar({
  activeModule,
  customerSummary,
  inventorySummary,
  onModuleChange,
}: AppSidebarProps) {
  return (
    <aside className="overflow-hidden rounded-[2rem] border border-white/70 bg-[#143d39] text-white shadow-[0_20px_60px_rgba(19,61,57,0.16)]">
      <div className="border-b border-white/10 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12">
            <Home className="h-5 w-5 text-[#f3c77c]" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-white/60">
              Sistema hogar
            </p>
            <h2 className="mt-1 text-2xl text-white">Casa Textil</h2>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-white/72">
          Una sola sede con control de clientes, inventario y seguimiento comercial.
        </p>
      </div>

      <nav className="space-y-2 px-4 py-6">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === activeModule;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onModuleChange(item.key)}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors ${
                isActive
                  ? 'bg-white text-[#173934]'
                  : 'text-white/72 hover:bg-white/8 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {item.label}
              </span>
              <Badge
                className={
                  isActive
                    ? 'border-[#d8d5cb] bg-[#f8f3ea] text-[#6d6558]'
                    : 'border-white/10 bg-white/10 text-white/70'
                }
              >
                Activo
              </Badge>
            </button>
          );
        })}
      </nav>

      <div className="space-y-4 px-4 pb-6">
        <Card className="border-white/10 bg-white/8 text-white shadow-none">
          <CardHeader className="gap-3 pb-4">
            <CardTitle className="text-base text-white">
              Resumen comercial
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-white/72">
            <div className="flex items-center justify-between">
              <span>Clientes con saldo</span>
              <span className="font-semibold text-white">
                {customerSummary.customersWithBalance}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Cartera pendiente</span>
              <span className="font-semibold text-white">
                {formatCurrency(customerSummary.portfolioBalance)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Productos agotados</span>
              <span className="font-semibold text-white">
                {inventorySummary.outOfStockCount}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[#f7f1e8] text-[#1e312d] shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8efe8] text-[#1c665b]">
                <WalletCards className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a6f45]">
                  Inventario valorizado
                </p>
                <p className="mt-1 text-lg text-[#203530]">
                  {formatCurrency(inventorySummary.inventoryValue)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
