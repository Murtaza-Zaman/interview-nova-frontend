/**
 * @file frontend/src/features/ai/components/InterviewReportEmptyState.jsx
 * @description Empty-state UI shown when no interview reports exist or selection is missing.
 */
import { Link } from "react-router-dom";
import InterviewReportStateLayout from "./InterviewReportStateLayout";

const InterviewReportEmptyState = ({ message }) => {
  return (
    <InterviewReportStateLayout>
      <p className="mt-3 text-sm text-slate-400">{message}</p>
      <Link
        to="/ai"
        className="mt-6 inline-flex rounded-xl border border-violet-300/40 bg-violet-400/10 px-4 py-2 text-sm font-semibold text-violet-200 transition hover:bg-violet-400/15"
      >
        Go To AI Page
      </Link>
    </InterviewReportStateLayout>
  );
};

export default InterviewReportEmptyState;
