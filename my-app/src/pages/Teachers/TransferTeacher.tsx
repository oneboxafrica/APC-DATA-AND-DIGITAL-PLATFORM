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

interface TransferFormData {
  nin: string;
  targetSchool: string;
  transferDate: string;
}

const TransferTeacher = () => {
  const [_submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<TransferFormData>({
    nin: '',
    targetSchool: '',
    transferDate: '',
  });

  const handleChange = <K extends keyof TransferFormData>(
    key: K,
    value: TransferFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFormData({
      nin: '',
      targetSchool: '',
      transferDate: '',
    });
    setSubmitted(false);
  };

  const isFormValid = () => {
    return (
      formData.nin.trim() !== '' &&
      formData.targetSchool !== '' &&
      formData.transferDate !== ''
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Transfer Data:', formData);
      toast.success('Teacher transferred successfully!');
      handleReset();
    } catch (error) {
      toast.error('Transfer failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 ">
      <Breadcrumb
        items={[
          { label: 'Teachers', href: '/teachers' },
          { label: 'Transfer Teacher', current: true },
        ]}
      />

      <div className="mt-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b px-8 py-6">
            <h1 className="text-2xl font-bold text-[#19488A]">Transfer Teacher</h1>
          </div>

          <div className="p-8 space-y-6">
           
            <div className="flex flex-col gap-2">
              <Label className=" font-semibold text-gray-700">
                NIN <span className="text-red-500">*</span>
              </Label>
              <div className="lg:col-span-2 max-w-xl">
                <Input
                  value={formData.nin}
                  onChange={(e) => handleChange('nin', e.target.value)}
                  placeholder="Enter NIN"
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className=" font-semibold text-gray-700">
                Select School <span className="text-red-500">*</span>
              </Label>
              <div className="lg:col-span-2 max-w-xl">
                <Select
                  value={formData.targetSchool}
                  onValueChange={(val) => handleChange('targetSchool', val)}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select School" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="school1">PCN PRIMARY SCHOOL ISHIE TOWN CALABAR</SelectItem>
                    <SelectItem value="school2">Sample School 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            
          <div className="flex flex-col gap-2">
              <Label className=" font-semibold text-gray-700">
                Date of transfer <span className="text-red-500">*</span>
              </Label>
              <div className="lg:col-span-2 max-w-xl">
                <Input
                  type="date"
                  value={formData.transferDate}
                  onChange={(e) => handleChange('transferDate', e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

         <div className="flex items-center gap-4 px-8 pb-8">
            {/* <Button
              variant="outline"
              onClick={handleReset}
              className=" border-none px-6"
            >
              Reset
            </Button> */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#19488A] hover:bg-blue-700 text-white px-6"
            >
              {isSubmitting ? 'Transferring...' : 'Transfer Teacher Now'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferTeacher;