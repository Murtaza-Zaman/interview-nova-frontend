/**
 * @file frontend/src/features/ai/components/UploadZone.jsx
 * @description Drag-and-drop upload component for resume/PDF ingestion.
 */
export const UploadZone = ({ file, onFileSelect }) => {
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      onFileSelect(droppedFile);
    }
  };

  const handleChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <label
      className="group block cursor-pointer rounded-2xl border border-dashed border-violet-300/30 bg-white/5 p-8 text-center transition duration-300 hover:-translate-y-0.5 hover:border-violet-300/60 hover:bg-violet-400/10"
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      <input type="file" accept=".pdf" onChange={handleChange} hidden />
      <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl border border-violet-300/40 bg-violet-500/15 text-xs font-bold tracking-wide text-violet-200 transition group-hover:scale-105">PDF</div>
      <p className="mt-3 text-sm font-medium text-slate-100">Drag and drop your resume here</p>
      <p className="mt-1 text-xs text-slate-400">or click to browse (PDF only)</p>
      {file && <p className="mt-3 text-xs font-medium text-violet-200">Selected: {file.name}</p>}
    </label>
  );
};
