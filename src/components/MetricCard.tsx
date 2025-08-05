import { Card } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  variant?: 'default' | 'primary';
  target?: string;
}

export const MetricCard = ({ title, value, subtitle, variant = 'default', target }: MetricCardProps) => {
  return (
    <Card className={`p-6 ${variant === 'primary' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>
      <div className="space-y-2">
        <h3 className={`font-heading font-medium text-sm ${
          variant === 'primary' ? 'text-primary-foreground/80' : 'text-muted-foreground'
        }`}>
          {title}
        </h3>
        <p className={`font-heading font-bold text-2xl ${
          variant === 'primary' ? 'text-primary-foreground' : 'text-foreground'
        }`}>
          {value}
        </p>
        {subtitle && (
          <p className={`font-body text-sm ${
            variant === 'primary' ? 'text-primary-foreground/70' : 'text-muted-foreground'
          }`}>
            {subtitle}
          </p>
        )}
        {target && (
          <p className={`font-body text-xs ${
            variant === 'primary' ? 'text-primary-foreground/60' : 'text-muted-foreground'
          }`}>
            {target}
          </p>
        )}
      </div>
    </Card>
  );
};