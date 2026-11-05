
import { Workflow, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#090b11]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#home" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-white">
                <Workflow size={22} />
              </span>
              <span className="text-xl font-bold text-white">
                Run<span className="text-indigo-400">Forge</span>
              </span>
            </a>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
              A job-processing engine designed to make execution,
              failures, and recovery easier to understand.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Explore</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <a className="hover:text-indigo-300" href="#features">Features</a>
              <a className="hover:text-indigo-300" href="#how-it-works">How it works</a>
              <a className="hover:text-indigo-300" href="#about">About RunForge</a>
              <a className="hover:text-indigo-300" href="#console-preview">Console preview</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Legal</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <a className="hover:text-indigo-300" href="#terms">Terms & Conditions</a>
              <a className="hover:text-indigo-300" href="#privacy">Privacy Policy</a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/[0.08] pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RunForge. Built for reliable job processing.</p>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <ExternalLink size={18} /> GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
