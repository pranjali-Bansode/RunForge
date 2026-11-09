
import { useState } from "react";
import { Presentation, FileDown, X, Loader2 } from "lucide-react";

const API_URL = "http://localhost:8081/api/jobs";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-violet-500";

const labelClass = "mb-2 block text-sm font-medium text-gray-300";

export default function PresentationTaskForm({ onClose, onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    presentationType: "TECHNICAL",
    slideCount: "8",
    instructions: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.title.trim() || !formData.instructions.trim()) {
      setError("Please enter a presentation title and instructions.");
      return;
    }

    const slideCount = Number(formData.slideCount);

    if (!Number.isInteger(slideCount) || slideCount < 3 || slideCount > 30) {
      setError("Slide count must be between 3 and 30.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "GENERATE_PRESENTATION",
          payload: {
            title: formData.title.trim(),
            presentationType: formData.presentationType,
            slideCount,
            format: "PPTX",
            instructions: formData.instructions.trim(),
          },
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message || data?.error || "Unable to queue presentation task."
        );
      }

      onTaskCreated?.(data);
      onClose?.();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020] shadow-2xl shadow-black/40">

        <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-3">
              <Presentation className="h-5 w-5 text-violet-300" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Create Presentation
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Configure a PowerPoint generation task.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close presentation form"
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
          <div>
            <label htmlFor="presentation-title" className={labelClass}>
              Presentation title
            </label>
            <input
              id="presentation-title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Introduction to Artificial Intelligence"
              maxLength={120}
              required
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="presentation-type" className={labelClass}>
                Presentation type
              </label>
              <select
                id="presentation-type"
                name="presentationType"
                value={formData.presentationType}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="TECHNICAL">Technical Presentation</option>
                <option value="BUSINESS">Business Presentation</option>
                <option value="EDUCATIONAL">Educational Presentation</option>
                <option value="PITCH_DECK">Startup Pitch Deck</option>
                <option value="PROJECT">Project Presentation</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="slide-count" className={labelClass}>
                Number of slides
              </label>
              <input
                id="slide-count"
                name="slideCount"
                type="number"
                min="3"
                max="30"
                value={formData.slideCount}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <p className="mt-2 text-xs text-gray-500">
                Choose between 3 and 30 slides.
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="presentation-instructions" className={labelClass}>
              Content and instructions
            </label>
            <textarea
              id="presentation-instructions"
              name="instructions"
              rows={6}
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Describe the topic, key points, target audience, tone, and sections you want included..."
              required
              className={`${inputClass} resize-y`}
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <FileDown className="h-5 w-5 shrink-0 text-violet-300" />
            <div>
              <p className="text-sm font-medium text-white">
                PowerPoint file (.pptx)
              </p>
              <p className="text-xs text-gray-400">
                The task will be added to your RunForge job queue.
              </p>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Adding to queue...
                </>
              ) : (
                <>
                  <Presentation className="h-4 w-4" />
                  Create Presentation
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
