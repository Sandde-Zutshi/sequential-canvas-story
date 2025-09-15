import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChartDataPoint {
  name: string;
  raised?: number;
  resolved?: number;
  target?: number;
}

interface IssuesChartProps {
  title: string;
  data: any[];
  type?: "bar" | "composed" | "stacked-line";
  showTarget?: boolean;
  showActual?: boolean;
  valueSuffix?: string;
  showLegend?: boolean;
  showPercentOfTarget?: boolean;
  getBarFill?: (entry: any, index: number) => string;
}

export const IssuesChart = ({ title, data, type = "bar", showTarget = true, showActual = true, valueSuffix, showLegend = true, showPercentOfTarget = false, getBarFill }: IssuesChartProps) => {
  const isMobile = useIsMobile();
  const xTickProps = isMobile ? { angle: -55 as const, textAnchor: "end" as const } : { angle: -35 as const, textAnchor: "end" as const };
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      let pct: number | undefined;
      if (type === "stacked-line") {
        const num = payload.find((p: any) => p.dataKey === "actualResolved")?.value as number | undefined;
        const den = payload.find((p: any) => p.dataKey === "actualRaised")?.payload?.actualRaised as number | undefined;
        if (typeof num === "number" && typeof den === "number" && den > 0) pct = Math.round((num / den) * 100);
      } else {
        const targetEntry = payload.find((p: any) => p.dataKey === 'target');
        const actualEntry = payload.find((p: any) => p.dataKey === 'raised');
        const targetVal = targetEntry?.value as number | undefined;
        const actualVal = actualEntry?.value as number | undefined;
        pct = showPercentOfTarget && showTarget && showActual && typeof targetVal === 'number' && targetVal > 0 && typeof actualVal === 'number'
          ? Math.round((actualVal / targetVal) * 100)
          : undefined;
      }

      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value.toLocaleString()}{valueSuffix ?? ""}
              {pct != null && entry.dataKey === 'actualResolved' ? ` (${pct}%)` : ""}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const BarValueLabel = (props: any) => {
    const { x, y, width, value } = props;
    if (value == null) return null;
    const posX = (x || 0) + (width || 0) / 2;
    const posY = (y || 0) - 8;
    return (
      <text
        x={posX}
        y={posY}
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
        fill="hsl(var(--foreground))"
      >
        {Number(value).toLocaleString()}{valueSuffix ?? ""}
      </text>
    );
  };


  if (type === "composed") {
    return (
    <Card className="chart-container animate-card-enter">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={isMobile ? 360 : 460}>
            <ComposedChart data={data} margin={{ top: (isMobile ? 56 : 40), right: (isMobile ? 16 : 30), left: (isMobile ? 12 : 20), bottom: (isMobile ? 64 : 56) }} barCategoryGap={isMobile ? '35%' : '20%'} barGap={isMobile ? 2 : 4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                fontWeight={500}
                interval={0}
                tick={xTickProps}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                fontWeight={500}
                domain={[0, 'dataMax + 10']}
                tickCount={6}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: isMobile ? 12 : 14 }} verticalAlign="bottom" align="center" />
              <Bar
                dataKey="raised"
                name="Issues Raised"
                fill="hsl(var(--chart-2))"
                radius={[6, 6, 0, 0]}
                barSize={isMobile ? 20 : 28}
                isAnimationActive={!isMobile}
              >
                {getBarFill && data.map((entry, index) => (
                  <Cell key={`cell-composed-${index}`} fill={getBarFill(entry, index)} />
                ))}
                <LabelList dataKey="raised" position="top" content={<BarValueLabel />} />
              </Bar>
              <Line
                type="monotone"
                dataKey="resolved"
                name="Issues Resolved"
                stroke="hsl(var(--chart-3))"
                strokeWidth={4}
                dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 3, r: 8 }}
                activeDot={{ r: 10, stroke: "hsl(var(--chart-3))", strokeWidth: 2 }}
                isAnimationActive={!isMobile}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }

  if (type === "stacked-line") {
    return (
      <Card className="chart-container animate-card-enter">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={isMobile ? 360 : 460}>
            <ComposedChart data={data} margin={{ top: (isMobile ? 56 : 40), right: (isMobile ? 16 : 30), left: (isMobile ? 12 : 20), bottom: (isMobile ? 64 : 56) }} barCategoryGap={isMobile ? '35%' : '20%'} barGap={isMobile ? 2 : 4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} fontWeight={500} interval={0} tick={xTickProps} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} fontWeight={500} domain={[0, 'dataMax + 10']} tickCount={6} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: isMobile ? 12 : 14 }} verticalAlign="bottom" align="center" />
              <Bar dataKey="actualResolved" name="Actual Resolved" fill="hsl(var(--chart-2))" stackId="a" radius={[6, 6, 0, 0]} barSize={isMobile ? 20 : 28} isAnimationActive={!isMobile}>
                <LabelList dataKey="actualResolved" position="top" content={<BarValueLabel />} />
              </Bar>
              <Bar dataKey="targetResolved" name="Target Resolved" fill="hsl(var(--chart-5))" stackId="a" radius={[6, 6, 0, 0]} barSize={isMobile ? 20 : 28} isAnimationActive={!isMobile} />
              <Line type="monotone" dataKey="actualRaised" name="Actual Raised" stroke="#000000" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} isAnimationActive={!isMobile} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }

  if (type === 'stacked-vertical') {
    // Build transformed data: actual and remaining (target - actual)
    const transformed = data.map((d: any) => ({
      ...d,
      actualResolved: Number(d.actualResolved) || 0,
      remaining: Math.max((Number(d.targetResolved) || 0) - (Number(d.actualResolved) || 0), 0),
      targetResolved: Number(d.targetResolved) || 0,
    }));

    const SegmentLabel = (props: any) => {
      const { x, y, width, height, value, payload } = props;
      if (value == null) return null;
      const target = payload.targetResolved || 0;
      const pct = target > 0 ? Math.round((value / target) * 100) : 0;
      const posX = (x || 0) + (width || 0) / 2;
      const posY = (y || 0) + (height || 0) / 2 + 4; // center vertically
      return (
        <text x={posX} y={posY} textAnchor="middle" fontSize={12} fontWeight={700} fill={value === payload.remaining ? 'hsl(var(--danger))' : '#fff'}>
          {pct}%
        </text>
      );
    };

    const VerticalTooltip = ({ active, payload, label }: any) => {
      if (!active || !payload || !payload.length) return null;
      const p = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          <p className="text-sm" style={{ color: 'hsl(var(--chart-2))' }}>
            Actual Resolved: {(p.actualResolved || 0).toLocaleString()}
          </p>
          <p className="text-sm" style={{ color: 'hsl(var(--danger))' }}>
            Remaining to Target: {(p.remaining || 0).toLocaleString()}
          </p>
          <p className="text-sm mt-1">Target Resolved: {(p.targetResolved || 0).toLocaleString()}</p>
        </div>
      );
    };

    return (
      <Card className="chart-container animate-card-enter">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={isMobile ? 360 : 460}>
            <ComposedChart data={transformed} margin={{ top: (isMobile ? 56 : 40), right: (isMobile ? 16 : 30), left: (isMobile ? 12 : 20), bottom: (isMobile ? 64 : 56) }} barCategoryGap={isMobile ? '35%' : '20%'} barGap={isMobile ? 2 : 4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} fontWeight={500} interval={0} tick={xTickProps} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} fontWeight={500} domain={[0, 'dataMax + 10']} tickCount={6} />
              <Tooltip content={<VerticalTooltip />} />

              {/* actualResolved segment */}
              <Bar dataKey="actualResolved" name="Actual Resolved" fill="hsl(var(--chart-2))" stackId="a" radius={[6, 6, 0, 0]} barSize={isMobile ? 20 : 28} isAnimationActive={!isMobile}>
                <LabelList dataKey="actualResolved" position="inside" content={<SegmentLabel />} />
              </Bar>

              {/* remaining segment */}
              <Bar dataKey="remaining" name="Remaining" fill="hsl(var(--danger))" stackId="a" radius={[6, 6, 0, 0]} barSize={isMobile ? 20 : 28} isAnimationActive={!isMobile}>
                <LabelList dataKey="remaining" position="inside" content={<SegmentLabel />} />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="chart-container animate-card-enter">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={isMobile ? 360 : 460}>
          <ComposedChart data={data} margin={{ top: (isMobile ? 56 : 40), right: (isMobile ? 16 : 30), left: (isMobile ? 12 : 20), bottom: (isMobile ? 64 : 56) }} barCategoryGap={isMobile ? '35%' : '20%'} barGap={isMobile ? 2 : 4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              fontWeight={500}
              interval={0}
              tick={xTickProps}
            />
            <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                fontWeight={500}
                domain={[0, 'dataMax + 10']}
                tickCount={6}
              />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && (
              <Legend wrapperStyle={{ fontSize: isMobile ? 12 : 14 }} verticalAlign="bottom" align="center" />
            )}
            {showTarget && (
              <Bar
                dataKey="target"
                name="Target"
                fill="hsl(var(--chart-3))"
                radius={[6, 6, 0, 0]}
                opacity={0.8}
                barSize={isMobile ? 20 : 28}
                isAnimationActive={!isMobile}
              >
                <LabelList dataKey="target" position="top" content={<BarValueLabel />} />
              </Bar>
            )}
            {showActual && (
              <Bar
                dataKey="raised"
                name="Actual"
                fill="hsl(var(--chart-2))"
                radius={[6, 6, 0, 0]}
                barSize={isMobile ? 20 : 28}
                isAnimationActive={!isMobile}
              >
                {getBarFill && data.map((entry, index) => (
                  <Cell key={`cell-default-${index}`} fill={getBarFill(entry, index)} />
                ))}
                <LabelList dataKey="raised" position="top" content={<BarValueLabel />} />
              </Bar>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
