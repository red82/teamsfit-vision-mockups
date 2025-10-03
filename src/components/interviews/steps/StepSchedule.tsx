import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Employee } from '@/types';
import { mockInterviews, mockInterviewEmployees } from '@/mocks/interviews';

interface StepScheduleProps {
  scheduledAt?: string;
  durationMin: number;
  interviewers: Array<{ employeeId: number; role: string }>;
  employees: Employee[];
  onUpdate: (data: { scheduledAt?: string; durationMin?: number }) => void;
}

export const StepSchedule = ({
  scheduledAt,
  durationMin,
  interviewers,
  employees,
  onUpdate,
}: StepScheduleProps) => {
  const durationPresets = [30, 45, 60, 90];

  const checkConflicts = () => {
    if (!scheduledAt) return [];

    const scheduleTime = new Date(scheduledAt).getTime();
    const conflicts: string[] = [];

    interviewers.forEach((interviewer) => {
      const employeeName = employees.find((e) => e.id === interviewer.employeeId)?.full_name;
      
      const hasConflict = mockInterviews.some((interview) => {
        const interviewTime = new Date(interview.scheduled_at).getTime();
        const timeDiff = Math.abs(interviewTime - scheduleTime);
        const thirtyMinutes = 30 * 60 * 1000;

        const isInterviewer = mockInterviewEmployees.some(
          (ie) => ie.interview_id === interview.id && ie.employee_id === interviewer.employeeId
        );

        return isInterviewer && timeDiff < thirtyMinutes;
      });

      if (hasConflict && employeeName) {
        conflicts.push(employeeName);
      }
    });

    return conflicts;
  };

  const conflicts = checkConflicts();

  // Format datetime for input (needs format: YYYY-MM-DDTHH:MM)
  const formatForInput = (isoString?: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleDateTimeChange = (value: string) => {
    if (value) {
      const isoString = new Date(value).toISOString();
      onUpdate({ scheduledAt: isoString });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Schedule Details</h3>
        <p className="text-sm text-muted-foreground">
          Set the date, time, and duration for this interview
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="scheduled-at">Date & Time *</Label>
        <Input
          id="scheduled-at"
          type="datetime-local"
          value={formatForInput(scheduledAt)}
          onChange={(e) => handleDateTimeChange(e.target.value)}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">Using your local timezone</p>
        {!scheduledAt && (
          <p className="text-xs text-destructive">Please select a date and time</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">Duration (minutes) *</Label>
        <div className="flex gap-2">
          {durationPresets.map((preset) => (
            <Button
              key={preset}
              type="button"
              variant={durationMin === preset ? 'default' : 'secondary'}
              size="sm"
              onClick={() => onUpdate({ durationMin: preset })}
              className={durationMin === preset ? 'bg-gradient-primary hover:opacity-90' : ''}
            >
              {preset}m
            </Button>
          ))}
        </div>
        <Input
          id="duration"
          type="number"
          min="1"
          max="480"
          value={durationMin}
          onChange={(e) => onUpdate({ durationMin: parseInt(e.target.value) || 60 })}
          className="w-full"
        />
        {durationMin <= 0 && (
          <p className="text-xs text-destructive">Duration must be greater than 0</p>
        )}
      </div>

      {conflicts.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Scheduling conflict detected:</strong>
            <br />
            {conflicts.join(', ')} may have another interview around this time.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
