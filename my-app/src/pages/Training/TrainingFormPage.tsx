import { useParams, useNavigate} from 'react-router-dom';
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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../../components/ui/popover';
import { Badge } from '../../components/ui/badge';
import {
  ChevronsUpDown, 
  Check,
  Plus,
  X,
  Search,
} from 'lucide-react';
import Breadcrumb from './Breadcrumb';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../../components/ui/command';
import { cn } from '../../lib/utils';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/dialog';

const trainings = [
  {
    id: 1,
    theme: 'A 5-DAY CAPACITY BUILDING WORKSHOP FOR SCHOOL SUPPORT OFFICERS',
    initiative: 'SUBEC',
    trainingType: 'School Support Training',
    trainer: 'Adéyemi College of Education Consult',
    trainingMethod:'Online',
    state: 'Ondo State',
    startDate: '2023-10-30',
    endDate: '2023-11-03',
  },
  {
    id: 2,
    theme: 'School Based Training for Improved Teacher Classroom Effectiveness and Learning Outcomes',
    initiative: 'UBEC',
    trainingType: 'Pedagogies in English, Mathematics and Science Education Training',
    trainer: 'Federal College of Education Eha-Amufu Isi Uzo Local Government Enugu State',
    trainingMethod:'Physical',
    state: 'Enugu State',
    startDate: '2024-01-09',
    endDate: '2024-05-12',
  },
  {
    id: 3,
    theme: 'Making Teachers Effective and Competent through Mentoring and Coaching',
    initiative: 'UBEC',
    trainingType: 'School Support Training',
    trainer: 'Federal College of Education Eha-Amufu Isi Uzo Local Government Enugu State',
    trainingMethod:'Online',
    state: 'Enugu State',
    startDate: '2023-11-27',
    endDate: '2023-12-01',
  },
  {
    id: 4,
    theme: 'Sokoto Training',
    initiative: 'UBEC',
    trainingType: 'Early Childhood Care Development and Education Training',
    trainer: 'Sokoto',
    trainingMethod:'Online',
    state: 'Sokoto State',
    startDate: '2023-10-30',
    endDate: '2023-10-30',
  },
  {
    id: 5,
    theme: 'Teacher Professional Development (TDP)',
    initiative: 'UBEC',
    trainingType: 'School Support Training',
    trainer: 'College of Education, Afaha Nsit',
    trainingMethod:'Online',
    state: 'Akwa Ibom State',
    startDate: '2023-11-06',
    endDate: '2023-11-10',
  },
  {
    id: 6,
    theme: 'ICT in Education',
    initiative: 'UBEC',
    trainingType: 'Information and Communication Technology Training',
    trainer: 'UBEC',
    trainingMethod:'Online',
    state: 'Bauchi State',
    startDate: '2023-11-01',
    endDate: '2023-11-03',
  },
  {
    id: 7,
    theme: 'SCHOOL BASED TRAINING',
    initiative: 'UBEC',
    trainingType: 'School Leadership Training',
    trainer: 'CROSS RIVER STATE COLLEGE OF EDUCATION',
    trainingMethod:'Online',
    state: 'Cross River State',
    startDate: '2023-11-13',
    endDate: '2023-11-19',
  },
  {
    id: 8,
    theme: 'School Support Officers (SSO) Training - Improving Teachers\' Classroom Delivery through Effective Mentoring and Coaching',
    initiative: 'UBEC',
    trainingType: 'School Support Training',
    trainer: 'College of Education Ikwo',
    trainingMethod:'Online',
    state: 'Ebonyi State',
    startDate: '2023-11-20',
    endDate: '2023-11-24',
  },
  {
    id: 9,
    theme: 'School Based Training for Improved Teacher Classroom Effectiveness and Learning Outcomes',
    initiative: 'UBEC',
    trainingType: 'Pedagogies in English, Mathematics and Science Education Training',
    trainer: 'College of Education Ikwo',
    trainingMethod:'Online',
    state: 'Ebonyi State',
    startDate: '2024-01-08',
    endDate: '2024-04-08',
  },
];

