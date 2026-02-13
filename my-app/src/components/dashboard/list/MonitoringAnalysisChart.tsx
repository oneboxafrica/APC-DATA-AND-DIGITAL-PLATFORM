import { Cell, ResponsiveContainer,  PieChart, Pie } from 'recharts';
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

const MonitoringAnalysisChart = () => {
  // const [isRadarModalOpen, setIsRadarModalOpen] = useState(false);
  // const [selectedRadarStates, setSelectedRadarStates] = useState(['Lagos', 'Kano']);
  // const [tempSelectedRadarStates, setTempSelectedRadarStates] = useState(['Lagos', 'Kano']);
  const [isSSOModalOpen, setIsSSOModalOpen] = useState(false);
  const [selectedSSOStates, setSelectedSSOStates] = useState(['Lagos', 'Kano', 'Rivers', 'Oyo', 'Kaduna']);
  const [tempSelectedSSOStates, setTempSelectedSSOStates] = useState(['Lagos', 'Kano', 'Rivers', 'Oyo', 'Kaduna']);

  const overAllProgressData = [
    { name: 'Total Projects', count: 124, percentage: 43, color: '#0d9488' },
    { name: 'Completed', count: 26, percentage: 9, color: '#22c55e' },
    { name: 'Delayed', count: 36, percentage: 13, color: '#f97316' },
    { name: 'On going', count: 46, percentage: 16, color: '#6b7280' },
  ];

  // const getRadarChartData = (states: string[]) => {
  //   const baseData: { [key: string]: { contentQuality: number; completion: number; satisfaction: number; relevance: number; attendance: number } } = {
  //     'Lagos': { contentQuality: 90, completion: 80, satisfaction: 85, relevance: 70, attendance: 75 },
  //     'Kano': { contentQuality: 75, completion: 90, satisfaction: 80, relevance: 85, attendance: 70 },
  //   };
  //   const random = () => Math.floor(Math.random() * 25) + 70;

  //   return [
  //     { metric: 'Content Quality', [states[0]]: baseData[states[0]]?.contentQuality || random(), [states[1]]: baseData[states[1]]?.contentQuality || random() },
  //     { metric: 'Completion Rate', [states[0]]: baseData[states[0]]?.completion || random(), [states[1]]: baseData[states[1]]?.completion || random() },
  //     { metric: 'Satisfaction', [states[0]]: baseData[states[0]]?.satisfaction || random(), [states[1]]: baseData[states[1]]?.satisfaction || random() },
  //     { metric: 'Relevance', [states[0]]: baseData[states[0]]?.relevance || random(), [states[1]]: baseData[states[1]]?.relevance || random() },
  //     { metric: 'Attendance', [states[0]]: baseData[states[0]]?.attendance || random(), [states[1]]: baseData[states[1]]?.attendance || random() },
  //   ];
  // };

 
// const [radarData, setRadarData] = useState(getRadarChartData(selectedRadarStates));


  // const handleRadarStateToggle = (state: string) => {
  //   if (tempSelectedRadarStates.includes(state)) {
  //     if (tempSelectedRadarStates.length > 1) {
  //       setTempSelectedRadarStates(prev => prev.filter(s => s !== state));
  //     }
  //   } else {
  //     if (tempSelectedRadarStates.length < 2) {
  //       setTempSelectedRadarStates([...tempSelectedRadarStates, state]);
  //     } else {
  //       setTempSelectedRadarStates([tempSelectedRadarStates[1], state]);
  //     }
  //   }
  // };

  // const handleApplyRadarFilter = () => {
  //   setSelectedRadarStates(tempSelectedRadarStates);
  //   setRadarData(getRadarChartData(tempSelectedRadarStates));
  //   setIsRadarModalOpen(false);
  // };

  // const handleCancelRadar = () => {
  //   setTempSelectedRadarStates(selectedRadarStates);
  //   setIsRadarModalOpen(false);
  // };

  const handleSSOStateToggle = (state: string) => {
    if (tempSelectedSSOStates.includes(state)) {
      if (tempSelectedSSOStates.length > 1) {
        setTempSelectedSSOStates(prev => prev.filter(s => s !== state));
      }
    } else {
      if (tempSelectedSSOStates.length < 5) {
        setTempSelectedSSOStates([...tempSelectedSSOStates, state]);
      } else {
        setTempSelectedSSOStates([...tempSelectedSSOStates.slice(1), state]);
      }
    }
  };

  const handleApplySSOFilter = () => {
    setSelectedSSOStates(tempSelectedSSOStates);
    setIsSSOModalOpen(false);
  };

  const handleCancelSSO = () => {
    setTempSelectedSSOStates(selectedSSOStates);
    setIsSSOModalOpen(false);
  };

  return (
    <div className="px-2">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

        {/* Visitor Heatmap */}
        <div className="bg-white border rounded-lg px-2 py-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900 px-4">SSO Activities</h3>
            <button onClick={() => setIsSSOModalOpen(true)} title='View details' className="text-gray-400 hover:text-gray-600">
              <EllipsisVertical size={20} />
            </button>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2  text-xs text-gray-500 py-2 lg:py-8">
            <span>0</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-[#19488A] rounded-sm"></div>
              <div className="w-3 h-3 bg-[#19488A] rounded-sm"></div>
              <div className="w-3 h-3 bg-[#19488A] rounded-sm"></div>
              <div className="w-3 h-3 bg-[#19488A] rounded-sm"></div>
              <div className="w-3 h-3 bg-[#19488A] rounded-sm"></div>
              <div className="w-3 h-3 bg-[#19488A] rounded-sm"></div>
              <div className="w-3 h-3 bg-[#19488A] rounded-sm"></div>
            </div>
            <span>500</span>
          </div>
          
          {/* Heatmap */}
          <div className="space-y-2 ">
            {selectedSSOStates.map((state) => (
              <div key={state} className="flex items-center gap-3">
                <div className="w-16 text-sm lg:text-xs text-gray-700 ">{state}</div>
                <div className="flex  gap-1 flex-1">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                    const intensity = Math.floor(Math.random() * 5);
                    const colors = ['bg-gray-100', 'bg-cyan-200', 'bg-cyan-300', 'bg-cyan-400', 'bg-cyan-500'];
                    return (
                      <div
                        key={day}
                        className={`flex-1  aspect-square rounded ${colors[intensity]}`}
                        title={`${state} - ${day}`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {/* Day labels */}
          <div className="flex gap-3 mt-2 ml-20  ">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="flex-1 text-xs text-gray-500 text-center">{day}</div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Monitoring Officers</h3>
            <select title='Select time period' className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option title='Weekly'>Weekly</option>
              <option title='Monthly'>Monthly</option>
              <option title='Yearly'>Yearly</option>
            </select>
          </div>
          
          <div className="relative h-60 w-full translate-y-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart
                margin={{
                  top: 40,
                  right: 10,
                  bottom: 1,
                  left: 10,
                }}
                className="relative"
              >
                <Pie
                  data={overAllProgressData}
                  endAngle={-10}
                  stroke="none"
                  startAngle={190}
                  paddingAngle={1}
                  cornerRadius={12}
                  dataKey="percentage"
                  innerRadius="85%"
                  outerRadius="100%"
                >
                  {overAllProgressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
              <div className="text-3xl font-bold text-gray-800">72%</div>
              <div className="text-sm font-medium text-gray-600">Completed</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 text-center mt-4">
            {overAllProgressData.map((item) => (
              <div key={item.name}>
                <div className="text-2xl font-bold" style={{ color: item.color }}>
                  {item.count}
                </div>
                <div className="text-sm text-gray-600 whitespace-nowrap">{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">No. Of Visits or Assessment</h3>
            <button title='button' type='button' className="text-gray-400 hover:text-gray-600">
              <EllipsisVertical size={20} />
            </button>
          </div>

          <div className="flex justify-around items-center py-4 lg:py-14 gap-4 ">
            <div className="flex flex-col items-center ">
              <div className="relative w-30 h-30">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                  <circle className="text-blue-500" strokeWidth="10" strokeDasharray="283" strokeDashoffset="85" strokeLinecap="round" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-900">30,000</span>
                </div>
              </div>
              <span className="mt-2 text-xs text-gray-600">Visits</span>
            </div>

            <div className="flex flex-col items-center ">
              <div className="relative w-30 h-30">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                  <circle className="text-[#19488A]" strokeWidth="10" strokeDasharray="283" strokeDashoffset="113" strokeLinecap="round" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-900">24,000</span>
                </div>
              </div>
              <span className="mt-2 text-xs text-gray-600">Assessments</span>
            </div>
          </div>

          <div className="mt-4 space-y-3 pt-4 border-t">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium text-gray-900">No. of Visits</span>
              </div>
              <span className="text-green-500 text-sm font-medium">+12%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#19488A]"></div>
                <span className="text-sm font-medium text-gray-900">No. of Assessments</span>
              </div>
              <span className="text-green-500 text-sm font-medium">+8%</span>
            </div>
          </div>
        </div>
      </div>

      

      {/* Radar Chart State Selection Modal */}
      {/* {isRadarModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Compare Two Statesssss</h2>
                <p className="text-sm text-gray-500 mt-1">Select exactly 2 states</p>
              </div>
              <button onClick={handleCancelRadar} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  Selected: <strong>{tempSelectedRadarStates.join(' vs ')}</strong>
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {nigerianStates.map(state => (
                  <label
                    key={state}
                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      tempSelectedRadarStates.includes(state)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={tempSelectedRadarStates.includes(state)}
                      onChange={() => handleRadarStateToggle(state)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className={`text-sm ${tempSelectedRadarStates.includes(state) ? 'font-semibold text-blue-900' : 'text-gray-700'}`}>
                      {state}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
              <button onClick={handleCancelRadar} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                Cancel
              </button>
              <button
                onClick={handleApplyRadarFilter}
                disabled={tempSelectedRadarStates.length !== 2}
                className={`px-6 py-2 rounded-lg text-white transition-colors ${
                  tempSelectedRadarStates.length === 2 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* SSO Activities State Selection Modal */}
      {isSSOModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Select States for SSO Activities</h2>
                <p className="text-sm text-gray-500 mt-1">Select exactly 5 states</p>
              </div>
              <button onClick={handleCancelSSO} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
              <div className="mb-4 p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
                <p className="text-sm text-cyan-800">
                  Selected ({tempSelectedSSOStates.length}/5): <strong>{tempSelectedSSOStates.join(', ')}</strong>
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {nigerianStates.map(state => (
                  <label
                    key={state}
                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      tempSelectedSSOStates.includes(state)
                        ? 'border-cyan-500 bg-cyan-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={tempSelectedSSOStates.includes(state)}
                      onChange={() => handleSSOStateToggle(state)}
                      className="w-4 h-4 text-cyan-600 rounded focus:ring-2 focus:ring-cyan-500"
                    />
                    <span className={`text-sm ${tempSelectedSSOStates.includes(state) ? 'font-semibold text-cyan-900' : 'text-gray-700'}`}>
                      {state}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
              <button onClick={handleCancelSSO} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                Cancel
              </button>
              <button
                onClick={handleApplySSOFilter}
                disabled={tempSelectedSSOStates.length !== 5}
                className={`px-6 py-2 rounded-lg text-white transition-colors ${
                  tempSelectedSSOStates.length === 5 ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitoringAnalysisChart;