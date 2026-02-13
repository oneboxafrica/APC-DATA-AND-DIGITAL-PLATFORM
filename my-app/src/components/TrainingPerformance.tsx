
import { Card, CardHeader, CardTitle } from './ui/card';
import GenderDistribution from './dashboard/list/GenderDistribution';

import TopPerformingState from './dashboard/list/TopPerformingState';
import TotalProfitChart from './dashboard/list/TrendingActivities';




const TrainingPerformance = () => {
  return (
    <div className="w-full ">
      <div className="max-w-7xl mx-auto space-y-2 ">
       
        <Card className="bg-transparent border-none shadow-none  py-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg md:text-2xl font-medium " >Training Performance</CardTitle>
                <p className="text-gray-500 text-sm mt-1 font-extralight">Weekly training performance report</p>
              </div>
              {/* <div className="flex gap-2">
                <EllipsisVertical className='text-gray-300' />
              </div> */}
            </div>
          </CardHeader>
        
        </Card>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 border-none'>
          <TopPerformingState />
           <GenderDistribution />
            <TotalProfitChart />
        </div>
      </div>
    </div>
  );
};

export default TrainingPerformance;