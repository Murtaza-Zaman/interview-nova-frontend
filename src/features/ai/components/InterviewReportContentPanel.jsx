/**
 * @file frontend/src/features/ai/components/InterviewReportContentPanel.jsx
 * @description Middle-panel renderer for section-specific interview report details.
 */
const InterviewReportContentPanel = ({
  headerLabel,
  badgeText,
  badgeClass,
  indexClass,
  currentSection,
  questions,
  preparationPlan,
}) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-5">
      <header className="mb-4 flex flex-wrap items-center gap-3 border-b border-white/10 pb-4">
        <h1 className="font-['Cormorant_Garamond',serif] text-3xl font-light tracking-tight text-slate-100 sm:text-4xl">{headerLabel}</h1>
        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${badgeClass}`}>
          {badgeText}
        </span>
      </header>

      <div className="space-y-3">
        {currentSection !== "roadmap" && questions.map((question, index) => (
          <details
            key={question._id}
            open={index === 0}
            className="group rounded-2xl border border-slate-800/90 bg-slate-900/70 transition hover:border-violet-300/20"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 px-5 py-4 text-slate-100 marker:content-none">
              <span className="flex items-center gap-3">
                <span className={`inline-flex h-7 min-w-7 items-center justify-center rounded-md border px-2 text-xs font-semibold ${indexClass}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium leading-6 sm:text-base">{question.question}</span>
              </span>
              <span className="pt-1 text-slate-500 transition group-open:rotate-180">⌃</span>
            </summary>

            <div className="space-y-4 border-t border-slate-800/90 px-5 py-4 text-sm leading-6">
              <section>
                <p className="mb-2 inline-flex rounded-md border border-indigo-400/35 bg-indigo-500/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-200">
                  Intention
                </p>
                <p className="leading-6 text-slate-300">{question.intention}</p>
              </section>

              <section>
                <p className="mb-2 inline-flex rounded-md border border-emerald-400/35 bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-200">
                  Model Answer
                </p>
                <p className="leading-6 text-slate-200">{question.answer}</p>
              </section>
            </div>
          </details>
        ))}

        {currentSection === "roadmap" && (
          <section className="relative space-y-8 pl-8">
            <div className="pointer-events-none absolute left-2.25 top-2 h-[calc(100%-14px)] w-px bg-linear-to-b from-rose-300 via-rose-400 to-rose-500/70" />

            {preparationPlan.map((item) => (
              <article key={item._id} className="relative rounded-xl px-1 py-0.5">
                <span className="absolute -left-8 top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-rose-300 bg-slate-900/80">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                </span>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex rounded-md border border-rose-300/35 bg-rose-400/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-200">
                      {item.day}
                    </span>
                    <h3 className="text-lg font-semibold leading-snug text-slate-100">{item.focus}</h3>
                  </div>

                  <ul className="space-y-1.5 pl-4 text-sm leading-6 text-slate-300 marker:text-slate-500">
                    {item.tasks.map((task, index) => (
                      <li key={`${item.day}-${index}`} className="list-disc">
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </section>
  );
};

export default InterviewReportContentPanel;
