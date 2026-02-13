
import { EllipsisVertical} from 'lucide-react';

const UserAnalysisDashboard = () => {


  // User data
  const users = [
    {
      id: 1,
      name: 'Jordan Stevenson',
      email: 'jordan.stevenson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan1',
      role: 'Admin',
      status: 'Pending'
    },
    {
      id: 2,
      name: '',
      email: 'jordan.stevenson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan2',
      role: 'Admin',
      status: 'Pending'
    },
    {
      id: 3,
      name: 'Jordan Stevenson',
      email: 'jordan.stevenson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan3',
      role: 'Admin',
      status: 'Pending'
    }
  ];

  



  return (
    <div className=" bg-gray-50 p-2">
      {/* Header */}
      <div className="mb-8 px-4">
        <h1 className="text-lg md:text-2xl font-medium  " ></h1>
        <p className="text-gray-500 text-sm mt-1 font-extralight">Weekly training performance report</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* User Table Section - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
        
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USER</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROLE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-900">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                        {user.status}
                      </span>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         
        </div>

        {/* New Users Card - Takes 1 column */}
        <div className="bg-white rounded-lg shadow-sm border px-4 py-10">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">New Users</h3>
            <button title='more options' className="text-gray-400 hover:text-gray-600">
              <EllipsisVertical size={20} />
            </button>
          </div>

<div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center gap-3  hover:bg-gray-50 rounded-lg transition-colors">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalysisDashboard;