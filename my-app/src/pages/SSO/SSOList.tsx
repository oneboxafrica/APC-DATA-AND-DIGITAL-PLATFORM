import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Search, EllipsisVertical, Pencil, Trash2} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';

import { toast } from 'sonner';
// import Breadcrumb from '../Training/Breadcrumb';

interface SSO {
  id: number;
  name: string;
  lga: string;
  email: string;
  phone: string;
}

const SSOList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();


  const ssoData: SSO[] = [
    { id: 1, name: 'EMMANUEL EKANEM', lga: '', email: 'ekanem1969@gmail.com', phone: '08038971206' },
    { id: 2, name: 'AKOMAYE EDWARD', lga: '', email: 'akomayexyz@gmail.com', phone: '08035817892' },
    { id: 3, name: 'EDET AGUSTA JEROME', lga: '', email: 'agustaedet900@gmail.com', phone: '08032620042' },
    { id: 4, name: 'RAYMOND OBEGU', lga: '', email: 'raymondobegu5@gmail.com', phone: '07033614071' },
    { id: 5, name: 'EMMANUEL ODU', lga: '', email: 'emmanuelodu968@gmail.com', phone: '08108331055' },
    { id: 6, name: 'OBOH REGINA EMMANUEL', lga: '', email: 'reginaoboh1@gmail.com', phone: '07034702044' },
    { id: 7, name: 'OTU MARIA KAKA', lga: 'Boki', email: 'otumaria54@gmail.com', phone: '07035119102' },
    { id: 8, name: 'OLA SUNDAY EVONG', lga: 'Calabar South', email: 'olaevong@gmail.com', phone: '08091562909' },
    { id: 9, name: 'ABI JULIUS', lga: 'Ogoja', email: 'abijulius780@gmail.com', phone: '09034746388' },
    { id: 10, name: 'ATABEN AGNES ONYAGA', lga: '', email: 'onyagaagnes@gmail.com', phone: '08021290118' },
  ];

  const filteredSSOs = ssoData.filter(sso =>
    sso.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sso.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (sso: SSO) => navigate(`/sso/edit/${sso.id}`);
  const handleDelete = (sso: SSO) => toast.error(`Delete action for: ${sso.name}`);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-600 uppercase">SSO's</h1>
        {/* <Button 
          onClick={() => navigate('/sso/register')}
          className="bg-[#19488A] hover:bg-blue-800 text-white flex gap-2"
        >
          <Plus className="h-4 w-4" /> Add New SSO
        </Button> */}
      </div>

      {/* <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard/overview' },
          { label: "SSO's", href: '/sso', current: true },
        ]}
      /> */}

      <div className="mt-6">
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mb-6">
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

        <Card>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12 font-semibold text-gray-600">#</TableHead>
                <TableHead className="font-semibold text-gray-600">Name</TableHead>
                <TableHead className="font-semibold text-gray-600">LGA</TableHead>
                <TableHead className="font-semibold text-gray-600">Email</TableHead>
                <TableHead className="font-semibold text-gray-600">Phone Number</TableHead>
                <TableHead className="font-semibold text-gray-600 text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSSOs.map((sso) => (
                <TableRow key={sso.id} className="hover:bg-gray-50">
                  <TableCell className="text-gray-700 text-center text-xs md:text-sm">{sso.id}</TableCell>
                  <TableCell className="text-blue-900 font-medium uppercase text-xs md:text-sm">
                    {sso.name}
                  </TableCell>
                  <TableCell className="text-gray-600 text-xs md:text-sm">
                    {sso.lga || '---'}
                  </TableCell>
                  <TableCell className="text-gray-600 text-xs md:text-sm">
                    {sso.email}
                  </TableCell>
                  <TableCell className="text-gray-600 text-xs md:text-sm">
                    {sso.phone}
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <EllipsisVertical className='h-5 w-5 text-gray-600'/>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(sso)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(sso)} 
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
          <p className="text-sm text-gray-600">Showing 1 to {filteredSSOs.length} of 59 entries</p>
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

export default SSOList;