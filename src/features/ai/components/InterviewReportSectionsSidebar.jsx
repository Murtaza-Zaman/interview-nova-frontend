/**
 * @file frontend/src/features/ai/components/InterviewReportSectionsSidebar.jsx
 * @description Left sidebar navigation for interview report sections.
 */
import {
  getReportTitle,
} from "../../../utils/interviewReport.utils";

const InterviewReportSectionsSidebar = ({
  onSectionChange,
  onReportSelect,
  currentSection,
  report,
  reportItems,
}) => {
  return (
    <aside className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl lg:sticky lg:top-6 lg:h-fit">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Sections</p>

      <nav className="space-y-2">
        <button
          type="button"
          onClick={() => onSectionChange("technical")}
          className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition ${
            currentSection === "technical"
              ? "border-violet-300/45 bg-violet-400/15 text-violet-200"
              : "border-white/10 text-slate-300 hover:border-violet-300/35 hover:bg-white/5"
          }`}
        >
          <span>⚙</span>
          <span>Technical Questions</span>
        </button>

        <button
          type="button"
          onClick={() => onSectionChange("behavioral")}
          className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition ${
            currentSection === "behavioral"
              ? "border-sky-300/45 bg-sky-400/15 text-sky-200"
              : "border-white/10 text-slate-300 hover:border-sky-300/35 hover:bg-white/5"
          }`}
        >
          <span>◻</span>
          <span>Behavioral Questions</span>
        </button>

        <button
          type="button"
          onClick={() => onSectionChange("roadmap")}
          className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition ${
            currentSection === "roadmap"
              ? "border-rose-300/45 bg-rose-400/15 text-rose-200"
              : "border-white/10 text-slate-300 hover:border-rose-300/35 hover:bg-white/5"
          }`}
        >
          <span>↗</span>
          <span>Road Map</span>
        </button>
      </nav>

      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Recent Reports</p>
        <div className="space-y-2">
          {reportItems.slice(0, 5).map((item, index) => (
            <button
              key={item._id}
              type="button"
              onClick={() => onReportSelect(item._id)}
              className={`w-full rounded-xl border px-3 py-2 text-left text-xs transition ${
                item._id === report._id
                  ? "border-violet-300/45 bg-violet-400/15 text-violet-100"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-violet-300/35 hover:bg-white/8"
              }`}
            >
              <p className="truncate font-semibold">{getReportTitle(item, index + 1)}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-slate-500">Match {Number(item.matchScore ?? 0)}%</p>
            </button>
          ))}
          {!reportItems.length && (
            <p className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400">No previous reports found yet.</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default InterviewReportSectionsSidebar;
