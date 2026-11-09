
import { useState, useEffect, useCallback } from "react";
import EmailTaskForm from "../components/EmailTaskForm";
import Jobs from "../components/Jobs";
import DashboardNavbar from "../components/DashboardNavbar";
import TaskSelector from "../components/TaskSelector";
import DocumentTaskForm from "../components/DocumentTaskForm";
import PresentationTaskForm from "../components/PresentationTaskForm";

import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  Code2,
  FileText,
  Home,
  Laptop,
  Mail,
  Presentation,
  Rocket,
  Settings,
  Sparkles,
  Timer,
  UserRound,
  Zap,
  Plus,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Backend API
const API_URL = "http://localhost:8081/api/jobs";

// Static demonstration data
const stats = [
  { label: "Total Tasks", value: "124", change: "12%", positive: true, icon: CheckCircle2, color: "violet" },
  { label: "Completed", value: "102", change: "15%", positive: true, icon: Zap, color: "blue" },
  { label: "Running", value: "12", change: "2%", positive: true, icon: Clock3, color: "green" },
  { label: "Failed", value: "10", change: "1%", positive: false, icon: CircleAlert, color: "orange" },
];

const taskDistribution = [
  { name: "Completed", value: 102, color: "#8050F5" },
  { name: "Running", value: 12, color: "#25C878" },
  { name: "Failed", value: 10, color: "#F58B24" },
];

const performanceData = [
  { day: "Mon", completed: 57, failed: 5 },
  { day: "Tue", completed: 68, failed: 8 },
  { day: "Wed", completed: 74, failed: 4 },
  { day: "Thu", completed: 87, failed: 9 },
  { day: "Fri", completed: 73, failed: 6 },
  { day: "Sat", completed: 89, failed: 9 },
  { day: "Sun", completed: 78, failed: 7 },
];

const executionData = [
  { time: "1", value: 18 },
  { time: "2", value: 25 },
  { time: "3", value: 22 },
  { time: "4", value: 34 },
  { time: "5", value: 43 },
  { time: "6", value: 31 },
  { time: "7", value: 39 },
  { time: "8", value: 29 },
  { time: "9", value: 42 },
  { time: "10", value: 47 },
  { time: "11", value: 66 },
  { time: "12", value: 51 },
  { time: "13", value: 45 },
  { time: "14", value: 72 },
  { time: "15", value: 53 },
  { time: "16", value: 64 },
  { time: "17", value: 55 },
  { time: "18", value: 62 },
];

const recentTasks = [
  { title: "Write an email for the client", status: "Completed", time: "2m ago", icon: Mail, color: "text-blue-400" },
  { title: "Create presentation on AI", status: "Completed", time: "5m ago", icon: Presentation, color: "text-orange-400" },
  { title: "Analyze dataset", status: "Running", time: "8m ago", icon: Code2, color: "text-blue-400" },
  { title: "Generate report", status: "Failed", time: "12m ago", icon: FileText, color: "text-blue-400" },
  { title: "Plan next sprint", status: "Completed", time: "15m ago", icon: Check, color: "text-green-400" },
];

