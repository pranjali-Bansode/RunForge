
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Code2,
  FlaskConical,
  Layers3,
  RefreshCw,
  ShieldCheck,
  Terminal,
  Workflow,
  XCircle,
  Zap,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    number: "01",
    icon: RefreshCw,
    title: "Failure recovery",
    description:
      "Build toward retry policies and controlled recovery so temporary failures don't have to end a job's journey.",
    tag: "RESILIENCE",
  },
  {
    number: "02",
    icon: Activity,
    title: "Execution visibility",
    description:
      "Understand job states and follow execution history through a clear, developer-friendly interface.",
    tag: "OBSERVABILITY",
  },
  {
    number: "03",
    icon: FlaskConical,
    title: "Failure simulation",
    description:
      "Experiment with failure scenarios and inspect how jobs respond as recovery capabilities evolve.",
    tag: "TESTING",
  },
];

const steps = [
  {
    icon: Layers3,
    title: "Submit a job",
    description:
      "Define a job type and its payload through a simple API.",
  },
  {
    icon: Zap,
    title: "Process execution",
    description:
      "Track the job as the processing engine advances through its lifecycle.",
  },
  {
    icon: Activity,
    title: "Inspect the outcome",
    description:
      "Review status, execution details, and failures from one console.",
  },
];

function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.08] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">
      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
      {children}
    </span>
  );
}

