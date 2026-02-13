import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Input } from '../ui/input'; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Search } from 'lucide-react';


interface UserData {
    id: number;
    name: string;
    allocated_number: number;
    participant_number: number;
    course: string;
    completed: boolean;
}

const initialUsers: UserData[] = [
  { id: 1, name: 'Abuja', allocated_number: 100, participant_number: 10, course: 'React Basics', completed: false },
  { id: 2, name: 'Ondo', allocated_number: 200, participant_number: 20, course: 'React Basics', completed: false },
  { id: 3, name: 'Benin', allocated_number: 300, participant_number: 30, course: 'Advanced Typescript', completed: true },
  { id: 4, name: 'Lagos', allocated_number: 500, participant_number: 450, course: 'Next.js Server', completed: true },
  { id: 5, name: 'Rivers', allocated_number: 250, participant_number: 200, course: 'React Basics', completed: true },
  { id: 6, name: 'Kano', allocated_number: 400, participant_number: 350, course: 'Next.js Server', completed: true },
  { id: 7, name: 'Imo', allocated_number: 150, participant_number: 100, course: 'Advanced Typescript', completed: false },
  { id: 8, name: 'Kaduna', allocated_number: 350, participant_number: 300, course: 'React Basics', completed: true },
  { id: 9, name: 'Enugu', allocated_number: 180, participant_number: 120, course: 'Next.js Server', completed: false },
  { id: 10, name: 'Delta', allocated_number: 220, participant_number: 150, course: 'Advanced Typescript', completed: true },
];

interface FilterConfig {
    course: string | null; 
    completed: boolean | null; 
}

