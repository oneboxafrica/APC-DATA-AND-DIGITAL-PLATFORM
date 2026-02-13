import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
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

const COLORS = ['#2B7F75', '#FFD66B'];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, outerRadius, startAngle, endAngle, midAngle, fill } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius - 100) * cos;
  const sy = cy + (outerRadius - 100) * sin;

  return (
    <Sector
      cx={sx}
      cy={sy}
      cornerRadius={5}
      innerRadius={50}
      outerRadius={120}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};


interface GenderDistributionProps {
  className?: string;
}

export default function GenderDistribution({ className }: GenderDistributionProps) {
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

const getGenderData = (_programType: string, _category: string, _start: string, _end: string) => {
  const maleValue = Math.floor(Math.random() * 30) + 40;
  const femaleValue = 100 - maleValue;

  return [
    { name: 'Male', value: maleValue },
    { name: 'Female', value: femaleValue },
  ];
};

  const [genderData, setGenderData] = useState(
    getGenderData(selectedProgramType, selectedCategory, startDate, endDate)
  );

 

  const handleApplyFilter = () => {
    setSelectedProgramType(tempProgramType);
    setSelectedCategory(tempCategory);
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setFilterType(tempFilterType);
    setGenderData(getGenderData(tempProgramType, tempCategory, tempStartDate, tempEndDate));
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
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className={`h-full gap-4 ${className || ''}`}>
        <div className='mb-4'>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Gender Distribution</h3>
              <p className="text-gray-500 text-sm mt-1">Distribution of trained teachers</p>
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
          <div className="mt-3">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
              {getActiveFilterDisplay()}
            </span>
          </div>
        </div>
      
        <div className="grid grid-cols-1 gap-8">
          <div>
            <div className="relative h-[300px] w-full after:absolute after:inset-1/2 after:h-20 after:w-20 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-dashed after:border-gray-300">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={100}
                    paddingAngle={5}
                    cornerRadius={10}
                    
                    activeShape={renderActiveShape}
                    
                    stroke="transparent"
                  >
                    {genderData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {genderData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
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
}