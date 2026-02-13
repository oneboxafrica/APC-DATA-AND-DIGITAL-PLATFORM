import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TaskListCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1)); 

  
  const taskDays = [2, 3, 5, 8, 9, 10, 11, 12];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; 
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const daysInPrevMonth = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const calendarDays = [];

  // Previous month days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isNextMonth: false
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      isNextMonth: false
    });
  }

  // Next month days
  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
      isNextMonth: true
    });
  }

  const isWeekend = (index: number) => {
    const dayOfWeek = index % 7;
    return dayOfWeek === 5 || dayOfWeek === 6; 
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
       
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <h3 className="text-base font-medium text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-0 border border-gray-200">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-700 py-3 border-r border-b border-gray-200 last:border-r-0 bg-gray-50"
            >
              {day}
            </div>
          ))}

          {calendarDays.map((dateObj, index) => {
            const hasTask = dateObj.isCurrentMonth && taskDays.includes(dateObj.day);
            const weekend = isWeekend(index);
            
            return (
              <div
                key={index}
                className={`relative text-center py-4 border-r border-b border-gray-200 last:border-r-0 min-h-[60px] ${
                  !dateObj.isCurrentMonth ? 'bg-gray-50' : 'bg-white'
                } ${weekend && dateObj.isCurrentMonth ? 'bg-gray-50' : ''}`}
              >
                <span
                  className={`text-sm ${
                    !dateObj.isCurrentMonth
                      ? 'text-gray-400'
                      : weekend
                      ? 'text-red-500 font-medium'
                      : 'text-gray-900'
                  }`}
                >
                  {dateObj.day}
                </span>
                {hasTask && (
                  <div className="absolute bottom-1 left-1 right-1 h-1 bg-blue-600 rounded-sm" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      
    </div>
  );
}