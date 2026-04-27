import type { FormEvent } from 'react';
import { ArrowRight, DoorOpen, Home, ShieldCheck, ShoppingBag, Users } from 'lucide-react';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import type { AuthMode } from '../../types';

type AuthScreenProps = {
  authMode: AuthMode;
  onAuthModeChange: (mode: AuthMode) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const highlights = [
  {
    title: 'Clientes organizados',
    description:
      'Consulta saldo pendiente, historial de compra y recordatorios desde una sola vista.',
    icon: Users,
  },
  {
    title: 'Inventario claro',
    description:
      'Productos con ficha tecnica, stock actual, costo, precio y estado de disponibilidad.',
    icon: ShoppingBag,
  },
  {
    title: 'Acceso simple',
    description:
      'Un ingreso rapido para administrar el negocio desde computador o celular.',
    icon: ShieldCheck,
  },
];

export function AuthScreen({
  authMode,
  onAuthModeChange,
  onSubmit,
}: AuthScreenProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_transparent_28%),linear-gradient(145deg,_#f7f1e8_0%,_#f4ede3_35%,_#ecf5f2_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[#123d38] px-6 py-8 text-white shadow-[0_24px_80px_rgba(18,61,56,0.18)] sm:px-8 lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.16),_transparent_30%),radial-gradient(circle_at_80%_10%,_rgba(233,189,120,0.28),_transparent_22%),linear-gradient(180deg,_rgba(255,255,255,0.05),_transparent_55%)]" />

          <div className="relative flex h-full flex-col">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
                <Home className="h-4 w-4 text-[#f4c97e]" />
                <span className="text-sm font-semibold uppercase tracking-[0.24em]">
                  Casa Textil
                </span>
              </div>
              <Badge className="border-white/10 bg-white/12 text-white">
                Sistema comercial
              </Badge>
            </div>

            <div className="mt-10 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#f2d8aa]">
                Gestion de hogar
              </p>
              <h1 className="max-w-xl text-4xl leading-tight font-semibold sm:text-5xl">
                Ordena clientes, productos y ventas en un mismo lugar.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/78 sm:text-lg">
                Una entrada sobria y elegante para administrar tu negocio de
                almohadas, cobijas, sabanas, cortinas, hamacas y demas prendas
                para el hogar.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <Card
                    key={item.title}
                    className="border-white/10 bg-white/10 text-white backdrop-blur"
                  >
                    <CardHeader className="gap-3 pb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12">
                        <Icon className="h-5 w-5 text-[#f4c97e]" />
                      </div>
                      <CardTitle className="text-base text-white">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-6 text-white/72">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            <div className="mt-auto pt-8">
              <Card className="border-white/10 bg-[#f7f2e8] text-slate-900 shadow-none">
                <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-[#d9cdbb] bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7b6a4b]">
                      Clientes
                    </p>
                    <p className="mt-3 text-xl text-[#183633]">
                      Ficha rapida con saldo, compras y contacto directo.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-[#d9cdbb] bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7b6a4b]">
                      Inventario
                    </p>
                    <p className="mt-3 text-xl text-[#183633]">
                      Catalogo con stock, costo, precio y estado del producto.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="flex items-center">
          <Card className="w-full rounded-[2rem] border-white/70 bg-white/86 shadow-[0_22px_60px_rgba(38,44,56,0.08)] backdrop-blur">
            <CardHeader className="space-y-4 pb-0">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a7b65]">
                    Acceso
                  </p>
                  <CardTitle className="mt-2 text-3xl text-[#1d2d2b]">
                    {authMode === 'login' ? 'Inicia sesion' : 'Crea tu cuenta'}
                  </CardTitle>
                  <CardDescription className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Ingresa con correo y contrasena para administrar el negocio.
                  </CardDescription>
                </div>

                <div className="rounded-full border border-[#e5dccf] bg-[#faf7f1] p-2">
                  <DoorOpen className="h-5 w-5 text-[#21564d]" />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-full border border-[#ece3d7] bg-[#fcfaf7] px-4 py-3">
                <span
                  className={`text-sm font-semibold transition-colors ${
                    authMode === 'login' ? 'text-[#163f39]' : 'text-slate-400'
                  }`}
                >
                  Iniciar sesion
                </span>
                <Switch
                  checked={authMode === 'register'}
                  onCheckedChange={(checked) =>
                    onAuthModeChange(checked ? 'register' : 'login')
                  }
                  aria-label="Alternar entre iniciar sesion y registrarse"
                />
                <span
                  className={`text-sm font-semibold transition-colors ${
                    authMode === 'register' ? 'text-[#163f39]' : 'text-slate-400'
                  }`}
                >
                  Registrarme
                </span>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <form className="space-y-4" onSubmit={onSubmit}>
                {authMode === 'register' ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="businessName">Nombre del negocio</label>
                      <Input id="businessName" placeholder="Casa Textil Hogar" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="ownerName">Administrador</label>
                      <Input id="ownerName" placeholder="Santiago Perez" />
                    </div>
                  </div>
                ) : null}

                <div className="space-y-2">
                  <label htmlFor="email">Correo electronico</label>
                  <Input
                    id="email"
                    type="email"
                    className="h-12"
                    placeholder="admin@casatextil.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password">Contrasena</label>
                  <Input
                    id="password"
                    type="password"
                    className="h-12"
                    placeholder="Minimo 8 caracteres"
                    required
                  />
                </div>

                {authMode === 'register' ? (
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword">Confirmar contrasena</label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="h-12"
                      placeholder="Repite la contrasena"
                      required
                    />
                  </div>
                ) : null}

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-[#1c665b] text-white hover:bg-[#19594f]"
                >
                  {authMode === 'login'
                    ? 'Entrar al sistema'
                    : 'Crear cuenta y continuar'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
