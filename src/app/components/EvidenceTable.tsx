import { Upload, Eye } from 'lucide-react';

interface Evidence {
  requirement: string;
  responsible: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  dueDate: string;
  action: 'Upload' | 'View';
}

const evidenceData: Evidence[] = [
  {
    requirement: 'Employee Training',
    responsible: 'HR',
    status: 'Pending',
    dueDate: 'June 30',
    action: 'Upload',
  },
  {
    requirement: 'Security Policy',
    responsible: 'IT',
    status: 'Approved',
    dueDate: 'July 10',
    action: 'View',
  },
  {
    requirement: 'Vendor Risk Assessment',
    responsible: 'Procurement',
    status: 'Pending',
    dueDate: 'July 15',
    action: 'Upload',
  },
];

export function EvidenceTable() {
  const getStatusStyle = (status: Evidence['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-700';
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
              Requirement
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
              Responsible
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
              Due Date
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
              Evidence
            </th>
          </tr>
        </thead>
        <tbody>
          {evidenceData.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 text-gray-900">{item.requirement}</td>
              <td className="px-6 py-4 text-gray-700">{item.responsible}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-700">{item.dueDate}</td>
              <td className="px-6 py-4">
                <button className="flex items-center gap-2 text-[#2563EB] hover:text-[#1d4ed8] transition-colors">
                  {item.action === 'Upload' ? (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Upload</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
