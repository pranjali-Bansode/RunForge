import {
  X,
  Mail,
  FileText,
  Presentation,
  Sparkles,
  ArrowRight,
  Clock3,
} from "lucide-react";

const taskOptions = [
  {
    id: "email",
    title: "Email Writing",
    description: "Compose and queue professional emails.",
    icon: Mail,
    available: true,
    color: "text-indigo-400",
  },
  {
    id: "document",
    title: "Document Writing",
    description: "Create reports, letters and documents.",
    icon: FileText,
    available: true,
    color: "text-blue-400",
  },
  {
    id: "presentation",
    title: "Presentation",
    description: "Generate structured presentation content.",
    icon: Presentation,
    available: true,
    color: "text-orange-400",
  },
  {
    id: "ai-content",
    title: "AI Content",
    description: "Generate summaries and other content.",
    icon: Sparkles,
    available: false,
    color: "text-violet-400",
  },
];

export default function TaskSelector({ onClose, onSelect }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#151722] p-6 shadow-2xl">

        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-indigo-400">
              <Sparkles size={18} />
              <span className="text-sm font-medium">RunForge Task Engine</span>
            </div>

            <h2 className="text-2xl font-semibold text-white">
              Create a new task
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Choose what you want RunForge to do.
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {taskOptions.map((task) => {
            const Icon = task.icon;

            return (
              <button
                key={task.id}
                type="button"
                disabled={!task.available}
                onClick={() => onSelect(task.id)}
                className={`group rounded-xl border border-white/10 bg-[#0e1019] p-5 text-left transition ${
                  task.available
                    ? "hover:border-violet-500/50 hover:bg-violet-500/5"
                    : "cursor-not-allowed opacity-60"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5">
                    <Icon size={22} className={task.color} />
                  </div>

                  {task.available ? (
                    <ArrowRight
                      size={18}
                      className="text-gray-500 transition group-hover:translate-x-1 group-hover:text-violet-400"
                    />
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 text-[10px] text-gray-400">
                      <Clock3 size={11} />
                      Coming soon
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-white">
                  {task.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  {task.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 border-t border-white/10 pt-4">
          <p className="text-xs text-gray-500">
            More task types will be available as the RunForge engine expands.
          </p>
        </div>
      </div>
    </div>
  );
}