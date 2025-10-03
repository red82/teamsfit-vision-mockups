interface MetricCardProps {
  title: string;
  metrics: { label: string; value: string | number }[];
}

export function MetricCard({ title, metrics }: MetricCardProps) {
  return (
    <div className="relative bg-card border border-primary/30 rounded-2xl p-6 overflow-hidden group hover:border-primary/50 transition-all">
      <div className="absolute inset-0 bg-gradient-primary opacity-5 group-hover:opacity-10 transition-opacity" />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
        <ul className="space-y-3">
          {metrics.map((m) => (
            <li key={m.label} className="flex justify-between items-center">
              <span className="text-muted-foreground">{m.label}</span>
              <span className="font-semibold text-xl text-foreground">{m.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