const mockUsers = [
  { id: 'u1', name: 'Dr. John Adebayo', email: 'john@example.com', role: 'Teacher' },
  { id: 'u2', name: 'Mrs. Fatima Yusuf', email: 'fatima@example.com', role: 'Head Teacher' },
  { id: 'u3', name: 'Mr. Chukwuemeka Okeke', email: 'chuks@example.com', role: 'School Support Officer' },
  { id: 'u4', name: 'Ms. Aisha Mohammed', email: 'aisha@example.com', role: 'Trainer' },
  { id: 'u5', name: 'Prof. Ngozi Okonkwo', email: 'ngozi@example.com', role: 'Consultant' },
  { id: 'u6', name: 'Mr. Ibrahim Ali', email: 'ibrahim@example.com', role: 'Administrator' },
];

interface TrainingFormData {
  theme: string;
  description: string;
  program_type: string;
  funding_source: string;
  training_type: string;
  training_method:string;
  training_institution: string;
  frequency_limit: number | string;
  years_to_retirement_exclude: number | string;
  states: string[];
  start_date: string;
  end_date: string;
  funding_year: string;
  training_year: string;
  approved_by: string;
  status: string;
}

interface Module {
  id: string;
  name: string;
  description: string;
  host_user_id: string | null;
  max_participants: number | '';
}

interface Participant {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface NewInstructor {
  program_id: string;
  module: string;
  description: string;
  host_user_id: string;
  max_participants: number;
}

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
  "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
  "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna",
  "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const trainingTypes = [
  "School Support Training",
  "Pedagogies in English, Mathematics and Science Education Training",
  "Early Childhood Care Development and Education Training",
  "Information and Communication Technology Training",
  "School Leadership Training",
];
const trainingMethod = ["Online", "Physical"];
const initiatives = ["UBEC", "SUBEC", "TETFund", "State"];

const statuses = ["Pending", "Approved", "Ongoing", "Completed", "Cancelled"];

const TrainingFormPage = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  const existingData = isEditing ? trainings.find(t => t.id === Number(id)) : null;
  // const [openAddParticipantModal, setOpenAddParticipantModal] = useState(false);
  
  const [openStates, setOpenStates] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<TrainingFormData>({
    theme: "",
    description: "",
    program_type: "",
    funding_source: "",
    training_type: "",
    training_institution: "",
    training_method:"",
    frequency_limit: "",
    years_to_retirement_exclude: "",
    states: [],
    start_date: "",
    end_date: "",
    funding_year: "",
    training_year: "",
    approved_by: "",
    status: "Pending",
  });

  const [modules, setModules] = useState<Module[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);

// const [newParticipant, setNewParticipant] = useState({
//   name: "",
//   email: "",
//   role: "",
// });

// const handleAddParticipant = () => {
//   if (!newParticipant.name.trim() || !newParticipant.email.trim()) {
//     toast.error("Name and email are required");
//     return;
//   }

//   const participant: Participant = {
//     id: uuidv4(),
//     name: newParticipant.name.trim(),
//     email: newParticipant.email.trim(),
//     role: newParticipant.role.trim() || "Participant",
//   };

