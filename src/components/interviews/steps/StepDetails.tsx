import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface StepDetailsProps {
  stage: string;
  location: string;
  notes: string;
  onUpdate: (data: { stage?: string; location?: string; notes?: string }) => void;
}

export const StepDetails = ({ stage, location, notes, onUpdate }: StepDetailsProps) => {
  const isUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const isZoomLink = location.includes('zoom.us');

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Interview Details</h3>
        <p className="text-sm text-muted-foreground">
          Provide additional information about this interview
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stage">Interview Stage *</Label>
        <Select value={stage} onValueChange={(value) => onUpdate({ stage: value })}>
          <SelectTrigger id="stage">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="screen">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Screen</Badge>
                <span>Initial Screening</span>
              </div>
            </SelectItem>
            <SelectItem value="technical">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Technical</Badge>
                <span>Technical Interview</span>
              </div>
            </SelectItem>
            <SelectItem value="system_design">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">System Design</Badge>
                <span>System Design Round</span>
              </div>
            </SelectItem>
            <SelectItem value="hiring_manager">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Hiring Manager</Badge>
                <span>Final Interview</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          type="text"
          placeholder="Zoom link, Google Meet, or office location..."
          value={location}
          onChange={(e) => onUpdate({ location: e.target.value })}
        />
        {isUrl(location) && (
          <div className="flex items-center gap-2">
            <a
              href={location}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              Open link
            </a>
            {isZoomLink && (
              <Badge variant="secondary" className="text-xs">
                Zoom
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Any additional notes or instructions for the interview..."
          rows={4}
          value={notes}
          onChange={(e) => onUpdate({ notes: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">
          These notes will be visible to all interviewers
        </p>
      </div>
    </div>
  );
};
