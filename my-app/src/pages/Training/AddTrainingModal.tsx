import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast } from "sonner";
import { CheckSquare, Square } from "lucide-react";

interface AddTrainingModalProps {
  open: boolean;
  onClose: () => void;
  isEditing?: boolean;
  existingData?: any;
  onSuccess?:any;
}

interface TrainingFormData {
  theme: string;
  description: string;
  program_type: string;
  funding_source: string;
  training_type: string;
  training_institution: string;
  frequency_limit: number | string;
  years_to_retirement_exclude: number | string;
  is_state_initiative: boolean;
  state_id: string;
  states: string[];
  start_date: string;
  end_date: string;
  funding_year: string;
  training_year: string;
  approved_by: string;
  status: string;
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

const initiatives = ["UBEC", "SUBEC", "TETFund", "State"];

const statuses = ["Pending", "Approved", "Ongoing", "Completed", "Cancelled"];

const AddTrainingModal: React.FC<AddTrainingModalProps> = ({
  open,
  onClose,
  isEditing,
  existingData,
  // onSuccess
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<TrainingFormData>({
    theme: "",
    description: "",
    program_type: "",
    funding_source: "",
    training_type: "",
    training_institution: "",
    frequency_limit: "",
    years_to_retirement_exclude: "",
    is_state_initiative: false,
    state_id: "",
    states: [],
    start_date: "",
    end_date: "",
    funding_year: "",
    training_year: "",
    approved_by: "",
    status: "Pending",
  });

  useEffect(() => {
    if (open) {
      setSubmitted(false);
    }
  }, [open]);

  useEffect(() => {
    if (isEditing && existingData) {
      setFormData({
        theme: existingData.theme || "",
        description: existingData.description || "",
        program_type: existingData.program_type || "",
        funding_source: existingData.funding_source || "",
        training_type: existingData.training_type || "",
        training_institution: existingData.training_institution || "",
        frequency_limit: existingData.frequency_limit || "",
        years_to_retirement_exclude: existingData.years_to_retirement_exclude || "",
        is_state_initiative: existingData.is_state_initiative || false,
        state_id: existingData.state_id || "",
        states: existingData.states || [],
        start_date: existingData.start_date || "",
        end_date: existingData.end_date || "",
        funding_year: existingData.funding_year || "",
        training_year: existingData.training_year || "",
        approved_by: existingData.approved_by || "",
        status: existingData.status || "Pending",
      });
    } else {
      resetForm();
    }
  }, [isEditing, existingData, open]);

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

  const isFormValid = () => {
    const baseRequired = [
      formData.theme,
      formData.training_type,
      formData.start_date,
      formData.end_date,
    ];

    const stateValid = formData.is_state_initiative
      ? !!formData.state_id
      : formData.states.length > 0;

    return baseRequired.every(Boolean) && stateValid;
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    if (!isFormValid()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate dates
    if (new Date(formData.start_date) > new Date(formData.end_date)) {
      toast.error("End date must be after start date");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        frequency_limit: formData.frequency_limit ? Number(formData.frequency_limit) : null,
        years_to_retirement_exclude: formData.years_to_retirement_exclude 
          ? Number(formData.years_to_retirement_exclude) 
          : null,
        funding_year: formData.funding_year || null,
  training_year: formData.training_year || null,
      };

      if (isEditing && existingData?.id) {
        // Call update API
        console.log("Updating training:", payload);
        toast.success("Training updated successfully!");
      } else {
        // Call create API
        console.log("Creating training:", payload);
        toast.success("Training created successfully!");
      }

      onClose();
      resetForm();
    } catch (error) {
      toast.error(
        isEditing ? "Failed to update training" : "Failed to create training"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      theme: "",
      description: "",
      program_type: "",
      funding_source: "",
      training_type: "",
      training_institution: "",
      frequency_limit: "",
      years_to_retirement_exclude: "",
      is_state_initiative: false,
      state_id: "",
      states: [],
      start_date: "",
      end_date: "",
      funding_year: "",
      training_year: "",
      approved_by: "",
      status: "Pending",
    });
    setSubmitted(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className=" max-h-[90vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditing ? "Edit Training" : "Add New Training"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Theme */}
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

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Enter training description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
            />
          </div>

          {/* Program Type and Funding Source */}
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

          {/* Training Type and Institution */}
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
                onChange={(e) =>
                  handleChange("training_institution", e.target.value)
                }
              />
            </div>
          </div>

          
         {/* Funding Year and Training Year */}
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

          {/* State Initiative Toggle */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border">
              <input
              title='title'
                type="checkbox"
                id="state-initiative"
                checked={formData.is_state_initiative}
                onChange={(e) => {
                  handleChange("is_state_initiative", e.target.checked);
                  if (e.target.checked) {
                    handleChange("states", []);
                  } else {
                    handleChange("state_id", "");
                  }
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Label
                htmlFor="state-initiative"
                className="text-sm font-semibold text-gray-700 cursor-pointer"
              >
                Is this a State Initiative?
              </Label>
            </div>

            {/* Conditional State Selection */}
            {formData.is_state_initiative ? (
              <div>
                <Label>
                  Select State <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(val) => handleChange("state_id", val)}
                  value={formData.state_id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {nigerianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {submitted && !formData.state_id && (
                  <p className="text-red-500 text-xs mt-1">
                    Please select a state
                  </p>
                )}
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>
                    Select States <span className="text-red-500">*</span>
                  </Label>
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
                </div>
                <div className="border border-gray-300 rounded-md p-4 max-h-80 overflow-y-auto bg-white">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {nigerianStates.map((state) => (
                      <div
                        key={state}
                        onClick={() => handleStateToggle(state)}
                        className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                      >
                        {formData.states.includes(state) ? (
                          <CheckSquare className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                        <span className="text-sm text-gray-700">{state}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Selected: {formData.states.length} of {nigerianStates.length}{" "}
                  states
                </p>
                {submitted && formData.states.length === 0 && (
                  <p className="text-red-500 text-xs mt-1">
                    Please select at least one state
                  </p>
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

          {/* Funding Year and Training Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Funding Year</Label>
              <Input
                type="number"
                placeholder="e.g., 2024"
                value={formData.funding_year}
                onChange={(e) => handleChange("funding_year", e.target.value)}
              />
            </div>

            <div>
              <Label>Training Year</Label>
              <Input
                type="number"
                placeholder="e.g., 2024"
                value={formData.training_year}
                onChange={(e) => handleChange("training_year", e.target.value)}
              />
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
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#19488A] hover:bg-blue-700"
          >
            {isSubmitting
              ? isEditing
                ? "Updating..."
                : "Creating..."
              : isEditing
              ? "Update Training"
              : "Add Training"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTrainingModal;