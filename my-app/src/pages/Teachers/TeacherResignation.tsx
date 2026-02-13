import { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';
import { Button } from '../../components/ui/button';
import Breadcrumb from '../Training/Breadcrumb';

interface ResignationFormData {
  nin: string;
  resignationDate: string;
  reason: string;
}

const TeacherResignation = () => {
  const [_submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ResignationFormData>({
    nin: '',
    resignationDate: '',
    reason: '',
  });

  const handleChange = <K extends keyof ResignationFormData>(
    key: K,
    value: ResignationFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFormData({
      nin: '',
      resignationDate: '',
      reason: '',
    });
    setSubmitted(false);
  };

  const isFormValid = () => {
    return (
      formData.nin.trim() !== '' &&
      formData.resignationDate !== '' &&
      formData.reason.trim() !== ''
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
      console.log('Resignation Data:', formData);
      toast.success('Resignation submitted successfully!');
      handleReset();
    } catch (error) {
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 ">
      <Breadcrumb
        items={[
          { label: 'Teachers', href: '/teachers' },
          { label: 'Teacher Resignation', current: true },
        ]}
      />

      <div className="mt-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b px-8 py-6">
            <h1 className="text-2xl font-bold text-[#19488A]">Teacher Resignation</h1>
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
                Date of resignation <span className="text-red-500">*</span>
              </Label>
              <div className="lg:col-span-2 max-w-xl">
                <Input
                  type="date"
                  value={formData.resignationDate}
                  onChange={(e) => handleChange('resignationDate', e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className=" font-semibold text-gray-700">
                Reason for resignation <span className="text-red-500">*</span>
              </Label>
              <div className="lg:col-span-2 max-w-xl">
                <Input
                  value={formData.reason}
                  onChange={(e) => handleChange('reason', e.target.value)}
                  placeholder="Enter reason for resignation"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 px-8 pb-8">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#19488A] hover:bg-blue-700 text-white px-6"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherResignation;