import { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';
import { Button } from '../../components/ui/button';
import Breadcrumb from '../Training/Breadcrumb';

interface ESFormData {
  nin: string;
  name: string;
  email: string;
  phone: string;
}

const RegisterES = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [_submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<ESFormData>({
    nin: '',
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = <K extends keyof ESFormData>(
    key: K,
    value: ESFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFormData({
      nin: '',
      name: '',
      email: '',
      phone: '',
    });
    setSubmitted(false);
  };

  const isFormValid = () => {
    return (
      formData.nin.trim() !== '' &&
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== ''
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
      console.log('Education Secretary Registration Data:', formData);
      toast.success('Education Secretary registered successfully!');
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
          { label: 'Home', href: '/dashboard' },
          { label: 'Add New Education Secretary', current: true },
        ]}
      />

      <div className="mt-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b px-8 py-6">
            <div className="flex items-baseline gap-2">
              <h1 className="text-2xl font-bold text-[#19488A]">
                Add New Education Secretary
              </h1>
              {/* <span className="text-sm text-gray-400 font-normal">
                Fill the form below
              </span> */}
            </div>
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

            {/* Phone Number Field */}
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
          </div>

          <div className="flex items-center gap-4 px-8 pb-8">
           
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-gray-300 px-8"
            >
              Reset
            </Button>
             <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#19488A] hover:bg-blue-700 text-white px-8"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterES;