interface MetricCardProps {
  title: string;
  value: string | number;
}

export function MetricCard({ title, value }: MetricCardProps) {
  return (
    <div className="relative bg-card border border-border rounded-xl p-6 overflow-hidden group hover:border-primary/50 transition-all">
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity" />
      <div className="relative z-10">
        <h3 className="text-sm text-muted-foreground mb-2">{title}</h3>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}
