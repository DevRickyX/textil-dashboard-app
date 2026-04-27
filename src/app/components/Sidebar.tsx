import {
  LayoutDashboard,
  FileCheck,
  ListChecks,
  FolderOpen,
  CheckSquare,
  ClipboardList,
  FileText,
  Users,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem = 'Dashboard' }: SidebarProps) {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Standards', icon: FileCheck },
    { name: 'Requirements', icon: ListChecks },
    { name: 'Evidence', icon: FolderOpen },
    { name: 'Tasks', icon: CheckSquare },
    { name: 'Audits', icon: ClipboardList },
    { name: 'Reports', icon: FileText },
    { name: 'Users', icon: Users },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-[260px] bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-[#2563EB]">AuditFlow</h1>
      </div>
      <nav className="flex-1 px-3 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.name === activeItem;
          return (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-[#2563EB] text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
