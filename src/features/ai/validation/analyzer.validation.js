/**
 * @file frontend/src/features/ai/validation/analyzer.validation.js
 * @description Client-side schema validation rules for interview analysis form inputs.
 */
import Joi from "joi";

export const analyzerSchema = Joi.object({
  selfDescription: Joi.string().trim().min(20).required().messages({
    "string.empty": "Self description is required",
    "string.min": "Self description should be at least 20 characters",
    "any.required": "Self description is required",
  }),
  jobDescription: Joi.string().trim().required().messages({
    "string.empty": "Job description is required",
    "any.required": "Job description is required",
  }),
  resumeFile: Joi.any()
    .custom((value, helpers) => {
      if (!value) {
        return helpers.error("any.required");
      }

      const fileName = typeof value.name === "string" ? value.name : "";
      const fileType = typeof value.type === "string" ? value.type : "";
      const isPdf = fileType === "application/pdf" || /\.pdf$/i.test(fileName);

      if (!isPdf) {
        return helpers.error("file.pdf");
      }

      return value;
    }, "resume file validation")
    .required()
    .messages({
      "any.required": "Resume PDF is required",
      "file.pdf": "Only PDF files are allowed",
    }),
});