function ConsolePreview() {
  const jobs = [
    { id: "job_8f2a", name: "SEND_EMAIL", status: "RUNNING" },
    { id: "job_7c1b", name: "GENERATE_REPORT", status: "COMPLETED" },
    { id: "job_3e9d", name: "SYNC_DATA", status: "FAILED" },
  ];

  const statusStyles = {
    RUNNING: "bg-sky-400/10 text-sky-300",
    COMPLETED: "bg-emerald-400/10 text-emerald-300",
    FAILED: "bg-rose-400/10 text-rose-300",
  };

  return (
    <div
      id="console-preview"
      className="relative mx-auto w-full max-w-5xl scroll-mt-28"
    >
      <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-indigo-500/[0.12] blur-3xl" />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#10131d] shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-sm font-medium text-slate-200">
              RunForge / Job Console
            </span>
          </div>

          <span className="flex items-center gap-2 rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            Preview
          </span>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-[190px_1fr] md:p-7">
          <aside className="hidden border-r border-white/[0.08] pr-5 md:block">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Workspace
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 rounded-lg bg-indigo-400/10 px-3 py-2.5 text-indigo-300">
                <Layers3 size={16} /> Jobs
              </div>
              <div className="flex items-center gap-2 px-3 py-2.5 text-slate-500">
                <Activity size={16} /> Executions
              </div>
              <div className="flex items-center gap-2 px-3 py-2.5 text-slate-500">
                <FlaskConical size={16} /> Simulations
              </div>
            </div>

            <div className="mt-10 rounded-xl border border-white/[0.08] p-3">
              <p className="text-xs font-medium text-slate-300">
                Engine status
              </p>
              <p className="mt-2 flex items-center gap-2 text-xs text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                Demo preview
              </p>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs text-slate-500">WORKSPACE / JOBS</p>
                <h3 className="mt-1 text-xl font-semibold text-white">
                  Job overview
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  A clearer view of your background work.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-3 py-2 text-xs font-semibold text-white">
                <Zap size={14} /> Create job
              </span>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { label: "Total jobs", value: "128", icon: Layers3 },
                { label: "In progress", value: "04", icon: Activity },
                { label: "Failed", value: "07", icon: XCircle },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4"
                >
                  <metric.icon size={17} className="text-indigo-300" />
                  <p className="mt-4 text-2xl font-semibold text-white">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{metric.label}</p>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-xl border border-white/[0.08]">
              <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-white/[0.08] px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:grid-cols-[1fr_100px_100px]">
                <span>Job</span>
                <span className="hidden sm:block">ID</span>
                <span>Status</span>
              </div>

              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-white/[0.05] px-4 py-4 last:border-0 sm:grid-cols-[1fr_100px_100px]"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-200">
                      {job.name}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500 sm:hidden">
                      {job.id}
                    </p>
                  </div>
                  <span className="hidden font-mono text-[10px] text-slate-500 sm:block">
                    {job.id}
                  </span>
                  <span
                    className={`w-fit rounded-md px-2 py-1 text-[9px] font-semibold tracking-wide ${statusStyles[job.status]}`}
                  >
                    {job.status}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-3 text-center text-[10px] text-slate-500">
              Illustrative sample data · Not connected to the backend
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0b0d14] text-slate-200">
      <Navbar />

      <main>
        {/* Hero */}
        <section
          id="home"
          className="relative scroll-mt-24 px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28"
        >
          <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-600/[0.10] blur-[130px]" />

          <div className="relative mx-auto max-w-5xl text-center">
            <SectionLabel>Reliable job processing</SectionLabel>

            <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Background jobs.
              <br />
              <span className="bg-gradient-to-r from-indigo-300 via-violet-400 to-purple-300 bg-clip-text text-transparent">
                Under control.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              RunForge is a job-processing engine designed to make execution
              easier to track, failures easier to understand, and recovery
              easier to build.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-400"
              >
                Explore RunForge <ArrowRight size={17} />
              </a>
              <a
                href="#console-preview"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-indigo-400/40 hover:bg-white/[0.06]"
              >
                <Terminal size={17} className="text-indigo-300" />
                Preview the console
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={14} className="text-indigo-300" />
                Developer-focused
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={14} className="text-indigo-300" />
                Built for reliability
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />
              <span className="inline-flex items-center gap-2">
                <Code2 size={14} className="text-indigo-300" />
                API-driven
              </span>
            </div>
          </div>
        </section>

        {/* Product preview */}
        <section className="px-5 pb-24 sm:px-8 sm:pb-32">
          <ConsolePreview />
        </section>

        {/* Features */}
        <section
          id="features"
          className="scroll-mt-24 border-y border-white/[0.06] bg-[#0e1019] px-5 py-20 sm:px-8 sm:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <SectionLabel>Core capabilities</SectionLabel>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                More than a job queue.
              </h2>
              <p className="mt-5 leading-7 text-slate-400">
                Reliable processing needs more than accepting tasks. It needs
                a way to understand execution, respond to failures, and test
                what happens when things go wrong.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.number}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-indigo-400/[0.03] sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/[0.08] text-indigo-300">
                      <feature.icon size={23} />
                    </span>
                    <span className="font-mono text-xs text-slate-600">
                      {feature.number}
                    </span>
                  </div>

                  <p className="mt-7 text-[10px] font-semibold tracking-[0.16em] text-indigo-300">
                    {feature.tag}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {feature.description}
                  </p>

                  <a
                    href="#how-it-works"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition group-hover:text-indigo-300"
                  >
                    Learn more <ArrowUpRight size={15} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <SectionLabel>The workflow</SectionLabel>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                From submission to outcome.
              </h2>
              <p className="mt-5 leading-7 text-slate-400">
                A straightforward view of a job's journey through the
                processing lifecycle.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-white/[0.08] bg-[#10131d] p-6 sm:p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300">
                    <step.icon size={23} />
                  </div>

                  <p className="mt-6 font-mono text-xs text-indigo-300">
                    STEP 0{index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {step.description}
                  </p>

                  {index < steps.length - 1 && (
                    <ArrowDown
                      size={17}
                      className="absolute -bottom-6 left-1/2 z-10 hidden -translate-x-1/2 rotate-[-90deg] text-indigo-400 md:block"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About / CTA */}
        <section id="about" className="scroll-mt-24 px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/[0.13] via-[#111321] to-violet-500/[0.07] p-7 sm:p-12 lg:p-16">
            <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
              <div className="max-w-2xl">
                <SectionLabel>About RunForge</SectionLabel>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Make every job easier to reason about.
                </h2>
                <p className="mt-4 leading-7 text-slate-400">
                  RunForge is being built as a developer-focused project
                  around job lifecycle management, failure handling, and
                  execution visibility—with reliability as the goal.
                </p>
              </div>

              <a
                href="#console-preview"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-400"
              >
                Explore the preview <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>

        {/* Legal information */}
        <section className="border-t border-white/[0.06] bg-[#0e1019] px-5 py-12 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
            <article id="terms" className="scroll-mt-28">
              <h2 className="text-base font-semibold text-white">
                Terms & Conditions
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                RunForge is a project under development. Features and
                interfaces may change as the project evolves. Use of a
                future hosted service will be subject to its published
                terms. Do not submit confidential or sensitive data to
                experimental deployments.
              </p>
            </article>

            <article id="privacy" className="scroll-mt-28">
              <h2 className="text-base font-semibold text-white">
                Privacy Policy
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                This development preview does not claim to provide a
                production privacy service. When persistence, analytics,
                or user accounts are introduced, the policy will be
                updated to describe what data is collected, how it is
                used, and how it is protected.
              </p>
            </article>
          </div>
          <p className="mx-auto mt-8 max-w-7xl text-xs leading-6 text-slate-500">
            These are preliminary project disclosures, not legal advice or
            a substitute for finalized terms for a deployed service.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
