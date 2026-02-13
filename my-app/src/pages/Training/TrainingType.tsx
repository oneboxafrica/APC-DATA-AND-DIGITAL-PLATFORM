import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Search, EllipsisVertical, Eye, Pencil, Trash2, UserPlus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../../components/ui/dropdown-menu';
import { toast, Toaster } from 'sonner';

interface Training {
  id: number;
  theme: string;
  trainingType: string;
  trainer: string;
  state: string;
  startDate: string;
  endDate: string;
}

const TrainingType = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedTrainingType, setSelectedTrainingType] = useState('all');
  const [entriesPerPage, setEntriesPerPage] = useState('10');

  const trainings: Training[] = [
    {
      id: 1,
      theme: 'A 5-DAY CAPACITY BUILDING WORKSHOP FOR SCHOOL SUPPORT OFFICERS',
      trainingType: 'School Support Training',
      trainer: 'Adéyemi College of Education Consult',
      state: 'Ondo State',
      startDate: '2023-10-30',
      endDate: '2023-11-03'
    },
    {
      id: 2,
      theme: 'School Based Training for Improved Teacher Classroom Effectiveness and Learning Outcomes',
      trainingType: 'Pedagogies in English, Mathematics and Science Education Training',
      trainer: 'Federal College of Education Eha-Amufu Isi Uzo Local Government Enugu State',
      state: 'Enugu State',
      startDate: '2024-01-09',
      endDate: '2024-05-12'
    },
    {
      id: 3,
      theme: 'Making Teachers Effective and Competent through Mentoring and Coaching',
      trainingType: 'School Support Training',
      trainer: 'Federal College of Education Eha-Amufu Isi Uzo Local Government Enugu State',
      state: 'Enugu State',
      startDate: '2023-11-27',
      endDate: '2023-12-01'
    },
    {
      id: 4,
      theme: 'Sokoto Training',
      trainingType: 'Early Childhood Care Development and Education Training',
      trainer: 'Sokoto',
      state: 'Sokoto State',
      startDate: '2023-10-30',
      endDate: '2023-10-30'
    },
    {
      id: 5,
      theme: 'Teacher Professional Development (TDP)',
      trainingType: 'School Support Training',
      trainer: 'College of Education, Afaha Nsit',
      state: 'Akwa Ibom State',
      startDate: '2023-11-06',
      endDate: '2023-11-10'
    },
    {
      id: 6,
      theme: 'ICT in Education',
      trainingType: 'Information and Communication Technology Training',
      trainer: 'UBEC',
      state: 'Bauchi State',
      startDate: '2023-11-01',
      endDate: '2023-11-03'
    },
    {
      id: 7,
      theme: 'SCHOOL BASED TRAINING',
      trainingType: 'School Leadership Training',
      trainer: 'CROSS RIVER STATE COLLEGE OF EDUCATION',
      state: 'Cross River State',
      startDate: '2023-11-13',
      endDate: '2023-11-19'
    },
    {
      id: 8,
      theme: 'School Support Officers (SSO) Training - Improving Teachers\' Classroom Delivery through Effective Mentoring and Coaching',
      trainingType: 'School Support Training',
      trainer: 'College of Education Ikwo',
      state: 'Ebonyi State',
      startDate: '2023-11-20',
      endDate: '2023-11-24'
    },
    {
      id: 9,
      theme: 'School Based Training for Improved Teacher Classroom Effectiveness and Learning Outcomes',
      trainingType: 'Pedagogies in English, Mathematics and Science Education Training',
      trainer: 'College of Education Ikwo',
      state: 'Ebonyi State',
      startDate: '2024-01-08',
      endDate: '2024-04-08'
    }
  ];

  // Get unique states and training types
  const states = Array.from(new Set(trainings.map(t => t.state))).sort();
  const trainingTypes = Array.from(new Set(trainings.map(t => t.trainingType))).sort();

  // Filter trainings
  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = 
      training.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.trainer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === 'all' || training.state === selectedState;
    const matchesType = selectedTrainingType === 'all' || training.trainingType === selectedTrainingType;
    return matchesSearch && matchesState && matchesType;
  });

  const handleView = (training: Training) => {
    console.log('Viewing training:', training.theme, training.id);
    toast.info(`Viewing details for: ${training.theme}`);
  };

  const handleEdit = (training: Training) => {
    console.log('Editing training:', training.theme, training.id);
    toast.success(`Editing: ${training.theme}`);
  };

  const handleDelete = (training: Training) => {
    console.log('Deleting training:', training.theme, training.id);
    toast.error(`Delete action for: ${training.theme}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-600 mb-6">TRAININGS TYPE</h1>
      </div>

      {/* Trainings Table */}
      <div className="mt-6">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 justify-between">
          

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-y-4">
           <div className="flex gap-3 w-full sm:w-auto">
             <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTrainingType} onValueChange={setSelectedTrainingType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Training Types</SelectItem>
                {trainingTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
           </div>

            <div className='flex justify-between gap-3'>
              <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </span>
              <Input
                placeholder="Search..."
                className="pl-10 w-full text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
             <Button className="bg-[#19488A] text-sm hover:bg-blue-700 ">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Training Type
                      </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <Card>
          <Table className='overflow-x-auto'>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12 text-gray-600 font-semibold">SN</TableHead>
                {/* <TableHead className='text-gray-600 font-semibold min-w-[300px]'>Theme</TableHead> */}
                <TableHead className='text-gray-600 font-semibold min-w-[250px]'>Name</TableHead>
                <TableHead className='text-gray-600 font-semibold min-w-[250px]'>Description</TableHead>
                {/* <TableHead className='text-gray-600 font-semibold'>State</TableHead> */}
                {/* <TableHead className='text-gray-600 font-semibold'>Start Date</TableHead> */}
                {/* <TableHead className='text-gray-600 font-semibold'>End Date</TableHead> */}
                <TableHead className='text-gray-600 font-semibold text-center'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrainings.length > 0 ? (
                filteredTrainings.map((training) => (
                  <TableRow key={training.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-700">{training.id}</TableCell>
                    {/* <TableCell className='text-gray-600'>{training.theme}</TableCell> */}
                    <TableCell className='text-gray-600'>{training.trainingType}</TableCell>
                    <TableCell className='text-gray-600'>{training.trainer}</TableCell>
                    {/* <TableCell className='text-gray-600'>{training.state}</TableCell> */}
                    {/* <TableCell className='text-gray-600'>{training.startDate}</TableCell> */}
                    {/* <TableCell className='text-gray-600'>{training.endDate}</TableCell> */}
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <EllipsisVertical className='h-5 w-5 text-gray-600'/>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(training)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(training)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(training)} 
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No trainings found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
        </Card>
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default TrainingType;