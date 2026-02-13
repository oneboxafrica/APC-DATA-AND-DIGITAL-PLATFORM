
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle } from './ui/card';
import NigeriaMap from './Map/NigeriaMap';
import { statesData } from '../data/states';




const TrainingCoverage = () => {
  return (
    <div className="w-full  bg-white rounded-lg ">
      <div className=" space-y-6">
       
        <Card className='border-none px-0'>
          <CardHeader className='border-none px-4'>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle className="text-2xl font-medium">Training Coverage</CardTitle>
                <p className="text-gray-500 text-sm mt-1 font-extralight">Weekly Earnings Overview</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Sort</Button>
                <Button variant="outline" size="sm">View</Button>
                <Button variant="outline" size="sm">Performance</Button>
              </div>
            </div>
          </CardHeader>
         <div className='px-4 pb-4'>
           {/* <States /> */}
           <NigeriaMap data={statesData} />

           
         </div>
         
        </Card>
      </div>
    </div>
  );
};

export default TrainingCoverage;