import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { useNavigate } from 'react-router-dom';
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

import { toast } from 'sonner';
import Breadcrumb from './Breadcrumb';

interface Training {
  id: number;
  initiative: string;
  theme: string;
  trainingType: string;
  trainer: string;
  state: string;
  startDate: string;
  endDate: string;
}

const Training = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedTrainingType, setSelectedTrainingType] = useState('all');
  const [selectedInitiative, setSelectedInitiative] = useState('all');
  const [entriesPerPage, setEntriesPerPage] = useState('10');
  const navigate = useNavigate();

  const trainings: Training[] = [
    {
      id: 1,
      theme: 'A 5-DAY CAPACITY BUILDING WORKSHOP FOR SCHOOL SUPPORT OFFICERS',
      initiative: 'SUBEC',
      trainingType: 'School Support Training',
      trainer: 'Adéyemi College of Education Consult',
      state: 'Ondo State',
      startDate: '2023-10-30',
      endDate: '2023-11-03'
    },
    {
      id: 2,
      theme: 'School Based Training for Improved Teacher Classroom Effectiveness and Learning Outcomes',
      initiative: 'UBEC',
      trainingType: 'Pedagogies in English, Mathematics and Science Education Training',
      trainer: 'Federal College of Education Eha-Amufu Isi Uzo Local Government Enugu State',
      state: 'Enugu State',
      startDate: '2024-01-09',
      endDate: '2024-05-12'
    },
    {
      id: 3,
      theme: 'Making Teachers Effective and Competent through Mentoring and Coaching',
      initiative: 'UBEC',
      trainingType: 'School Support Training',
      trainer: 'Federal College of Education Eha-Amufu Isi Uzo Local Government Enugu State',
      state: 'Enugu State',
      startDate: '2023-11-27',
      endDate: '2023-12-01'
    },
    {
      id: 4,
      theme: 'Sokoto Training',
      initiative: 'UBEC',
      trainingType: 'Early Childhood Care Development and Education Training',
      trainer: 'Sokoto',
      state: 'Sokoto State',
      startDate: '2023-10-30',
      endDate: '2023-10-30'
    },
    {
      id: 5,
      theme: 'Teacher Professional Development (TDP)',
      initiative: 'UBEC',
      trainingType: 'School Support Training',
      trainer: 'College of Education, Afaha Nsit',
      state: 'Akwa Ibom State',
      startDate: '2023-11-06',
      endDate: '2023-11-10'
    },
    {
      id: 6,
      theme: 'ICT in Education',
      initiative: 'UBEC',
      trainingType: 'Information and Communication Technology Training',
      trainer: 'UBEC',
      state: 'Bauchi State',
      startDate: '2023-11-01',
      endDate: '2023-11-03'
    },
    {
      id: 7,
      theme: 'SCHOOL BASED TRAINING',
      initiative: 'UBEC',
      trainingType: 'School Leadership Training',
      trainer: 'CROSS RIVER STATE COLLEGE OF EDUCATION',
      state: 'Cross River State',
      startDate: '2023-11-13',
      endDate: '2023-11-19'
    },
    {
      id: 8,
      theme: 'School Support Officers (SSO) Training - Improving Teachers\' Classroom Delivery through Effective Mentoring and Coaching',
      initiative: 'UBEC',
      trainingType: 'School Support Training',
      trainer: 'College of Education Ikwo',
      state: 'Ebonyi State',
      startDate: '2023-11-20',
      endDate: '2023-11-24'
    },
    {
      id: 9,
      theme: 'School Based Training for Improved Teacher Classroom Effectiveness and Learning Outcomes',
      initiative: 'UBEC',
      trainingType: 'Pedagogies in English, Mathematics and Science Education Training',
      trainer: 'College of Education Ikwo',
      state: 'Ebonyi State',
      startDate: '2024-01-08',
      endDate: '2024-04-08'
    }
  ];

  const states = Array.from(new Set(trainings.map(t => t.state))).sort();
  const trainingTypes = Array.from(new Set(trainings.map(t => t.trainingType))).sort();
  const initiatives = Array.from(new Set(trainings.map(t => t.initiative))).sort();

  // Filter trainings
  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = 
      training.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.trainer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.trainingType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.initiative.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === 'all' || training.state === selectedState;
    const matchesType = selectedTrainingType === 'all' || training.trainingType === selectedTrainingType;
    const matchesInitiative = selectedInitiative === 'all' || training.initiative === selectedInitiative;
    return matchesSearch && matchesState && matchesType && matchesInitiative;
  });

const handleView = (training: Training) => {
    navigate(`/training/manage/view/${training.id}`);
  };

  const handleEdit = (training: Training) => {
    navigate(`/training/manage/edit/${training.id}`);
  };

  const handleAdd = () => {
    navigate('/training/manage/add');
  };

  const handleDelete = (training: Training) => {
    toast.error(`Delete action for: ${training.theme}`);
  };



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-600 mb-6">TRAININGS</h1>
      </div>

<Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard/overview' },
          { label: 'Trainings', href: '/training/manage', current: true },
        ]}
      />

      {/* Trainings Table */}
      <div className="mt-6">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 justify-between">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-y-4">
            <div className="flex gap-3 w-full sm:w-auto flex-wrap">
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

              <Select value={selectedInitiative} onValueChange={setSelectedInitiative}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by Initiative" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Initiatives</SelectItem>
                  {initiatives.map((initiative) => (
                    <SelectItem key={initiative} value={initiative}>{initiative}</SelectItem>
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
              <Button 
                className="bg-[#19488A] text-sm hover:bg-blue-700"
                onClick={handleAdd} // Now navigates to full page
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Training
              </Button>
            </div>
          </div>
        </div>

<Card>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12 text-gray-600 font-semibold">Program_code</TableHead>
                <TableHead className='text-gray-600 font-semibold min-w-[300px]'>Theme</TableHead>
                 <TableHead className='text-gray-600 font-semibold min-w-[250px]'>Training Type</TableHead>
                <TableHead className='text-gray-600 font-semibold min-w-[250px]'>Initiative</TableHead>
                <TableHead className='text-gray-600 font-semibold text-center'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrainings.length > 0 ? (
                filteredTrainings.map((training) => (
                  <TableRow key={training.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-700 text-center">{training.id}</TableCell>
                    <TableCell className='text-gray-600 '>
                      <p className='line-clamp-1'>{training.theme}</p>
                    </TableCell>
                    <TableCell className='text-gray-600'>
                      <p className='line-clamp-1'>
                      {training.trainingType}</p>
                      </TableCell>
                    <TableCell className='text-gray-600 '>
                      <p className='line-clamp-1'>{training.initiative}</p>
                    </TableCell>
                   
                    
                        
                    <TableCell>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <EllipsisVertical className='h-5 w-5 text-gray-600'/>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(training)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(training)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(training)} 
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No trainings found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
        
        <div className="flex items-center gap-2 mt-4">
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
    </div>
  );
}

export default Training;