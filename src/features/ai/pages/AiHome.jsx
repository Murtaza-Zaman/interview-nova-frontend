/**
 * @file frontend/src/features/ai/pages/AiHome.jsx
 * @description Feature landing page for starting AI-driven interview analysis flows.
 */
import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../auth/hooks/useAuth";
import { UploadZone } from "../components/UploadZone";
import { useGenerateInterviewReport } from "../hooks/useInterviewReport";
import { getInterviewReportStorageKey } from "../../../utils/interviewReport.utils";
import { analyzerSchema } from "../validation/analyzer.validation";

const AiHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const form = useForm({
    defaultValues: {
      jobDescription: "",
      selfDescription: "",
      resumeFile: null,
    },
    resolver: joiResolver(analyzerSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { isLoading, error, generateInterviewReport } = useGenerateInterviewReport();

  const handleAnalyze = async (values) => {
    try {
      const response = await generateInterviewReport(values);
      const storageKey = getInterviewReportStorageKey(user?.email || user?.username || user?.token || "guest");
      sessionStorage.setItem(storageKey, JSON.stringify(response));
      toast.success(response?.message || "Interview report generated successfully");
      navigate("/interview-report/technical", { state: { reportResponse: response } });
    } catch {
      // error is handled via hook state and shown below
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] px-4 py-14 font-['Syne',sans-serif] text-slate-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed -left-48 -top-44 z-0 h-152 w-152 rounded-full bg-violet-600/25 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-36 -right-40 z-0 h-128 w-lg rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none fixed left-[58%] top-[42%] z-0 h-76 w-76 rounded-full bg-rose-500/20 blur-3xl" />

      <div className="relative z-20 mx-auto flex w-full max-w-6xl justify-end">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 transition hover:-translate-y-0.5 hover:border-violet-300/40 hover:bg-violet-400/10"
        >
          <span>←</span>
          <span>Dashboard</span>
        </Link>
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/35 bg-violet-400/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-violet-200">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-300" />
          AI-Powered - Resume Intelligence
        </span>

        <h1 className="mt-7 text-center font-['Cormorant_Garamond',serif] text-5xl font-light leading-[0.98] tracking-tight text-slate-100 sm:text-6xl lg:text-8xl">
          Is This Role
          <br />
          <em className="bg-linear-to-r from-violet-300 via-sky-300 to-pink-300 bg-clip-text not-italic text-transparent">Right For You?</em>
        </h1>

        <p className="mt-4 max-w-2xl text-center text-sm text-slate-300/80 sm:text-base">
          Drop your resume. Paste the job. Let AI do the heavy lifting.
        </p>

        <div className="mt-10 grid w-full max-w-xl grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="p-4 text-center">
            <p className="font-['Cormorant_Garamond',serif] text-3xl font-semibold text-slate-100">98%</p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Accuracy</p>
          </div>
          <div className="border-x border-white/10 p-4 text-center">
            <p className="font-['Cormorant_Garamond',serif] text-3xl font-semibold text-slate-100">2s</p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Analysis Time</p>
          </div>
          <div className="p-4 text-center">
            <p className="font-['Cormorant_Garamond',serif] text-3xl font-semibold text-slate-100">50K+</p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Resumes</p>
          </div>
        </div>

        <section className="relative mt-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/65 p-7 shadow-2xl backdrop-blur-2xl sm:p-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-violet-300/60 to-transparent" />

          <form onSubmit={handleSubmit(handleAnalyze)}>
            <div className="mb-6">
              <label className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-slate-400" htmlFor="selfDescription">Your Introduction</label>
              <textarea
                id="selfDescription"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-300/50 focus:outline-none focus:ring-4 focus:ring-violet-400/15"
                placeholder="Share your background, strengths, and career goals..."
                {...register("selfDescription")}
              />
              {errors.selfDescription && <p className="mt-2 text-xs font-medium text-rose-300">{errors.selfDescription.message}</p>}
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-slate-400" htmlFor="jobDescription">Job Description</label>
              <textarea
                id="jobDescription"
                className="min-h-32 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-300/50 focus:outline-none focus:ring-4 focus:ring-violet-400/15"
                placeholder="Paste requirements, responsibilities, and qualifications..."
                {...register("jobDescription")}
              />
              {errors.jobDescription && <p className="mt-2 text-xs font-medium text-rose-300">{errors.jobDescription.message}</p>}
            </div>

            <div className="mb-7">
              <label className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-slate-400">Your Resume</label>
              <Controller
                name="resumeFile"
                control={control}
                render={({ field }) => <UploadZone file={field.value} onFileSelect={field.onChange} />}
              />
              {errors.resumeFile && <p className="mt-2 text-xs font-medium text-rose-300">{errors.resumeFile.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-violet-900/40 transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? "Generating Report..." : "Generate Interview Report"}
            </button>
          </form>

          {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
        </section>

        <p className="mt-6 text-center text-xs text-slate-500">Your data is processed securely · Never stored · End-to-end encrypted</p>
      </div>
    </main>
  );
};

export default AiHome;
