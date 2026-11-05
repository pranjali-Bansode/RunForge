
import { useState } from "react";
import { ArrowUpRight, Menu, Workflow, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0b0d14]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
            <Workflow size={22} />
          </span>
          <span className="text-xl font-bold tracking-tight text-white">
            Run<span className="text-indigo-400">Forge</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-slate-400 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#console-preview"
          className="hidden items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 md:inline-flex"
        >
          Open Console <ArrowUpRight size={16} />
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-white/10 p-2 text-slate-200 md:hidden"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/[0.08] px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-slate-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#console-preview"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white"
            >
              Open Console <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
