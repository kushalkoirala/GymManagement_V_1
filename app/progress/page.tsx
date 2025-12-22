"use client";

import React, { useState, ChangeEvent } from "react";
import ReactCompareImage from "react-compare-image";
import { 
  Sparkles, 
  Upload, 
  Activity, 
  Dumbbell, 
  HeartPulse,
  ChevronRight, 
  WavesLadder,
  Loader2,
  PersonStanding,
  User,
  BicepsFlexed,
  Zap,
  CircleUser,
  Scale,
  StretchHorizontal
} from "lucide-react";

// Types for our categories
interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// Props for the UploadCard component
interface UploadCardProps {
  label: string;
  img: string;
  onUpload: (file: File | undefined) => void;
}

export default function Progress() {
  const [beforeUrl, setBeforeUrl] = useState<string>("");
  const [afterUrl, setAfterUrl] = useState<string>("");
  const [bodyPart, setBodyPart] = useState<string>("");
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Define categories with fallback icons to avoid Lucide version errors
  const categories: Category[] = [
    { id: "Biceps", label: "Biceps", icon: <BicepsFlexed  className="w-6 h-6" /> },
    { id: "Chest", label: "Chest", icon: <HeartPulse className="w-6 h-6" /> },
    { id: "Stomach / Abs", label: "Abs", icon: <Activity className="w-6 h-6" /> },
    { id: "Back", label: "Back", icon: <WavesLadder className="w-6 h-6" /> },
    { id: "Legs", label: "Legs", icon: <Dumbbell className="w-6 h-6" />  },
    { id: "Shoulders", label: "Shoulders", icon: <Zap className="w-6 h-6" /> },
    { id: "Full Body", label: "Full Body", icon: <PersonStanding className="w-6 h-6" /> },
  ];

  const toBase64 = (file: File | undefined, setter: (val: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setter(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const analyze = async () => {
    if (!beforeUrl || !afterUrl) return alert("Upload both images first!");
    if (!bodyPart) return alert("Please select a focus area!");

    setLoading(true);
    setAnalysis("");

    try {
      const res = await fetch("/api/analyze-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ beforeUrl, afterUrl, bodyPart }),
      });
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (err) {
      alert("AI analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">
            AI Visual <span className="text-blue-500">Progress</span>
          </h1>
          <p className="text-slate-400">Select a target area and compare your transformation</p>
        </div>

        {/* 1. Body Part Selector (Icon Grid) */}
        <div className="mb-10">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 block text-center">
            Step 1: Select Focus Area
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setBodyPart(cat.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                  bodyPart === cat.id 
                    ? "border-blue-500 bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]" 
                    : "border-slate-800 bg-slate-900/50 text-slate-500 hover:border-slate-700"
                }`}
              >
                <div className={`mb-2 ${bodyPart === cat.id ? "scale-110" : "scale-100"} transition-transform`}>
                  {cat.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-tight leading-none text-center">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Upload/Comparison Section */}
        <div className="mb-10">
          {!beforeUrl || !afterUrl ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UploadCard 
                label="Before Photo" 
                img={beforeUrl} 
                onUpload={(f) => toBase64(f, setBeforeUrl)} 
              />
              <UploadCard 
                label="After Photo" 
                img={afterUrl} 
                onUpload={(f) => toBase64(f, setAfterUrl)} 
              />
            </div>
          ) : (
            <div className="rounded-3xl overflow-hidden border-4 border-slate-800 bg-slate-900 shadow-2xl">
              <ReactCompareImage 
                leftImage={beforeUrl} 
                rightImage={afterUrl} 
                sliderLineColor="#3b82f6"
                sliderLineWidth={3}
              />
              <button 
                type="button"
                onClick={() => {setBeforeUrl(""); setAfterUrl("");}}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Change Images
              </button>
            </div>
          )}
        </div>

        {/* 3. Action Button */}
        <div className="flex justify-center mb-12">
          <button
            type="button"
            onClick={analyze}
            disabled={loading || !beforeUrl || !afterUrl || !bodyPart}
            className={`
              flex items-center gap-3 px-12 py-4 rounded-full font-black uppercase tracking-widest transition-all
              ${loading ? "bg-slate-700" : "bg-white text-black hover:bg-blue-500 hover:text-white disabled:bg-slate-800 disabled:text-slate-600"}
            `}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {loading ? "Analyzing..." : "Analyze Progress"}
          </button>
        </div>

        {/* 4. Analysis Result */}
        {analysis && (
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2.5rem] p-1 shadow-xl">
            <div className="bg-[#0f172a] rounded-[2.4rem] p-8">
              <h2 className="text-blue-400 font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-sm">
                <ChevronRight className="w-4 h-4" /> AI Feedback: {bodyPart}
              </h2>
              <p className="text-slate-200 text-lg leading-relaxed italic">
                "{analysis}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function UploadCard({ label, img, onUpload }: UploadCardProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onUpload(file);
  };

  return (
    <div className="relative aspect-[4/5] bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-3xl hover:border-blue-500/50 transition-all flex flex-col items-center justify-center overflow-hidden">
      {img ? (
        <img src={img} alt={label} className="w-full h-full object-cover" />
      ) : (
        <div className="text-center">
          <Upload className="w-10 h-10 text-slate-700 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-500 uppercase">{label}</p>
        </div>
      )}
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleChange} 
        className="absolute inset-0 opacity-0 cursor-pointer" 
      />
    </div>
  );
}