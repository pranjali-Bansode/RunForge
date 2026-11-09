
import { useState } from "react";
import { X, Mail, Send, Sparkles, RefreshCw, ArrowLeft } from "lucide-react";

export default function EmailTaskForm({ onClose, onTaskCreated }) {
  const [formData, setFormData] = useState({
    to: "",
    purpose: "",
    tone: "Professional",
    additionalInstructions: "",
    subject: "",
    message: "",
  });

  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [queueLoading, setQueueLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Generate email using Gemini
  const handleGenerate = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8081/api/email/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipient: formData.to,
            purpose: formData.purpose,
            tone: formData.tone,
            additionalInstructions: formData.additionalInstructions,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Unable to generate email.");
      }

      const draft = await response.json();

      setFormData((prev) => ({
        ...prev,
        subject: draft.subject,
        message: draft.body,
      }));

      setGenerated(true);
    } catch (err) {
      setError(err.message || "Email generation failed.");
    } finally {
      setLoading(false);
    }
  };

  // Add approved email to RunForge queue
  const handleQueue = async (e) => {
    e.preventDefault();
    setQueueLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8081/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "SEND_EMAIL",
          payload: {
            recipient: formData.to,
            subject: formData.subject,
            message: formData.message,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Unable to create email task.");
      }

      const createdJob = await response.json();

      onTaskCreated?.(createdJob);
      onClose();
    } catch (err) {
      setError(err.message || "Unable to queue email.");
    } finally {
      setQueueLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-[#0e1019] px-4 py-3 text-sm text-white outline-none focus:border-indigo-500";

  const labelClass = "mb-2 block text-sm text-gray-300";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#151722] p-6 shadow-2xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-indigo-400">
              <Mail size={18} />
              <span className="text-sm font-medium">
                AI Email Assistant
              </span>
            </div>

            <h2 className="text-xl font-semibold text-white">
              {generated ? "Review Your Email" : "Create Email"}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {generated
                ? "Review and edit your AI-generated email."
                : "Describe your email and let Gemini write it for you."}
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

        {/* Email generation form */}
        {!generated ? (
          <div className="space-y-4">

            <div>
              <label className={labelClass}>Recipient email</label>
              <input
                type="email"
                name="to"
                value={formData.to}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>What is this email about?</label>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="Example: Apply for a Java Developer fresher position..."
                rows={3}
                required
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              <label className={labelClass}>Email tone</label>
              <select
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Professional">Professional</option>
                <option value="Formal">Formal</option>
                <option value="Friendly">Friendly</option>
                <option value="Persuasive">Persuasive</option>
                <option value="Appreciative">Appreciative</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Additional instructions (optional)
              </label>
              <textarea
                name="additionalInstructions"
                value={formData.additionalInstructions}
                onChange={handleChange}
                placeholder="Mention skills, experience, key points, etc."
                rows={3}
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
                type="button"
                onClick={handleGenerate}
                disabled={
                  loading ||
                  !formData.to.trim() ||
                  !formData.purpose.trim()
                }
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
              >
                <Sparkles size={16} />
                {loading ? "Generating..." : "Generate with AI"}
              </button>
            </div>
          </div>
        ) : (

          /* Editable email preview */
          <form onSubmit={handleQueue} className="space-y-4">

            <div>
              <label className={labelClass}>Recipient</label>
              <input
                type="email"
                value={formData.to}
                readOnly
                className={`${inputClass} opacity-70`}
              />
            </div>

            <div>
              <label className={labelClass}>Email subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Email body</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={12}
                required
                className={`${inputClass} resize-y leading-7`}
              />
            </div>

            <p className="text-xs text-gray-500">
              AI-generated content can be edited before adding it to the queue.
            </p>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <div className="flex flex-wrap justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setGenerated(false);
                  setError("");
                }}
                className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading || queueLoading}
                className="flex items-center gap-2 rounded-lg border border-indigo-500/30 px-4 py-2.5 text-sm text-indigo-400 hover:bg-indigo-500/10 disabled:opacity-50"
              >
                <RefreshCw size={16} />
                {loading ? "Regenerating..." : "Regenerate"}
              </button>

              <button
                type="submit"
                disabled={
                  queueLoading ||
                  loading ||
                  !formData.subject.trim() ||
                  !formData.message.trim()
                }
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
              >
                <Send size={16} />
                {queueLoading ? "Adding..." : "Add to Queue"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
