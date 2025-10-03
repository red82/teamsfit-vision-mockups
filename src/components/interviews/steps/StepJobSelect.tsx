import { Job } from '@/types';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StepJobSelectProps {
  jobs: Job[];
  selectedJobId?: string;
  onSelect: (jobId: string) => void;
}

export const StepJobSelect = ({ jobs, selectedJobId, onSelect }: StepJobSelectProps) => {
  const activeJobs = jobs.filter(job => job.active);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Job</h3>
        <p className="text-sm text-muted-foreground">
          Choose the position for this interview
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="job-select">Job Position *</Label>
        <Select value={selectedJobId} onValueChange={onSelect}>
          <SelectTrigger id="job-select" className="w-full">
            <SelectValue placeholder="Select a job..." />
          </SelectTrigger>
          <SelectContent>
            {activeJobs.map((job) => (
              <SelectItem key={job.id} value={job.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{job.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {job.location} • {job.employmentType}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {!selectedJobId && (
          <p className="text-xs text-destructive">Please select a job to continue</p>
        )}
      </div>
    </div>
  );
};