function Sidebar() {
  const menuItems = [
    { name: "Overview", icon: Home, active: true },
    { name: "Profile", icon: UserRound },
    { name: "Settings", icon: Settings },
    { name: "Mail", icon: Mail },
  ];

  return (
    <aside className="w-[275px] shrink-0 min-h-screen flex flex-col border-r border-[#292D49] bg-[#111426]">
      <div className="h-[130px] flex items-center px-7 gap-3 border-b border-[#292D49]">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-violet-950/40">
          <span className="text-4xl font-black italic text-white">R</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">RunForge</h1>
          <p className="text-[10px] text-slate-400 mt-1">
            Automate · Execute · Achieve
          </p>
        </div>
      </div>

      <nav className="p-3 pt-7 space-y-2">
        {menuItems.map(({ name, icon: Icon, active }) => (
          <button
            key={name}
            className={`w-full flex items-center gap-5 px-5 py-4 rounded-xl text-left transition ${
              active
                ? "bg-gradient-to-r from-violet-700/80 to-indigo-700/30 border border-violet-500/40 text-white shadow-lg shadow-violet-950/20"
                : "text-slate-300 hover:bg-white/5"
            }`}
          >
            <Icon size={21} />
            <span className="text-sm font-medium">{name}</span>
          </button>
        ))}
      </nav>

      <div className="mx-7 my-5 border-t border-[#30334C]" />

      <div className="px-8 flex items-center gap-3 text-slate-400 text-xs">
        <Sparkles size={17} className="text-violet-400" />
        More Features Coming Soon...
      </div>

      <div className="mt-auto p-5">
        <div className="rounded-2xl border border-violet-400/20 bg-gradient-to-br from-[#242044] to-[#17192D] p-5 text-center">
          <Rocket size={65} className="mx-auto text-violet-400 mb-4" />
          <p className="font-semibold text-sm">Build. Automate. Grow.</p>
          <p className="text-xs text-slate-400 mt-2">
            With RunForge <span className="text-violet-400">♥</span>
          </p>
        </div>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="h-[73px] flex items-center justify-end gap-5 px-7 border-b border-[#24283E]">
      <button className="flex items-center gap-2 text-sm text-slate-300">
        <span className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_12px_#4ade80]" />
        Local
        <ChevronDown size={17} />
      </button>

      <div className="h-8 border-l border-[#30334C]" />

      <button className="w-10 h-10 rounded-full bg-[#252641] border border-violet-400/20 flex items-center justify-center font-semibold text-sm">
        PB
      </button>
    </header>
  );
}

