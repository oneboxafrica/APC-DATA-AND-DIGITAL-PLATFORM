import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Search, EllipsisVertical, Eye, Pencil, Trash2,History } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../../components/ui/dropdown-menu';

import { toast } from 'sonner';
import Breadcrumb from '../Training/Breadcrumb';


interface Teacher {
  id: number;
  name: string;
  gender: string;
  state: string;
  lga: string;
  school: string;
  qualification: string;
}

const ListOfTeachers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // const [entriesPerPage, setEntriesPerPage] = useState('10');
  const navigate = useNavigate();

  // Data from the provided image
  const teachers: Teacher[] = [
    { id: 1, name: 'EFFIOM PATRICIA EDET', gender: 'Female', state: 'Cross River State', lga: 'Calabar Municipal', school: 'PCN PRIMARY SCHOOL ISHIE TOWN CALABAR', qualification: 'B. Ed' },
    { id: 2, name: 'OKOI ENI CLEMENT', gender: 'Male', state: 'Cross River State', lga: 'Yakuur', school: 'PCN Primary school Ishie Town', qualification: 'NCE' },
    { id: 3, name: 'AJEGI JOHN IKACHI', gender: 'Male', state: 'Cross River State', lga: 'Yala', school: '', qualification: 'B. Ed' },
    { id: 4, name: 'OBOT JOY NKANU', gender: 'Male', state: 'Cross River State', lga: 'Yakuur', school: 'PCN Primary school Ishie Town', qualification: 'NCE' },
    { id: 5, name: 'ONOMEZE ROSELINE EFFIONG', gender: 'Female', state: 'Cross River State', lga: 'Yakuur', school: 'PCN PRIMARY SCHOOL ISHIE TOWN CALABAR', qualification: 'B. Ed' },
    { id: 6, name: 'USHAKA PATRICIA USHIGIELEBI', gender: 'Female', state: 'Cross River State', lga: 'Obudu', school: 'PCN PRIMARY SCHOOL ISHIE TOWN CALABAR', qualification: 'B. Ed' },
    { id: 7, name: 'Etorti Edu Echeng', gender: 'Female', state: 'Cross River State', lga: 'Abi', school: 'PCN Primary school Ishie Town', qualification: 'NCE' },
    { id: 8, name: 'onah elizabeth eje', gender: 'Male', state: 'Cross River State', lga: 'Calabar Municipal', school: 'PCN PRIMARY SCHOOL ISHIE TOWN CALABAR', qualification: 'B. Ed' },
    { id: 9, name: 'ayuk mabel echabor', gender: 'Female', state: 'Cross River State', lga: 'Calabar Municipal', school: '', qualification: 'NCE' },
    { id: 10, name: 'ogbudu lydia ochuole', gender: 'Female', state: 'Cross River State', lga: 'Calabar Municipal', school: '', qualification: 'B. Ed' },
  ];

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (teacher: Teacher) => navigate(`/teachers/view/${teacher.id}`);
  const handleEdit = (teacher: Teacher) => navigate(`/teachers/edit/${teacher.id}`);
  const handleDelete = (teacher: Teacher) => toast.error(`Delete action for: ${teacher.name}`);
  const handleTransferHistory = (teacher: Teacher) => toast.info(`Viewing transfer history for: ${teacher.name}`);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-600 uppercase">Teachers</h1>
      </div>

      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard/overview' },
          { label: 'Teachers', href: '/teachers', current: true },
        ]}
      />

      <div className="mt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          {/* <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
              <SelectTrigger className="w-20">
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

          <div className='flex gap-3'>
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
           
          </div>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12 font-semibold text-gray-600">#</TableHead>
                <TableHead className="font-semibold text-gray-600">Name</TableHead>
                <TableHead className="font-semibold text-gray-600">Gender</TableHead>
                <TableHead className="font-semibold text-gray-600">State</TableHead>
                <TableHead className="font-semibold text-gray-600">LGA</TableHead>
                <TableHead className="font-semibold text-gray-600">School</TableHead>
                <TableHead className="font-semibold text-gray-600">Qualification</TableHead>
                <TableHead className="font-semibold text-gray-600 text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id} className="hover:bg-gray-50">
                  <TableCell className="text-gray-700 text-center text-xs md:text-sm">{teacher.id}</TableCell>
                  <TableCell className="text-blue-900 font-medium uppercase text-xs md:text-sm">
                    <p className="line-clamp-1">{teacher.name}</p>
                  </TableCell>
                  <TableCell className="text-gray-600 text-xs md:text-sm ">
                    <p className="line-clamp-1">{teacher.gender}</p>
                  </TableCell>
                  <TableCell className="text-gray-600 text-xs md:text-sm">
                    <p className="line-clamp-1">{teacher.state}</p>
                  </TableCell>
                  <TableCell className="text-gray-600 text-xs md:text-sm">
                    <p className="line-clamp-1">{teacher.lga}</p>
                  </TableCell>
                  <TableCell className="text-gray-600 text-xs md:text-sm">
                    <p className="line-clamp-1">{teacher.school || '---'}</p>
                  </TableCell>
                  <TableCell className="text-gray-600 text-xs md:text-sm">
                    <p className="line-clamp-1">{teacher.qualification}</p>
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <EllipsisVertical className='h-5 w-5 text-gray-600'/>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(teacher)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Full Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(teacher)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleTransferHistory(teacher)}>
                          <History className="mr-2 h-4 w-4" />
                          Transfer History
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(teacher)} 
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">Showing 1 to {filteredTeachers.length} of 5,184 entries</p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="secondary" size="sm" className="bg-blue-50">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfTeachers;