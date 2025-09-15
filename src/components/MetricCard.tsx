import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value?: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  variant: "success" | "warning" | "danger" | "info" | "primary";
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  headingOverride?: string;
  headingClassName?: string;
}

export const MetricCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant,
  trend,
  className,
  headingOverride,
  headingClassName,
  outlined,
}: MetricCardProps & { outlined?: boolean }) => {
  const variantClasses = {
    success: "metric-card-success",
    warning: "metric-card-warning",
    danger: "metric-card-danger",
    info: "metric-card-info",
    primary: "metric-card-primary",
  };

  const textVariantClasses: Record<string, string> = {
    success: "text-success-foreground",
    warning: "text-warning-foreground",
    danger: "text-danger-foreground",
    info: "text-info-foreground",
    primary: "text-primary-foreground",
  };

  return (
    <Card
      className={cn(
        "metric-card animate-card-enter interactive-hover",
        outlined ? cn("bg-white border border-border", textVariantClasses[variant]) : variantClasses[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {headingOverride ? (
            <h3 className={cn("text-lg font-semibold text-foreground", headingClassName)}>
              {headingOverride}
            </h3>
          ) : (
            <>
              <h3 className="text-sm font-medium opacity-90 mb-3">{title}</h3>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold tracking-tight">{value}</span>
                {trend && (
                  <span
                    className={cn(
                      "text-sm font-medium px-2 py-1 rounded-full transition-all duration-300",
                      trend.isPositive
                        ? "text-success-light bg-success/10"
                        : "text-danger-light bg-danger/10"
                    )}
                  >
                    {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-sm opacity-80 mt-2 leading-relaxed">{subtitle}</p>
              )}
            </>
          )}
        </div>
        {Icon && (
          <div className="p-3 rounded-xl bg-black/10 animate-float">
            <Icon className="h-7 w-7" />
          </div>
        )}
      </div>
    </Card>
  );
};
