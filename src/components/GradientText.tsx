import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span className={cn(
      'bg-gradient-primary bg-clip-text text-transparent font-bold',
      className
    )}>
      {children}
    </span>
  );
}
