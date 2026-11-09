
import { useState } from "react";
import { X, FileText, FileDown } from "lucide-react";

export default function DocumentTaskForm({ onClose, onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    documentType: "REPORT",
    format: "DOCX",
    instructions: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8081/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "GENERATE_DOCUMENT",
          payload: {
            title: formData.title,
            documentType: formData.documentType,
            format: formData.format,
            instructions: formData.instructions,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Unable to create document task.");
      }

      const createdJob = await response.json();

      onTaskCreated?.(createdJob);
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-[#0e1019] px-4 py-3 text-sm text-white outline-none focus:border-indigo-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#151722] p-6 shadow-2xl">

        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-indigo-400">
              <FileText size={18} />
              <span className="text-sm font-medium">Document Generator</span>
            </div>

            <h2 className="text-xl font-semibold text-white">
              Create Document Task
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Describe your document and choose its output format.
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

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Document title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Project Progress Report"
              required
              maxLength={150}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Document type
            </label>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="REPORT">Report</option>
              <option value="LETTER">Formal Letter</option>
              <option value="PROPOSAL">Proposal</option>
              <option value="RESUME">Resume</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Output format
            </label>

            <div className="grid grid-cols-2 gap-3">
              {["DOCX", "PDF"].map((format) => (
                <button
                  key={format}
                  type="button"
                  onClick={() =>
                    setFormData((previous) => ({ ...previous, format }))
                  }
                  className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm transition ${
                    formData.format === format
                      ? "border-violet-500 bg-violet-500/10 text-violet-300"
                      : "border-white/10 bg-[#0e1019] text-gray-400 hover:border-white/30"
                  }`}
                >
                  <FileDown size={17} />
                  {format}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Instructions
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Describe what the document should contain, its sections, tone and important details..."
              rows={5}
              required
              maxLength={10000}
              className={`${inputClass} resize-none`}
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FileText size={16} />
              {loading ? "Adding..." : "Add to Queue"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
