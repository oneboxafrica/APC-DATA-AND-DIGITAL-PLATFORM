import { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { toast } from 'sonner';
import { Button } from '../../components/ui/button';
import Breadcrumb from '../Training/Breadcrumb';

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const subjects = ["Mathematics", "English Language", "Basic Science", "Social Studies", "Biology", "Physics", "Chemistry"];
const categories = ["Teaching", "Non-Teaching"];
const qualifications = ["NCE", "B.Ed", "B.Sc", "M.Ed", "PhD"];

interface ParticipantFormData {
  nin: string;
  name: string;
  dob: string;
  stateOfOrigin: string;
  lgaOfOrigin: string;
  school: string;
  homeAddress: string;
  phoneNumber: string;
  email: string;
  highestQualification: string;
  subjectTaught: string;
  category: string;
  subCategory: string;
  gender: string;
  retirementMonth: string;
  retirementYear: string;
}

const RegisterParticipant = () => {
  const [_submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ParticipantFormData>({
    nin: '',
    name: '',
    dob: '',
    stateOfOrigin: '',
    lgaOfOrigin: '',
    school: '',
    homeAddress: '',
    phoneNumber: '',
    email: '',
    highestQualification: '',
    subjectTaught: '',
    category: '',
    subCategory: '',
    gender: '',
    retirementMonth: '',
    retirementYear: '',
  });

  const handleChange = <K extends keyof ParticipantFormData>(
    key: K,
    value: ParticipantFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFormData({
      nin: '', name: '', dob: '', stateOfOrigin: '', lgaOfOrigin: '',
      school: '', homeAddress: '', phoneNumber: '', email: '',
      highestQualification: '', subjectTaught: '', category: '',
      subCategory: '', gender: '', retirementMonth: '', retirementYear: '',
    });
    setSubmitted(false);
  };

  const isFormValid = () => {

    return (
      formData.nin && formData.name && formData.dob && 
      formData.stateOfOrigin && formData.school && 
      formData.email && formData.gender
    );
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    if (!isFormValid()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Participant Registration Data:', formData);
      toast.success('Participant registered successfully!');
      handleReset();
    } catch (error) {
      toast.error('Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/dashboard' },
          { label: 'Register Participant', current: true },
        ]}
      />
      
      <div className="mt-6 ">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b px-8 py-6">
            <h1 className="text-2xl font-bold text-[#19488A]">Register Participant</h1>
          </div>

          <div className="p-8 grid grid-cols-1 gap-y-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label>NIN <span className="text-red-500">*</span></Label>
                <Input value={formData.nin} onChange={(e) => handleChange('nin', e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label>Name <span className="text-red-500">*</span></Label>
                <Input value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="mt-1.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label>Date of Birth <span className="text-red-500">*</span></Label>
                <Input type="date" value={formData.dob} onChange={(e) => handleChange('dob', e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label>State Of Origin <span className="text-red-500">*</span></Label>
                <Select value={formData.stateOfOrigin} onValueChange={(val) => handleChange('stateOfOrigin', val)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select State" /></SelectTrigger>
                  <SelectContent>{nigerianStates.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label>LGA Of Origin <span className="text-red-500">*</span></Label>
                <Select value={formData.lgaOfOrigin} onValueChange={(val) => handleChange('lgaOfOrigin', val)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select LGA" /></SelectTrigger>
                  <SelectContent><SelectItem value="lga1">Select LGA</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <Label>Select School <span className="text-red-500">*</span></Label>
                <Select value={formData.school} onValueChange={(val) => handleChange('school', val)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select School" /></SelectTrigger>
                  <SelectContent><SelectItem value="school1">Sample School</SelectItem></SelectContent>
                </Select>
              </div>
            </div>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
               <div className="flex items-center gap-6">
              <Label>Gender <span className="text-red-500">*</span></Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" value="Male" onChange={(e) => handleChange('gender', e.target.value)} checked={formData.gender === 'Male'} />
                  Male:
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" value="Female" onChange={(e) => handleChange('gender', e.target.value)} checked={formData.gender === 'Female'} />
                  Female:
                </label>
              </div>
            </div>
            <div>
              <Label>Home Address <span className="text-red-500">*</span></Label>
              <Input value={formData.homeAddress} onChange={(e) => handleChange('homeAddress', e.target.value)} className="mt-1.5" />
            </div>
          </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label>Phone number <span className="text-red-500">*</span></Label>
                <Input value={formData.phoneNumber} onChange={(e) => handleChange('phoneNumber', e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label>Email <span className="text-red-500">*</span></Label>
                <Input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className="mt-1.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label>Highest Qualification <span className="text-red-500">*</span></Label>
                <Select value={formData.highestQualification} onValueChange={(val) => handleChange('highestQualification', val)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select Qualification" /></SelectTrigger>
                  <SelectContent>{qualifications.map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Subject Taught <span className="text-red-500">*</span></Label>
                <Select value={formData.subjectTaught} onValueChange={(val) => handleChange('subjectTaught', val)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select Subject" /></SelectTrigger>
                  <SelectContent>{subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label>Category <span className="text-red-500">*</span></Label>
                <Select value={formData.category} onValueChange={(val) => handleChange('category', val)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select Category" /></SelectTrigger>
                  <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Sub Category <span className="text-red-500">*</span></Label>
                <Select value={formData.subCategory} onValueChange={(val) => handleChange('subCategory', val)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select Sub Category" /></SelectTrigger>
                  <SelectContent><SelectItem value="sub1">Sub Category</SelectItem></SelectContent>
                </Select>
              </div>
            </div>

         

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Label className="lg:col-span-2">Expected Retirement Date <span className="text-red-500">*</span></Label>
              <div>
                <Label className="text-xs text-gray-500">Month:</Label>
                <Select value={formData.retirementMonth} onValueChange={(val) => handleChange('retirementMonth', val)}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Month" /></SelectTrigger>
                  <SelectContent>
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Year:</Label>
                <Select value={formData.retirementYear} onValueChange={(val) => handleChange('retirementYear', val)}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Year" /></SelectTrigger>
                  <SelectContent>
                    {[2025, 2026, 2027, 2028, 2029, 2030].map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="border-t px-8 py-6 flex lg:justify-end gap-3">
            <Button variant="outline" onClick={handleReset} className="">Cancel</Button>
            <Button onClick={handleSubmit} disabled={isSubmitting} className=" bg-[#19488A] hover:bg-blue-700 text-white">
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterParticipant;