import { AlertTriangle, Archive, Boxes, CircleDollarSign, Layers3, PackageSearch } from 'lucide-react';
import { useState } from 'react';

import { formatCurrency, productStatusClasses, productStatusLabel } from '../../lib/format';
import type { InventorySummary, Product } from '../../types';
import { MetricCard } from '../shared/MetricCard';
import { Badge } from '../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

type InventoryViewProps = {
  products: Product[];
  selectedProduct: Product;
  summary: InventorySummary;
  onSelectProduct: (productId: string) => void;
};

export function InventoryView({
  products,
  selectedProduct,
  summary,
  onSelectProduct,
}: InventoryViewProps) {
  const [search, setSearch] = useState('');
  const [onlyLowStock, setOnlyLowStock] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = [
      product.name,
      product.sku,
      product.category,
      product.color,
    ]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase());

    if (!matchesSearch) {
      return false;
    }

    if (onlyLowStock && product.status === 'en-stock') {
      return false;
    }

    return true;
  });

  return (
    <>
      <section className="grid gap-4 xl:grid-cols-4">
        <MetricCard
          label="Productos"
          value={summary.totalProducts.toString()}
          caption="Referencias activas"
          icon={Boxes}
          tone="teal"
        />
        <MetricCard
          label="Unidades disponibles"
          value={summary.totalUnits.toString()}
          caption="Stock total en bodega"
          icon={Layers3}
          tone="amber"
        />
        <MetricCard
          label="Valor del inventario"
          value={formatCurrency(summary.inventoryValue)}
          caption="Calculado con precio de venta"
          icon={CircleDollarSign}
          tone="rose"
        />
        <MetricCard
          label="Alertas"
          value={`${summary.lowStockCount + summary.outOfStockCount}`}
          caption="Bajo stock y agotados"
          icon={AlertTriangle}
          tone="slate"
        />
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden rounded-[2rem] border-white/70 bg-white/88 shadow-[0_18px_50px_rgba(27,34,46,0.06)]">
          <CardHeader className="gap-5 border-b border-[#ebe3d6] pb-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle className="text-2xl text-[#1c302c]">
                  Catalogo de productos
                </CardTitle>
                <CardDescription className="mt-2 text-sm leading-6 text-slate-500">
                  Revisa cada referencia por SKU, categoria, stock y valor comercial.
                </CardDescription>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="h-11 min-w-[260px] rounded-xl"
                  placeholder="Buscar producto..."
                />
                <div className="flex items-center gap-3 rounded-xl border border-[#e9e1d4] bg-[#fcfaf7] px-4">
                  <span className="text-sm font-medium text-slate-600">
                    Solo alertas
                  </span>
                  <Switch
                    checked={onlyLowStock}
                    onCheckedChange={setOnlyLowStock}
                    aria-label="Mostrar solo productos con alertas de stock"
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#fbf8f2] hover:bg-[#fbf8f2]">
                  <TableHead className="pl-6">Producto</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    className={`cursor-pointer ${
                      selectedProduct.id === product.id ? 'bg-[#f7f4ee]' : 'bg-white'
                    }`}
                    onClick={() => onSelectProduct(product.id)}
                  >
                    <TableCell className="pl-6">
                      <div>
                        <p className="font-semibold text-[#213330]">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.color}</p>
                      </div>
                    </TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{formatCurrency(product.price)}</TableCell>
                    <TableCell>
                      <Badge className={productStatusClasses(product.status)}>
                        {productStatusLabel(product.status)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="overflow-hidden rounded-[2rem] border-white/70 bg-white/88 shadow-[0_18px_50px_rgba(27,34,46,0.06)]">
            <CardHeader className="gap-4 border-b border-[#ebe3d6] pb-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl text-[#1b312d]">
                    Ficha tecnica
                  </CardTitle>
                  <CardDescription className="mt-2 text-sm leading-6 text-slate-500">
                    Vista rapida del producto seleccionado.
                  </CardDescription>
                </div>
                <Badge className={productStatusClasses(selectedProduct.status)}>
                  {productStatusLabel(selectedProduct.status)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8d7f6d]">
                  Producto
                </p>
                <h3 className="mt-2 text-2xl text-[#17322d]">{selectedProduct.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <DetailPill label="SKU" value={selectedProduct.sku} />
                <DetailPill label="Categoria" value={selectedProduct.category} />
                <DetailPill label="Material" value={selectedProduct.material} />
                <DetailPill label="Color" value={selectedProduct.color} />
                <DetailPill label="Medida" value={selectedProduct.size} />
                <DetailPill label="Ubicacion" value={selectedProduct.location} />
              </div>

              <div className="rounded-[1.6rem] border border-dashed border-[#d8cfbf] bg-[#fbf8f2] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8f7b59]">
                      Control de stock
                    </p>
                    <p className="mt-2 text-xl text-[#1c2f2c]">
                      Resumen del producto
                    </p>
                  </div>
                  <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#e7dccd] bg-white">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(28,102,91,0.12),_transparent_65%)]" />
                    <Archive className="relative h-5 w-5 text-[#1c665b]" />
                  </div>
                </div>

                <div className="mt-6 space-y-4 text-sm">
                  <TicketRow label="Stock actual" value={`${selectedProduct.stock} unidades`} />
                  <TicketRow label="Costo" value={formatCurrency(selectedProduct.cost)} />
                  <TicketRow label="Precio de venta" value={formatCurrency(selectedProduct.price)} />
                  <TicketRow
                    label="Venta a credito"
                    value={selectedProduct.availableForCredit ? 'Disponible' : 'Solo contado'}
                  />
                  <div className="border-t border-dashed border-[#d7cebf] pt-4">
                    <TicketRow label="Ultimo movimiento" value={selectedProduct.lastMovement} strong />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-white/70 bg-white/88 shadow-[0_18px_50px_rgba(27,34,46,0.06)]">
            <CardHeader className="gap-4 border-b border-[#ebe3d6] pb-5">
              <CardTitle className="text-2xl text-[#1b312d]">
                Alertas de inventario
              </CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-500">
                Prioriza referencias con salida alta o unidades agotadas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-6">
              {products
                .filter((product) => product.status !== 'en-stock')
                .slice(0, 3)
                .map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    className="flex w-full items-center justify-between rounded-2xl border border-[#e8dfd3] bg-[#fcfaf7] px-4 py-4 text-left transition-colors hover:bg-white"
                    onClick={() => onSelectProduct(product.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef6f2] text-[#1d675d]">
                        <PackageSearch className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#203530]">{product.name}</p>
                        <p className="text-sm text-slate-500">
                          {product.stock} unidades | {product.location}
                        </p>
                      </div>
                    </div>
                    <Badge className={productStatusClasses(product.status)}>
                      {productStatusLabel(product.status)}
                    </Badge>
                  </button>
                ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

type DetailPillProps = {
  label: string;
  value: string;
};

function DetailPill({ label, value }: DetailPillProps) {
  return (
    <div className="rounded-[1.4rem] border border-[#e9e2d7] bg-[#fcfaf7] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8f806f]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[#203530]">{value}</p>
    </div>
  );
}

type TicketRowProps = {
  label: string;
  value: string;
  strong?: boolean;
};

function TicketRow({ label, value, strong = false }: TicketRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-500">{label}</span>
      <span className={strong ? 'font-semibold text-[#1d302c]' : 'text-[#324542]'}>
        {value}
      </span>
    </div>
  );
}
