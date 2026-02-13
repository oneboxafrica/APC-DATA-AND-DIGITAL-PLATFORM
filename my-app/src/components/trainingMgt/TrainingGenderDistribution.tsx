import React, { useState, useMemo} from 'react';
import { Search } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../../components/ui/card';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';


interface UserData {
  id: number;
  name: string;
  male: number;
  female: number;
  course: string;
  completed: boolean;
}

const initialUsers: UserData[] = [
  { id: 1, name: 'Ondo', male: 100, female: 10, course: 'React Basics', completed: false },
  { id: 2, name: 'Abuja', male: 200, female: 20, course: 'React Basics', completed: false },
  { id: 3, name: 'Benin', male: 300, female: 30, course: 'Advanced Typescript', completed: true },
  { id: 4, name: 'Lagos', male: 500, female: 450, course: 'Next.js Server', completed: true },
  { id: 5, name: 'Rivers', male: 250, female: 200, course: 'React Basics', completed: true },
  { id: 6, name: 'Kano', male: 400, female: 350, course: 'Next.js Server', completed: true },
  { id: 7, name: 'Imo', male: 150, female: 100, course: 'Advanced Typescript', completed: false },
  { id: 8, name: 'Kaduna', male: 350, female: 300, course: 'React Basics', completed: true },
  { id: 9, name: 'Enugu', male: 180, female: 120, course: 'Next.js Server', completed: false },
  { id: 10, name: 'Delta', male: 220, female: 150, course: 'Advanced Typescript', completed: true },
];

interface FilterConfig {
  course: string | null;
  completed: boolean | null;
}

const COLORS = ['#2B7F75', '#FFD66B'];



const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, outerRadius, startAngle, endAngle, midAngle, fill } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius - 100) * cos;
  const sy = cy + (outerRadius - 100) * sin;

  return (
    <Sector
      cx={sx}
      cy={sy}
      cornerRadius={5}
      innerRadius={50}
      outerRadius={120}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};


const TrainingGenderDistribution: React.FC = () => {
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

  // Get unique courses
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

  // Chart data calculation
  const chartData = useMemo(() => {
    const totalMale = processedUsers.reduce((sum, user) => sum + user.male, 0);
    const totalFemale = processedUsers.reduce((sum, user) => sum + user.female, 0);
    const total = totalMale + totalFemale;
    
    return [
      { name: 'Male', value: totalMale, percentage: Math.round((totalMale / total) * 100) },
      { name: 'Female', value: totalFemale, percentage: Math.round((totalFemale / total) * 100) },
    ];
  }, [processedUsers]);



  return (
    <div className="">
      <div className="space-y-2">
        <Card className="bg-transparent border-none shadow-none py-0">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2">
              <div>
                <CardTitle className="text-lg md:text-2xl font-medium">Gender Distribution</CardTitle>
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
                
                <DropdownMenu onOpenChange={(open) => {
                  if (!open) {
                    setActiveTab('course');
                    setCourseSearchTerm('');
                  }
                }}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">Filter</Button>
                  </DropdownMenuTrigger>
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
                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault();
                            handleFilterByCompleted(true);
                          }}
                          className="cursor-pointer"
                        >
                          Completed Programs Only
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault();
                            handleFilterByCompleted(false);
                          }}
                          className="cursor-pointer"
                        >
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm border">
          <ScrollArea className="max-h-[300px] overflow-y-auto overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   S/n
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Male</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Female</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {processedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{user.male}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{user.female}</span>
                    </td>
                  </tr>
                ))}
                {processedUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500">
                      No states match the current filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </ScrollArea>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 ">
          <div className="relative h-[250px] w-full after:absolute after:inset-1/2 after:h-20 after:w-20 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-dashed after:border-gray-300">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={100}
                  paddingAngle={5}
                  cornerRadius={10}
                  activeShape={renderActiveShape}
                  stroke="transparent"
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {chartData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingGenderDistribution;