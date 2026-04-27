import { Boxes, LogOut, PackagePlus, UserRoundPlus, Users } from 'lucide-react';

import type { ModuleKey } from '../../types';
import { Button } from '../ui/button';

type AppHeaderProps = {
  activeModule: ModuleKey;
  onCreateCustomer: () => void;
  onCreateProduct: () => void;
  onLogout: () => void;
};

const moduleCopy = {
  clientes: {
    eyebrow: 'Modulo activo',
    title: 'Clientes, saldos y seguimiento',
    description:
      'Consulta fichas de cliente, saldos pendientes, historial de compras y accesos rapidos para contacto.',
  },
  inventario: {
    eyebrow: 'Modulo activo',
    title: 'Inventario y productos',
    description:
      'Organiza el catalogo, revisa stock disponible, identifica agotados y consulta la ficha tecnica de cada referencia.',
  },
};

export function AppHeader({
  activeModule,
  onCreateCustomer,
  onCreateProduct,
  onLogout,
}: AppHeaderProps) {
  const copy = moduleCopy[activeModule];

  return (
    <header className="rounded-[2rem] border border-white/70 bg-white/82 px-5 py-5 shadow-[0_18px_50px_rgba(27,34,46,0.06)] backdrop-blur sm:px-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8d7f6d]">
            {copy.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl leading-tight text-[#1c2f2c] sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
            {copy.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="h-11 rounded-xl border-[#dfd6c8] bg-white/70"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesion
          </Button>

          {activeModule === 'clientes' ? (
            <Button
              className="h-11 rounded-xl bg-[#1d675d] text-white hover:bg-[#18594f]"
              onClick={onCreateCustomer}
            >
              <UserRoundPlus className="h-4 w-4" />
              Crear cliente
            </Button>
          ) : (
            <Button
              className="h-11 rounded-xl bg-[#1d675d] text-white hover:bg-[#18594f]"
              onClick={onCreateProduct}
            >
              <PackagePlus className="h-4 w-4" />
              Crear producto
            </Button>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#e9e1d4] bg-[#fcfaf7] px-4 py-2 text-sm text-slate-600">
          <Users className="h-4 w-4 text-[#1d675d]" />
          Clientes
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#e9e1d4] bg-[#fcfaf7] px-4 py-2 text-sm text-slate-600">
          <Boxes className="h-4 w-4 text-[#1d675d]" />
          Inventario
        </div>
      </div>
    </header>
  );
}
