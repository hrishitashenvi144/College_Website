import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import GlowCard from "@/components/ui/GlowCard";

const stats = [
  { label: "Students", value: 26000, suffix: "+" },
  { label: "Faculty", value: 1800, suffix: "+" },
  { label: "Research Papers", value: 4200, suffix: "+" },
  { label: "Years of Excellence", value: 14, suffix: "+" },
];

const StatItem = ({ label, value, suffix }: { label: string; value: number; suffix: string }) => {
  const { count, ref } = useCounterAnimation(value);
  return (
    <GlowCard className="text-center">
      <div ref={ref} className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-muted-foreground text-sm uppercase tracking-wider">{label}</div>
    </GlowCard>
  );
};

const StatsCounter = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
    {stats.map((s) => (
      <StatItem key={s.label} {...s} />
    ))}
  </div>
);

export default StatsCounter;
