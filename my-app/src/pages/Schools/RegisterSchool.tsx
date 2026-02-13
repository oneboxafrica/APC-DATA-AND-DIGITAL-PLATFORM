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

const lgaByState = {
  "Lagos": ["Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"],
  "Kano": ["Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", "Gabasawa", "Garko", "Garun Mallam", "Gaya", "Gezawa", "Gwale", "Gwarzo", "Kabo", "Kano Municipal", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", "Kura", "Madobi", "Makoda", "Minjibir", "Nasarawa", "Rano", "Rimin Gado", "Rogo", "Shanono", "Sumaila", "Takai", "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada", "Ungogo", "Warawa", "Wudil"],
  "Oyo": ["Afijio", "Akinyele", "Atiba", "Atisbo", "Egbeda", "Ibadan North", "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Ibarapa Central", "Ibarapa East", "Ibarapa North", "Ido", "Irepo", "Iseyin", "Itesiwaju", "Iwajowa", "Kajola", "Lagelu", "Ogbomosho North", "Ogbomosho South", "Ogo Oluwa", "Olorunsogo", "Oluyole", "Ona Ara", "Orelope", "Ori Ire", "Oyo East", "Oyo West", "Saki East", "Saki West", "Surulere"],
};

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
  "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
  "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna",
  "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

interface SchoolFormData {
  schoolName: string;
  schoolAddress: string;
  state: string;
  lga: string;
  schoolCode: string;
}

const RegisterSchool = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<SchoolFormData>({
    schoolName: '',
    schoolAddress: '',
    state: '',
    lga: '',
    schoolCode: '',
  });

  const handleChange = <K extends keyof SchoolFormData>(
    key: K,
    value: SchoolFormData[K]
  ) => {
    setFormData((prev) => {

      if (key === 'state') {
        return { ...prev, [key]: value, lga: '' };
      }
      return { ...prev, [key]: value };
    });
  };

  const handleReset = () => {
    setFormData({
      schoolName: '',
      schoolAddress: '',
      state: '',
      lga: '',
      schoolCode: '',
    });
    setSubmitted(false);
  };

  const isFormValid = () => {
    return (
      formData.schoolName.trim() !== '' &&
      formData.schoolAddress.trim() !== '' &&
      formData.state !== '' &&
      formData.lga !== '' &&
      formData.schoolCode.trim() !== ''
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
      
      console.log('School Registration Data:', formData);
      toast.success('School registered successfully!');

      handleReset();
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableLGAs = formData.state && lgaByState[formData.state as keyof typeof lgaByState] 
    ? lgaByState[formData.state as keyof typeof lgaByState]
    : [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
       <Breadcrumb
              items={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Register School', current: true },
              ]}
            />
      <div className="mt-6">
        <div className="bg-white rounded-lg shadow-sm border">

          <div className="border-b px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-800">School Registration</h1>
            <p className="text-gray-600 mt-1">Fill the details below.</p>
          </div>


          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-4">

            <div className=''>
              <Label htmlFor="schoolName">
                School Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="schoolName"
                placeholder="School Name"
                value={formData.schoolName}
                onChange={(e) => handleChange('schoolName', e.target.value)}
                className="mt-1.5"
              />
              {submitted && !formData.schoolName.trim() && (
                <p className="text-red-500 text-xs mt-1">School name is required</p>
              )}
            </div>
            


            <div className=''>
              <Label htmlFor="schoolAddress">
                School Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="schoolAddress"
                placeholder="School Address"
                value={formData.schoolAddress}
                onChange={(e) => handleChange('schoolAddress', e.target.value)}
                className="mt-1.5"
              />
              {submitted && !formData.schoolAddress.trim() && (
                <p className="text-red-500 text-xs mt-1">School address is required</p>
              )}
            </div>

            <div>
              <Label htmlFor="state">
                State <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.state}
                onValueChange={(val) => handleChange('state', val)}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {nigerianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && !formData.state && (
                <p className="text-red-500 text-xs mt-1">State is required</p>
              )}
            </div>

            <div>
              <Label htmlFor="lga">
                LGA <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.lga}
                onValueChange={(val) => handleChange('lga', val)}
                disabled={!formData.state}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder={formData.state ? "Select LGA" : "Select State first"} />
                </SelectTrigger>
                <SelectContent>
                  {availableLGAs.length > 0 ? (
                    availableLGAs.map((lga) => (
                      <SelectItem key={lga} value={lga}>
                        {lga}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-lga" disabled>
                      No LGAs available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {submitted && !formData.lga && (
                <p className="text-red-500 text-xs mt-1">LGA is required</p>
              )}
            </div>

            <div>
              <Label htmlFor="schoolCode">
                School Code (NPA) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="schoolCode"
                placeholder="School Code"
                value={formData.schoolCode}
                onChange={(e) => handleChange('schoolCode', e.target.value)}
                className="mt-1.5"
              />
              {submitted && !formData.schoolCode.trim() && (
                <p className="text-red-500 text-xs mt-1">School code is required</p>
              )}
            </div>
            
          </div>

          <div className="border-t px-8 py-6 flex lg:selection:justify-end  gap-3">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={isSubmitting}
              className="px-4"
            >
              Cancel
            </Button>
            {/* <Button
              variant="outline"
              onClick={handleReset}
              disabled={isSubmitting}
              className="px-8 bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
            >
              Reset
            </Button> */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 bg-[#19488A] hover:bg-blue-700"
            >
              {isSubmitting ? 'Registering...' : 'Register School'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSchool;