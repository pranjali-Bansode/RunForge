
import { BriefcaseBusiness, Clock3, CheckCircle2, CircleAlert } from "lucide-react";

export default function Jobs({ jobs = [] }) {
  const statusStyles = {
    QUEUED: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    RUNNING: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    COMPLETED: "bg-green-500/15 text-green-400 border-green-500/20",
    FAILED: "bg-red-500/15 text-red-400 border-red-500/20",
  };

  const statusIcons = {
    QUEUED: Clock3,
    RUNNING: Clock3,
    COMPLETED: CheckCircle2,
    FAILED: CircleAlert,
  };

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-2xl font-bold">Jobs</h2>
        <p className="text-sm text-slate-400 mt-1">
          Monitor and manage your submitted tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="rounded-xl border border-[#292D49] bg-[#191D32] p-5">
          <p className="text-sm text-slate-400">Total Jobs</p>
          <p className="text-3xl font-bold mt-2">{jobs.length}</p>
        </div>

        <div className="rounded-xl border border-[#292D49] bg-[#191D32] p-5">
          <p className="text-sm text-slate-400">Queued</p>
          <p className="text-3xl font-bold text-yellow-400 mt-2">
            {jobs.filter(job => job.status?.toUpperCase() === "QUEUED").length}
          </p>
        </div>

        <div className="rounded-xl border border-[#292D49] bg-[#191D32] p-5">
          <p className="text-sm text-slate-400">Completed</p>
          <p className="text-3xl font-bold text-green-400 mt-2">
            {jobs.filter(job => job.status?.toUpperCase() === "COMPLETED").length}
          </p>
        </div>

      </div>

      <div className="rounded-2xl border border-[#292D49] bg-[#191D32] overflow-hidden">

        <div className="p-5 border-b border-[#292D49]">
          <h3 className="font-semibold flex items-center gap-2">
            <BriefcaseBusiness size={19} className="text-violet-400" />
            All Jobs
          </h3>
        </div>

        {jobs.length === 0 ? (
          <div className="py-16 text-center">
            <BriefcaseBusiness
              size={40}
              className="mx-auto text-slate-600 mb-3"
            />
            <p className="text-slate-300 font-medium">No jobs yet</p>
            <p className="text-sm text-slate-500 mt-2">
              Create a task using Add Task to see it here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-slate-400 bg-[#15182B]">
                <tr>
                  <th className="px-5 py-4">Job</th>
                  <th className="px-5 py-4">Job ID</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Created At</th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job, index) => {
                  const status = job.status?.toUpperCase() || "QUEUED";
                  const StatusIcon = statusIcons[status] || Clock3;

                  return (
                    <tr
                      key={job.id || job.jobId || index}
                      className="border-t border-[#292D49] hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4 text-slate-200 font-medium">
                        {job.title || job.taskName || job.name || "Untitled Job"}
                      </td>

                      <td className="px-5 py-4 text-slate-400">
                        {job.id || job.jobId || `JOB-${index + 1}`}
                      </td>

                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status] || statusStyles.QUEUED}`}>
                          <StatusIcon size={13} />
                          {status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-400">
                        {job.createdAt
                          ? new Date(job.createdAt).toLocaleString()
                          : "Recently added"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
