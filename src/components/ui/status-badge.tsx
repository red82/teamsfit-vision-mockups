import { cn } from '@/lib/utils';
import { CandidateStatus } from '@/types';

interface StatusBadgeProps {
  status: CandidateStatus;
}

const statusConfig = {
  new: { label: 'New', className: 'bg-status-new/20 text-status-new border-status-new/50' },
  screening: { label: 'Screening', className: 'bg-status-screening/20 text-status-screening border-status-screening/50' },
  interview: { label: 'Interview', className: 'bg-status-interview/20 text-status-interview border-status-interview/50' },
  offer: { label: 'Offer', className: 'bg-status-offer/20 text-status-offer border-status-offer/50' },
  rejected: { label: 'Rejected', className: 'bg-status-rejected/20 text-status-rejected border-status-rejected/50' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
      config.className
    )}>
      {config.label}
    </span>
  );
}
