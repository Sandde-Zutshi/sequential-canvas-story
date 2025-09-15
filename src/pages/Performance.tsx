import { MetricCard } from "@/components/MetricCard";
import { DataTable } from "@/components/DataTable";
import { IssuesChart } from "@/components/IssuesChart";
import { Target, Trophy, ArrowDownCircle, Zap, Clock } from "lucide-react";

interface PerformanceProps {
  activeModule?: string;
}


// Sample performance data
const performanceTableData = [
  {
    id: 1,
    issueType: "Barren land to be greened",
    agency: "Urban Greening Dept",
    turnAroundTime: "6.2 days",
    fastestCity: "Noida",
    slowestCity: "Ghaziabad",
    avgTimeTaken: "5.1 days",
  },
  {
    id: 2,
    issueType: "Broken Footpath / Divider",
    agency: "Public Works Dept",
    turnAroundTime: "4.8 days",
    fastestCity: "Delhi",
    slowestCity: "Faridabad",
    avgTimeTaken: "4.2 days",
  },
  {
    id: 3,
    issueType: "Burning of garbage, plastic, leaves, branches etc.",
    agency: "Sanitation Department",
    turnAroundTime: "2.1 days",
    fastestCity: "Gurgaon",
    slowestCity: "Manesar",
    avgTimeTaken: "2.7 days",
  },
  {
    id: 4,
    issueType: "Construction/ demolition activity without safeguards",
    agency: "Environment Control Board",
    turnAroundTime: "3.9 days",
    fastestCity: "Noida",
    slowestCity: "Greater Noida",
    avgTimeTaken: "4.0 days",
  },
  {
    id: 5,
    issueType: "Encroachment-Building Materials Dumped on Road",
    agency: "Traffic Police",
    turnAroundTime: "3.2 days",
    fastestCity: "Delhi",
    slowestCity: "Ghaziabad",
    avgTimeTaken: "3.6 days",
  },
  {
    id: 6,
    issueType: "Garbage dumped on public land",
    agency: "Municipal Corporation",
    turnAroundTime: "2.8 days",
    fastestCity: "Noida",
    slowestCity: "Faridabad",
    avgTimeTaken: "3.1 days",
  },
  {
    id: 7,
    issueType: "Malba, bricks, bori, etc dumped on public land",
    agency: "Municipal Corporation",
    turnAroundTime: "3.4 days",
    fastestCity: "Gurgaon",
    slowestCity: "Manesar",
    avgTimeTaken: "3.7 days",
  },
  {
    id: 8,
    issueType: "Overflowing Dustbins",
    agency: "Sanitation Department",
    turnAroundTime: "1.6 days",
    fastestCity: "Noida",
    slowestCity: "Ghaziabad",
    avgTimeTaken: "2.0 days",
  },
  {
    id: 9,
    issueType: "Pothole",
    agency: "Public Works Dept",
    turnAroundTime: "4.6 days",
    fastestCity: "Delhi",
    slowestCity: "Faridabad",
    avgTimeTaken: "4.1 days",
  },
  {
    id: 10,
    issueType: "Sand piled on roadsides + Mud/slit on roadside",
    agency: "Public Works Dept",
    turnAroundTime: "3.5 days",
    fastestCity: "Noida",
    slowestCity: "Greater Noida",
    avgTimeTaken: "3.9 days",
  },
  {
    id: 11,
    issueType: "Unpaved Road",
    agency: "Public Works Dept",
    turnAroundTime: "7.8 days",
    fastestCity: "Gurgaon",
    slowestCity: "Manesar",
    avgTimeTaken: "6.2 days",
  },
  {
    id: 12,
    issueType: "Unsurfaced Parking Lots",
    agency: "Urban Development Authority",
    turnAroundTime: "5.1 days",
    fastestCity: "Delhi",
    slowestCity: "Ghaziabad",
    avgTimeTaken: "4.7 days",
  },
];

const Performance = ({ activeModule }: PerformanceProps) => {
  const performanceColumns = [
    {
      key: "srNo",
      label: "Sr.No.",
      headerClassName: "w-14 text-center",
      cellClassName: "w-14 text-center",
      render: (_: any, row: any) => (performanceTableData.findIndex(item => item.id === row.id) + 1)
    },
    {
      key: "issueType",
      label: "Issue Type",
      headerClassName: "min-w-[16rem] w-[22rem]",
      cellClassName: "min-w-[16rem] w-[22rem] whitespace-normal",
    },
    {
      key: "agency",
      label: "Agency",
      headerClassName: "w-44",
      cellClassName: "w-44",
    },
    { key: "fastestCity", label: "Fastest City", headerClassName: "w-40", cellClassName: "w-40" },
    { key: "slowestCity", label: "Slowest City", headerClassName: "w-40", cellClassName: "w-40" },
    { key: "avgTimeTaken", label: "Avg. time taken", headerClassName: "w-44", cellClassName: "w-44" },
  ];

  if (activeModule === "MRS") {
    const cityPercents = [
      { city: "Baharudgarh", percent: 12 },
      { city: "Delhi", percent: 38 },
      { city: "Faridabad", percent: 19 },
      { city: "Ghaziabad", percent: 83 },
      { city: "Greater Noida", percent: 29 },
      { city: "Gurgaon", percent: 56 },
      { city: "Manesar", percent: 5 },
      { city: "Noida", percent: 64 },
    ];

    const best = cityPercents.reduce((a, b) => (b.percent > a.percent ? b : a));
    const lagging = cityPercents.reduce((a, b) => (b.percent < a.percent ? b : a));
    const overall = 38; // Overall Avg

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Overall (% malba collected/target)"
            value={`${overall}%`}
            variant="info"
          />
          <MetricCard
            title="Best city"
            headingOverride={`Best city ${best.city} ${best.percent}%`}
            variant="success"
          />
          <MetricCard
            title="Lagging city"
            headingOverride={`Lagging city ${lagging.city} ${lagging.percent}%`}
            variant="danger"
          />
        </div>

        <IssuesChart
          title="Active SCC"
          data={[
            { name: "Baharudgarh", raised: 100 },
            { name: "Delhi", raised: 81 },
            { name: "Faridabad", raised: 38 },
            { name: "Ghaziabad", raised: 75 },
            { name: "Greater Noida", raised: 100 },
            { name: "Gurgaon", raised: 23 },
            { name: "Manesar", raised: 100 },
            { name: "Noida", raised: 100 },
          ]}
          type="bar"
          showTarget={false}
          valueSuffix="%"
          showLegend={false}
        />

        <IssuesChart
          title="Malba (collected/target)"
          data={cityPercents.map(c => ({ name: c.city, raised: c.percent }))}
          type="bar"
          showTarget={false}
          valueSuffix="%"
          showLegend={false}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="City with Fastest Issue Resolution"
          value="Noida"
          subtitle="Noida: 1.8 days avg"
          variant="success"
        />
        <MetricCard
          title="City with Slowest Issue Resolution"
          value="Ghaziabad"
          subtitle="Ghaziabad: 5.2 days avg"
          variant="danger"
        />
        <MetricCard
          title="Average Issue Resolution Time by City"
          value="3.4 days"
          subtitle="Avg. Time across all cities"
          variant="info"
        />
      </div>


      <DataTable
        title="Issue Resolution Performance Details"
        columns={performanceColumns}
        data={performanceTableData}
        eyeInCity={true}
        eyeColumnKey="issueType"
        singleExpand={true}
      />
    </div>
  );
};

export default Performance;