const TrainingPerformance: React.FC = () => { 

  const [filterConfig, setFilterConfig] = useState<FilterConfig>({ course: null, completed: null });
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [courseSearchTerm, setCourseSearchTerm] = useState(''); 
  const [activeTab, setActiveTab] = useState('course'); 


  const handleSort = () => {
    setSortConfig((prevConfig) => ({
      key: 'name',
      direction: prevConfig.direction === 'ascending' ? 'descending' : 'ascending',
    }));
  };

  const handleFilterByCourse = (course: string) => {
    setFilterConfig({ course, completed: null }); 
  };

  const handleFilterByCompleted = (isCompleted: boolean) => {
    setFilterConfig({ course: null, completed: isCompleted }); 
  };

  const handleClearFilter = () => {
    setFilterConfig({ course: null, completed: null });
    setCourseSearchTerm('');
  };
  
  // --- Memoization and Filtering Logic ---

  const uniqueCourses = useMemo(() => {
    return Array.from(new Set(initialUsers.map(user => user.course)));
  }, []);
  
  const filteredCourses = useMemo(() => {
    if (!courseSearchTerm) return uniqueCourses;
    const lowerCaseSearch = courseSearchTerm.toLowerCase();
    return uniqueCourses.filter(course => 
      course.toLowerCase().includes(lowerCaseSearch)
    );
  }, [uniqueCourses, courseSearchTerm]);


  const processedUsers = useMemo(() => {
    let sortableUsers = [...initialUsers];

    // Apply Filtering
    if (filterConfig.course) {
      sortableUsers = sortableUsers.filter(user => user.course === filterConfig.course);
    }
    if (filterConfig.completed !== null) {
      sortableUsers = sortableUsers.filter(user => user.completed === filterConfig.completed);
    }

    // Apply Sorting
    sortableUsers.sort((a, b) => {
      const aVal = a[sortConfig.key as keyof UserData]; 
      const bVal = b[sortConfig.key as keyof UserData];

      if (aVal < bVal) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    return sortableUsers;
  }, [sortConfig, filterConfig]);

  const currentFilterDisplay = useMemo(() => {
    if (filterConfig.course) {
      return `Filtered by Course: ${filterConfig.course}`;
    }
    if (filterConfig.completed !== null) {
      return `Filtered by Completion: ${filterConfig.completed ? 'Completed Program' : 'Incomplete Program'}`;
    }
    return null;
  }, [filterConfig]);

  return (
    <div className=" ">
      <div className=" space-y-2 ">
       
        <Card className="bg-transparent border-none shadow-none  py-0">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 ">
              <div>
                <CardTitle className="text-lg md:text-2xl font-medium">State Performance</CardTitle>
                <p className="text-gray-500 text-sm mt-1 font-extralight">Weekly training performance report</p>
                
                {currentFilterDisplay && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm font-semibold text-blue-600">{currentFilterDisplay}</span>
                    <Button variant="ghost" size="sm" onClick={handleClearFilter} className="text-xs p-1 h-auto text-red-500 hover:bg-red-50">
                        Clear Filter
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSort}>
                  Sort ({sortConfig.direction === 'ascending' ? 'A-Z' : 'Z-A'})
                </Button>
                
                {/* Filter Dropdown (USING TABS) - Content omitted for brevity, it remains the same */}
                <DropdownMenu onOpenChange={(open) => {
                    // Reset tab state to default when the dropdown closes
                    if (!open) {
                      setActiveTab('course');
                      setCourseSearchTerm('');
                    }
                }}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">Filter</Button>
                    </DropdownMenuTrigger>
                    {/* Increased width to accommodate tabs and search */}
                   <DropdownMenuContent align="end" className="w-80 p-4">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="course">By Course</TabsTrigger>
                                <TabsTrigger value="completed">By Status</TabsTrigger>
                            </TabsList>

                            <TabsContent value="course" className="mt-4 space-y-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search courses..."
                                        value={courseSearchTerm}
                                        onChange={(e) => setCourseSearchTerm(e.target.value)}
                                        className="pl-9 h-9"
                                        onClick={(e) => e.stopPropagation()} 
                                    />
                                </div>

                                <ScrollArea className="h-48">
                                    {filteredCourses.map((course) => (
                                    <DropdownMenuItem
                                        key={course}
                                        onSelect={(e) => {
                                        e.preventDefault();
                                        handleFilterByCourse(course);
                                        }}
                                        className="cursor-pointer"
                                    >
                                        {course}
                                    </DropdownMenuItem>
                                    ))}
                                </ScrollArea>
                            </TabsContent>

                            <TabsContent value="completed" className="mt-4 space-y-2">
                                <DropdownMenuItem onSelect={(e) => { e.preventDefault(); handleFilterByCompleted(true); }}>
                                    Completed Programs Only
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => { e.preventDefault(); handleFilterByCompleted(false); }}>
                                    Incomplete Programs Only
                                </DropdownMenuItem>
                            </TabsContent>
                        </Tabs>

                        <DropdownMenuSeparator className="my-3" />
                        <DropdownMenuItem
                            onSelect={handleClearFilter}
                            className="text-red-600 font-medium cursor-pointer text-center justify-center"
                        >
                            Clear All Filters
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
        </Card>

      </div>

      <div className="">
   
        <div className=" bg-white rounded-lg shadow-sm border">

          {/* New Wrapper for Scrollable Table */}
          <div className="overflow-x-auto">
            {/* Limit the table height here - Example: max-h-[400px] for 400 pixels */}
            <div className="max-h-[400px] overflow-y-auto"> 
                
                <table className="w-full min-w-[700px] table-fixed"> 
                    <thead className="bg-gray-50 border-b sticky top-0 z-10">
                        <tr>
                            {/* Define consistent widths for each column */}
                            <th className="w-[10%] px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">S/n</th>
                            <th className="w-[20%] px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                            <th className="w-[25%] px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Allocated Course</th>
                            <th className="w-[25%] px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total Participants</th>
                            <th className="w-[20%] px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Attendances </th>
                        </tr>
                    </thead>
                    
                    <tbody className="bg-white divide-y divide-gray-200">
                        {processedUsers.map((user) => {
                            
                            const percentage = Math.round(
                                (user.participant_number / user.allocated_number) * 100
                            );

                            const progressClass = 
                                percentage >= 90 ? 'bg-gray-200' :
                                percentage >= 70 ? 'bg-gray-200' :
                                'bg-gray-200';

                            return (
                          <tr key={user.id} className="hover:bg-gray-50">
                            {/* Apply the same width to the body cells as the header cells */}
                            <td className="w-[10%] px-6 py-4 whitespace-nowrap">
                              <p className="text-sm font-medium text-gray-900 text-center">{user.id}</p>
                            </td>
                            <td className="w-[20%] px-6 py-4 whitespace-nowrap">
                               <p className="text-sm font-medium text-gray-900 text-center">{user.name}</p>
                            </td>
                            <td className="w-[25%] whitespace-nowrap text-center">
                              <span className="text-sm text-gray-900">{user.allocated_number}</span>
                            </td>
                            <td className="w-[25%] px-6 py-4 whitespace-nowrap text-center">
                            <span className=" text-sm ">
                              {user.participant_number}
                            </span>
                          </td>
                           <td className="w-[20%] px-6 py-4 whitespace-nowrap text-center">
                               <div className="flex items-center justify-center space-x-2 w-full">
                                   <Progress
                                       value={percentage}
                                       className={`w-[100px] h-2 bg-gray-200 ${progressClass}`}
                                   />
                                </div>
                            </td>
                          </tr>
                        )})}
                        {processedUsers.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-gray-500">No participants match the current filter criteria.</td>
                            </tr>
                        )}
                    </tbody>
                
                </table>
            </div> {/* End of vertical scroll container */}
          </div> {/* End of horizontal scroll container */}
        </div>
      </div>
    </div>
  );
};

export default TrainingPerformance;