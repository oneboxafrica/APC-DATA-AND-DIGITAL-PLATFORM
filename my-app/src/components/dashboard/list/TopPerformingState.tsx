import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer } from 'recharts';
import { EllipsisVertical, X } from 'lucide-react';

const programTypes = [
  'Early Childhood Education',
  'Primary Education',
  'Secondary Education',
  'Special Education',
  'STEM Education',
  'Arts & Humanities',
  'Vocational Training',
  'Adult Education'
];

const categories = [
  'Full-time Teachers',
  'Part-time Teachers',
  'Contract Teachers',
  'Volunteer Teachers',
  'Student Teachers',
  'Retired Teachers'
];

const TopPerformingState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<'program' | 'category' | 'date'>('program');
  
  // Filter states
  const [selectedProgramType, setSelectedProgramType] = useState('Primary Education');
  const [selectedCategory, setSelectedCategory] = useState('Full-time Teachers');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');
  
  // Temporary filter states (for modal)
  const [tempProgramType, setTempProgramType] = useState('Primary Education');
  const [tempCategory, setTempCategory] = useState('Full-time Teachers');
  const [tempStartDate, setTempStartDate] = useState('2024-01-01');
  const [tempEndDate, setTempEndDate] = useState('2024-12-31');
  const [tempFilterType, setTempFilterType] = useState<'program' | 'category' | 'date'>('program');

  const getTopPerformingData = () => {
    // Simulate different data based on filters
    const states = ['Lagos', 'Rivers', 'FCT', 'Osun', 'Kogi', 'Benue'];
    return states.map(state => ({
      name: state,
      value: Math.floor(Math.random() * 300) + 150,
      color: '#19488A'
    })).sort((a, b) => b.value - a.value);
  };

  const [data, setData] = useState(getTopPerformingData());

  const handleApplyFilter = () => {
    setSelectedProgramType(tempProgramType);
    setSelectedCategory(tempCategory);
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setFilterType(tempFilterType);
    setData(getTopPerformingData());
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setTempProgramType(selectedProgramType);
    setTempCategory(selectedCategory);
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setTempFilterType(filterType);
    setIsModalOpen(false);
  };

  const formatDateRange = (start: string, end: string) => {
    const startFormatted = new Date(start).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    const endFormatted = new Date(end).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    return `${startFormatted} - ${endFormatted}`;
  };

  const getActiveFilterDisplay = () => {
    if (filterType === 'program') return selectedProgramType;
    if (filterType === 'category') return selectedCategory;
    return formatDateRange(startDate, endDate);
  };

  return (
    <div className="w-full bg-white rounded-lg border shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-normal text-gray-700">Top Performing State</h3>
            <p className="text-gray-500 text-sm mt-1 font-extralight">by numbers of teachers trained</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            title='Filter data' 
            className="text-gray-400 hover:text-gray-600"
          >
            <EllipsisVertical size={20} />
          </button>
        </div>

        {/* Active Filter Display */}
        <div className="mt-3 mb-4">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
            {getActiveFilterDisplay()}
          </span>
        </div>
      </div>

      <div className="px-6 pb-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis 
              type="number" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(value) => `${value / 100}%`}
              domain={[0, 500]}
              ticks={[0, 150, 300, 450]}
            />
            <YAxis 
              className='text-start'
              type="category" 
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              width={48}
            />
            <Bar 
              dataKey="value" 
              radius={[0, 8, 8, 0]}
              barSize={24}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filter Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[85vh] overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Filter Options</h2>
                <p className="text-sm text-gray-500 mt-1">Choose one filter type</p>
              </div>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600"
                title="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)] space-y-6">
              {/* Filter Type Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Select Filter Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setTempFilterType('program')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      tempFilterType === 'program'
                        ? 'border-blue-500 bg-blue-50 text-blue-900 font-semibold'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Program Type
                  </button>
                  <button
                    onClick={() => setTempFilterType('category')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      tempFilterType === 'category'
                        ? 'border-blue-500 bg-blue-50 text-blue-900 font-semibold'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Category
                  </button>
                  <button
                    onClick={() => setTempFilterType('date')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      tempFilterType === 'date'
                        ? 'border-blue-500 bg-blue-50 text-blue-900 font-semibold'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Date Range
                  </button>
                </div>
              </div>

              {/* Program Type Filter */}
              {tempFilterType === 'program' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Program Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {programTypes.map((type) => {
                      const isSelected = tempProgramType === type;
                      return (
                        <label
                          key={type}
                          className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            isSelected
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="programType"
                            checked={isSelected}
                            onChange={() => setTempProgramType(type)}
                            className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                          />
                          <span className={`text-sm ${isSelected ? 'font-semibold text-blue-900' : 'text-gray-700'}`}>
                            {type}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Category Filter */}
              {tempFilterType === 'category' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Category
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {categories.map((cat) => {
                      const isSelected = tempCategory === cat;
                      return (
                        <label
                          key={cat}
                          className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            isSelected
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="category"
                            checked={isSelected}
                            onChange={() => setTempCategory(cat)}
                            className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                          />
                          <span className={`text-sm ${isSelected ? 'font-semibold text-blue-900' : 'text-gray-700'}`}>
                            {cat}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Date Range Filter */}
              {tempFilterType === 'date' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Date Range
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">Start Date</label>
                      <input
                      title='date'
                        type="date"
                        value={tempStartDate}
                        onChange={(e) => setTempStartDate(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">End Date</label>
                      <input
                      title='date'
                        type="date"
                        value={tempEndDate}
                        onChange={(e) => setTempEndDate(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyFilter}
                className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopPerformingState;