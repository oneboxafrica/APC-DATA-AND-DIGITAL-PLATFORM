
import UserOne from '../../assets/user.svg'
import UserTwo from '../../assets/usertwo.svg'
import ChipOne from '../../assets/Chipone.svg'
import ChipTwo from '../../assets/Chiptwo.svg'
import { Eye, Filter, Settings, SortAscIcon, Users } from 'lucide-react'
import TrainingCoverage from '../../components/TrainingCoverage'
import OverviewTrainingPerformance from '../../components/trainingMgt/OverviewTrainingPerformance'
import RecentActivities from '../../components/dashboard/list/RecentActivities'
import ScheduleCalendar from '../../components/dashboard/list/ScheduleCalendar'
import TrainingGenderDistribution from '../../components/trainingMgt/TrainingGenderDistribution'




const TrainingMgt = () => {

  const card = [
    {
      id:1,
      title:"Total Patient",
      value:"91,558",
      description:"+32.40% increased last month",
      avatar:UserOne,
      icon:ChipOne,
    },
       {
      id:2,
      title:"Total Patient",
      value:"91,558",
      description:"+32.40% increased last month",
      avatar:UserTwo,
      icon:ChipTwo,
    },
       {
      id:3,
      title:"Total Patient",
      value:"91,558",
      description:"+32.40% increased last month",
      avatar:UserTwo,
      icon:ChipTwo,
    },
  ]

  const container = [
    {
      id:1,
      icon:<Users className='w-[14px] h-[14px] md:w-5 md:h-4 lg:w-[14px] lg:h-[14px] text-gray-400' />,
      name:'UBEC',
    },
    {
      id:1,
      icon:<Users className='w-[14px] h-[14px] md:w-5 md:h-4 lg:w-[14px] lg:h-[14px] text-gray-400' />,
      name:'SUBEC',
    },
    {
      id:1,
      icon:<Settings className='w-[14px] h-[14px] md:w-5 md:h-4 lg:w-[14px] lg:h-[14px] text-gray-400' />,
      name:'Training',
    }
  ]

   const iconContainer = [
    {
      id:1,
      icon:<SortAscIcon className='w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 text-gray-400' />,
      name:'Sort',
    },
    {
      id:1,
      icon:<Eye className='w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 text-gray-400' />,
      name:'View',
    },
    {
      id:1,
      icon:<Filter className='w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 text-gray-400' />,
      name:'Filter',
    }
  ]
  return (
    <div className='font-montserrat  '>
<div className='flex flex-col gap-y-4 md:flex-row  border-b items-center py-2 '>
<div className=' flex items-center space-x-2 md:flex-1 '>
  {
    container.map((cont) => (
      <div className='flex items-center gap-1 lg:px-4 w-full lg:w-auto'>
        <p className=''>{cont.icon}</p>
        <p className='text-xs md:text-[16px] lg:text-sm font-medium'>{cont.name}</p>
      </div>
    ))
  }
</div>

<div className='flex items-center md:justify-end space-x-2 flex-1 px-4 '>
  {
    iconContainer.map((container) => (
      <button className='flex items-center justify-center gap-2 border-[1px] px-2 py-1 md:py-2 lg:py-1 w-full lg:w-auto rounded bg-white'>
        <p className=''>{container.icon}</p>
        <p className='text-xs md:text-[16px] lg:text-sm font-medium'>{container.name}</p>
      </button>
    ))
  }
</div>
</div>

<div className='px-2 py-2 lg:py-4 space-y-2 bg-white'>

  <div className='rounded-md p-0.5 bg-gray-50 '>
    <div className='flex flex-col lg:flex-row  '>
     <div className='w-[100%]  lg:w-[65%] p-2'>

   <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4'>
    {
      card.map((items,index)=> (
        <div 
        key={items.id}
       className={`p-4 rounded-xl space-y-4 transition-all ${
        index === 0 
          ? "bg-[#19488A] text-white" 
          : "bg-white text-gray-900 shadow-sm border"
      }`}>
         <div className='flex items-center space-x-2  '>
          <div  className='w-[10%] lg:w-[20%] '>
            <img src={items.avatar}  alt='avatar' className='w-full h-auto object-contain'/>
          </div>
           <div className=''>
            <p className='text-xs lg:text-[11px]'>{items.title}</p>
          <p className='text-sm font-semibold'>{items.value}</p>
           </div>
         </div>
         <div className='flex items-center space-x-2  '>
          <div  className='w-[10%] lg:w-[20%] '>
            <img src={items.icon}  alt='icon' className='w-full h-auto object-contain'/>
          </div>
            <p className='text-xs lg:text-[11px]'>{items.description}</p>
         </div>
        </div>
      ))
    }
   </div>
 <div className='py-4'>
  <TrainingCoverage />
 </div>
   </div>
   <div className='w-[100%] lg:w-[35%] p-2 space-y-6 '>
    <ScheduleCalendar />
    <RecentActivities />
   </div>
  </div>
   <div className='p-2 '>
       <OverviewTrainingPerformance />
    </div>
     <div className='p-2 '>
       <TrainingGenderDistribution />
    </div>

  

  </div>

</div>
    </div>
  ) 
}

export default TrainingMgt
