/**
 * @file frontend/src/features/ai/components/InterviewReportLoadingState.jsx
 * @description Loading-state skeleton/layout for interview report screens.
 */
import InterviewReportStateLayout from "./InterviewReportStateLayout";

const InterviewReportLoadingState = () => {
  return (
    <InterviewReportStateLayout>
      <p className="mt-3 text-sm text-slate-400">Loading latest interview report...</p>
    </InterviewReportStateLayout>
  );
};

export default InterviewReportLoadingState;
