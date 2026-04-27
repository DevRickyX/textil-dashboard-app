interface ComplianceStandardCardProps {
  name: string;
  progress: number;
  status?: string;
}

export function ComplianceStandardCard({
  name,
  progress,
  status,
}: ComplianceStandardCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        {status && (
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {status}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-semibold text-gray-900">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-[#2563EB] h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