function StatCard({ item }) {
  const Icon = item.icon;

  const themes = {
    violet: "bg-violet-600 text-white shadow-violet-900/40",
    blue: "bg-blue-600 text-white shadow-blue-900/40",
    green: "bg-green-700 text-green-200 shadow-green-900/40",
    orange: "bg-orange-600 text-white shadow-orange-900/40",
  };

  const lineThemes = {
    violet: "#8957FF",
    blue: "#3985FF",
    green: "#38C879",
    orange: "#F59A35",
  };

  return (
    <div className="rounded-2xl border border-[#292D49] bg-gradient-to-br from-[#1E2239] to-[#191C30] p-4 xl:p-5 flex items-center gap-4 min-w-0">
      <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center shadow-lg ${themes[item.color]}`}>
        <Icon size={24} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm text-slate-300">{item.label}</p>
        <p className="text-3xl font-bold mt-1">{item.value}</p>
        <p className={`text-sm font-semibold mt-1 ${item.positive ? "text-green-400" : "text-red-400"}`}>
          {item.positive ? (
            <ArrowUpRight className="inline" size={17} />
          ) : (
            <ArrowDownRight className="inline" size={17} />
          )}
          {item.change}
        </p>
      </div>

      <svg viewBox="0 0 80 45" className="w-16 h-12 shrink-0 self-end">
        <defs>
          <linearGradient id={`spark-${item.color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineThemes[item.color]} stopOpacity=".3" />
            <stop offset="100%" stopColor={lineThemes[item.color]} stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d="M2 38 L15 30 L24 32 L35 19 L45 24 L57 10 L67 15 L78 3 L78 45 L2 45 Z"
          fill={`url(#spark-${item.color})`}
        />

        <path
          d="M2 38 L15 30 L24 32 L35 19 L45 24 L57 10 L67 15 L78 3"
          fill="none"
          stroke={lineThemes[item.color]}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function Panel({ title, icon: Icon, children, action }) {
  return (
    <section className="rounded-2xl border border-[#292D49] bg-gradient-to-br from-[#191D32] to-[#15182B] p-5 min-w-0">
      <div className="flex items-center justify-between gap-3 mb-5">
        <h2 className="flex items-center gap-3 font-semibold text-[15px]">
          <Icon size={21} className="text-violet-400" />
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function TaskOverview() {
  return (
    <Panel
      title="Task Overview"
      icon={BarChart3}
      action={
        <button className="rounded-lg bg-[#252945] border border-[#343858] px-3 py-2 text-xs text-slate-300 flex items-center gap-2">
          Last 7 days <ChevronDown size={14} />
        </button>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-3">
        <div className="relative h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={taskDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={67}
                outerRadius={94}
                paddingAngle={2}
                stroke="none"
              >
                {taskDistribution.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "#20243A",
                  border: "1px solid #414565",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold">124</span>
            <span className="text-xs text-slate-400 mt-1">Total Tasks</span>
          </div>
        </div>

        <div className="space-y-5">
          {taskDistribution.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                <span className="text-slate-300">{item.name}</span>
              </div>
              <span className="font-medium">
                {((item.value / 124) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function PerformanceTrend() {
  return (
    <Panel
      title="Performance Trend"
      icon={Activity}
      action={
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
            Completed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            Failed
          </span>
        </div>
      }
    >
      <div className="h-[235px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData} margin={{ top: 8, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="#30344D" strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: "#A6A9C0", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: "#A6A9C0", fontSize: 11 }} axisLine={false} tickLine={false} />

            <Tooltip
              contentStyle={{
                background: "#20243A",
                border: "1px solid #414565",
                borderRadius: "10px",
              }}
            />

            <Line type="monotone" dataKey="completed" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4, fill: "#8B5CF6", stroke: "#fff", strokeWidth: 1 }} />
            <Line type="monotone" dataKey="failed" stroke="#FF555F" strokeWidth={2.5} dot={{ r: 3, fill: "#FF555F" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

function RecentTasks() {
  const statusStyles = {
    Completed: "bg-green-500/20 text-green-400",
    Running: "bg-blue-500/20 text-blue-400",
    Failed: "bg-red-500/20 text-red-400",
  };

  return (
    <Panel
      title="Recent Tasks"
      icon={BriefcaseBusiness}
      action={
        <button className="text-sm text-blue-400 flex items-center gap-2 hover:text-blue-300">
          View All <ArrowRight size={16} />
        </button>
      }
    >
      <div className="space-y-1">
        {recentTasks.map((task) => {
          const Icon = task.icon;

          return (
            <div key={task.title} className="flex items-center gap-3 py-2.5 border-b border-[#292D49] last:border-0">
              <Icon size={21} className={task.color} />
              <span className="text-xs sm:text-sm flex-1 min-w-0 truncate text-slate-200">
                {task.title}
              </span>
              <span className={`text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${statusStyles[task.status]}`}>
                {task.status}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 w-12 text-right whitespace-nowrap">
                {task.time}
              </span>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function ExecutionTime() {
  const [range, setRange] = useState("24h");
  const ranges = ["1h", "24h", "7d", "30d"];

  return (
    <Panel
      title="Execution Time"
      icon={Timer}
      action={
        <div className="flex gap-1">
          {ranges.map((value) => (
            <button
              key={value}
              onClick={() => setRange(value)}
              className={`rounded-lg border px-2.5 py-1.5 text-xs transition ${
                range === value
                  ? "bg-violet-600 border-violet-400 text-white shadow-lg shadow-violet-900/40"
                  : "bg-[#171A2C] border-[#303550] text-slate-400 hover:text-white"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      }
    >
      <div className="mt-3">
        <p className="text-5xl font-bold tracking-tight">2.4 sec</p>
        <p className="text-sm text-slate-400 mt-3">
          Avg. Execution Time
          <span className="text-green-400 font-semibold ml-3">↓ 18%</span>
        </p>
      </div>

      <div className="h-[125px] mt-5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={executionData}>
            <defs>
              <linearGradient id="executionFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8957FF" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#8957FF" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="value"
              stroke="#925AFF"
              strokeWidth={2.5}
              fill="url(#executionFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-[10px] text-slate-500">Selected period: {range}</p>
    </Panel>
  );
}

export default function Dashboard() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [activeTab, setActiveTab] = useState("Metrics");
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsError, setJobsError] = useState("");
  const [showTaskSelector, setShowTaskSelector] = useState(false);
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [showPresentationForm, setShowPresentationForm] = useState(false);
  // Fetch jobs from Spring Boot backend
  const fetchJobs = useCallback(async () => {
    setJobsLoading(true);
    setJobsError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to fetch jobs from the server.");
      }

      const data = await response.json();

      setJobs(Array.isArray(data) ? data : data ? [data] : []);
    } catch (error) {
      setJobsError(
        error.message || "Unable to connect to RunForge backend."
      );
    } finally {
      setJobsLoading(false);
    }
  }, []);

  // Load jobs when dashboard opens
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="min-h-screen bg-[#0D1020] text-slate-100 flex">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <Topbar />

        <div className="p-5 lg:p-7 space-y-6 max-w-[1800px] mx-auto">
          {/* Dashboard Header */}
          <section className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                RunForge <span className="text-violet-500 italic">Engine</span>
              </h1>

              <p className="text-slate-400 mt-2 text-sm lg:text-base">
                Your task automation engine is running smoothly 🚀
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-3">
                <Laptop size={22} className="text-green-400" />
                <span className="text-sm font-semibold text-green-400">
                  Local connection
                </span>
              </div>

              <button
                onClick={() => setShowTaskSelector(true)}
                className="flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition"
              >
                <Plus size={18} />
                Add Task
              </button>
            </div>

            {/* Functional Dashboard Navigation */}
            <DashboardNavbar
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </section>

          {/* Metrics Page */}
          {activeTab === "Metrics" && (
            <>
              <section className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
                {stats.map((item) => (
                  <StatCard key={item.label} item={item} />
                ))}
              </section>

              <section className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
                <TaskOverview />
                <PerformanceTrend />
              </section>

              <section className="grid grid-cols-1 2xl:grid-cols-[1.15fr_1fr] gap-4">
                <RecentTasks />
                <ExecutionTime />
              </section>
            </>
          )}

          {/* Jobs Page */}
          {activeTab === "Jobs" && (
            <>
              {jobsLoading && (
                <p className="text-sm text-violet-400">
                  Loading jobs from PostgreSQL...
                </p>
              )}

              {jobsError && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                  {jobsError}
                  <button
                    onClick={fetchJobs}
                    className="ml-3 underline"
                  >
                    Retry
                  </button>
                </div>
              )}

              <Jobs jobs={jobs} />
            </>
          )}

          {/* Schedulers Page */}
          {activeTab === "Schedulers" && (
            <section className="rounded-2xl border border-[#292D49] bg-[#191D32] p-8">
              <h2 className="text-xl font-semibold">Schedulers</h2>
              <p className="text-slate-400 mt-2">
                Manage and schedule tasks to execute automatically.
              </p>
              <p className="text-sm text-violet-400 mt-5">
                Scheduler functionality is coming next.
              </p>
            </section>
          )}

          {/* Workers Page */}
          {activeTab === "Workers" && (
            <section className="rounded-2xl border border-[#292D49] bg-[#191D32] p-8">
              <h2 className="text-xl font-semibold">Workers</h2>
              <p className="text-slate-400 mt-2">
                Monitor the workers responsible for processing jobs.
              </p>
              <p className="text-sm text-violet-400 mt-5">
                Worker monitoring is coming next.
              </p>
            </section>
          )}

          <footer className="text-center text-xs text-slate-600 py-2">
            RunForge · Automate · Execute · Achieve
          </footer>
        </div>
      </main>


      {/* Task Selector */}
      {showTaskSelector && (
        <TaskSelector
          onClose={() => setShowTaskSelector(false)}
          onSelect={(taskType) => {
  setShowTaskSelector(false);

  if (taskType === "email") {
    setShowEmailForm(true);
  } else if (taskType === "document") {
    setShowDocumentForm(true);
  } else if (taskType === "presentation") {
    setShowPresentationForm(true);
  }
}}
        />
      )}

      {/* Document Task Form */}
      {showDocumentForm && (
        <DocumentTaskForm
          onClose={() => setShowDocumentForm(false)}
          onTaskCreated={async (job) => {
            console.log("Document task added:", job);

            setJobs((previousJobs) => [
              job,
              ...previousJobs.filter(
                (existingJob) => existingJob.id !== job.id
              ),
            ]);

            setActiveTab("Jobs");
            await fetchJobs();
          }}
        />
      )}

      {/* Email Task Form */}
      {showEmailForm && (
        <EmailTaskForm
          onClose={() => setShowEmailForm(false)}
          onTaskCreated={async (job) => {
            console.log("Job added to RunForge:", job);

            setJobs((previousJobs) => [
              job,
              ...previousJobs.filter(
                (existingJob) => existingJob.id !== job.id
              ),
            ]);

            setActiveTab("Jobs");
            await fetchJobs();
          }}
        />
      )}
      {/* Presentation Task Form */}
{showPresentationForm && (
  <PresentationTaskForm
    onClose={() => setShowPresentationForm(false)}
    onTaskCreated={async (job) => {
      console.log("Presentation task added:", job);

      setJobs((previousJobs) => [
        job,
        ...previousJobs.filter(
          (existingJob) => existingJob.id !== job.id
        ),
      ]);

      setActiveTab("Jobs");
      await fetchJobs();
    }}
  />
)}
    </div>
  );
}
