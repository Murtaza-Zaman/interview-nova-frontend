/**
 * @file frontend/src/features/ai/hooks/useInterviewReport.js
 * @description React Query hooks for interview report mutations and queries.
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  generateInterviewReportRequest,
  getAllInterviewReportsRequest,
  getInterviewReportByIdRequest,
} from "../api/interviewReport.api";

const REPORT_QUERY_STALE_TIME_MS = 60 * 1000;

export const INTERVIEW_REPORT_QUERY_KEYS = {
  all: ["interview-reports"],
  list: () => ["interview-reports", "list"],
  detail: (interviewId) => ["interview-reports", "detail", interviewId],
};

export const useGenerateInterviewReport = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: generateInterviewReportRequest,
    onSuccess: (data) => {
      const reportId = data?.interviewReport?._id;

      if (reportId) {
        queryClient.setQueryData(INTERVIEW_REPORT_QUERY_KEYS.detail(reportId), data);
      }

      queryClient.invalidateQueries({ queryKey: INTERVIEW_REPORT_QUERY_KEYS.list() });
    },
  });

  return {
    isLoading: mutation.isPending,
    error: mutation.error?.message ?? null,
    reportResponse: mutation.data ?? null,
    generateInterviewReport: mutation.mutateAsync,
  };
};

export const useInterviewReportsList = () => {
  return useQuery({
    queryKey: INTERVIEW_REPORT_QUERY_KEYS.list(),
    queryFn: getAllInterviewReportsRequest,
    staleTime: REPORT_QUERY_STALE_TIME_MS,
  });
};

export const useInterviewReportDetails = (interviewId, options = {}) => {
  return useQuery({
    queryKey: INTERVIEW_REPORT_QUERY_KEYS.detail(interviewId),
    queryFn: () => getInterviewReportByIdRequest(interviewId),
    enabled: Boolean(interviewId) && options.enabled !== false,
    staleTime: REPORT_QUERY_STALE_TIME_MS,
    initialData: options.initialData,
  });
};

// Backward-compatible exports
export const interviewReportQueryKeys = INTERVIEW_REPORT_QUERY_KEYS;
export const useInterviewReport = useGenerateInterviewReport;
export const useInterviewReports = useInterviewReportsList;
export const useInterviewReportById = useInterviewReportDetails;
