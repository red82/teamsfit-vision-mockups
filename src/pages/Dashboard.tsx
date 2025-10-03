import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { GradientText } from '@/components/GradientText';
import { MetricCard } from '@/components/ui/metric-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { mockCandidates, mockJobs, mockMetrics } from '@/mocks/data';
import { UserPlus, Briefcase } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('candidates');

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">
            <GradientText>TeamsFit</GradientText>
          </h1>
          <p className="text-muted-foreground text-lg">Manage your hiring pipeline and team</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="candidates" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
              Candidates
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
              Jobs
            </TabsTrigger>
          </TabsList>

          {/* Candidates Tab */}
          <TabsContent value="candidates" className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MetricCard 
                title="Candidates Metrics" 
                metrics={[
                  { label: "Active", value: mockMetrics.candidatesActive },
                  { label: "Passive", value: mockMetrics.candidatesPassive }
                ]} 
              />
              <MetricCard 
                title="Recruitment Timing" 
                metrics={[
                  { label: "Time to Source", value: mockMetrics.timeToSource },
                  { label: "Time to Recruit", value: mockMetrics.timeToRecruit },
                  { label: "Time to Start", value: mockMetrics.timeToStart }
                ]} 
              />
            </div>

            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Candidates</h2>
              <Button className="bg-gradient-primary hover:opacity-90">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Candidate
              </Button>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCandidates.map((candidate) => (
                    <TableRow key={candidate.id} className="border-border hover:bg-secondary/50">
                      <TableCell className="font-medium">{candidate.name}</TableCell>
                      <TableCell className="text-muted-foreground">{candidate.email}</TableCell>
                      <TableCell>{candidate.position}</TableCell>
                      <TableCell className="text-muted-foreground">{candidate.appliedDate}</TableCell>
                      <TableCell>
                        <StatusBadge status={candidate.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            {/* Jobs Metrics */}
            <MetricCard 
              title="Jobs Metrics" 
              metrics={[
                { label: "Open", value: mockMetrics.jobsOpen },
                { label: "In Progress", value: mockMetrics.jobsInProgress },
                { label: "Closed", value: mockMetrics.jobsClosed }
              ]} 
            />

            {/* Jobs Table */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Active Jobs</h2>
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Add Job
                </Button>
              </div>

              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead>Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Employment Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockJobs.map((job) => (
                      <TableRow key={job.id} className="border-border hover:bg-secondary/50">
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell className="text-muted-foreground">{job.location}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{job.employmentType}</Badge>
                        </TableCell>
                        <TableCell>
                          {job.active ? (
                            <Badge className="bg-status-offer/20 text-status-offer border-status-offer/50">Active</Badge>
                          ) : (
                            <Badge variant="secondary">Inactive</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{job.createdAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
