import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Checkbox } from '../../components/ui/checkbox';
import Breadcrumb from './Breadcrumb';
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

interface SectionBData {
  state: string;
  year: string;
  trainingDuration: string;
  trainingDirector: string;
  gender: string;
  trainingInstitution1: string;
  trainingInstitution2: string;
  facilitatorQualifications: {
    phd: { male: string; female: string };
    masters: { male: string; female: string };
    bachelors: { male: string; female: string };
    others: { specify: string; male: string; female: string };
  };
  trainingType: string;
  trainingDurationWithDates: string;
  trainingTheme: string; 
  trainingVenue: string;
  participantsByComponent: {
    eccde: { m: string; f: string; t: string };
    primary: { m: string; f: string; t: string };
    jss: { m: string; f: string; t: string };
    educationManagers: { m: string; f: string; t: string };
  };
}

interface SectionCData {

  facilitatorPreparation: string;
  deliveryOfSession: string;
  effectiveSessionPrep: string;
  sessionMaterialsImprovization: string;
  teachingAidsUtilization: string;
  rolePlay: string;
  demonstration: string;
  presentation: string;
  groupWork: string;
  projectDiscovery: string;


  objectivesMet: string;
  masteryOfContent: string;
  evaluationOfSession: string;
  punctualityFacilitator: string; 
  coverageOfContent: string;      

 
  conductPunctuality: string;
  participationInActivities: string;
  discipline: string;
  dressing: string;


  monitoringUBEC: string;
  monitoringSUBEB: string;
  monitoringLGEA: string;
  monitoringTrainingInstitution: string;
  monitoringOtherStakeholders: string;
}

interface SectionDEFGHIData {
  schoolSelection: string; 
  participantSelection: string; 
  mobilizationSteps: string[]; 
  notificationTiming: string; 
  challenges: string[]; 
  solutions: string[]; 
}

const FillTrainingForm = () => {
  // const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [_submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [sectionBData, setSectionBData] = useState<SectionBData>({
    state: '',
    year: '',
    trainingDuration: '',
    trainingDirector: '',
    gender: '',
    trainingInstitution1: '',
    trainingInstitution2: '',
    facilitatorQualifications: {
      phd: { male: '', female: '' },
      masters: { male: '', female: '' },
      bachelors: { male: '', female: '' },
      others: { specify: '', male: '', female: '' },
    },
    trainingType: '',
    trainingDurationWithDates: '',
    trainingTheme: '',
    trainingVenue: '',
    participantsByComponent: {
      eccde: { m: '', f: '', t: '' },
      primary: { m: '', f: '', t: '' },
      jss: { m: '', f: '', t: '' },
      educationManagers: { m: '', f: '', t: '' },
    },
  });

  const [sectionCData, setSectionCData] = useState<SectionCData>({
    facilitatorPreparation: '',
    deliveryOfSession: '',
    effectiveSessionPrep: '',
    sessionMaterialsImprovization: '',
    teachingAidsUtilization: '',
    rolePlay: '',
    demonstration: '',
    presentation: '',
    groupWork: '',
    projectDiscovery: '',
    objectivesMet: '',
    masteryOfContent: '',
    evaluationOfSession: '',
    punctualityFacilitator: '',
    coverageOfContent: '',
    conductPunctuality: '',
    participationInActivities: '',
    discipline: '',
    dressing: '',
    monitoringUBEC: '',
    monitoringSUBEB: '',
    monitoringLGEA: '',
    monitoringTrainingInstitution: '',
    monitoringOtherStakeholders: '',
  });

  const [sectionDEFGHIData, setSectionDEFGHIData] = useState<SectionDEFGHIData>({
    schoolSelection: '',
    participantSelection: '',
    mobilizationSteps: [],
    notificationTiming: '',
    challenges: ['', '', '', '', ''],
    solutions: ['', '', '', '', ''],
  });


  const handleSectionBChange = (field: keyof SectionBData, value: string) => {
    setSectionBData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFacilitatorQualChange = (qual: 'phd' | 'masters' | 'bachelors' | 'others', gender: 'male' | 'female' | 'specify', value: string) => {
    if (qual === 'others' && gender === 'specify') {
      setSectionBData((prev) => ({
        ...prev,
        facilitatorQualifications: {
          ...prev.facilitatorQualifications,
          others: { ...prev.facilitatorQualifications.others, specify: value },
        },
      }));
    } else {
      setSectionBData((prev) => ({
        ...prev,
        facilitatorQualifications: {
          ...prev.facilitatorQualifications,
          [qual]: {
            ...prev.facilitatorQualifications[qual],
            [gender]: value,
          },
        },
      }));
    }
  };

  const handleParticipantChange = (
    component: 'eccde' | 'primary' | 'jss' | 'educationManagers',
    gender: 'm' | 'f' | 't',
    value: string
  ) => {
    setSectionBData((prev) => ({
      ...prev,
      participantsByComponent: {
        ...prev.participantsByComponent,
        [component]: {
          ...prev.participantsByComponent[component],
          [gender]: value,
        },
      },
    }));
  };

  const handleSectionCChange = (field: keyof SectionCData, value: string) => {
    setSectionCData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMobilizationToggle = (step: string) => {
    setSectionDEFGHIData((prev) => ({
      ...prev,
      mobilizationSteps: prev.mobilizationSteps.includes(step)
        ? prev.mobilizationSteps.filter((s) => s !== step)
        : [...prev.mobilizationSteps, step],
    }));
  };

  const handleChallengeChange = (index: number, value: string) => {
    setSectionDEFGHIData((prev) => {
      const newChallenges = [...prev.challenges];
      newChallenges[index] = value;
      return { ...prev, challenges: newChallenges };
    });
  };

  const handleSolutionChange = (index: number, value: string) => {
    setSectionDEFGHIData((prev) => {
      const newSolutions = [...prev.solutions];
      newSolutions[index] = value;
      return { ...prev, solutions: newSolutions };
    });
  };

  const perceptionOptions = ['1', '2', '3', '4', '5'];

  const isStep1Valid = () =>
    sectionBData.state && sectionBData.year && sectionBData.trainingInstitution1;

  const nextStep = () => {
    setSubmitted(true);
    if (currentStep === 1 && !isStep1Valid()) {
      toast.error('Please complete all required fields in Section B');
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
    setSubmitted(false);
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      console.log('Final Submission:', { sectionBData, sectionCData, sectionDEFGHIData });
      toast.success('Training assessment form submitted successfully!');
      navigate('/training/manage');
    } catch (error) {
      toast.error('Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Breadcrumb
        items={[
          { label: 'Trainings', href: '/training/manage' },
          { label: 'Training Assessment Form', current: true },
        ]}
      />

      <div className="mt-6 max-w-5xl mx-auto">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 text-center mb-8">
          SUBEB TRAINING ASSESSMENT INSTRUMENT
        </h1>

        <div className="mb-6 lg:mb-10">
          <div className="hidden md:flex items-center justify-center gap-24">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-lg ${
                    currentStep >= step ? 'bg-[#19488A] text-white' : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-32 h-1 mx-6 ${currentStep > step ? 'bg-[#19488A]' : 'bg-gray-300'}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center md:hidden">
            <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-lg lg:text-2xl font-bold text-white bg-[#19488A]">
              {currentStep}
            </div>
            <p className="mt-4 text-sm md:text-lg font-medium">Step {currentStep} of 3</p>
          </div>
          <div className="hidden md:flex justify-center gap-32 text-sm font-medium text-gray-600 mt-4">
            <span className={currentStep === 1 ? 'text-[#19488A] font-bold' : ''}>
              Section 1
            </span>
            <span className={currentStep === 2 ? 'text-[#19488A] font-bold' : ''}>
              Section 2
            </span>
            <span className={currentStep === 3 ? 'text-[#19488A] font-bold' : ''}>
              Sections 3
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 lg:p-8">
          {currentStep === 1 && (
            <>
             

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <Label>State <span className="text-red-500">*</span></Label>
                  <Input
                    placeholder="e.g., Cross River State"
                    value={sectionBData.state}
                    onChange={(e) => handleSectionBChange('state', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Year <span className="text-red-500">*</span></Label>
                  <Input
                    placeholder="e.g., 2022"
                    value={sectionBData.year}
                    onChange={(e) => handleSectionBChange('year', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Duration Of Training</Label>
                  <Input
                    value={sectionBData.trainingDuration}
                    onChange={(e) => handleSectionBChange('trainingDuration', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Training Director</Label>
                  <Input
                    value={sectionBData.trainingDirector}
                    onChange={(e) => handleSectionBChange('trainingDirector', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Gender of respondent</Label>
                  <Select value={sectionBData.gender} onValueChange={(v) => handleSectionBChange('gender', v)}>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
 <h2 className="text-lg md:text-xl font-semibold text-center mb-6 lg:mb-8">SECTION B</h2>
              <p className="text-sm text-gray-600 text-center italic mb-8">
                Information on The Training Institution
              </p>
              <div className="space-y-6">
                <div>
                  <Label>Training Institution 1 <span className="text-red-500">*</span></Label>
                  <Input
                    placeholder="e.g., CROSS RIVER STATE COLLEGE OF EDUCATION"
                    value={sectionBData.trainingInstitution1}
                    className='text-sm'
                    onChange={(e) => handleSectionBChange('trainingInstitution1', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Training Institution 2 (if applicable)</Label>
                  <Input
                    value={sectionBData.trainingInstitution2}
                    className='text-sm'
                    onChange={(e) => handleSectionBChange('trainingInstitution2', e.target.value)}
                  />
                </div>

             
<div className="border rounded-lg p-6">
  <h3 className="font-semibold mb-4">Qualifications of Facilitators from the Training Institution</h3>

  <Table>
    
    <TableHeader>
      <TableRow className="bg-gray-50">
        <TableHead className="w-16 text-left">SN</TableHead>
        <TableHead className="text-left truncate max-w-[180px]">Highest Educational Qualification</TableHead>
        <TableHead className="text-center">Male</TableHead>
        <TableHead className="text-center">Female</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {[
        { sn: '1.', label: 'Ph.D', key: 'phd' },
        { sn: '2.', label: 'Masters Degree', key: 'masters' },
        { sn: '3.', label: 'Bachelors Degree', key: 'bachelors' },
        { sn: '4.', label: 'Others (Specify)', key: 'others' },
      ].map((row) => (
        <TableRow key={row.key}>
          <TableCell className="font-medium">{row.sn}</TableCell>
          <TableCell>
            {row.key === 'others' ? (
              <Input
                placeholder="Specify"
                value={sectionBData.facilitatorQualifications.others.specify}
                onChange={(e) =>
                  handleFacilitatorQualChange('others', 'specify', e.target.value)
                }
              />
            ) : (
              row.label
            )}
          </TableCell>
          <TableCell className="text-center">
            <Input
              type="number"
              className="w-24 mx-auto"
              value={
                sectionBData.facilitatorQualifications[
                  row.key as keyof typeof sectionBData.facilitatorQualifications
                ].male
              }
              onChange={(e) =>
                handleFacilitatorQualChange(row.key as any, 'male', e.target.value)
              }
            />
          </TableCell>
          <TableCell className="text-center">
            <Input
              type="number"
              className="w-24 mx-auto"
              value={
                sectionBData.facilitatorQualifications[
                  row.key as keyof typeof sectionBData.facilitatorQualifications
                ].female
              }
              onChange={(e) =>
                handleFacilitatorQualChange(row.key as any, 'female', e.target.value)
              }
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>

                <div>
                  <Label>Training Type (e.g., School Leadership Training)</Label>
                  <Input
                    value={sectionBData.trainingType}
                    onChange={(e) => handleSectionBChange('trainingType', e.target.value)}
                    className='text-sm'
                  />
                </div>
                <div>
                  <Label>Duration of Trainings (with dates)</Label>
                  <Input
                    value={sectionBData.trainingDurationWithDates}
                    onChange={(e) => handleSectionBChange('trainingDurationWithDates', e.target.value)}
                    className='text-sm'
                  />
                </div>
                <div>
                  <Label>Training Theme (e.g., SCHOOL BASED TRAINING)</Label>
                  <Input
                    value={sectionBData.trainingTheme}
                    onChange={(e) => handleSectionBChange('trainingTheme', e.target.value)}
                    className='text-sm'
                  />
                </div>
                <div>
                  <Label>Venue of Training</Label>
                  <Input
                    value={sectionBData.trainingVenue}
                    onChange={(e) => handleSectionBChange('trainingVenue', e.target.value)}
                    className='text-sm'
                  />
                </div>

<div className="border rounded-lg p-6">
  <h3 className="font-semibold mb-4">Total Number of Participants by components</h3>

  <Table>
    <TableHeader>
      <TableRow className="bg-gray-50 ">
        <TableHead rowSpan={2} className="text-center border align-middle">
          SN
        </TableHead>
        <TableHead colSpan={3} className="text-center border">
          ECCDE
        </TableHead>
        <TableHead colSpan={3} className="text-center border">
          Primary
        </TableHead>
        <TableHead colSpan={3} className="text-center border">
          JSS
        </TableHead>
        <TableHead colSpan={3} className="text-center border">
          Education Managers
        </TableHead>
      </TableRow>
      <TableRow className="bg-gray-100">
        {['M', 'F', 'T'].map((header) => (
          <React.Fragment key={header}>

            <TableHead className="text-center border">{header}</TableHead>
            <TableHead className="text-center border">{header}</TableHead>
            <TableHead className="text-center border">{header}</TableHead>
            <TableHead className="text-center border">{header}</TableHead>
          </React.Fragment>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="text-center font-medium border">1</TableCell>
        {['eccde', 'primary', 'jss', 'educationManagers'].map((comp) => (
          <React.Fragment key={comp}>
            <TableCell className="text-center border">
              <Input
                type="number"
                className="w-20 mx-auto"
                value={sectionBData.participantsByComponent[comp as keyof typeof sectionBData.participantsByComponent].m}
                onChange={(e) => handleParticipantChange(comp as any, 'm', e.target.value)}
              />
            </TableCell>
            <TableCell className="text-center border">
              <Input
                type="number"
                className="w-20 mx-auto"
                value={sectionBData.participantsByComponent[comp as keyof typeof sectionBData.participantsByComponent].f}
                onChange={(e) => handleParticipantChange(comp as any, 'f', e.target.value)}
              />
            </TableCell>
            <TableCell className="text-center border">
              <Input
                type="number"
                className="w-20 mx-auto"
                value={sectionBData.participantsByComponent[comp as keyof typeof sectionBData.participantsByComponent].t}
                onChange={(e) => handleParticipantChange(comp as any, 't', e.target.value)}
              />
            </TableCell>
          </React.Fragment>
        ))}
      </TableRow>
    </TableBody>
  </Table>
</div>
              </div>

              <div className="flex justify-between  mt-8 pt-6 border-t">
                
                <Button variant="destructive" className='ml-4' onClick={() => navigate('/training/manage')}>
                  Cancel
                </Button>
               <div className='flex justify-end'>
                 <Button variant="outline" className='ml-4' onClick={prevStep}>
                  Save
                </Button>
                <Button onClick={nextStep} className="ml-4 bg-[#19488A]">
                  Next
                </Button>
               </div>
              </div>
            </>
          )}


          {currentStep === 2 && (
            <>
              <h2 className="text-lg lg:text-xl font-semibold text-center mb-6">
                SECTION C: Assessment of Provisions made for the training
              </h2>
              <p className="text-sm text-gray-600 text-center mb-8">
                Please rate the various aspects of the training programme...
              </p>

              <div className="space-y-8">
               
                <div className="border rounded-lg p-6">
                  <h3 className="font-semibold mb-6">9. Facilitator:</h3>
                  {[
                    { label: '(a) Preparation for the Training Session(s)', field: 'facilitatorPreparation' },
                    { label: '(b) Delivery of the Session(s) on:', field: 'deliveryOfSession' },
                  ].map((item) => (
                    <div key={item.field} className="mb-8">
                      <Label className="font-medium block mb-3 leading-relaxed">{item.label}</Label>
                      <RadioGroup
                        value={sectionCData[item.field as keyof SectionCData]}
                        onValueChange={(value: string) => handleSectionCChange(item.field as keyof SectionCData, value)}
                      >
                        <div className="flex flex-wrap gap-6">
                          {perceptionOptions.map((val) => (
                            <div key={val} className="flex items-center space-x-2">
                              <RadioGroupItem value={val} id={`${item.field}-${val}`} />
                              <Label htmlFor={`${item.field}-${val}`}>
                                {val === '1' ? 'Poor(1)' : val === '2' ? 'Fair(2)' : val === '3' ? 'Good(3)' : val === '4' ? 'Very Good(4)' : 'Excellent(5)'}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  ))}

                  <div className="ml-8 space-y-6">
                    {[
                      { label: '(i) Preparations of effective Session', field: 'effectiveSessionPrep' },
                      { label: '(ii) Improvization of Session Materials', field: 'sessionMaterialsImprovization' },
                      { label: '(iii) Utilization for teaching aids in class', field: 'teachingAidsUtilization' },
                    ].map((sub) => (
                      <div key={sub.field}>
                        <Label className="block mb-2 leading-snug ">{sub.label}</Label>
                        <RadioGroup
                          value={sectionCData[sub.field as keyof SectionCData]}
                          onValueChange={(value: string) => handleSectionCChange(sub.field as keyof SectionCData, value)}
                        >
                          <div className="flex flex-wrap gap-6">
                            {perceptionOptions.map((val) => (
                              <div key={val} className="flex items-center space-x-2">
                                <RadioGroupItem value={val} />
                                <Label>
                                  {val === '1' ? 'Poor(1)' : val === '2' ? 'Fair(2)' : val === '3' ? 'Good(3)' : val === '4' ? 'Very Good(4)' : 'Excellent(5)'}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    ))}

                    <div>
                      <Label className="font-medium block mb-4 leading-snug">(iv) Methods of Training/Teaching</Label>
                      <div className="ml-8 space-y-6">
                        {[
                          { label: '1. Role Play', field: 'rolePlay' },
                          { label: '2. Demonstration', field: 'demonstration' },
                          { label: '3. Presentation', field: 'presentation' },
                          { label: '4. Group Work', field: 'groupWork' },
                          { label: '3. Project/Discovery', field: 'projectDiscovery' },
                        ].map((method) => (
                          <div key={method.field}>
                            <Label className="block mb-2 leading-snug ">{method.label}</Label>
                            <RadioGroup
                              value={sectionCData[method.field as keyof SectionCData]}
                             onValueChange={(value: string) => handleSectionCChange(method.field as keyof SectionCData, value)}
                            >
                              <div className="flex flex-wrap gap-6 ">
                                {perceptionOptions.map((val) => (
                                  <div key={val} className="flex items-center space-x-2">
                                    <RadioGroupItem value={val} />
                                    <Label>
                                      
                                      {val === '1' ? 'Poor(1)' : val === '2' ? 'Fair(2)' : val === '3' ? 'Good(3)' : val === '4' ? 'Very Good(4)' : 'Excellent(5)'}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {[
                    { label: '(c) To what extent was the objectives of the training met?', field: 'objectivesMet' },
                    { label: '(d) Mastery of the content', field: 'masteryOfContent' },
                    { label: '(e) Evaluation of session', field: 'evaluationOfSession' },
                    { label: '(f) Punctuality', field: 'punctualityFacilitator' },
                    { label: '(g) Coverage of content', field: 'coverageOfContent' },
                  ].map((item) => (
                    <div key={item.field} className="mt-6">
                      <Label className="font-medium block mb-3 leading-snug">{item.label}</Label>
                      <RadioGroup
                        value={sectionCData[item.field as keyof SectionCData]}
                        onValueChange={(value: string) => handleSectionCChange(item.field as keyof SectionCData, value)}
                      >
                        <div className="flex flex-wrap gap-6">
                          {perceptionOptions.map((val) => (
                            <div key={val} className="flex items-center space-x-2">
                              <RadioGroupItem value={val} />
                              <Label>
                                {val === '1' ? 'Poor(1)' : val === '2' ? 'Fair(2)' : val === '3' ? 'Good(3)' : val === '4' ? 'Very Good(4)' : 'Excellent(5)'}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  ))}
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">10 Conduct of Participants:</h3>
                  {[
                    { label: '(a) Punctuality', field: 'conductPunctuality' },
                    { label: '(b) Participation in session activities', field: 'participationInActivities' },
                    { label: '(c) Discipline', field: 'discipline' },
                    { label: '(d) Dressing', field: 'dressing' },
                  ].map((item) => (
                    <div key={item.field} className="mb-6">
                      <Label className="block mb-2 leading-snug">{item.label}</Label>
                      <RadioGroup
                        value={sectionCData[item.field as keyof SectionCData]}
                        onValueChange={(value: string) => handleSectionCChange(item.field as keyof SectionCData, value)}
                      >
                        <div className="flex flex-wrap gap-6">
                          {perceptionOptions.map((val) => (
                            <div key={val} className="flex items-center space-x-2">
                              <RadioGroupItem value={val} />
                              <Label>
                                {val === '1' ? 'Poor(1)' : val === '2' ? 'Fair(2)' : val === '3' ? 'Good(3)' : val === '4' ? 'Very Good(4)' : 'Excellent(5)'}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  ))}
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">11 Monitoring of training by:</h3>
                  {[
                    { label: '(a) UBEC', field: 'monitoringUBEC' },
                    { label: '(b) SUBEB', field: 'monitoringSUBEB' },
                    { label: '(c) LGEA', field: 'monitoringLGEA' },
                    { label: '(d) Training Institution', field: 'monitoringTrainingInstitution' },
                    { label: '(e) Other Stakeholders', field: 'monitoringOtherStakeholders' },
                  ].map((item) => (
                    <div key={item.field} className="mb-6">
                      <Label className="block mb-2">{item.label}</Label>
                      <RadioGroup
                        value={sectionCData[item.field as keyof SectionCData]}
                        onValueChange={(value: string) => handleSectionCChange(item.field as keyof SectionCData, value)}
                      >
                        <div className="flex flex-wrap gap-6">
                          {perceptionOptions.map((val) => (
                            <div key={val} className="flex items-center space-x-2">
                              <RadioGroupItem value={val} />
                              <Label>
                                {val === '1' ? 'Poor(1)' : val === '2' ? 'Fair(2)' : val === '3' ? 'Good(3)' : val === '4' ? 'Very Good(4)' : 'Excellent(5)'}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button variant="outline" onClick={prevStep}>Previous</Button>
                 <div className='flex justify-end'>
                 <Button variant="outline" className='ml-4' onClick={prevStep}>
                  Save
                </Button>
                <Button onClick={nextStep} className="ml-4 bg-[#19488A]">
                  Next
                </Button>
               </div>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <h2 className="text-lg lg:text-xl font-semibold text-center mb-6">Sections D to I</h2>

              <div className="mb-10">
                <h3 className="font-semibold mb-4">SECTION D: How did you select the participating schools</h3>
                <RadioGroup
                  value={sectionDEFGHIData.schoolSelection}
                  onValueChange={(value: string) => handleSectionCChange('schoolSelection' as keyof SectionCData, value)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="senatorial" id="d-sen" />
                      <Label htmlFor="d-sen">By Senatorial district</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="lgea" id="d-lgea" />
                      <Label htmlFor="d-lgea">By LGEA</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="others" id="d-others" />
                      <Label htmlFor="d-others">others</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="mb-10">
                <h3 className="font-semibold mb-4">SECTION E: How did you select the participants for the training?</h3>
                <RadioGroup
                  value={sectionDEFGHIData.participantSelection}
                  onValueChange={(value: string) => handleSectionCChange('participantSelection' as keyof SectionCData, value)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="whole" id="e-whole" />
                      <Label htmlFor="e-whole">Whole school selection</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="head" id="e-head" />
                      <Label htmlFor="e-head">By Head teacher</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="education" id="e-edu" />
                      <Label htmlFor="e-edu">By the education secretary</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="desk" id="e-desk" />
                      <Label htmlFor="e-desk">By the Desk Officer/Director</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="mb-10">
                <h3 className="font-semibold mb-4">
                  SECTION F: What steps did you take to mobilize the participants to attend the training? Please select as appropriate
                </h3>
                <div className="space-y-3">
                  {['Letters', 'Email', 'Contact Persons', 'Text messages', 'Phone call', 'Whatsapp'].map((item) => (
                    <div key={item} className="flex items-center space-x-3">
                      <Checkbox
                        checked={sectionDEFGHIData.mobilizationSteps.includes(item)}
                        onCheckedChange={() => handleMobilizationToggle(item)}
                      />
                      <Label>{item}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <h3 className="font-semibold mb-4">SECTION G: When was notification sent to participants for the training?</h3>
                <RadioGroup
                  value={sectionDEFGHIData.notificationTiming}
                  onValueChange={(value: string) => handleSectionCChange('notificationTiming' as keyof SectionCData, value)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="four" id="g-four" />
                      <Label htmlFor="g-four">Four weeks before training</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="two" id="g-two" />
                      <Label htmlFor="g-two">Two weeks before training</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="one" id="g-one" />
                      <Label htmlFor="g-one">One week before training</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="less" id="g-less" />
                      <Label htmlFor="g-less">Less than one week</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="during" id="g-during" />
                      <Label htmlFor="g-during">During training</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="mb-10">
                <h3 className="font-semibold mb-4">
                  SECTION H: What are the challenges encountered in the implementation of the training?
                </h3>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="mb-4">
                    <Label>Challenge {i}</Label>
                    <Textarea
                      placeholder={`Challenge ${i}`}
                      value={sectionDEFGHIData.challenges[i - 1]}
                      onChange={(e) => handleChallengeChange(i - 1, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div className="mb-10">
                <h3 className="font-semibold mb-4">SECTION I: How did you solve the encountered problems?</h3>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="mb-4">
                    <Label>Solution {i}</Label>
                    <Textarea
                      placeholder={`Solution ${i}`}
                      value={sectionDEFGHIData.solutions[i - 1]}
                      onChange={(e) => handleSolutionChange(i - 1, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t">
               <div className="flex gap-4">
                 <Button variant="outline" onClick={prevStep}>Previous</Button>
                 <Button variant="outline" onClick={prevStep}>Save</Button>
               </div>
                <Button
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="bg-[#19488A] hover:bg-blue-700 text-white"
                >
                  {isSubmitting ? 'Submitting...' : 'FINAL SAVE'}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FillTrainingForm;