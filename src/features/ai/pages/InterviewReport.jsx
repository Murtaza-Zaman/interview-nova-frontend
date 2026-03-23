/**
 * @file frontend/src/features/ai/pages/InterviewReport.jsx
 * @description Parent report layout page that renders shared shell and nested section routes.
 */
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";
import InterviewReportLoadingState from "../components/InterviewReportLoadingState";
import InterviewReportEmptyState from "../components/InterviewReportEmptyState";
import InterviewReportSectionsSidebar from "../components/InterviewReportSectionsSidebar";
import InterviewReportContentPanel from "../components/InterviewReportContentPanel";
import InterviewReportInsightsPanel from "../components/InterviewReportInsightsPanel";
import { useInterviewReportDetails, useInterviewReportsList } from "../hooks/useInterviewReport";
import { getInterviewReportStorageKey } from "../../../utils/interviewReport.utils";

const InterviewReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // 1. Fetch reports list
  const {
    data: reportsData,
    isLoading: isReportsLoading,
    error: reportsError,
  } = useInterviewReportsList();
  const reportItems = reportsData?.interviewReports || [];

  // 2. Identify the active report ID
  const [selectedReportId, setSelectedReportId] = useState(null);
  
  let storedReport = null;
  try {
    const ownerIdentifier = user?.email || user?.username || user?.token || "guest";
    const storageKey = getInterviewReportStorageKey(ownerIdentifier);
    const rawStorage = sessionStorage.getItem(storageKey);
    if (rawStorage) storedReport = JSON.parse(rawStorage)?.interviewReport;
  } catch {
    // Ignore JSON parse errors for session storage
  }

  const routedReportId = location.state?.reportResponse?.interviewReport?._id;
  const activeReportId = selectedReportId || routedReportId || storedReport?._id || reportItems[0]?._id || null;

  // 3. Fetch detailed report data
  const {
    data: detailData,
    isLoading: isDetailLoading,
    error: detailError,
  } = useInterviewReportDetails(activeReportId, { enabled: !!activeReportId });

  // 4. Resolve the active report
  const report = detailData?.interviewReport || 
                 location.state?.reportResponse?.interviewReport || 
                 storedReport || 
                 reportItems.find(item => item._id === activeReportId) || 
                 null;

  // 5. Determine the active section
  const pathSegment = location.pathname.split("/").pop();
  const isValidSection = ["technical", "behavioral", "roadmap"].includes(pathSegment);
  const currentSection = isValidSection ? pathSegment : "technical";

  // 6. Handle loading and empty states early
  const isLoading = (isDetailLoading && !!activeReportId) || (!report && isReportsLoading);
  if (isLoading) {
    return <InterviewReportLoadingState />;
  }

  if (!report) {
    return (
      <InterviewReportEmptyState
        message={detailError?.message || reportsError?.message || "No report found yet. Generate a report from the AI page first."}
      />
    );
  }

  // 7. Derive view model properties directly in the component
  const clampedScore = Math.min(Math.max(Number(report.matchScore || 0), 0), 100);

  const baseData = {
    preparationPlan: report.preparationPlan || [],
    skillGaps: report.skillGaps || [],
    scoreValue: clampedScore,
    scoreStyle: {
      background: `conic-gradient(#22d3ee 0deg, #818cf8 ${clampedScore * 1.8}deg, #f472b6 ${clampedScore * 3.6}deg, rgba(30,41,59,0.35) ${clampedScore * 3.6}deg 360deg)`,
    },
  };

  let presentationData;
  if (currentSection === "roadmap") {
    presentationData = {
      ...baseData,
      questions: [],
      headerLabel: "Preparation Road Map",
      badgeText: `${baseData.preparationPlan.length}-day plan`,
      badgeClass: "border-rose-300/35 bg-rose-400/10 text-rose-200",
      indexClass: "border-violet-300/35 bg-violet-400/15 text-violet-200",
    };
  } else if (currentSection === "behavioral") {
    const qs = report.behavioralQuestions || [];
    presentationData = {
      ...baseData,
      questions: qs,
      headerLabel: "Behavioral Questions",
      badgeText: `${qs.length} questions`,
      badgeClass: "border-sky-300/35 bg-sky-400/10 text-sky-200",
      indexClass: "border-sky-300/35 bg-sky-400/15 text-sky-200",
    };
  } else {
    const qs = report.technicalQuestions || [];
    presentationData = {
      ...baseData,
      questions: qs,
      headerLabel: "Technical Questions",
      badgeText: `${qs.length} questions`,
      badgeClass: "border-violet-300/35 bg-violet-400/10 text-violet-200",
      indexClass: "border-violet-300/35 bg-violet-400/15 text-violet-200",
    };
  }

  const {
    preparationPlan,
    skillGaps,
    questions,
    headerLabel,
    badgeText,
    badgeClass,
    indexClass,
    scoreValue,
    scoreStyle,
  } = presentationData;

  const goToSection = (section) => navigate(`/interview-report/${section}`);
  const selectReportById = (id) => id && setSelectedReportId(id);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] px-3 py-8 font-['Syne',sans-serif] text-slate-100 sm:px-6 lg:px-8">
      {/* Visual background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-112 w-md rounded-full bg-sky-500/16 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-rose-500/14 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-2xl backdrop-blur-2xl sm:p-5 lg:p-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-violet-300/60 to-transparent" />
        
        {/* Desktop Header */}
        <div className="mb-3 hidden items-center justify-between sm:flex">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 transition hover:-translate-y-0.5 hover:border-violet-300/40 hover:bg-violet-400/10"
          >
            <span>?</span>
            <span>Dashboard</span>
          </button>
          <Link
            to="/ai"
            className="inline-flex items-center gap-2 rounded-xl border border-violet-300/35 bg-violet-400/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-400/15"
          >
            Generate New Report
          </Link>
        </div>

        <section className="mb-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl sm:px-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Interview Intelligence</p>
          <h1 className="mt-1 font-['Cormorant_Garamond',serif] text-4xl font-light tracking-tight text-slate-100 sm:text-5xl">Personalized Interview Report</h1>
          <p className="mt-1 text-sm text-slate-300/80">Data shown here is scoped to your account and your generated reports only.</p>
        </section>

        {/* Mobile Header */}
        <section className="mb-4 grid grid-cols-2 gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 transition hover:border-violet-300/40 hover:bg-violet-400/10"
          >
            <span>?</span>
            <span>Dashboard</span>
          </button>
          <Link
            to="/ai"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-300/35 bg-violet-400/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-violet-200 transition hover:bg-violet-400/15"
          >
            Generate
          </Link>
        </section>

        <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)_280px]">
          <InterviewReportSectionsSidebar
            onSectionChange={goToSection}
            onReportSelect={selectReportById}
            currentSection={currentSection}
            report={report}
            reportItems={reportItems}
          />

          <div className="lg:col-span-2">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
              <InterviewReportContentPanel
                headerLabel={headerLabel}
                badgeText={badgeText}
                badgeClass={badgeClass}
                indexClass={indexClass}
                currentSection={currentSection}
                questions={questions}
                preparationPlan={preparationPlan}
              />

              <InterviewReportInsightsPanel
                scoreValue={scoreValue}
                scoreStyle={scoreStyle}
                skillGaps={skillGaps}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InterviewReport;
