/**
 * @file frontend/src/features/ai/components/InterviewReportInsightsPanel.jsx
 * @description Right-panel insights renderer for scores, recommendations, and highlights.
 */
import { getSkillGapClass } from "../../../utils/interviewReport.utils";

const InterviewReportInsightsPanel = ({ scoreValue, scoreStyle, skillGaps }) => {
  return (
    <aside className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl lg:sticky lg:top-6 lg:h-fit">
      <section>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Match Score</p>
        <div className="mt-4 flex justify-center">
          <div className="relative grid h-40 w-40 place-items-center rounded-full p-1.5 shadow-[0_0_48px_-12px_rgba(129,140,248,0.9)]" style={scoreStyle}>
            <div className="grid h-full w-full place-items-center rounded-full bg-slate-900/90">
              <p className="text-4xl font-semibold text-violet-100">{scoreValue}</p>
              <p className="-mt-2 text-xs font-semibold text-sky-200">%</p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-sm font-semibold text-sky-200">
          {scoreValue >= 75 ? "Strong match for this role" : "Moderate match for this role"}
        </p>
      </section>

      <section className="border-t border-white/10 pt-4">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Skill Gaps</p>
        <div className="space-y-2">
          {skillGaps.map((gap) => (
            <article
              key={gap._id}
              className={`rounded-lg border px-3 py-2 text-sm font-medium capitalize transition hover:translate-x-0.5 ${getSkillGapClass(gap.severity)}`}
            >
              <p className="wrap-break-word">{gap.skill}</p>
              <p className="text-xs uppercase tracking-[0.14em] opacity-80">{gap.severity} priority</p>
            </article>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default InterviewReportInsightsPanel;
