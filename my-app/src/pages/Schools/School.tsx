import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { EllipsisVertical, Search, Eye, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../../components/ui/dropdown-menu';
import { toast, Toaster } from 'sonner';
import Breadcrumb from '../Training/Breadcrumb';

interface School {
  id: number;
  schoolCode?: string;
  name: string;
  state: string;
  lga: string;
  address: string;
  numberOfTeachers: number;
  level: string;
  status: 'active' | 'inactive' | 'pending';
}


const USER_ROLES = {
  UBEC_ADMIN: 'UBEC Admin',
  DESK_OFFICER: 'Desk Officers',
  TRAINING_DIRECTOR: 'Training Director',
  MONITORING_OFFICER: 'Monitoring Officer',
  SSO: 'SSO (School Support Officer)',
  EDUCATION_SECRETARY: 'Education Secretary',
} as const;

const Schools = () => {
  // const { userRole } = useAuth();
   const [userRole] = useState<string>(USER_ROLES.DESK_OFFICER); // Change to test different roles
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedLga, setSelectedLga] = useState('all');
  const [selectedStatus, _setSelectedStatus] = useState('all');

  const schools: School[] = [
    { id: 1, schoolCode:'#25734', name: 'GSS Kaifungo', state: 'Gombe State', lga: 'Gombe', address: 'gombe west', numberOfTeachers: 1000, level: 'Primary', status: 'active' },
    { id: 2, schoolCode:'#25734', name: 'Sokoto Sample', state: 'Sokoto State', lga: 'Sokoto North', address: 'Usman Danfodio', numberOfTeachers: 1000, level: 'Primary', status: 'active' },
    { id: 3, schoolCode:'#25734', name: 'YAHAYA ABDULKARIM MODEL PRIMARY SCHOOL', state: 'Sokoto State', lga: 'Wamako', address: 'DORUWA ROAD, SOKOTO', numberOfTeachers: 1000, level: 'Primary', status: 'pending' },
    { id: 4, schoolCode:'#25734', name: 'ANIFOWOSHE B LGEA PRIMARY SCHOOL, ANIFOWOSHE', state: 'Kwara State', lga: 'Ilorin East', address: 'IPATA OLOJE ILORIN', numberOfTeachers: 1000, level: 'Primary', status: 'active' },
    { id: 5, schoolCode:'#25734', name: 'ST. BARNABAS A LOCAL GOVERNMENT EDUCATION AUTHORITY PRIMARY SCHOOL', state: 'Kwara State', lga: 'Ilorin East', address: 'SABO OKE, ILORIN', numberOfTeachers: 1000, level: 'Primary', status: 'inactive' },
    { id: 6, schoolCode:'#25734', name: 'BAPTIST LGEA SCHOOL', state: 'Kwara State', lga: 'Ilorin West', address: 'SURULERE, ILORIN', numberOfTeachers: 1000, level: 'Primary', status: 'active' },
    { id: 7, schoolCode:'#25734', name: 'LGEA SCHOOL ADEWOLE ILORIN', state: 'Kwara State', lga: 'Ilorin South', address: 'APALARA ADEWOLE AREA, ILORIN', numberOfTeachers: 1000, level: 'Primary', status: 'pending' },
    { id: 8, schoolCode:'#25734', name: 'GSS GOMBE', state: 'Gombe State', lga: 'Gombe', address: 'GOMBE', numberOfTeachers: 1000, level: 'Primary', status: 'active' },
    { id: 9, schoolCode:'#25734', name: 'AFRICAN CHURCH SCHOOL', state: 'Akwa Ibom State', lga: 'Oruk Anam', address: 'IBESIT EBONG', numberOfTeachers: 1000, level: 'Primary', status: 'pending' },
    { id: 10, schoolCode:'#25734', name: 'BES KAWO', state: 'Kaduna State', lga: 'Kaduna North', address: 'KAWO ROAD', numberOfTeachers: 1000, level: 'Primary', status: 'active' },
    { id: 11, schoolCode:'#25734', name: 'BES YUSUF DANTSOHO', state: 'Kaduna State', lga: 'Kaduna North', address: 'NO 1 ZANNA DUJIMA ROAD UNGUWAN RIMI', numberOfTeachers: 1000, level: 'Primary', status: 'inactive' },
  ];

  const isDeskOfficer = userRole === 'deskofficer';

  const states = Array.from(new Set(schools.map(school => school.state))).sort();
  const lgas = Array.from(new Set(schools.map(school => school.lga))).sort();

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || school.status === selectedStatus;
    

    if (isDeskOfficer) {
      const matchesLga = selectedLga === 'all' || school.lga === selectedLga;
      return matchesSearch && matchesLga && matchesStatus;
    } else {
      const matchesState = selectedState === 'all' || school.state === selectedState;
      return matchesSearch && matchesState && matchesStatus;
    }
  });

  const handleView = (school: School) => {
    console.log('Viewing school:', school.name, school.id);
    toast.info(`Viewing details for ${school.name}`);
  };

  const handleEdit = (school: School) => {
    console.log('Editing school:', school.name, school.id);
    toast.success(`Editing ${school.name}`);
  };

  const handleDelete = (school: School) => {
    console.log('Deleting school:', school.name, school.id);
    toast.error(`Delete action for ${school.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className='mb-6'>
        <h1 className="text-2xl font-bold text-gray-900">Schools</h1>
        <p className="text-sm text-gray-500 mt-1">Current Role: {userRole}</p>
      </div>
       <Breadcrumb
              items={[
                { label: 'Dashboard', href: '/dashboard/overview' },
                { label: 'Schools', href: '/schools', current: true },
              ]}
            />
      

      <div className="mt-10">
        <div className="flex flex-col sm:flex-row lg:items-center gap-4 mb-6 justify-between">
          <div className='flex flex-col lg:flex-row lg:items-center gap-4 justify-between'>
            <div className="flex gap-3">
              {/* <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select> */}

              {isDeskOfficer ? (
                <Select value={selectedLga} onValueChange={setSelectedLga}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by LGA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All LGAs</SelectItem>
                    {lgas.map((lga) => (
                      <SelectItem key={lga} value={lga}>{lga}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </span>
              <Input
                placeholder="Search for schools..."
                className="pl-10 w-full text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>


        <Card>
          <Table className='overflow-x-auto'>
            <TableHeader>
              <TableRow>
                <TableHead className='truncate max-w-[180px]'>#</TableHead>
                 <TableHead className='truncate max-w-[180px]'>School Code</TableHead>
                <TableHead className='truncate max-w-[180px]'>NAME</TableHead>
                {!isDeskOfficer && (
                  <TableHead className='truncate max-w-[180px]'>STATE</TableHead>
                )}
                <TableHead className='truncate max-w-[180px]'>LGA</TableHead>
                <TableHead className='truncate max-w-[180px]'>ADDRESS</TableHead>
                {/* <TableHead className='truncate max-w-[180px]'>NUMBER OF TEACHERS</TableHead> */}
                {/* <TableHead className='truncate max-w-[180px]'>LEVEL</TableHead> */}
                {/* <TableHead className='truncate max-w-[180px]'>STATUS</TableHead> */}
                <TableHead className='truncate max-w-[180px]'>ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell className="font-medium text-gray-900 text-xs md:text-sm">{school.id}</TableCell>
                     <TableCell className='text-gray-600 text-center text-xs md:text-sm'>{school.schoolCode}</TableCell>
                    <TableCell className=''>
                      <div className="font-medium line-clamp-1 text-xs md:text-sm">{school.name}</div>
                    </TableCell>
                    {/* Conditionally render STATE column */}
                    {!isDeskOfficer && (
                      <TableCell className='text-blue-600 '>
                        <div className='line-clamp-1 text-xs md:text-sm'>{school.state}</div>
                      </TableCell>
                    )}
                    <TableCell className='text-gray-600'>
                      <p className='line-clamp-1 text-xs md:text-sm'>{school.lga}</p>
                    </TableCell>
                    <TableCell className='text-gray-600 uppercase text-xs'>
                      <p className='line-clamp-1 text-xs md:text-sm'>{school.address}</p>
                    </TableCell>
                    {/* <TableCell className='text-gray-600 text-center'>{school.numberOfTeachers}</TableCell> */}
                    {/* <TableCell className='text-gray-600'>{school.level}</TableCell> */}
                    {/* <TableCell className='truncate max-w-[180px]'>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          school.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : school.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {school.status}
                      </span>
                    </TableCell> */}
                    <TableCell className="truncate max-w-[180px]">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <EllipsisVertical className='h-5 w-5 text-gray-600'/>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(school)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(school)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(school)} 
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
                  <TableCell colSpan={isDeskOfficer ? 9 : 10} className="text-center py-8 text-gray-500">
                    No schools found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between px-6 py-4 border-t text-sm text-gray-600">
            <div>Rows per page 10</div>
            <div>Page 1 of {Math.ceil(filteredSchools.length / 10)}</div>
          </div>
        </Card>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default Schools;