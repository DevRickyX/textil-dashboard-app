import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

import type { PurchaseType } from '../../types';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

type CustomerFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    document: string;
    phone: string;
    city: string;
    neighborhood: string;
    purchaseType: PurchaseType;
    notes: string;
  }) => void;
};

const initialForm = {
  name: '',
  document: '',
  phone: '',
  city: '',
  neighborhood: '',
  purchaseType: 'contado' as PurchaseType,
  notes: '',
};

export function CustomerFormDialog({
  open,
  onOpenChange,
  onSubmit,
}: CustomerFormDialogProps) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open) {
      setForm(initialForm);
    }
  }, [open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-[2rem] border-white/70 bg-[#fcfaf7] p-0 sm:max-w-2xl">
        <div className="border-b border-[#ebe3d6] px-6 py-6">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#1b312d]">
              Crear cliente
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 text-slate-500">
              Registra la informacion principal para su ficha y seguimiento comercial.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-4 px-6 py-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="customerName">Nombre completo</label>
              <Input
                id="customerName"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="Ej. Luisa Fernanda Mesa"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="customerDocument">Documento</label>
              <Input
                id="customerDocument"
                value={form.document}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    document: event.target.value,
                  }))
                }
                placeholder="Cedula"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="customerPhone">Celular</label>
              <Input
                id="customerPhone"
                value={form.phone}
                onChange={(event) =>
                  setForm((current) => ({ ...current, phone: event.target.value }))
                }
                placeholder="573001112233"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="customerCity">Ciudad</label>
              <Input
                id="customerCity"
                value={form.city}
                onChange={(event) =>
                  setForm((current) => ({ ...current, city: event.target.value }))
                }
                placeholder="Medellin"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="customerNeighborhood">Barrio</label>
              <Input
                id="customerNeighborhood"
                value={form.neighborhood}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    neighborhood: event.target.value,
                  }))
                }
                placeholder="Laureles"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="purchaseType">Tipo de compra</label>
              <select
                id="purchaseType"
                className="border-input bg-input-background h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                value={form.purchaseType}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    purchaseType: event.target.value as PurchaseType,
                  }))
                }
              >
                <option value="contado">Contado</option>
                <option value="credito-mixto">Credito parcial</option>
                <option value="credito-total">Credito total</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="customerNotes">Notas</label>
            <Textarea
              id="customerNotes"
              value={form.notes}
              onChange={(event) =>
                setForm((current) => ({ ...current, notes: event.target.value }))
              }
              placeholder="Referencias, acuerdos de pago o informacion relevante."
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button className="h-11 rounded-xl bg-[#1c665b] text-white hover:bg-[#19594f]">
              Guardar cliente
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
