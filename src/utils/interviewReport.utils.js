/**
 * @file frontend/src/utils/interviewReport.utils.js
 * @description Utility helpers for formatting interview report data.
 */

export const getInterviewReportStorageKey = (userIdentifier = "guest") => {
  return `latest_interview_report:${String(userIdentifier).trim().toLowerCase()}`;
};

export const getSkillGapClass = (severity) => {
  if (severity === "high") {
    return "border-rose-300/35 bg-rose-400/10 text-rose-200";
  }

  if (severity === "medium") {
    return "border-violet-300/35 bg-violet-400/10 text-violet-200";
  }

  if (severity === "low") {
    return "border-sky-300/35 bg-sky-400/10 text-sky-200";
  }

  return "border-slate-700 bg-slate-800/70 text-slate-200";
};

export const getReportTitle = (report, fallbackIndex = 1) => {
  const firstLine = (report?.jobDescription || "").split("\n").find((line) => line.trim());
  if (firstLine) {
    return firstLine.trim();
  }

  return `Interview Report ${fallbackIndex}`;
};
