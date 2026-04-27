import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';

type ProductFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
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
  }) => void;
};

const initialForm = {
  name: '',
  sku: '',
  category: '',
  material: '',
  color: '',
  size: '',
  stock: '0',
  price: '',
  cost: '',
  description: '',
  location: '',
  availableForCredit: true,
};

export function ProductFormDialog({
  open,
  onOpenChange,
  onSubmit,
}: ProductFormDialogProps) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open) {
      setForm(initialForm);
    }
  }, [open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      name: form.name,
      sku: form.sku,
      category: form.category,
      material: form.material,
      color: form.color,
      size: form.size,
      stock: Number(form.stock || 0),
      price: Number(form.price || 0),
      cost: Number(form.cost || 0),
      description: form.description,
      location: form.location,
      availableForCredit: form.availableForCredit,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-[2rem] border-white/70 bg-[#fcfaf7] p-0 sm:max-w-3xl">
        <div className="border-b border-[#ebe3d6] px-6 py-6">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#1b312d]">
              Crear producto
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 text-slate-500">
              Registra la ficha tecnica y la informacion clave del inventario.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-4 px-6 py-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="productName">Nombre del producto</label>
              <Input
                id="productName"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="Edredon doble nube"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="productSku">SKU</label>
              <Input
                id="productSku"
                value={form.sku}
                onChange={(event) =>
                  setForm((current) => ({ ...current, sku: event.target.value }))
                }
                placeholder="EDR-DBL-001"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="productCategory">Categoria</label>
              <Input
                id="productCategory"
                value={form.category}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    category: event.target.value,
                  }))
                }
                placeholder="Edredones"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="productLocation">Ubicacion</label>
              <Input
                id="productLocation"
                value={form.location}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    location: event.target.value,
                  }))
                }
                placeholder="Bodega A1"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="productMaterial">Material</label>
              <Input
                id="productMaterial"
                value={form.material}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    material: event.target.value,
                  }))
                }
                placeholder="Microfibra"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="productColor">Color</label>
              <Input
                id="productColor"
                value={form.color}
                onChange={(event) =>
                  setForm((current) => ({ ...current, color: event.target.value }))
                }
                placeholder="Arena"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="productSize">Medida o tamano</label>
              <Input
                id="productSize"
                value={form.size}
                onChange={(event) =>
                  setForm((current) => ({ ...current, size: event.target.value }))
                }
                placeholder="Doble"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="productStock">Stock inicial</label>
              <Input
                id="productStock"
                type="number"
                value={form.stock}
                onChange={(event) =>
                  setForm((current) => ({ ...current, stock: event.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="productPrice">Precio de venta</label>
              <Input
                id="productPrice"
                type="number"
                value={form.price}
                onChange={(event) =>
                  setForm((current) => ({ ...current, price: event.target.value }))
                }
                placeholder="245000"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="productCost">Costo</label>
              <Input
                id="productCost"
                type="number"
                value={form.cost}
                onChange={(event) =>
                  setForm((current) => ({ ...current, cost: event.target.value }))
                }
                placeholder="148000"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-[#e9e1d4] bg-white px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[#203530]">
                Disponible para venta a credito
              </p>
              <p className="text-sm text-slate-500">
                Marca si este producto puede ofrecerse por cuotas.
              </p>
            </div>
            <Switch
              checked={form.availableForCredit}
              onCheckedChange={(checked) =>
                setForm((current) => ({
                  ...current,
                  availableForCredit: checked,
                }))
              }
              aria-label="Disponible para credito"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="productDescription">Descripcion</label>
            <Textarea
              id="productDescription"
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              placeholder="Detalle importante del producto y su presentacion."
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button className="h-11 rounded-xl bg-[#1c665b] text-white hover:bg-[#19594f]">
              Guardar producto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
