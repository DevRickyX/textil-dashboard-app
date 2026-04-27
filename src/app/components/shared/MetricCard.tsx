import type { LucideIcon } from 'lucide-react';

import { Card, CardContent } from '../ui/card';

type MetricCardProps = {
  label: string;
  value: string;
  caption: string;
  icon: LucideIcon;
  tone: 'teal' | 'amber' | 'rose' | 'slate';
};

export function MetricCard({
  label,
  value,
  caption,
  icon: Icon,
  tone,
}: MetricCardProps) {
  const toneClasses = {
    teal: 'bg-[#e8f5f1] text-[#195f54]',
    amber: 'bg-[#fff2de] text-[#9a6a2e]',
    rose: 'bg-[#fff0ec] text-[#b15f53]',
    slate: 'bg-[#eef2f4] text-[#51626b]',
  };

  return (
    <Card className="rounded-[1.75rem] border-white/70 bg-white/86 shadow-[0_18px_40px_rgba(27,34,46,0.05)]">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-3 text-2xl font-semibold text-[#18322d]">{value}</p>
          <p className="mt-2 text-sm text-slate-400">{caption}</p>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${toneClasses[tone]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
