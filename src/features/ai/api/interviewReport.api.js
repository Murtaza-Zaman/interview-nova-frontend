/**
 * @file frontend/src/features/ai/api/interviewReport.api.js
 * @description HTTP API adapters for interview report feature endpoints.
 */
import axiosInstance from "../../../services/axios";

const unwrapResponse = (response) => {
  const payload = response?.data || {};
  return {
    ...(payload?.data || {}),
    success: payload?.success,
    message: payload?.message,
    meta: payload?.meta,
  };
};

export const generateInterviewReportRequest = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription.trim());
  formData.append("selfDescription", selfDescription.trim());
  formData.append("resume", resumeFile);

  const response = await axiosInstance.post("/interview/generate", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return unwrapResponse(response);
};

export const getInterviewReportByIdRequest = async (interviewId) => {
  const response = await axiosInstance.get(`/interview/report/${interviewId}`);
  return unwrapResponse(response);
};

export const getAllInterviewReportsRequest = async () => {
  const response = await axiosInstance.get("/interview/report");
  return unwrapResponse(response);
};
