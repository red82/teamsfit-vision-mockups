import { Employee } from '@/types';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, UserPlus } from 'lucide-react';
import { useState } from 'react';

interface StepInterviewersProps {
  employees: Employee[];
  selectedInterviewers: Array<{ employeeId: number; role: 'lead' | 'panel' | 'hm' }>;
  onUpdate: (interviewers: Array<{ employeeId: number; role: 'lead' | 'panel' | 'hm' }>) => void;
}

const roleLabels = {
  lead: 'Lead',
  panel: 'Panel',
  hm: 'Hiring Manager',
};

const roleColors = {
  lead: 'bg-blue-500/20 text-blue-500 border-blue-500/50',
  panel: 'bg-purple-500/20 text-purple-500 border-purple-500/50',
  hm: 'bg-green-500/20 text-green-500 border-green-500/50',
};

export const StepInterviewers = ({
  employees,
  selectedInterviewers,
  onUpdate,
}: StepInterviewersProps) => {
  const [newEmployeeId, setNewEmployeeId] = useState<string>('');

  const selectedEmployeeIds = new Set(selectedInterviewers.map((i) => i.employeeId));
  const availableEmployees = employees.filter((e) => !selectedEmployeeIds.has(e.id));

  const handleAdd = () => {
    if (newEmployeeId) {
      onUpdate([
        ...selectedInterviewers,
        { employeeId: Number(newEmployeeId), role: 'panel' },
      ]);
      setNewEmployeeId('');
    }
  };

  const handleRemove = (employeeId: number) => {
    onUpdate(selectedInterviewers.filter((i) => i.employeeId !== employeeId));
  };

  const handleRoleChange = (employeeId: number, role: 'lead' | 'panel' | 'hm') => {
    onUpdate(
      selectedInterviewers.map((i) =>
        i.employeeId === employeeId ? { ...i, role } : i
      )
    );
  };

  const getEmployeeName = (employeeId: number) => {
    return employees.find((e) => e.id === employeeId)?.full_name || '';
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Interviewers</h3>
        <p className="text-sm text-muted-foreground">
          Add team members who will conduct this interview
        </p>
      </div>

      {/* Selected interviewers */}
      <div className="space-y-2">
        <Label>Selected Interviewers ({selectedInterviewers.length})</Label>
        {selectedInterviewers.length === 0 ? (
          <div className="text-sm text-muted-foreground border border-dashed border-border rounded-md p-4 text-center">
            No interviewers selected yet
          </div>
        ) : (
          <div className="space-y-2">
            {selectedInterviewers.map((interviewer) => (
              <div
                key={interviewer.employeeId}
                className="flex items-center justify-between p-3 border border-border rounded-md bg-card"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="font-medium">{getEmployeeName(interviewer.employeeId)}</span>
                  <Select
                    value={interviewer.role}
                    onValueChange={(role) =>
                      handleRoleChange(interviewer.employeeId, role as 'lead' | 'panel' | 'hm')
                    }
                  >
                    <SelectTrigger className="w-[150px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lead">Lead</SelectItem>
                      <SelectItem value="panel">Panel</SelectItem>
                      <SelectItem value="hm">Hiring Manager</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge className={roleColors[interviewer.role]}>
                    {roleLabels[interviewer.role]}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(interviewer.employeeId)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
        {selectedInterviewers.length === 0 && (
          <p className="text-xs text-destructive">Please add at least one interviewer</p>
        )}
      </div>

      {/* Add new interviewer */}
      {availableEmployees.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="new-interviewer">Add Interviewer</Label>
          <div className="flex gap-2">
            <Select value={newEmployeeId} onValueChange={setNewEmployeeId}>
              <SelectTrigger id="new-interviewer" className="flex-1">
                <SelectValue placeholder="Select an employee..." />
              </SelectTrigger>
              <SelectContent>
                {availableEmployees.map((employee) => (
                  <SelectItem key={employee.id} value={String(employee.id)}>
                    <div className="flex flex-col">
                      <span className="font-medium">{employee.full_name}</span>
                      <span className="text-xs text-muted-foreground">{employee.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleAdd}
              disabled={!newEmployeeId}
              className="bg-gradient-primary hover:opacity-90"
            >
              <UserPlus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
