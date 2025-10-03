import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { GradientText } from '@/components/GradientText';
import { mockInterviews, mockInterviewEmployees, addInterview, addInterviewEmployee } from '@/mocks/interviews';
import { mockJobs } from '@/mocks/data';
import { mockCandidates } from '@/mocks/data';
import { mockEmployees } from '@/mocks/employees';
import { mockApplications, addApplication } from '@/mocks/applications';
import { Calendar, Filter, Clock, MapPin } from 'lucide-react';
import { ScheduleInterviewWizard, InterviewData } from '@/components/interviews/ScheduleInterviewWizard';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const Interviews = () => {
  const [filter, setFilter] = useState<string>('all');
  const [wizardOpen, setWizardOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<number | null>(null);
  const [interviews, setInterviews] = useState(mockInterviews);
  const [interviewEmployees, setInterviewEmployees] = useState(mockInterviewEmployees);

  const filteredInterviews = filter === 'all'
    ? interviews
    : interviews.filter((interview) => {
        if (filter === 'scheduled') return interview.result === null;
        if (filter === 'completed') return interview.result !== null;
        return true;
      });

  const handleScheduleInterview = (data: InterviewData) => {
    // Check if application exists
    let applicationId = mockApplications.find(
      (app) => app.job_id === Number(data.jobId) && app.candidate_id === Number(data.candidateId)
    )?.id;

    // Create application if it doesn't exist
    if (!applicationId) {
      const newApp = addApplication({
        job_id: Number(data.jobId),
        candidate_id: Number(data.candidateId),
        status: 'interview',
        submitted_at: new Date().toISOString(),
      });
      applicationId = newApp.id;
    }

    // Get job and candidate names for display
    const job = mockJobs.find((j) => j.id === data.jobId);
    const candidate = mockCandidates.find((c) => c.id === data.candidateId);

    // Create interview
    const newInterview = addInterview({
      application_id: applicationId,
      scheduled_at: data.scheduledAt,
      duration_min: data.durationMin,
      stage: data.stage as any,
      location: data.location,
      result: null,
      notes: data.notes,
      candidateName: candidate?.name,
      jobTitle: job?.title,
    });

    // Create interview employees
    data.interviewers.forEach((interviewer) => {
      addInterviewEmployee({
        interview_id: newInterview.id,
        employee_id: interviewer.employeeId,
        role: interviewer.role,
        invited_at: new Date().toISOString(),
        attended: null,
        notes: null,
      });
    });

    // Update local state
    setInterviews([newInterview, ...mockInterviews]);
    setInterviewEmployees([...mockInterviewEmployees]);
    setSelectedInterview(newInterview.id);

    toast({
      title: 'Interview Scheduled',
      description: `Interview with ${candidate?.name} has been scheduled successfully.`,
    });
  };

  const getInterviewers = (interviewId: number) => {
    return interviewEmployees
      .filter((ie) => ie.interview_id === interviewId)
      .map((ie) => {
        const employee = mockEmployees.find((e) => e.id === ie.employee_id);
        return {
          ...ie,
          name: employee?.full_name || 'Unknown',
          title: employee?.title,
        };
      });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">
            <GradientText>TeamsFit</GradientText> Interviews
          </h1>
          <p className="text-muted-foreground text-lg">Manage your interview schedule</p>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'secondary'}
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-gradient-primary hover:opacity-90' : ''}
            >
              <Filter className="mr-2 h-4 w-4" />
              All
            </Button>
            <Button 
              variant={filter === 'scheduled' ? 'default' : 'secondary'}
              onClick={() => setFilter('scheduled')}
              className={filter === 'scheduled' ? 'bg-gradient-primary hover:opacity-90' : ''}
            >
              Scheduled
            </Button>
            <Button 
              variant={filter === 'completed' ? 'default' : 'secondary'}
              onClick={() => setFilter('completed')}
              className={filter === 'completed' ? 'bg-gradient-primary hover:opacity-90' : ''}
            >
              Completed
            </Button>
          </div>

          <Button className="bg-gradient-primary hover:opacity-90" onClick={() => setWizardOpen(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Interview
          </Button>
        </div>

        {/* Interviews Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interviews List */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Candidate</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Scheduled</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterviews.map((interview) => (
                  <TableRow
                    key={interview.id}
                    className={`border-border cursor-pointer ${
                      selectedInterview === interview.id ? 'bg-secondary/50' : 'hover:bg-secondary/30'
                    }`}
                    onClick={() => setSelectedInterview(interview.id)}
                  >
                    <TableCell className="font-medium">{interview.candidateName}</TableCell>
                    <TableCell className="text-muted-foreground">{interview.jobTitle}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{format(new Date(interview.scheduled_at), 'MMM dd, yyyy')}</span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(interview.scheduled_at), 'HH:mm')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {interview.stage.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {interview.result === null ? (
                        <Badge className="bg-status-interview/20 text-status-interview border-status-interview/50">
                          Scheduled
                        </Badge>
                      ) : interview.result === 'pass' ? (
                        <Badge className="bg-status-offer/20 text-status-offer border-status-offer/50">
                          Passed
                        </Badge>
                      ) : interview.result === 'fail' ? (
                        <Badge className="bg-status-rejected/20 text-status-rejected border-status-rejected/50">
                          Failed
                        </Badge>
                      ) : (
                        <Badge variant="secondary">{interview.result}</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Interview Details Panel */}
          <div className="bg-card border border-border rounded-xl p-6">
            {selectedInterview ? (
              (() => {
                const interview = interviews.find((i) => i.id === selectedInterview);
                if (!interview) return null;

                const interviewers = getInterviewers(interview.id);

                return (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{interview.candidateName}</h3>
                      <p className="text-muted-foreground">{interview.jobTitle}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-medium">
                            {format(new Date(interview.scheduled_at), 'EEEE, MMMM dd, yyyy')}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(interview.scheduled_at), 'HH:mm')}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-medium">{interview.duration_min} minutes</div>
                          <div className="text-sm text-muted-foreground">Duration</div>
                        </div>
                      </div>

                      {interview.location && (
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium break-all">{interview.location}</div>
                            <div className="text-sm text-muted-foreground">Location</div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Stage</h4>
                      <Badge variant="secondary" className="capitalize">
                        {interview.stage.replace('_', ' ')}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Interviewers ({interviewers.length})</h4>
                      <div className="space-y-2">
                        {interviewers.map((interviewer, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-secondary/50 rounded-md">
                            <div>
                              <div className="font-medium text-sm">{interviewer.name}</div>
                              <div className="text-xs text-muted-foreground">{interviewer.title}</div>
                            </div>
                            <Badge
                              variant="secondary"
                              className={
                                interviewer.role === 'lead'
                                  ? 'bg-blue-500/20 text-blue-500 border-blue-500/50'
                                  : interviewer.role === 'hm'
                                  ? 'bg-green-500/20 text-green-500 border-green-500/50'
                                  : 'bg-purple-500/20 text-purple-500 border-purple-500/50'
                              }
                            >
                              {interviewer.role === 'hm' ? 'Hiring Manager' : interviewer.role}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {interview.notes && (
                      <div>
                        <h4 className="font-semibold mb-2">Notes</h4>
                        <p className="text-sm text-muted-foreground">{interview.notes}</p>
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select an interview to view details
              </div>
            )}
          </div>
        </div>
      </div>

      <ScheduleInterviewWizard
        open={wizardOpen}
        onOpenChange={setWizardOpen}
        jobs={mockJobs}
        candidates={mockCandidates}
        employees={mockEmployees}
        applications={mockApplications}
        onSave={handleScheduleInterview}
      />
    </div>
  );
};

export default Interviews;
