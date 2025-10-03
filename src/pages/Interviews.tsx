import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { GradientText } from '@/components/GradientText';
import { mockInterviews } from '@/mocks/data';
import { Calendar, Filter } from 'lucide-react';

const Interviews = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredInterviews = filter === 'all' 
    ? mockInterviews 
    : mockInterviews.filter(interview => interview.status === filter);

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

          <Button className="bg-gradient-primary hover:opacity-90">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Interview
          </Button>
        </div>

        {/* Interviews Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>Candidate</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Interviewer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInterviews.map((interview) => (
                <TableRow key={interview.id} className="border-border hover:bg-secondary/50">
                  <TableCell className="font-medium">{interview.candidateName}</TableCell>
                  <TableCell className="text-muted-foreground">{interview.position}</TableCell>
                  <TableCell>{interview.date}</TableCell>
                  <TableCell>{interview.time}</TableCell>
                  <TableCell>{interview.interviewer}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{interview.type}</Badge>
                  </TableCell>
                  <TableCell>
                    {interview.status === 'scheduled' ? (
                      <Badge className="bg-status-interview/20 text-status-interview border-status-interview/50">
                        Scheduled
                      </Badge>
                    ) : interview.status === 'completed' ? (
                      <Badge className="bg-status-offer/20 text-status-offer border-status-offer/50">
                        Completed
                      </Badge>
                    ) : (
                      <Badge className="bg-status-rejected/20 text-status-rejected border-status-rejected/50">
                        Cancelled
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Interviews;
