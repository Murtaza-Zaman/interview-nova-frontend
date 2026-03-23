/**
 * @file frontend/src/features/ai/components/InterviewReportStateLayout.jsx
 * @description State switch component that chooses loading, empty, or content layout.
 */
const InterviewReportStateLayout = ({ children }) => {
  return (
    <main className="min-h-screen bg-[#030712] px-4 py-16 font-['Syne',sans-serif] text-slate-100 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/65 p-8 text-center backdrop-blur-2xl">
        <h1 className="font-['Cormorant_Garamond',serif] text-4xl font-light">Interview Report</h1>
        {children}
      </section>
    </main>
  );
};

export default InterviewReportStateLayout;
