import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Search, EllipsisVertical, Eye, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../../components/ui/dropdown-menu';
import { toast } from 'sonner';
import Breadcrumb from './Breadcrumb';

interface TrainingActivity {
  id: number;
  theme: string;
  trainer: string;
  startDate: string;
  endDate: string;
}

const TrainingActivities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // const [entriesPerPage, setEntriesPerPage] = useState('10');
  const navigate = useNavigate();

  // Data based on the provided screenshot
  const activities: TrainingActivity[] = [
    { id: 1, theme: 'SCHOOL BASED TRAINING', trainer: 'CROSS RIVER STATE COLLEGE OF EDUCATION', startDate: '2023-11-13', endDate: '2023-11-19' },
    { id: 2, theme: 'JOLLY PHONICS', trainer: 'UNIVERSAL LEARNING SOLUTIONS', startDate: '2023-11-13', endDate: '2023-11-17' },
    { id: 3, theme: "STRENGTHENING TEACHER'S ENGLISH PROFICIENCY", trainer: 'BRITISH COUNCIL/UBEC', startDate: '2023-11-18', endDate: '2023-11-20' },
    { id: 4, theme: 'STRENGTHENING MATHEMATICS AND SCIENCE EDUCATION', trainer: 'NTI, KADUNA', startDate: '2023-12-11', endDate: '2023-12-15' },
    { id: 5, theme: 'ECCDE', trainer: 'CROSS RIVER STATE COLLEGE OF EDUCATION', startDate: '2023-11-09', endDate: '2023-11-15' },
    { id: 6, theme: 'SSO Training', trainer: 'CROSS RIVER STATE COLLEGE OF EDUCATION, CALABAR', startDate: '2023-11-13', endDate: '2023-11-17' },
    { id: 7, theme: 'HEADTEACHER LEADERSHIP', trainer: 'CROSS RIVER STATE COLLEGE OF EDUCATION, CALABAR', startDate: '2023-12-04', endDate: '2023-12-06' },
    { id: 8, theme: 'The use of Reggio Emilia and other Children Childhood Care Development Education...', trainer: 'College of Education Akamkpa', startDate: '2024-02-19', endDate: '2024-02-23' },
    { id: 9, theme: 'Multigrade Training', trainer: 'Master Trainers', startDate: '2024-05-06', endDate: '2024-05-09' },
    { id: 10, theme: 'SMASE & JOLLY PHONICS APPROACHES', trainer: 'ULS & NTI', startDate: '2024-08-12', endDate: '2024-08-23' },
  ];

  const filteredActivities = activities.filter(item =>
    item.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.trainer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (theme: string) => {
    toast.error(`Deleted: ${theme}`);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
       <div>
        <h1 className="text-2xl font-bold text-gray-600 mb-6">TRAININGS</h1>
      </div>
      <div className="flex flex-col gap-4 mb-6">
         

        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/dashboard/overview' },
            { label: 'Trainings', href: '/training/activities', current: true },
          ]}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
          {/* <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
              <SelectTrigger className="w-16 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600">entries</span>
          </div> */}

          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <Input
              placeholder="Search..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-12 font-bold text-slate-700">#</TableHead>
              <TableHead className="font-bold text-slate-700">Theme</TableHead>
              <TableHead className="font-bold text-slate-700">Trainer</TableHead>
              <TableHead className="font-bold text-slate-700">Start Date</TableHead>
              <TableHead className="font-bold text-slate-700">End Date</TableHead>
              <TableHead className="font-bold text-slate-700 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredActivities.map((activity) => (
              <TableRow key={activity.id} className="hover:bg-slate-50 transition-colors">
                <TableCell className="text-slate-600">
                  <p className='line-clamp-1'>{activity.id}</p>
                </TableCell>
                <TableCell className="font-medium text-xs md:text-sm max-w-xs">
                  <p className='line-clamp-1'>{activity.theme}</p>
                </TableCell>
                <TableCell className="text-slate-600 text-xs md:text-sm">
                  <p className='line-clamp-1'>{activity.trainer}</p>
                </TableCell>
                <TableCell className="text-slate-600 text-sm whitespace-nowrap">
                  <p className='line-clamp-1'>{activity.startDate}</p>
                </TableCell>
                <TableCell className="text-slate-600 text-sm whitespace-nowrap">
                  <p className='line-clamp-1'>{activity.endDate}</p>
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <EllipsisVertical className="h-4 w-4 text-slate-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/training/view/${activity.id}`)}>
                        <Eye className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/training/edit/${activity.id}`)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600 focus:bg-red-50"
                        onClick={() => handleDelete(activity.theme)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          Showing 1 to {filteredActivities.length} of {activities.length} entries
        </p>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" className="text-slate-500">Previous</Button>
          <Button variant="default" size="sm" className="bg-blue-100 text-blue-700 hover:bg-blue-200">1</Button>
          <Button variant="outline" size="sm" className="text-slate-500">2</Button>
          <Button variant="outline" size="sm" className="text-slate-500">3</Button>
          <Button variant="outline" size="sm" className="text-slate-500">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default TrainingActivities;