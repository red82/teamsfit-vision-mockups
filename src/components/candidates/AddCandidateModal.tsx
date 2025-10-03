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
import { Upload, Link as LinkIcon } from 'lucide-react';

const candidateSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100, 'Name must be less than 100 characters'),
  contact: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  linkedinUrl: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  cvUrl: z.string().optional(),
  salaryExpectation: z.coerce.number().min(0, 'Salary must be positive').optional().or(z.literal('')),
  seniority: z.string().optional(),
  role: z.string().optional(),
  highestEducation: z.string().optional(),
  yearsOfExperience: z.coerce.number().int().min(0).max(60, 'Years must be between 0 and 60').optional().or(z.literal('')),
});

type CandidateFormData = z.infer<typeof candidateSchema>;

interface AddCandidateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (candidate: CandidateFormData & { cvFile?: string }) => void;
}

export function AddCandidateModal({ open, onOpenChange, onSave }: AddCandidateModalProps) {
  const [cvFile, setCvFile] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<CandidateFormData>({
    resolver: zodResolver(candidateSchema),
    mode: 'onChange',
  });

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file.name);
      setValue('cvUrl', file.name, { shouldValidate: true });
    }
  };

  const onSubmit = (data: CandidateFormData) => {
    onSave({ ...data, cvFile: cvFile || undefined });
    reset();
    setCvFile(null);
    onOpenChange(false);
  };

  const handleCancel = () => {
    reset();
    setCvFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-2 border-primary/20 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add Candidate</DialogTitle>
          <DialogDescription>
            Add a new candidate to your recruitment pipeline
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1">
              <Label htmlFor="fullName">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                {...register('fullName')}
                placeholder="John Doe"
                className="bg-secondary border-input focus:ring-2 focus:ring-primary"
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="john@example.com"
                className="bg-secondary border-input focus:ring-2 focus:ring-primary"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="+1 (555) 123-4567"
                className="bg-secondary border-input focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Role */}
            <div className="space-y-1">
              <Label htmlFor="role">Target Role</Label>
              <Input
                id="role"
                {...register('role')}
                placeholder="Software Engineer"
                className="bg-secondary border-input focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* LinkedIn URL */}
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="linkedinUrl"
                  {...register('linkedinUrl')}
                  placeholder="https://linkedin.com/in/johndoe"
                  className="bg-secondary border-input focus:ring-2 focus:ring-primary pl-10"
                />
              </div>
              {errors.linkedinUrl && (
                <p className="text-sm text-destructive">{errors.linkedinUrl.message}</p>
              )}
            </div>

            {/* CV Upload */}
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="cv">CV / Resume</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleCvUpload}
                  className="hidden"
                  id="cv-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('cv-upload')?.click()}
                  className="bg-secondary/50"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload CV
                </Button>
                <Input
                  {...register('cvUrl')}
                  placeholder="Or paste CV URL here"
                  className="bg-secondary border-input focus:ring-2 focus:ring-primary"
                />
              </div>
              {cvFile && (
                <p className="text-sm text-muted-foreground">📄 {cvFile}</p>
              )}
            </div>

            {/* Contact Notes */}
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="contact">Contact Notes</Label>
              <Textarea
                id="contact"
                {...register('contact')}
                placeholder="Additional contact information or notes..."
                rows={3}
                className="bg-secondary border-input focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {/* Seniority */}
            <div className="space-y-1">
              <Label htmlFor="seniority">Seniority</Label>
              <Select
                value={watch('seniority')}
                onValueChange={(value) => setValue('seniority', value)}
              >
                <SelectTrigger className="bg-secondary border-input focus:ring-2 focus:ring-primary">
                  <SelectValue placeholder="Select seniority" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="Junior">Junior</SelectItem>
                  <SelectItem value="Middle">Middle</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                  <SelectItem value="Lead">Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Years of Experience */}
            <div className="space-y-1">
              <Label htmlFor="yearsOfExperience">Years of Experience</Label>
              <Input
                id="yearsOfExperience"
                type="number"
                min="0"
                max="60"
                {...register('yearsOfExperience')}
                placeholder="5"
                className="bg-secondary border-input focus:ring-2 focus:ring-primary"
              />
              {errors.yearsOfExperience && (
                <p className="text-sm text-destructive">{errors.yearsOfExperience.message}</p>
              )}
            </div>

            {/* Highest Education */}
            <div className="space-y-1">
              <Label htmlFor="highestEducation">Highest Education</Label>
              <Select
                value={watch('highestEducation')}
                onValueChange={(value) => setValue('highestEducation', value)}
              >
                <SelectTrigger className="bg-secondary border-input focus:ring-2 focus:ring-primary">
                  <SelectValue placeholder="Select education" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="High school">High school</SelectItem>
                  <SelectItem value="Bachelor">Bachelor</SelectItem>
                  <SelectItem value="Master">Master</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Salary Expectation */}
            <div className="space-y-1">
              <Label htmlFor="salaryExpectation">Salary Expectation ($)</Label>
              <Input
                id="salaryExpectation"
                type="number"
                min="0"
                step="0.01"
                {...register('salaryExpectation')}
                placeholder="75000"
                className="bg-secondary border-input focus:ring-2 focus:ring-primary"
              />
              {errors.salaryExpectation && (
                <p className="text-sm text-destructive">{errors.salaryExpectation.message}</p>
              )}
            </div>
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
