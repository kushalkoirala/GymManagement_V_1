"use client";
import { useState } from "react";
import { Camera, ArrowRight, Loader2, CheckCircle2, Upload } from "lucide-react"; // Optional: Icons make UI look premium

export default function FullBody360() {
  const [before, setBefore] = useState({ front: "", right: "", back: "", left: "" });
  const [after, setAfter] = useState({ front: "", right: "", back: "", left: "" });
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const toBase64 = (file, setter, key) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setter((prev) => ({ ...prev, [key]: reader.result }));
    reader.readAsDataURL(file);
  };

  const analyze = async () => {
    if (!before.front || !after.front) {
      return alert("Please upload at least the front photos to begin analysis.");
    }

    setLoading(true);
    setAnalysis("");

    try {
      const res = await fetch("/api/analyze-360", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ before, after }),
      });

      const data = await res.json();
      if (!data.success) throw new Error("AI Analysis failed");
      setAnalysis(data.analysis);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const PhotoSlot = ({ label, value, onChange }) => (
    <div className="relative group">
      <div className={`aspect-[3/4] rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all 
        ${value ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-slate-50 hover:border-slate-300"}`}>
        
        {value ? (
          <img src={value} alt={label} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <div className="flex flex-col items-center text-slate-400">
            <Camera className="w-8 h-8 mb-2" />
            <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
          </div>
        )}
        
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => onChange(e.target.files[0])}
        />
      </div>
      {value && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full shadow-lg">
          <CheckCircle2 className="w-4 h-4" />
        </div>
      )}
    </div>
  );

  const UploadSection = ({ title, state, setter }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <div className="w-2 h-6 bg-blue-600 rounded-full" />
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <PhotoSlot label="Front" value={state.front} onChange={(f) => toBase64(f, setter, "front")} />
        <PhotoSlot label="Right" value={state.right} onChange={(f) => toBase64(f, setter, "right")} />
        <PhotoSlot label="Back" value={state.back} onChange={(f) => toBase64(f, setter, "back")} />
        <PhotoSlot label="Left" value={state.left} onChange={(f) => toBase64(f, setter, "left")} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            360° Body Progress <span className="text-blue-600">Analyzer</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Upload your transformation photos from four angles. Our AI will analyze posture, muscle definition, and overall changes.
          </p>
        </div>

        {/* Upload Areas */}
        <div className="space-y-8">
          <UploadSection title="Before Photos" state={before} setter={setBefore} />
          
          <div className="flex justify-center">
            <div className="bg-white p-2 rounded-full shadow-md border border-slate-100">
               <ArrowRight className="w-6 h-6 text-slate-400 rotate-90 md:rotate-0" />
            </div>
          </div>

          <UploadSection title="After Photos" state={after} setter={setAfter} />
        </div>

        {/* Action Button */}
        <div className="mt-12 flex flex-col items-center">
          <button
            onClick={analyze}
            disabled={loading}
            className={`group relative flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95
              ${loading ? "bg-slate-400" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"}`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing Transformation...
              </>
            ) : (
              <>
                Analyze Progress
                <Upload className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {analysis && (
          <div className="mt-12 bg-white rounded-3xl p-8 shadow-2xl border-2 border-blue-50 transition-all animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span> AI Progress Report
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {analysis}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}