//   setParticipants(prev => [...prev, participant]);
//   setNewParticipant({ name: "", email: "", role: "" });
//   toast.success(`${participant.name} added successfully`);
// };

  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [openInstructorDropdown, setOpenInstructorDropdown] = useState(false);
  const [openAddInstructorModal, setOpenAddInstructorModal] = useState(false);
  const [newInstructor, setNewInstructor] = useState<NewInstructor>({
    program_id: "",
    module: "",
    description: "",
    host_user_id: "",
    max_participants: 0,
  });

  useEffect(() => {
    if (isEditing && existingData) {
      setFormData({
        theme: existingData.theme || "",
        description: "",
        program_type: existingData.initiative || "",
        funding_source: "",
        training_type: existingData.trainingType || "",
        training_institution: existingData.trainer || "",
        training_method:existingData.trainingMethod || "",
        frequency_limit: "",
        years_to_retirement_exclude: "",
        states: existingData.state ? [existingData.state] : [],
        start_date: existingData.startDate || "",
        end_date: existingData.endDate || "",
        funding_year: "",
        training_year: "",
        approved_by: "",
        status: "Pending",
      });
    }
  }, [isEditing, existingData]);

  const handleChange = <K extends keyof TrainingFormData>(
    key: K,
    value: TrainingFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleStateToggle = (state: string) => {
    setFormData((prev) => ({
      ...prev,
      states: prev.states.includes(state)
        ? prev.states.filter((s) => s !== state)
        : [...prev.states, state],
    }));
  };

  const handleSelectAllStates = () => {
    if (formData.states.length === nigerianStates.length) {
      setFormData((prev) => ({ ...prev, states: [] }));
    } else {
      setFormData((prev) => ({ ...prev, states: [...nigerianStates] }));
    }
  };

  const isStep1Valid = () => {
    const baseRequired = [
      formData.theme,
      formData.training_type,
      formData.training_method,
      formData.start_date,
      formData.end_date,
    ];

    const stateValid = formData.states.length > 0;

    const dateValid =
      formData.start_date &&
      formData.end_date &&
      new Date(formData.start_date) <= new Date(formData.end_date);

    return baseRequired.every(Boolean) && stateValid && dateValid;
  };

  const nextStep = () => {
    setSubmitted(true);
    if (currentStep === 1 && !isStep1Valid()) {
      toast.error("Please complete all required fields in Basic Information");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
    setSubmitted(false);
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleFinalSubmit = async () => {
    if (modules.length === 0) {
      toast.error("Please add at least one module");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Final Submission:", { formData, modules, participants });
      toast.success(isEditing ? "Training updated successfully!" : "Training created successfully!");
      navigate('/training/manage');
    } catch (error) {
      toast.error("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };


  const addModule = () => {
    setModules((prev) => [
      ...prev,
      {
        id: uuidv4(),
        name: "",
        description: "",
        host_user_id: null,
        max_participants: "",
      },
    ]);
  };

  const updateModule = (id: string, field: keyof Module, value: any) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const removeModule = (id: string) => {
    setModules((prev) => prev.filter((m) => m.id !== id));
  };



  const removeParticipant = (id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  const selectInstructor = (user: typeof mockUsers[0]) => {
    if (selectedModuleId) {
      updateModule(selectedModuleId, 'host_user_id', user.id);
      toast.success(`${user.name} assigned as instructor`);
    }
    setOpenInstructorDropdown(false);
    setSelectedModuleId(null);
  };

  const saveNewInstructor = () => {
    toast.success("New instructor added successfully!");
    setOpenAddInstructorModal(false);
    setNewInstructor({
      program_id: "",
      module: "",
      description: "",
      host_user_id: "",
      max_participants: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Breadcrumb
        items={[
          { label: 'Trainings', href: '/training/manage' },
          { label: isEditing ? `Edit Training #${id}` : 'Add New Training', current: true },
        ]}
      />

      <div className="mt-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Edit Training' : 'Create New Training'}
          </h1>
          {/* <Link to="/training/manage">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link> */}
        </div>

<div className="mb-10">
  {/* Mobile View: Show only current step */}
  <div className="flex flex-col items-center md:hidden">
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-white bg-[#19488A]"
    >
      {currentStep}
    </div>
    <p className="mt-4 text-lg font-medium text-gray-700">
      Step {currentStep} of 3
    </p>
    <p className="text-sm text-gray-500 mt-1">
      {currentStep === 1 ? 'Basic Information' : currentStep === 2 ? 'Modules' : 'Participants'}
    </p>
  </div>

  {/* Desktop View: Show all steps with lines */}
  <div className="hidden md:flex items-center justify-center ">
    {[1, 2, 3].map((step) => (
      <div key={step} className="flex items-center">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-colors  ${
            currentStep >= step
              ? 'bg-[#19488A] text-white'
              : 'bg-gray-300 text-gray-600'
          }`}
        >
          {step}
        </div>
        {step < 3 && (
          <div
            className={`w-32 h-1 mx-6 transition-colors ${
              currentStep > step ? 'bg-[#19488A]' : 'bg-gray-300'
            }`}
          />
        )}
      </div>
    ))}
  </div>
</div>


        <div className="text-center mb-8">
          {/* Mobile view */}
          <p className="md:hidden text-lg font-medium text-[#19488A] ">
            Step {currentStep} of 3 — {currentStep === 1 ? 'Basic Information' : currentStep === 2 ? 'Modules' : 'Participants'}
          </p>
          {/* Desktop view */}
          <div className="hidden md:flex justify-center gap-36 text-sm font-medium text-gray-600">
            <span className={currentStep === 1 ? 'text-[#19488A] font-bold' : ''}>Basic Information</span>
            <span className={currentStep === 2 ? 'text-[#19488A] font-bold' : ''}>Modules</span>
            <span className={currentStep === 3 ? 'text-[#19488A] font-bold' : ''}>Participants</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                <Label>
                  Theme <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter training theme"
                  value={formData.theme}
                  onChange={(e) => handleChange("theme", e.target.value)}
                />
                {submitted && !formData.theme && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>
                <div>
                  <Label>
                    Training Method <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(val) => handleChange("training_method", val)}
                    value={formData.training_method}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select training method" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainingMethod.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {submitted && !formData.training_type && (
                    <p className="text-red-500 text-xs mt-1">Required</p>
                  )}
                </div>

              </div>

             

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Program Type / Initiative</Label>
                  <Select
                    onValueChange={(val) => handleChange("program_type", val)}
                    value={formData.program_type}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select initiative" />
                    </SelectTrigger>
                    <SelectContent>
                      {initiatives.map((initiative) => (
                        <SelectItem key={initiative} value={initiative}>
                          {initiative}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Funding Source</Label>
                  <Input
                    placeholder="Enter funding source"
                    value={formData.funding_source}
                    onChange={(e) => handleChange("funding_source", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>
                    Training Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(val) => handleChange("training_type", val)}
                    value={formData.training_type}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select training type" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainingTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {submitted && !formData.training_type && (
                    <p className="text-red-500 text-xs mt-1">Required</p>
                  )}
                </div>

                <div>
                  <Label>Training Institution/Consultant</Label>
                  <Input
                    placeholder="Enter institution or consultant name"
                    value={formData.training_institution}
                    onChange={(e) => handleChange("training_institution", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Funding Year</Label>
                  <Input
                    type="text"
                    placeholder="e.g., 2024, 2024/2025, FY2025"
                    value={formData.funding_year}
                    onChange={(e) => handleChange("funding_year", e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the funding year (can include ranges or text)
                  </p>
                </div>

                <div>
                  <Label>Training Year</Label>
                  <Input
                    type="text"
                    placeholder="e.g., 2024, 2024/2025"
                    value={formData.training_year}
                    onChange={(e) => handleChange("training_year", e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the year the training takes place
                  </p>
                </div>
              </div>

              {/* States Multi-Select */}
              <div className="space-y-4">
                <div>
                  <Label>
                    Select States <span className="text-red-500">*</span>
                  </Label>
                  <Popover open={openStates} onOpenChange={setOpenStates}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openStates}
                        className="w-full justify-between h-auto py-2 px-3 text-left font-normal"
                      >
                        <div className="flex flex-wrap gap-2">
                          {formData.states.length === 0 ? (
                            <span className="text-muted-foreground">Select states...</span>
                          ) : (
                            formData.states.map((state) => (
                              <Badge
                                key={state}
                                variant="secondary"
                                className="px-2 py-1 text-xs"
                              >
                                {state}
                                <button
                                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                  onKeyDown={(e) => e.stopPropagation()}
                                  onMouseDown={(e) => e.preventDefault()}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStateToggle(state);
                                  }}
                                >
                                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                              </Badge>
                            ))
                          )}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search states..." />
                        <CommandEmpty>No state found.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {nigerianStates.map((state) => (
                            <CommandItem
                              key={state}
                              onSelect={() => handleStateToggle(state)}
                              className="cursor-pointer"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.states.includes(state) ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {state}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <p className="text-xs text-gray-500 mt-2">
                    Selected: {formData.states.length} of {nigerianStates.length} states
                  </p>
                  {submitted && formData.states.length === 0 && (
                    <p className="text-red-500 text-xs mt-1">
                      Please select at least one state
                    </p>
                  )}
                </div>

                {formData.states.length > 0 && (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleSelectAllStates}
                    >
                      {formData.states.length === nigerianStates.length
                        ? "Deselect All"
                        : "Select All"}
                    </Button>
                    {formData.states.length > 0 && formData.states.length < nigerianStates.length && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setFormData((prev) => ({ ...prev, states: [] }))}
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>
                    Training Start Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => handleChange("start_date", e.target.value)}
                  />
                  {submitted && !formData.start_date && (
                    <p className="text-red-500 text-xs mt-1">Required</p>
                  )}
                </div>

                <div>
                  <Label>
                    End Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => handleChange("end_date", e.target.value)}
                  />
                  {submitted && !formData.end_date && (
                    <p className="text-red-500 text-xs mt-1">Required</p>
                  )}
                </div>
              </div>

              {/* Approved By and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Approved By</Label>
                  <Input
                    placeholder="Enter approver name"
                    value={formData.approved_by}
                    onChange={(e) => handleChange("approved_by", e.target.value)}
                  />
                </div>

                <div>
                  <Label>Status</Label>
                  <Select
                    onValueChange={(val) => handleChange("status", val)}
                    value={formData.status}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
              </div>
               <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Enter training description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-8 border-t">
                <Button variant="outline" onClick={() => navigate('/training/manage')}>
                  Cancel
                </Button>
                <Button onClick={nextStep} className="bg-[#19488A] hover:bg-blue-700">
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Modules */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <h2 className="text-xl font-semibold">Training Modules</h2>

              {modules.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gray-100 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Plus className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-lg mb-8">Add your first module</p>
                  <Button onClick={addModule} size="lg">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Module
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {modules.map((module, index) => (
                    <div key={module.id} className="border rounded-lg p-6 relative">
                      <button
                        onClick={() => removeModule(module.id)}
                        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <h3 className="font-semibold mb-4">Module {index + 1}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Module Name <span className="text-red-500">*</span></Label>
                          <Input
                            value={module.name}
                            onChange={(e) => updateModule(module.id, 'name', e.target.value)}
                            placeholder="e.g., Effective Classroom Management"
                          />
                        </div>
                        <div>
                          <Label>Max Participants</Label>
                          <Input
                            type="number"
                            value={module.max_participants || ""}
                            onChange={(e) => updateModule(module.id, 'max_participants', e.target.value || '')}
                            placeholder="e.g., 50"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Description</Label>
                          <Textarea
                            value={module.description}
                            onChange={(e) => updateModule(module.id, 'description', e.target.value)}
                            rows={3}
                            placeholder="Describe this module..."
                          />
                        </div>
                        <div>
                          <Label>Host / Instructor</Label>
                          <Popover open={openInstructorDropdown && selectedModuleId === module.id} onOpenChange={(open) => {
                            if (open) setSelectedModuleId(module.id);
                            setOpenInstructorDropdown(open);
                          }}>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-between">
                                {module.host_user_id
                                  ? mockUsers.find(u => u.id === module.host_user_id)?.name || "Unknown"
                                  : "Select instructor"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search instructor..." />
                                <CommandEmpty>No instructor found.</CommandEmpty>
                                <CommandGroup className="max-h-64 overflow-auto">
                                  {mockUsers.map((user) => (
                                    <CommandItem
                                      key={user.id}
                                      onSelect={() => selectInstructor(user)}
                                      className="cursor-pointer"
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          module.host_user_id === user.id ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      <div>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-xs text-gray-500">{user.role}</div>
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                                <div className="border-t p-3">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => setOpenAddInstructorModal(true)}
                                  >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add New Instructor
                                  </Button>
                                </div>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="text-center pt-6">
                    <Button variant="outline" onClick={addModule}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Another Module
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-8 border-t">
                <Button variant="outline" onClick={prevStep}>
                  Previous
                </Button>
                <Button onClick={nextStep} className="bg-[#19488A] hover:bg-blue-700">
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Participants  */}
{currentStep === 3 && (
  <div className="space-y-8">
    <h2 className="text-xl font-semibold">Participants</h2>

    {/* Select Participants from Existing Users */}
    <div className="bg-gray-50 rounded-lg p-6 border">
      <h3 className="font-medium mb-4">Select Participants (Teachers/Trainers)</h3>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between h-auto py-3 px-4 text-left font-normal"
          >
            <div className="flex flex-wrap gap-2">
              {participants.length === 0 ? (
                <span className="text-muted-foreground">Search and select participants...</span>
              ) : (
                participants.map((p) => (
                  <Badge key={p.id} variant="secondary" className="px-2 py-1 text-xs">
                    {p.name}
                    <button
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={(e) => e.stopPropagation()}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeParticipant(p.id);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search teachers by name, email or role..." />
            <CommandEmpty>
              <div className="py-6 text-center text-sm">
                No user found.
                <br />
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setOpenAddInstructorModal(true)} // Reuse or create new modal
                >
                  Add new participant
                </Button>
              </div>
            </CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {mockUsers
                .filter((user) => !participants.some((p) => p.id === user.id)) // Hide already selected
                .map((user) => (
                  <CommandItem
                    key={user.id}
                    onSelect={() => {
                      const participant: Participant = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                      };
                      setParticipants((prev) => [...prev, participant]);
                      toast.success(`${user.name} added as participant`);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        participants.some((p) => p.id === user.id) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">
                        {user.email} • {user.role}
                      </div>
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
            {/* <div className="border-t p-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setOpenAddInstructorModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Participant (Not in list)
              </Button>
            </div> */}
          </Command>
        </PopoverContent>
      </Popover>

      <p className="text-sm text-gray-600 mt-3">
        Selected: {participants.length} participant{participants.length !== 1 ? 's' : ''}
      </p>
    </div>

    {/* Participants Table */}
    {participants.length === 0 ? (
      <div className="text-center py-16">
        <div className="bg-gray-100 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
          <Search className="w-12 h-12 text-gray-400" />
        </div>
        <p className="text-gray-600 text-lg">No participants selected yet</p>
        <p className="text-gray-500 mt-2">Use the selector above to add teachers/trainers</p>
      </div>
    ) : (
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium">Name</th>
              <th className="text-left p-4 font-medium">Email</th>
              <th className="text-left p-4 font-medium">Role</th>
              <th className="text-right p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-gray-600">{p.email}</td>
                <td className="p-4">{p.role || '-'}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => removeParticipant(p.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {/* Navigation Buttons */}
    <div className="flex justify-between pt-8 border-t">
      <Button variant="outline" onClick={prevStep}>
        Previous
      </Button>
      <Button
        onClick={handleFinalSubmit}
        disabled={isSubmitting || participants.length === 0}
        className="bg-[#19488A] hover:bg-blue-700"
      >
        {isSubmitting ? "Saving..." : isEditing ? "Update Training" : "Create Training"}
      </Button>
    </div>
  </div>
)}
        </div>
      </div>

      {/* Add New Instructor Modal */}
      <Dialog open={openAddInstructorModal} onOpenChange={setOpenAddInstructorModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Instructor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Program ID</Label>
              <Input
                placeholder="UUID reference to training program"
                value={newInstructor.program_id}
                onChange={(e) => setNewInstructor(prev => ({ ...prev, program_id: e.target.value }))}
              />
            </div>
            <div>
              <Label>Module</Label>
              <Input
                placeholder="Module name"
                value={newInstructor.module}
                onChange={(e) => setNewInstructor(prev => ({ ...prev, module: e.target.value }))}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Instructor description"
                rows={3}
                value={newInstructor.description}
                onChange={(e) => setNewInstructor(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div>
              <Label>Host User ID</Label>
              <Input
                placeholder="UUID reference to user"
                value={newInstructor.host_user_id}
                onChange={(e) => setNewInstructor(prev => ({ ...prev, host_user_id: e.target.value }))}
              />
            </div>
            <div>
              <Label>Max Participants</Label>
              <Input
                type="number"
                placeholder="e.g., 50"
                value={newInstructor.max_participants || ""}
                onChange={(e) => setNewInstructor(prev => ({ ...prev, max_participants: Number(e.target.value) || 0 }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddInstructorModal(false)}>
              Cancel
            </Button>
            <Button onClick={saveNewInstructor} className="bg-[#19488A] hover:bg-blue-700">
              Save Instructor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingFormPage;