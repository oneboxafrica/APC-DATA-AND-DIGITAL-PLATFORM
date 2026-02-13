import { useState } from 'react';

export default function RecentActivities() {
  const [activeTab, setActiveTab] = useState('activity');

  const activities = [
    {
      title: 'Android app development',
      description: 'Rachel Green added a new task in iOS app development',
      time: '1 hour ago'
    },
    {
      title: 'E-commerce platform',
      description: 'Anna Smith added a new task in Data analytics tool',
      time: '2 hours ago'
    },
    {
      title: 'iOS app development',
      description: 'John Bushmill added a new task in iOS app development',
      time: '3 hours ago'
    },
    {
      title: 'Marketing website',
      description: 'Rachel Green added a new task in iOS app development',
      time: '4 hours ago'
    },
    {
      title: 'iOS app development',
      description: 'Anna Smith added a new task in Data analytics tool',
      time: '5 hours ago'
    },
  ];

  const updates = [
    {
      title: 'Mobile app redesign',
      description: 'Sarah Johnson updated the design mockups for review',
      time: '30 minutes ago'
    },
    {
      title: 'Backend API development',
      description: 'Michael Chen completed the authentication module',
      time: '1 hour ago'
    },
    {
      title: 'Marketing campaign',
      description: 'Emma Wilson updated the social media calendar',
      time: '2 hours ago'
    },
    {
      title: 'Database optimization',
      description: 'David Lee improved query performance by 40%',
      time: '3 hours ago'
    },
    {
      title: 'User testing results',
      description: 'Lisa Anderson shared findings from beta testing',
      time: '4 hours ago'
    },
  ];

  const displayData = activeTab === 'activity' ? activities : updates;

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h2>
      
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('activity')}
          className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${
            activeTab === 'activity'
              ? 'text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Incoming
          {activeTab === 'activity' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('update')}
          className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${
            activeTab === 'update'
              ? 'text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
         New
          {activeTab === 'update' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>
      </div>

      <div className="space-y-6">
        {displayData.map((activity, index) => (
          <div key={index} className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {activity.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-1">
                {activity.description}
              </p>
            </div>
            <span className="text-sm text-gray-400 whitespace-nowrap ml-4">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}