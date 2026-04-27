import { Upload, CheckCircle, RefreshCw } from 'lucide-react';

interface Activity {
  type: 'upload' | 'complete' | 'update';
  user: string;
  action: string;
  time: string;
}

const activities: Activity[] = [
  {
    type: 'upload',
    user: 'John',
    action: 'uploaded "Security Policy.pdf"',
    time: '2 hours ago',
  },
  {
    type: 'complete',
    user: 'Maria',
    action: 'completed "Risk Assessment"',
    time: '4 hours ago',
  },
  {
    type: 'update',
    user: 'IT',
    action: 'updated evidence for ISO 27001',
    time: '6 hours ago',
  },
];

export function ActivityFeed() {
  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'upload':
        return <Upload className="w-4 h-4 text-blue-600" />;
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'update':
        return <RefreshCw className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-3">
            <div className="mt-1">{getIcon(activity.type)}</div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span>{' '}
                {activity.action}
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
