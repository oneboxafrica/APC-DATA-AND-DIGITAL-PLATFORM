import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { 
  Fingerprint, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCcw, 
  Info 
} from 'lucide-react';
import Breadcrumb from '../Training/Breadcrumb';

const TeacherBiometric = () => {
  const [nin, setNin] = useState('');
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCapture = async () => {
    setScanStatus('scanning');

    setTimeout(() => {
      setScanStatus('success');
    }, 2000);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setScanStatus('idle');
      setNin('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Breadcrumb
        items={[
          { label: 'Teachers', href: '/teachers' },
          { label: 'Biometric Enrollment', current: true },
        ]}
      />

      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 lg:mt-10">

        <div className="lg:col-span-2 space-y-6 ">
          <Card className="border-t-4 border-t-[#19488A]">
            <CardHeader>
              <CardTitle className="text-[#19488A] text-lg md:text-xl">Teacher Biometric Enrollment</CardTitle>
              <CardDescription>
                Verify the teacher's identity using the NIN and capture fingerprint data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
             
              <div className="space-y-2">
                <Label htmlFor="nin" className="font-bold text-gray-700">
                  National Identification Number (NIN) <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-3">
                  <Input 
                    id="nin"
                    placeholder="Enter 11-digit NIN" 
                    value={nin}
                    onChange={(e) => setNin(e.target.value)}
                    className="max-w-md h-11 text-sm"
                  />
                  <Button variant="outline" className="h-11 border-[#19488A] text-[#19488A] text-sm">
                    Verify NIN
                  </Button>
                </div>
              </div>

              
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                <div className={`relative mb-6 p-6 rounded-full bg-white shadow-sm border-2 ${
                  scanStatus === 'success' ? 'border-green-500' : 'border-gray-100'
                }`}>
                  <Fingerprint className={`w-24 h-24 ${
                    scanStatus === 'scanning' ? 'text-blue-400 animate-pulse' : 
                    scanStatus === 'success' ? 'text-green-500' : 'text-gray-300'
                  }`} />
                  
                  {scanStatus === 'success' && (
                    <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 border-4 border-white">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>

                <div className="text-center space-y-2 mb-6">
                  <h3 className="font-semibold text-gray-800">
                    {scanStatus === 'idle' && "Ready to scan"}
                    {scanStatus === 'scanning' && "Processing... Please hold"}
                    {scanStatus === 'success' && "Capture Complete"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Ensure the finger is clean and centered on the sensor surface.
                  </p>
                </div>

                <Button 
                  onClick={handleCapture}
                  disabled={!nin || scanStatus === 'scanning'}
                  className="bg-[#19488A] hover:bg-blue-800 px-8 h-11"
                >
                  {scanStatus === 'scanning' ? (
                    <><RefreshCcw className="mr-2 h-4 w-4 animate-spin" /> Scanning...</>
                  ) : (
                    "Capture Fingerprint"
                  )}
                </Button>
              </div>

             
              <div className="pt-4 border-t flex lg:justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => {setScanStatus('idle'); setNin('');}}
                  className="text-gray-500"
                >
                 Cancel
                </Button>
                <Button 
                  onClick={handleSave} 
                  disabled={scanStatus !== 'success' || isSubmitting}
                  className="bg-[#19488A] hover:bg-blue-800 px-4 py-4"
                >
                  {isSubmitting ? 'Saving...' : 'Save Biometric Data'}
                </Button>
                
              </div>
            </CardContent>
          </Card>
        </div>

       
        <div className="space-y-6">
          <Card className="bg-[#19488A]/5 border-none shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Info className="w-4 h-4 text-[#19488A]" />
                Driver Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                Ensure the correct drivers are installed for your device to work with this portal.
              </p>
              
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Device Drivers</h4>
                <div className="grid gap-2">
                  <Button variant="outline" size="sm" className="justify-start h-9 text-xs">
                    <Download className="mr-2 h-3 w-3" /> Windows 10 & 11
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start h-9 text-xs">
                    <Download className="mr-2 h-3 w-3" /> Windows 7, 8, 8.1
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">WebAPI Client</h4>
                <div className="grid gap-2">
                  <Button variant="outline" size="sm" className="justify-start h-9 text-xs">
                    <Download className="mr-2 h-3 w-3" /> WebAPI Client (x64)
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start h-9 text-xs">
                    <Download className="mr-2 h-3 w-3" /> WebAPI Client (x32)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert className="border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800 text-xs font-bold">Troubleshooting</AlertTitle>
            <AlertDescription className="text-amber-700 text-[11px]">
              If the "Capture" button is greyed out, ensure the NIN is verified and the device driver service is running in your taskbar.
            </AlertDescription>
          </Alert>
        </div>

      </div>
    </div>
  );
};

export default TeacherBiometric;