import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload } from 'lucide-react';
import { Team } from '@/types';

const jobSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().optional(),
  teamId: z.string().min(1, 'Team is required'),
  location: z.string().optional(),
  employmentType: z.enum(['full-time', 'part-time', 'contract']).optional(),
});

type JobFormData = z.infer<typeof jobSchema>;

interface AddJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (job: JobFormData & { pdfAttached?: string }) => void;
  teams: Team[];
}

export function AddJobModal({ open, onOpenChange, onSave, teams }: AddJobModalProps) {
  const [pdfFile, setPdfFile] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    mode: 'onChange',
  });

  const teamId = watch('teamId');
  const description = watch('description');

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file.name);
      // Mock PDF text extraction
      const mockPdfText = `(PDF attached: ${file.name})\n\nExtracted job description from PDF...`;
      setValue('description', mockPdfText, { shouldValidate: true });
    }
  };

  const onSubmit = (data: JobFormData) => {
    onSave({ ...data, pdfAttached: pdfFile || undefined });
    reset();
    setPdfFile(null);
    onOpenChange(false);
  };

  const handleCancel = () => {
    reset();
    setPdfFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-card border-2 border-primary/20 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add Job</DialogTitle>
          <DialogDescription>
            Create a new job opening for your team
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Two-column layout */}
          <div className="grid grid-cols-[140px_1fr] gap-x-6 gap-y-6 items-start">
            {/* Title */}
            <Label htmlFor="title" className="pt-2 text-right font-medium">
              Title <span className="text-destructive">*</span>
            </Label>
            <div className="space-y-1">
              <Input
                id="title"
                {...register('title')}
                placeholder="e.g., Senior Software Engineer"
                className="bg-secondary border-input focus:ring-2 focus:ring-primary"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <Label htmlFor="description" className="pt-2 text-right font-medium">
              Description
            </Label>
            <div className="space-y-2">
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Enter job description or upload PDF..."
                rows={6}
                className="bg-secondary border-input focus:ring-2 focus:ring-primary resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Job Description (enter or upload PDF)
              </p>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                  id="pdf-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('pdf-upload')?.click()}
                  className="bg-secondary/50"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload PDF
                </Button>
                {pdfFile && (
                  <span className="text-sm text-muted-foreground">
                    📄 {pdfFile}
                  </span>
                )}
              </div>
            </div>

            {/* Team */}
            <Label htmlFor="team" className="pt-2 text-right font-medium">
              Team <span className="text-destructive">*</span>
            </Label>
            <div className="space-y-1">
              <Select
                value={teamId}
                onValueChange={(value) => setValue('teamId', value, { shouldValidate: true })}
              >
                <SelectTrigger className="bg-secondary border-input focus:ring-2 focus:ring-primary">
                  <SelectValue placeholder="Select Team" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.teamId && (
                <p className="text-sm text-destructive">{errors.teamId.message}</p>
              )}
            </div>

            {/* Location */}
            <Label htmlFor="location" className="pt-2 text-right font-medium">
              Location
            </Label>
            <Input
              id="location"
              {...register('location')}
              placeholder="e.g., Remote, New York, etc."
              className="bg-secondary border-input focus:ring-2 focus:ring-primary"
            />

            {/* Employment Type */}
            <Label htmlFor="employmentType" className="pt-2 text-right font-medium">
              Employment Type
            </Label>
            <Select
              value={watch('employmentType')}
              onValueChange={(value) =>
                setValue('employmentType', value as 'full-time' | 'part-time' | 'contract')
              }
            >
              <SelectTrigger className="bg-secondary border-input focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              className="bg-gradient-primary hover:opacity-90"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
