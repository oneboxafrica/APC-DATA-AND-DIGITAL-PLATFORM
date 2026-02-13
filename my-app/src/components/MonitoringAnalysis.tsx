
import { Card, CardHeader, CardTitle } from './ui/card';
import MonitoringAnalysisChart from './dashboard/list/MonitoringAnalysisChart';




const StateAnalysis = () => {
  return (
    <div className="w-full ">
      <div className="max-w-7xl mx-auto space-y-2 ">
       
        <Card className="bg-transparent border-none shadow-none  py-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                             <CardTitle className="text-lg md:text-2xl font-medium " >Monitoring Analysis</CardTitle>
                             <p className="text-gray-500 text-sm mt-1 font-extralight">a side by side analysis of activities between states</p>
                           </div>
              {/* <div className="flex gap-2">
                <EllipsisVertical className='text-gray-300' />
              </div> */}
            </div>
          </CardHeader>
        
        </Card>

        <div className=' border-none'>
          <MonitoringAnalysisChart />
          
        </div>
      </div>
    </div>
  );
};

export default StateAnalysis;