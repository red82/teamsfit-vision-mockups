import { Candidate, Application } from '@/types';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface StepCandidateSelectProps {
  candidates: Candidate[];
  applications: Application[];
  selectedJobId: string;
  selectedCandidateId?: string;
  onSelect: (candidateId: string) => void;
}

export const StepCandidateSelect = ({
  candidates,
  applications,
  selectedJobId,
  selectedCandidateId,
  onSelect,
}: StepCandidateSelectProps) => {
  // Filter candidates who have applied for this job
  const jobApplications = applications.filter(
    (app) => app.job_id === Number(selectedJobId)
  );
  
  const applicantIds = new Set(jobApplications.map((app) => app.candidate_id));
  const eligibleCandidates = candidates.filter((c) => applicantIds.has(Number(c.id)));

  // Check if selected candidate has no application
  const selectedHasApplication = selectedCandidateId 
    ? applicantIds.has(Number(selectedCandidateId))
    : true;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Candidate</h3>
        <p className="text-sm text-muted-foreground">
          Choose a candidate who has applied for this position
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="candidate-select">Candidate *</Label>
        <Select value={selectedCandidateId} onValueChange={onSelect}>
          <SelectTrigger id="candidate-select" className="w-full">
            <SelectValue placeholder="Select a candidate..." />
          </SelectTrigger>
          <SelectContent>
            {eligibleCandidates.map((candidate) => (
              <SelectItem key={candidate.id} value={candidate.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{candidate.name}</span>
                  <span className="text-xs text-muted-foreground">{candidate.email}</span>
                </div>
              </SelectItem>
            ))}
            <SelectItem value="__divider__" disabled className="h-px bg-border my-1" />
            {candidates
              .filter((c) => !applicantIds.has(Number(c.id)))
              .map((candidate) => (
                <SelectItem key={candidate.id} value={candidate.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{candidate.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {candidate.email} • No application yet
                    </span>
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {!selectedCandidateId && (
          <p className="text-xs text-destructive">Please select a candidate to continue</p>
        )}
      </div>

      {!selectedHasApplication && selectedCandidateId && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            This candidate hasn't applied for this job yet. An application will be created automatically.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
