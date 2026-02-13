
import type { IconType } from 'react-icons/lib';
import {
  PiCheckCircle,
  PiClock,
  PiArrowDownRight,
  PiArrowUpRight,
  PiCaretLeftBold,
  PiCaretRightBold,
} from 'react-icons/pi';
import { cn } from '../../../lib/utils';
import { useScrollableSlider } from '../../../hooks/use-scrollable-slider';
import { Button } from '../../ui/button';
import { Users } from 'lucide-react';

type AppointmentStatsType = {
  className?: string;
};

const statData: StatType[] = [
  {
    title: 'Total Patient"',
    amount: '91,558',
    increased: true,
    percentage: '32.40',
    icon: Users,
    iconWrapperFill: '#FFFFF',
  },
  {
    title: 'Scheduled Patients',
    amount: '15,786',
    increased: true,
    percentage: '32.40',
    icon: PiCheckCircle,
    iconWrapperFill: '[#19488A]',
  },
  {
    title: 'Waiting List',
    amount: '8,503',
    increased: false,
    percentage: '32.40',
    icon: PiClock,
    iconWrapperFill: '[#19488A]',
  },

];

export type StatType = {
  icon: IconType;
  title: string;
  amount: string;
  increased: boolean;
  percentage: string;
  iconWrapperFill?: string;
  className?: string;
};

export type StatCardProps = {
  className?: string;
  transaction: StatType;
  index: number;
};

function StatCard({ className, transaction,index }: StatCardProps) {
  const { icon, title, amount, increased, percentage, iconWrapperFill } =
    transaction;
  const Icon = icon;
  return (
    <div 
     className={cn(
  "w-full rounded-[14px] border border-gray-300 p-6 @container transition-all",
  index === 0
    ? "bg-[#19488A] text-white"
    : "bg-white text-gray-900 shadow-sm border",
  className
)}

    >
      <div className="mb-4 flex items-center gap-3 ">
        <span
          style={{ backgroundColor: iconWrapperFill }}
          className={cn("flex rounded-xl p-2.5 text-gray-0",
            index === 0
            ? "text-[#19488A] bg-white"
            : "text-white bg-[#19488A]"
          )}
          
        >
          <Icon className={cn(" w-5 h-5",
            index === 0
            ? "text-[#19488A] bg-white"
            : "text-white bg-[#19488A]"
          )}
          />
        </span>
        <div className="space-y-1 ">
          <p className={cn("font-light text-[12px]",
            index === 0
            ? "text-white"
            : "text-black"
          )}>{title}</p>
          <p className={cn("text-sm font-semibold ",
            index === 0
            ? "text-white"
            : "text-black"
          )}
         >
            {amount}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 ">
        <div
        className={cn("flex items-center gap-1 text-[12px]",
            index === 0
            ? "text-white"
            : "text-black"
          )}
         
        >
          <span

          className={cn("flex rounded-full px-2.5 py-1.5 text-sm",
            index === 0
            ? "bg-white text-[#19488A]"
            : "bg-[#19488A] text-white"
          )}
          
          >
            {increased ? (
              <PiArrowUpRight className="h-auto w-4 " />
            ) : (
              <PiArrowDownRight className="h-auto w-4" />
            )}
          </span>
          <span className="font-semibold leading-none">
            {increased ? '+' : '-'}
            {percentage}%
          </span>
        </div>
        <span 
        className={cn("truncate leading-none text-[12px] font-light",
            index === 0
            ? "text-white"
            : "text-black"
          )}
       >
          {increased ? 'Increased' : 'Decreased'}&nbsp;last month
        </span>
      </div>
    </div>
  );
}

export function StatGrid() {
  return (
    <>
      {statData.map((stat: StatType, index: number) => {
        return (
          <StatCard
            key={'stat-card-' + index}
            transaction={stat}
            index={index}
            className="min-w-[300px] "
          />
        );
      })}
    </>
  );
}

export default function AppointmentListStats({
  className,
}: AppointmentStatsType) {
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();

  return (
    <div
      className={cn(
        'relative flex w-auto items-center overflow-hidden ',
        className
      )}
    >
      <Button
        title="Prev"
        variant="outline"
        ref={sliderPrevBtn}
        onClick={() => scrollToTheLeft()}
        className="!absolute -left-1 top-0 z-10 !h-full w-20 !justify-start rounded-none bg-gradient-to-r from-gray-0 via-gray-0/70 to-transparent px-0 ps-1 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden"
      >
        <PiCaretLeftBold className="h-5 w-5" />
      </Button>
      <div className="w-full overflow-hidden">
        <div
          ref={sliderEl}
          className="custom-scrollbar grid grid-flow-col gap-5 overflow-x-auto scroll-smooth 2xl:gap-6"
        >
          <StatGrid />
        </div>
      </div>
      <Button
        title="Next"
        variant="outline"
        ref={sliderNextBtn}
        onClick={() => scrollToTheRight()}
        className="dark: !absolute -right-2 top-0 z-10 !h-full w-20 !justify-end rounded-none bg-gradient-to-l from-gray-0 via-gray-0/70 to-transparent px-0 pe-2 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden"
      >
        <PiCaretRightBold className="h-5 w-5" />
      </Button>
    </div>
  );
}
