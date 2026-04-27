import { BellRing, CircleDollarSign, MapPin, MessageCircleMore, Phone, Users, WalletCards } from 'lucide-react';
import { useState } from 'react';

import { buildWhatsAppLink, customerStatusClasses, customerStatusLabel, formatCurrency } from '../../lib/format';
import type { Customer, CustomerSummary } from '../../types';
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
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

type CustomersViewProps = {
  customers: Customer[];
  selectedCustomer: Customer;
  summary: CustomerSummary;
  onSelectCustomer: (customerId: string) => void;
};

export function CustomersView({
  customers,
  selectedCustomer,
  summary,
  onSelectCustomer,
}: CustomersViewProps) {
  const [search, setSearch] = useState('');
  const [onlyPending, setOnlyPending] = useState(false);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = [customer.name, customer.document, customer.city]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase());

    if (!matchesSearch) {
      return false;
    }

    if (onlyPending && customer.pendingBalance <= 0) {
      return false;
    }

    return true;
  });

  return (
    <>
      <section className="grid gap-4 xl:grid-cols-4">
        <MetricCard
          label="Clientes registrados"
          value={summary.totalCustomers.toString()}
          caption="Base total del negocio"
          icon={Users}
          tone="teal"
        />
        <MetricCard
          label="Clientes con saldo"
          value={summary.customersWithBalance.toString()}
          caption="Seguimiento activo"
          icon={WalletCards}
          tone="amber"
        />
        <MetricCard
          label="Cartera pendiente"
          value={formatCurrency(summary.portfolioBalance)}
          caption="Saldo total por cobrar"
          icon={CircleDollarSign}
          tone="rose"
        />
        <MetricCard
          label="Cartera vencida"
          value={summary.overdueCustomers.toString()}
          caption="Clientes que requieren contacto"
          icon={BellRing}
          tone="slate"
        />
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden rounded-[2rem] border-white/70 bg-white/88 shadow-[0_18px_50px_rgba(27,34,46,0.06)]">
          <CardHeader className="gap-5 border-b border-[#ebe3d6] pb-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle className="text-2xl text-[#1c302c]">
                  Directorio de clientes
                </CardTitle>
                <CardDescription className="mt-2 text-sm leading-6 text-slate-500">
                  Busca por nombre, documento o ciudad y abre la ficha del cliente.
                </CardDescription>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="h-11 min-w-[260px] rounded-xl"
                  placeholder="Buscar cliente..."
                />

                <div className="flex items-center gap-3 rounded-xl border border-[#e9e1d4] bg-[#fcfaf7] px-4">
                  <span className="text-sm font-medium text-slate-600">
                    Solo con saldo
                  </span>
                  <Switch
                    checked={onlyPending}
                    onCheckedChange={setOnlyPending}
                    aria-label="Mostrar solo clientes con saldo pendiente"
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#fbf8f2] hover:bg-[#fbf8f2]">
                  <TableHead className="pl-6">Cliente</TableHead>
                  <TableHead>Ciudad</TableHead>
                  <TableHead>Compra</TableHead>
                  <TableHead>Saldo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="pr-6 text-right">Accion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    className={`cursor-pointer ${
                      selectedCustomer.id === customer.id ? 'bg-[#f7f4ee]' : 'bg-white'
                    }`}
                    onClick={() => onSelectCustomer(customer.id)}
                  >
                    <TableCell className="pl-6">
                      <div>
                        <p className="font-semibold text-[#213330]">{customer.name}</p>
                        <p className="text-xs text-slate-500">CC {customer.document}</p>
                      </div>
                    </TableCell>
                    <TableCell>{customer.city}</TableCell>
                    <TableCell className="capitalize">
                      {customer.purchaseType.replace('-', ' ')}
                    </TableCell>
                    <TableCell>{formatCurrency(customer.pendingBalance)}</TableCell>
                    <TableCell>
                      <Badge className={customerStatusClasses(customer.status)}>
                        {customerStatusLabel(customer.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <a
                        href={buildWhatsAppLink(customer)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[#dcd3c6] px-3 py-1.5 text-sm font-medium text-[#18463f] transition-colors hover:bg-[#f3efe7]"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <MessageCircleMore className="h-4 w-4" />
                        WhatsApp
                      </a>
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
                    Ficha de cliente
                  </CardTitle>
                  <CardDescription className="mt-2 text-sm leading-6 text-slate-500">
                    La informacion registrada alimenta este resumen comercial.
                  </CardDescription>
                </div>
                <Badge className={customerStatusClasses(selectedCustomer.status)}>
                  {customerStatusLabel(selectedCustomer.status)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8d7f6d]">
                  Cliente seleccionado
                </p>
                <h3 className="mt-2 text-2xl text-[#17322d]">
                  {selectedCustomer.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {selectedCustomer.notes}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <QuickInfo
                  icon={Phone}
                  label="Celular"
                  value={selectedCustomer.phone}
                />
                <QuickInfo
                  icon={MapPin}
                  label="Ubicacion"
                  value={`${selectedCustomer.city} | ${selectedCustomer.neighborhood}`}
                />
                <QuickInfo
                  icon={WalletCards}
                  label="Saldo pendiente"
                  value={formatCurrency(selectedCustomer.pendingBalance)}
                />
                <QuickInfo
                  icon={BellRing}
                  label="Proximo recordatorio"
                  value={selectedCustomer.nextReminder}
                />
              </div>

              <Separator />

              <div className="rounded-[1.6rem] border border-dashed border-[#d8cfbf] bg-[#fbf8f2] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8f7b59]">
                      Resumen de cuenta
                    </p>
                    <p className="mt-2 text-xl text-[#1c2f2c]">
                      Estado actual del cliente
                    </p>
                  </div>
                  <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#e7dccd] bg-white">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(28,102,91,0.12),_transparent_65%)]" />
                    <WalletCards className="relative h-5 w-5 text-[#1c665b]" />
                  </div>
                </div>

                <div className="mt-6 space-y-4 text-sm">
                  <TicketRow
                    label="Compra acumulada"
                    value={formatCurrency(selectedCustomer.totalPurchased)}
                  />
                  <TicketRow label="Ultimo pago" value={selectedCustomer.lastPayment} />
                  <TicketRow
                    label="Modalidad"
                    value={selectedCustomer.purchaseType.replace('-', ' ')}
                  />
                  <div className="border-t border-dashed border-[#d7cebf] pt-4">
                    <TicketRow
                      label="Saldo actual"
                      value={formatCurrency(selectedCustomer.pendingBalance)}
                      strong
                    />
                  </div>
                </div>

                <a
                  href={buildWhatsAppLink(selectedCustomer)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1c665b] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#17574e]"
                >
                  <MessageCircleMore className="h-4 w-4" />
                  Enviar recordatorio por WhatsApp
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

type QuickInfoProps = {
  icon: typeof Phone;
  label: string;
  value: string;
};

function QuickInfo({ icon: Icon, label, value }: QuickInfoProps) {
  return (
    <div className="rounded-[1.4rem] border border-[#e9e2d7] bg-[#fcfaf7] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#edf5f1] text-[#1c665b]">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8f806f]">
            {label}
          </p>
          <p className="mt-1 text-sm font-semibold text-[#203530]">{value}</p>
        </div>
      </div>
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
