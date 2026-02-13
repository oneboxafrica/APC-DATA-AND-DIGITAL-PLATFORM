import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Search, EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';

import { toast } from 'sonner';
// import Breadcrumb from '../Training/Breadcrumb';

interface EducationSecretary {
  id: number;
  nin: string;
  name: string;
  email: string;
  phone: string;
}

const EsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();


  const esData: EducationSecretary[] = [
    { id: 1, nin: '12345678901', name: 'DR. OKON ETIM', email: 'okon.etim@edu.gov.ng', phone: '08012345678' },
    { id: 2, nin: '23456789012', name: 'SARAH ADAMS', email: 's.adams@edu.gov.ng', phone: '08023456789' },
    { id: 3, nin: '34567890123', name: 'PETER OBI', email: 'p.obi@edu.gov.ng', phone: '08034567890' },
  ];

  const filteredES = esData.filter(es =>
    es.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    es.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    es.nin.includes(searchQuery)
  );

  const handleEdit = (es: EducationSecretary) => navigate(`/es/edit/${es.id}`);
  const handleDelete = (es: EducationSecretary) => toast.error(`Delete action for: ${es.name}`);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-600 uppercase">Education Secretaries</h1>
        {/* <Button 
          onClick={() => navigate('/es/register')}
          className="bg-[#19488A] hover:bg-blue-800 text-white flex gap-2"
        >
          <Plus className="h-4 w-4" /> Add New ES
        </Button> */}
      </div>

      {/* <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard/overview' },
          { label: "Education Secretaries", current: true },
        ]}
      /> */}

      <div className="mt-6">
        <div className="flex flex-col sm:flex-row items-center  gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </span>
            <Input
              placeholder="Search by name, email or NIN..."
              className="pl-10 w-full text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12 font-semibold text-gray-600 text-center">#</TableHead>
                <TableHead className="font-semibold text-gray-600">NIN</TableHead>
                <TableHead className="font-semibold text-gray-600">Name</TableHead>
                <TableHead className="font-semibold text-gray-600">Email</TableHead>
                <TableHead className="font-semibold text-gray-600">Phone Number</TableHead>
                <TableHead className="font-semibold text-gray-600 text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredES.map((es, index) => (
                <TableRow key={es.id} className="hover:bg-gray-50">
                  <TableCell className="text-gray-700 text-center text-xs md:text-sm">{index + 1}</TableCell>
                  <TableCell className="text-gray-600 text-xs md:text-sm font-mono">{es.nin}</TableCell>
                  <TableCell className="text-blue-900 font-medium uppercase text-xs md:text-sm">
                    {es.name}
                  </TableCell>
                  <TableCell className="text-gray-600 text-xs md:text-sm lowercase">
                    {es.email}
                  </TableCell>
                  <TableCell className="text-gray-600 text-xs md:text-sm">
                    {es.phone}
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <EllipsisVertical className='h-5 w-5 text-gray-600'/>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(es)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(es)} 
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
          <p className="text-sm text-gray-600">Showing 1 to {filteredES.length} of {esData.length} entries</p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="secondary" size="sm" className="bg-blue-50">1</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EsList;