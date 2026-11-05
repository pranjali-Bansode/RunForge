
import { useState } from "react";
import { X, Mail, Send } from "lucide-react";

export default function EmailTaskForm({ onClose, onTaskCreated }) {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "EMAIL",
          payload: {
            to: formData.to,
            subject: formData.subject,
            message: formData.message,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to create email task.");
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#151722] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-indigo-400">
              <Mail size={18} />
              <span className="text-sm font-medium">New background job</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Create Email Task
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Add an email task to the RunForge queue.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Recipient email
            </label>
            <input
              type="email"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="example@email.com"
              required
              className="w-full rounded-lg border border-white/10 bg-[#0e1019] px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter email subject"
              required
              className="w-full rounded-lg border border-white/10 bg-[#0e1019] px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your email message..."
              rows={5}
              required
              className="w-full resize-none rounded-lg border border-white/10 bg-[#0e1019] px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
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
              <Send size={16} />
              {loading ? "Adding..." : "Add to Queue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
