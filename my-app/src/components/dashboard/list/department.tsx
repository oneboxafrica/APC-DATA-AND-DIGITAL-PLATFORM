

import {
  Bar,
  ComposedChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardHeader, CardTitle } from '../../ui/card';
import { EllipsisVertical } from 'lucide-react';
import { formatNumber } from '../../../utils/format-number';


const data = [
  {
    name: ' Consultant',
    total: 530,
    fill: '#2B7F75',
  },
  {
    name: 'Therapy',
    total: 915,
    fill: '#FFD66B',
  },
  {
    name: 'Conference',
    total: 785,
    fill: '#04364A',
  },
  {
    name: 'Training',
    total: 345,
    fill: '#176B87',
  },
  {
    name: 'Marketing',
    total: 915,
    fill: '#64CCC5',
  },
  {
    name: 'Management',
    total: 260,
    fill: '#F7B787',
  },
];

interface DepartmentProps {
  className:string;
}

export default function Department({className} : DepartmentProps) {
 

  return (

      <Card className='border-none '>
         <div className={`h-full items-center gap-4 @sm:flex ${className || ''}`}>
            <CardHeader>
                <div className="flex items-center justify-between">
                  <div className=''>
                          <CardTitle className="text-lg font-normal text-gray-700">Top Performing State</CardTitle>
                          <p className="text-gray-500 text-sm mt-1 font-extralight">by numbers of teachers trained</p>
                        </div>
                  <div className="flex gap-2 bg-red-400">
                    <EllipsisVertical className='' />
                  </div>
                </div>
              </CardHeader>
          
           <div className='custom-scrollbar overflow-x-auto scroll-smooth'>
        <div className="h-[20rem] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              layout="vertical"
              data={data}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-300 dark:[&_.recharts-cartesian-axis-tick-value]:fill-gray-700 [&_path.recharts-rectangle]:!stroke-none"
            >
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                hide={true}
              />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                style={{ fontSize: 13, fontWeight: 500 }}
                width={100}
                className="rtl:-translate-x-24 [&_.recharts-text]:fill-gray-700"
              />
              <Bar dataKey="total" barSize={28} radius={[50, 50, 50, 50]}>
                <LabelList
                  position="right"
                  dataKey="total"
                  content={<CustomizedLabel />}
                />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    
        
        </div>
       </Card>

  );
}

function CustomizedLabel(props: any) {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <rect
        x={x + width - 44}
        y={y + 4}
        width={40}
        height={height - 8}
        rx={radius}
        fill="#ffffff"
      />
      <text
        y={y + 1 + height / 2}
        x={x + width - 24}
        fill="currentColor"
        className="text-[13px] font-medium text-gray-800 dark:text-gray-200"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {formatNumber(value)}
      </text>
    </g>
  );
}
