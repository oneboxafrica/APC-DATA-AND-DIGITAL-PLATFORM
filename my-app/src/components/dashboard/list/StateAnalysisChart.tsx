import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { EllipsisVertical, X } from 'lucide-react';
import { useState } from 'react';

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo',
  'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna',
  'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

const StateAnalysisDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStates, setSelectedStates] = useState(['Lagos', 'Kano']);
  const [tempSelectedStates, setTempSelectedStates] = useState(['Lagos', 'Kano']);
  
  const [isRadarModalOpen, setIsRadarModalOpen] = useState(false);
  const [selectedRadarStates, setSelectedRadarStates] = useState(['Lagos', 'Kano']);
  const [tempSelectedRadarStates, setTempSelectedRadarStates] = useState(['Lagos', 'Kano']);

  const getBarChartData = (states: string[]) => {
    const stateData = {
      'Lagos': { Teachers: 45000, Training: 38000, Students: 45000 },
      'Kano': { Teachers: 28000, Training: 10000, Students: 28000 },
      'Abuja': { Teachers: 35000, Training: 25000, Students: 40000 },
      'Rivers': { Teachers: 32000, Training: 22000, Students: 35000 },
      'Oyo': { Teachers: 30000, Training: 18000, Students: 32000 },
    };

    const getRandomData = () => ({
      Teachers: Math.floor(Math.random() * 30000) + 20000,
      Training: Math.floor(Math.random() * 20000) + 10000,
      Students: Math.floor(Math.random() * 30000) + 20000,
    });

    return [
      {
        category: 'Teachers',
        [states[0]]: (stateData[states[0] as keyof typeof stateData] || getRandomData()).Teachers,
        [states[1]]: (stateData[states[1] as keyof typeof stateData] || getRandomData()).Teachers,
      },
      {
        category: 'Training',
        [states[0]]: (stateData[states[0] as keyof typeof stateData] || getRandomData()).Training,
        [states[1]]: (stateData[states[1] as keyof typeof stateData] || getRandomData()).Training,
      },
      {
        category: 'Students',
        [states[0]]: (stateData[states[0] as keyof typeof stateData] || getRandomData()).Students,
        [states[1]]: (stateData[states[1] as keyof typeof stateData] || getRandomData()).Students,
      },
    ];
  };

  const getRadarChartData = (states: string[]) => {
    const stateRadarData = {
      'Lagos': { contentQuality: 90, completion: 80, satisfaction: 85, relevance: 70, attendance: 75 },
      'Kano': { contentQuality: 75, completion: 90, satisfaction: 80, relevance: 85, attendance: 70 },
      'Abuja': { contentQuality: 85, completion: 85, satisfaction: 90, relevance: 80, attendance: 80 },
      'Rivers': { contentQuality: 80, completion: 75, satisfaction: 85, relevance: 75, attendance: 85 },
      'Oyo': { contentQuality: 78, completion: 82, satisfaction: 78, relevance: 88, attendance: 72 },
    };

    const getRandomRadarData = () => ({
      contentQuality: Math.floor(Math.random() * 30) + 70,
      completion: Math.floor(Math.random() * 30) + 70,
      satisfaction: Math.floor(Math.random() * 30) + 70,
      relevance: Math.floor(Math.random() * 30) + 70,
      attendance: Math.floor(Math.random() * 30) + 70,
    });

    const state1Data = stateRadarData[states[0] as keyof typeof stateRadarData] || getRandomRadarData();
    const state2Data = stateRadarData[states[1] as keyof typeof stateRadarData] || getRandomRadarData();

    return [
      { month: 'Content Quality', [states[0]]: state1Data.contentQuality, [states[1]]: state2Data.contentQuality },
      { month: 'Facilitation Completion', [states[0]]: state1Data.completion, [states[1]]: state2Data.completion },
      { month: 'Participant Satisfaction', [states[0]]: state1Data.satisfaction, [states[1]]: state2Data.satisfaction },
      { month: 'Relevance', [states[0]]: state1Data.relevance, [states[1]]: state2Data.relevance },
      { month: 'Attendance', [states[0]]: state1Data.attendance, [states[1]]: state2Data.attendance },
    ];
  };

  const [barChartData, setBarChartData] = useState(getBarChartData(selectedStates));
  const [radarData, setRadarData] = useState(getRadarChartData(selectedRadarStates));

  const handleStateToggle = (state: string) => {
    if (tempSelectedStates.includes(state)) {
      if (tempSelectedStates.length > 1) {
        setTempSelectedStates(tempSelectedStates.filter(s => s !== state));
      }
    } else {
      if (tempSelectedStates.length < 2) {
        setTempSelectedStates([...tempSelectedStates, state]);
      } else {
        setTempSelectedStates([tempSelectedStates[1], state]);
      }
    }
  };

  const handleRadarStateToggle = (state: string) => {
    if (tempSelectedRadarStates.includes(state)) {
      if (tempSelectedRadarStates.length > 1) {
        setTempSelectedRadarStates(tempSelectedRadarStates.filter(s => s !== state));
      }
    } else {
      if (tempSelectedRadarStates.length < 2) {
        setTempSelectedRadarStates([...tempSelectedRadarStates, state]);
      } else {
        setTempSelectedRadarStates([tempSelectedRadarStates[1], state]);
      }
    }
  };

  const handleApplyFilter = () => {
    setSelectedStates(tempSelectedStates);
    setBarChartData(getBarChartData(tempSelectedStates));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setTempSelectedStates(selectedStates);
    setIsModalOpen(false);
  };

  const handleApplyRadarFilter = () => {
    setSelectedRadarStates(tempSelectedRadarStates);
    setRadarData(getRadarChartData(tempSelectedRadarStates));
    setIsRadarModalOpen(false);
  };

  const handleCancelRadar = () => {
    setTempSelectedRadarStates(selectedRadarStates);
    setIsRadarModalOpen(false);
  };

  return (
    <div className="px-2">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* State-by-state analysis */}
        <div className="bg-white border-none rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">State-by-state analysis</h3>
              <p className="text-sm text-gray-500">Last 6 Months</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-gray-400 hover:text-gray-600"
              title="Open state selection modal"
            >
              <EllipsisVertical size={20} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={240} className='mt-16'>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey={selectedStates[0]} fill="#8CA3C4" radius={[4, 4, 0, 0]} />
              <Bar dataKey={selectedStates[1]} fill="#19488A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#8CA3C4]"></div>
              <span className="text-gray-600">{selectedStates[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#19488A]"></div>
              <span className="text-gray-600">{selectedStates[1]}</span>
            </div>
          </div>
        </div>

        {/* Training Evaluation */}
        <div className="bg-white border rounded-lg px-2 py-6  shadow-sm ">
          <div className="flex justify-between items-start mb-4 px-6">
            <h3 className="text-lg font-semibold text-gray-900">Training Evaluation</h3>
            <button 
              onClick={() => setIsRadarModalOpen(true)}
              title='Compare states' 
              className="text-gray-400 hover:text-gray-600"
            >
              <EllipsisVertical size={20} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={240} className='lg:mt-16'>
            <RadarChart data={radarData} >
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis  dataKey="month" tick={{ fill: '#999', fontSize: 11 }} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <Radar name={selectedRadarStates[0]} dataKey={selectedRadarStates[0]} stroke="#19488A" fill="#19488A" fillOpacity={0.9} />
              <Radar name={selectedRadarStates[1]} dataKey={selectedRadarStates[1]} stroke="#FF9F43" fill="#FF9F43" fillOpacity={1} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 text-sm pt-2 lg:pt-8 ">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2952A3]"></div>
              <span className="text-gray-600">{selectedRadarStates[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#E89F3C]"></div>
              <span className="text-gray-600">{selectedRadarStates[1]}</span>
            </div>
          </div>
        </div>

        {/* Training Usage Bubble Chart */}
        <div className="bg-white border rounded-lg px-2 py-6 shadow-sm">
          <div className="flex justify-between items-start mb-4 px-4">
            <h3 className="text-lg font-semibold text-gray-900">Teacher's Analysis</h3>
            <button title='View details' className="text-gray-400 hover:text-gray-600">
              <EllipsisVertical size={20} />
            </button>
          </div>
          
<div className="relative h-[280px] flex items-center justify-center mt-14">
            <svg viewBox="0 0 500 350" className="w-full h-full">
              {/* Very Satisfactory - Green (top left) - 85% */}
              <circle cx="140" cy="100" r="85" fill="#10b981" opacity="0.8">
                <animate attributeName="r" values="85;88;85" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x="140" y="93" textAnchor="middle" fill="white" fontSize="18" fontWeight="600">Very</text>
              <text x="140" y="113" textAnchor="middle" fill="white" fontSize="18" fontWeight="600">Satisfactory</text>
              {/* <text x="140" y="133" textAnchor="middle" fill="white" fontSize="16" fontWeight="500">85%</text> */}
              
              {/* Satisfactory - Blue (top right) - 72% */}
              <circle cx="350" cy="95" r="72" fill="#3b82f6" opacity="0.8">
                <animate attributeName="r" values="72;75;72" dur="3.2s" repeatCount="indefinite" />
              </circle>
              <text x="350" y="93" textAnchor="middle" fill="white" fontSize="18" fontWeight="600">Satisfactory</text>
              {/* <text x="350" y="113" textAnchor="middle" fill="white" fontSize="16" fontWeight="500">72%</text> */}
              
              {/* Neutral - Yellow (bottom left) - 58% */}
              <circle cx="205" cy="255" r="58" fill="#eab308" opacity="0.8">
                <animate attributeName="r" values="58;61;58" dur="2.8s" repeatCount="indefinite" />
              </circle>
              <text x="205" y="255" textAnchor="middle" fill="white" fontSize="18" fontWeight="600">Neutral</text>
              {/* <text x="160" y="271" textAnchor="middle" fill="white" fontSize="16" fontWeight="500">58%</text> */}
              
              {/* Unsatisfactory - Red (bottom right) - 45% */}
              <circle cx="330" cy="250" r="45" fill="#ef4444" opacity="0.8">
                <animate attributeName="r" values="45;48;45" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <text x="330" y="255" textAnchor="middle" fill="white" fontSize="18" fontWeight="600">Poor</text>
              {/* <text x="370" y="266" textAnchor="middle" fill="white" fontSize="16" fontWeight="500">45%</text> */}
            </svg>
          </div>
          
         
        </div>
      </div>

      {/* Modal for Bar Chart State Selection */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Select States to Compare</h2>
                <p className="text-sm text-gray-500 mt-1">Choose exactly 2 states from the list below</p>
              </div>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600"
                title="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  Selected: <span className="font-semibold">{tempSelectedStates.join(' and ')}</span>
                  {tempSelectedStates.length < 2 && ' (Select one more state)'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {nigerianStates.map((state) => {
                  const isSelected = tempSelectedStates.includes(state);
                  return (
                    <label
                      key={state}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleStateToggle(state)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className={`text-sm ${isSelected ? 'font-semibold text-blue-900' : 'text-gray-700'}`}>
                        {state}
                      </span>
                    </label>
                  );
                })}
              </div>
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
                disabled={tempSelectedStates.length !== 2}
                className={`px-6 py-2 rounded-lg text-white transition-colors ${
                  tempSelectedStates.length === 2
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Radar Chart State Selection */}
      {isRadarModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Select States to Compare</h2>
                <p className="text-sm text-gray-500 mt-1">Choose exactly 2 states from the list below</p>
              </div>
              <button
                onClick={handleCancelRadar}
                className="text-gray-400 hover:text-gray-600"
                title="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  Selected: <span className="font-semibold">{tempSelectedRadarStates.join(' and ')}</span>
                  {tempSelectedRadarStates.length < 2 && ' (Select one more state)'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {nigerianStates.map((state) => {
                  const isSelected = tempSelectedRadarStates.includes(state);
                  return (
                    <label
                      key={state}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleRadarStateToggle(state)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className={`text-sm ${isSelected ? 'font-semibold text-blue-900' : 'text-gray-700'}`}>
                        {state}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
              <button
                onClick={handleCancelRadar}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyRadarFilter}
                disabled={tempSelectedRadarStates.length !== 2}
                className={`px-6 py-2 rounded-lg text-white transition-colors ${
                  tempSelectedRadarStates.length === 2
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
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

export default StateAnalysisDashboard;