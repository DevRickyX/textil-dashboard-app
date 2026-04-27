interface KPICardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export function KPICard({ title, value, icon }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600">{title}</p>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <p className="text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}
