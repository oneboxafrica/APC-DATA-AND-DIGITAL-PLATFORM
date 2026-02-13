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

interface SSOFormData {
  nin: string;
  name: string;
  email: string;
  phone: string;
  lga: string;
}

const RegisterSSO = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [_submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<SSOFormData>({
    nin: '',
    name: '',
    email: '',
    phone: '',
    lga: '',
  });

  const handleChange = <K extends keyof SSOFormData>(
    key: K,
    value: SSOFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFormData({
      nin: '',
      name: '',
      email: '',
      phone: '',
      lga: '',
    });
    setSubmitted(false);
  };

  const isFormValid = () => {
    return (
      formData.nin.trim() !== '' &&
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.lga !== ''
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
      console.log('SSO Registration Data:', formData);
      toast.success('SSO Registered successfully!');
      handleReset();
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Breadcrumb
        items={[
          { label: "Home", href: '/dashboard' },
          { label: 'Add New SSO', current: true },
        ]}
      />

      <div className="mt-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b px-8 py-6">
            <h1 className="text-2xl font-bold text-[#19488A]">Add New SSO</h1>
          </div>

          <div className="p-8 space-y-6">

            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-gray-700">
                NIN <span className="text-red-500">*</span>
              </Label>
              <div className="max-w-xl">
                <Input
                  value={formData.nin}
                  onChange={(e) => handleChange('nin', e.target.value)}
                  placeholder="Enter NIN"
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-gray-700">
                Name <span className="text-red-500">*</span>
              </Label>
              <div className="max-w-xl">
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter Full Name"
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-gray-700">
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="max-w-xl">
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Enter Email Address"
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <div className="max-w-xl">
                <Input
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Enter Phone Number"
                  className="mt-1.5"
                />
              </div>
            </div>


            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-gray-700">
                LGA <span className="text-red-500">*</span>
              </Label>
              <div className="max-w-xl">
                <Select
                  value={formData.lga}
                  onValueChange={(val) => handleChange('lga', val)}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select LGA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="calabar-municipal">Calabar Municipal</SelectItem>
                    <SelectItem value="calabar-south">Calabar South</SelectItem>
                    <SelectItem value="ogpukpani">Odukpani</SelectItem>
                    <SelectItem value="boki">Boki</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 px-8 pb-8">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#19488A] hover:bg-blue-700 text-white px-8"
            >
              {isSubmitting ? 'Registering...' : 'Register SSO Now'}
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-gray-300 px-8"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSSO;