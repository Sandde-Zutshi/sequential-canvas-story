import { LucideIcon } from "lucide-react";
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
  outlined?: boolean;
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
  } as const;

  const outlinedTextClasses: Record<string, string> = {
    success: "text-[hsl(var(--success))]",
    warning: "text-[hsl(var(--warning))]",
    danger: "text-[hsl(var(--danger))]",
    info: "text-[hsl(var(--info))]",
    primary: "text-[hsl(var(--primary))]",
  };

  const outlinedColor = `hsl(var(--${variant}))`;

  return (
    <Card
      className={cn(
        "metric-card animate-card-enter interactive-hover relative",
        outlined ? "bg-white border border-border" : variantClasses[variant],
        className
      )}
    >
      {/* Top-right icon */}
      {Icon && (
        <div className="absolute top-4 right-4 p-3 rounded-xl bg-black/10 animate-float">
          <Icon className="h-7 w-7" />
        </div>
      )}

      <div className="flex flex-col items-center gap-4" style={outlined ? { color: outlinedColor } : undefined}>
        <h3 className={cn("text-xl font-semibold text-center", outlined ? outlinedTextClasses[variant] : "text-foreground")}>{title}</h3>

        <div className="flex items-center justify-center">
          <span className={cn("text-3xl md:text-4xl font-bold tracking-tight text-center", outlined ? outlinedTextClasses[variant] : undefined)}>{value}</span>
        </div>

        {subtitle && subtitle.toString().trim().endsWith('%') ? (
          <div className="mt-2 text-center">
            <span
              className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-base md:text-lg font-semibold",
                // Non-outlined cards: red pill with white text (match IssueStatCard red box)
                !outlined ? "bg-[hsl(var(--danger))] text-white" : "bg-white",
                // For outlined, set the text color to variant color (danger -> red)
                outlined ? outlinedTextClasses[variant] : undefined
              )}
            >
              {subtitle}
            </span>
          </div>
        ) : subtitle ? (
          <p className={cn("text-sm opacity-80 mt-2 leading-relaxed", outlined ? outlinedTextClasses[variant] : undefined)}>{subtitle}</p>
        ) : null}
      </div>
    </Card>
  );
};
