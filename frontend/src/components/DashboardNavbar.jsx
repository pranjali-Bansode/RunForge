
const tabs = ["Metrics", "Jobs", "Schedulers", "Workers"];

export default function DashboardNavbar({ activeTab, onTabChange }) {
  return (
    <nav className="flex items-center gap-5 border-b border-[#30334C] text-sm w-full">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`pb-3 px-1 whitespace-nowrap transition ${
            activeTab === tab
              ? "text-white border-b-2 border-violet-500"
              : "text-slate-400 hover:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
