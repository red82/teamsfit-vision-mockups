import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Job, Candidate, Employee, Application } from '@/types';
import { StepJobSelect } from './steps/StepJobSelect';
import { StepCandidateSelect } from './steps/StepCandidateSelect';
import { StepInterviewers } from './steps/StepInterviewers';
import { StepSchedule } from './steps/StepSchedule';
import { StepDetails } from './steps/StepDetails';

interface ScheduleInterviewWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobs: Job[];
  candidates: Candidate[];
  employees: Employee[];
  applications: Application[];
  prefillJobId?: string;
  prefillCandidateId?: string;
  onSave: (data: InterviewData) => void;
}

export interface InterviewData {
  jobId: string;
  candidateId: string;
  applicationId?: number;
  interviewers: Array<{ employeeId: number; role: 'lead' | 'panel' | 'hm' }>;
  scheduledAt: string;
  durationMin: number;
  stage: string;
  location: string;
  notes: string;
}

const steps = [
  { id: 1, name: 'Job', key: 'job' },
  { id: 2, name: 'Candidate', key: 'candidate' },
  { id: 3, name: 'Interviewers', key: 'interviewers' },
  { id: 4, name: 'Schedule', key: 'schedule' },
  { id: 5, name: 'Details', key: 'details' },
];

export const ScheduleInterviewWizard = ({
  open,
  onOpenChange,
  jobs,
  candidates,
  employees,
  applications,
  prefillJobId,
  prefillCandidateId,
  onSave,
}: ScheduleInterviewWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<InterviewData>>({
    jobId: prefillJobId || '',
    candidateId: prefillCandidateId || '',
    interviewers: [],
    durationMin: 60,
    stage: 'screen',
    location: '',
    notes: '',
  });

  const updateFormData = (data: Partial<InterviewData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!formData.jobId;
      case 2:
        return !!formData.candidateId;
      case 3:
        return (formData.interviewers?.length || 0) > 0;
      case 4:
        return !!formData.scheduledAt && (formData.durationMin || 0) > 0;
      case 5:
        return !!formData.stage;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    if (canProceed()) {
      onSave(formData as InterviewData);
      handleClose();
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
      jobId: prefillJobId || '',
      candidateId: prefillCandidateId || '',
      interviewers: [],
      durationMin: 60,
      stage: 'screen',
      location: '',
      notes: '',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Schedule Interview</DialogTitle>
        </DialogHeader>

        {/* Steps indicator */}
        <div className="flex items-center justify-between mb-8 px-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentStep >= step.id
                      ? 'bg-gradient-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {step.id}
                </div>
                <span className="text-xs mt-1 text-muted-foreground">{step.name}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 ${
                    currentStep > step.id ? 'bg-gradient-primary' : 'bg-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="min-h-[300px]">
          {currentStep === 1 && (
            <StepJobSelect
              jobs={jobs}
              selectedJobId={formData.jobId}
              onSelect={(jobId) => updateFormData({ jobId })}
            />
          )}
          {currentStep === 2 && (
            <StepCandidateSelect
              candidates={candidates}
              applications={applications}
              selectedJobId={formData.jobId!}
              selectedCandidateId={formData.candidateId}
              onSelect={(candidateId) => updateFormData({ candidateId })}
            />
          )}
          {currentStep === 3 && (
            <StepInterviewers
              employees={employees}
              selectedInterviewers={formData.interviewers || []}
              onUpdate={(interviewers) => updateFormData({ interviewers })}
            />
          )}
          {currentStep === 4 && (
            <StepSchedule
              scheduledAt={formData.scheduledAt}
              durationMin={formData.durationMin || 60}
              interviewers={formData.interviewers || []}
              employees={employees}
              onUpdate={(data) => updateFormData(data)}
            />
          )}
          {currentStep === 5 && (
            <StepDetails
              stage={formData.stage || 'screen'}
              location={formData.location || ''}
              notes={formData.notes || ''}
              onUpdate={(data) => updateFormData(data)}
            />
          )}
        </div>

        {/* Footer actions */}
        <div className="flex justify-between items-center pt-6 border-t border-border">
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button variant="secondary" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            {currentStep < steps.length ? (
              <Button
                className="bg-gradient-primary hover:opacity-90"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                className="bg-gradient-primary hover:opacity-90"
                onClick={handleSave}
                disabled={!canProceed()}
              >
                Save
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
