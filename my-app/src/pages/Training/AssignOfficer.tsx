
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Checkbox } from '../../components/ui/checkbox';
import { Button } from '../../components/ui/button';
import { EllipsisVertical, Search,  Eye, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../../components/ui/dropdown-menu'; 
import { toast,  } from 'sonner';
import { Badge } from '../../components/ui/badge';


interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created: string;
  permissions: string[];
  status: 'pending' | 'active' | 'deactive';
}

const AssignOfficer = () => {
const roles = [
  { name: 'UBEC Admin', color: 'bg-blue-500' },
  { name: 'Desk Officers', color: 'bg-yellow-500' },
  { name: 'Training Director', color: 'bg-red-500' },
  { name: 'Monitoring Officer', color: 'bg-purple-500' },
  { name: 'SSO (School Support Officer)', color: 'bg-red-600' },
  { name: 'Education Secretary', color: 'bg-green-500' },
];

const users: User[] = [
  { id: '#0256', name: 'Bessie Beatty', email: 'christophe76@gmail.com', role: 'UBEC Admin', created: 'October 14, 2029 5:01 PM', permissions: ['Read'], status: 'pending' },
  { id: '#6177', name: 'Joshua Green', email: 'ayla.schuster28@yahoo.com', role: 'Desk Officers', created: 'November 1, 2027 2:23 PM', permissions: ['Write'], status: 'pending' },
  { id: '#5456', name: 'Wendy Ankundig', email: 'lorine66@gmail.com', role: 'Training Director', created: 'December 29, 2024 9:37 AM', permissions: ['Delete', 'Write', 'Read'], status: 'active' },
  { id: '#6370', name: 'Daryl Wilderman', email: 'kane.anderson@gmail.com', role: 'UBEC Admin', created: 'September 1, 2027 3:14 PM', permissions: ['Write', 'Delete'], status: 'deactive' },
  { id: '#8681', name: 'Antonia Ankundig Jr.', email: 'forest.autdrehr76@gmail.com', role: 'Monitoring Officer', created: 'August 25, 2029 11:39 PM', permissions: ['Read', 'Write', 'Delete'], status: 'pending' },
  { id: '#1083', name: 'Marie VonRueden', email: 'molly.hauck57@hotmail.com', role: 'Desk Officers', created: 'October 2, 2024 10:04 PM', permissions: ['Delete', 'Write', 'Read'], status: 'pending' },
  { id: '#9425', name: 'Katherine Parisian', email: 'rashad.moen@yahoo.com', role: 'UBEC Admin', created: 'May 9, 2029 12:10 AM', permissions: ['Delete', 'Read', 'Write'], status: 'active' },
  { id: '#4775', name: 'Jaime Tremblay', email: 'madyson4@yahoo.com', role: 'Monitoring Officer', created: 'October 5, 2022 9:26 PM', permissions: ['Delete', 'Read', 'Write'], status: 'pending' },
];
    

  const handleView = (user: User) => {
    console.log('Viewing user:', user.name, user.id);
    toast.info(`Viewing details for ${user.name} (${user.id})`);
  };

  const handleEdit = (user: User) => {
    console.log('Editing user:', user.name, user.id);
  };

  const handleDelete = (user: User) => {
    console.log('Deleting user:', user.name, user.id);

  };


  return (
     <div className="min-h-screen bg-gray-50 p-6">
       <div>
          <h1 className="text-2xl font-bold text-gray-900">Assign Officer</h1>
        </div>
       {/* Users Table */}
       <div className="mt-10">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row lg:items-center gap-4 mb-6 justify-between ">
            <div className='flex flex-col lg:flex-row lg:items-center gap-4 justify-between'>
             
            <div className="flex gap-3 ">
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="deactive">Deactive</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map((r) => (
                    <SelectItem key={r.name} value={r.name}>{r.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            </div>

           <div className='flex items-center gap-4'>
             <div className="relative w-full sm:w-64 ">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </span>
              <Input
                placeholder="Search for officers..."
                className="pl-10 w-full text-sm"
              />
            </div>
              {/* <Button className="bg-[#19488A] text-sm hover:bg-blue-700 ">
            <UserPlus className="w-4 h-4 mr-2" />
            Add New User
          </Button> */}
           </div>
          </div>

          {/* Table */}
     <Card>
            <Table className='overflow-x-auto'>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead className='truncate max-w-[180px]'>USER ID</TableHead>
                  <TableHead className='truncate max-w-[180px] '>NAME</TableHead>
                  <TableHead className='truncate max-w-[180px] '>ROLE</TableHead>
                  <TableHead className='truncate max-w-[180px] '>STATUS</TableHead>
                   <TableHead className='truncate max-w-[180px] '>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium text-gray-900  ">{user.id}</TableCell>
                    <TableCell className=''>
                      <div className="flex items-center gap-3">
                      <div className="font-medium line-clamp-1">{user.name}</div>
                      </div>
                    </TableCell>
                    <TableCell className='truncate max-w-[180px]'>
                      <Badge className=' text-center' variant="secondary">{user.role}</Badge>
                    </TableCell>
                   
                    <TableCell className='truncate max-w-[180px]'>
                      <Badge
                        variant={
                          user.status === 'active'
                            ? 'default'
                            : user.status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                        className="capitalize"
                      >
                        {user.status === 'deactive' ? 'Deactive' : user.status}
                      </Badge>
                    </TableCell>
                     <TableCell className="truncate max-w-[180px] onfocus:outline-none ">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 hover:outline-none onfocus:outline-none">
                                    <span className="sr-only">Open menu</span>
                                    <EllipsisVertical className='h-5 w-5 text-gray-600 hover:outline-none onfocus:outline-none'/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleView(user)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    <span>View</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEdit(user)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleDelete(user)} 
                                  className="text-red-600 focus:text-red-600" 
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t text-sm text-gray-600">
              <div>Rows per page 10</div>
              <div>Page 1 of 10</div>
            </div>
          </Card>
        </div>
    </div>
  )
}

export default AssignOfficer