"use client";

import { useState } from "react";
import { 
  Camera, 
  Sparkles, 
  Flame, 
  Beef, 
  Wheat, 
  Droplet, 
  UploadCloud, 
  AlertCircle,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FoodItem = {
  name: string;
  hindiName?: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type ResultData = {
  foods: FoodItem[];
  total: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  confidence: string;
  notes?: string;
};

export default function CalorieTrackerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(null);
      setError(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const clearImage = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  const analyzeFood = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/analyze-food", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to analyze food");
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-orange-100">
      {/* Dynamic Background Accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-orange-200/30 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-purple-200/30 blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3 h-3" /> AI Powered Nutrition
          </motion.div>
          <h1 className="text-6xl font-black tracking-tight text-slate-900 mb-4">
            Nutri<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">Vision</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-md mx-auto">
            Professional-grade meal analysis through the lens of your camera.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Upload */}
          <section className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="relative group bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden p-3"
            >
              <label className="cursor-pointer block">
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <div className={`relative rounded-[1.5rem] transition-all duration-500 ${preview ? 'h-[400px]' : 'h-[300px] border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center'}`}>
                  {preview ? (
                    <>
                      <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-[1.5rem]" />
                      <button 
                        onClick={(e) => { e.preventDefault(); clearImage(); }}
                        className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-4 text-orange-500 group-hover:scale-110 transition-transform duration-300">
                        <UploadCloud className="w-8 h-8" />
                      </div>
                      <p className="text-slate-900 font-semibold text-lg">Drop your meal photo</p>
                      <p className="text-slate-500 text-sm mt-1">Click to browse your gallery</p>
                    </div>
                  )}
                </div>
              </label>
            </motion.div>

            <button
              onClick={analyzeFood}
              disabled={loading || !file}
              className="w-full relative group h-16 bg-slate-900 text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-slate-900/20"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Analyze Dish <Sparkles className="w-5 h-5" /></>
                )}
              </div>
            </button>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </motion.div>
            )}
          </section>

          {/* Right Column: Results */}
          <section>
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <ResultsView data={result} />
                </motion.div>
              ) : (
                <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                  <Camera className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-lg">Your nutritional breakdown will appear here after analysis.</p>
                </div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </div>
  );
}

function ResultsView({ data }: { data: ResultData }) {
  return (
    <div className="space-y-8">
      {/* Dashboard Style Macros */}
      <div className="grid grid-cols-2 gap-4">
        <MacroCard icon={<Flame />} label="Calories" value={data.total.calories} unit="kcal" color="bg-orange-500" />
        <MacroCard icon={<Beef />} label="Protein" value={data.total.protein} unit="g" color="bg-rose-500" />
        <MacroCard icon={<Wheat />} label="Carbs" value={data.total.carbs} unit="g" color="bg-amber-500" />
        <MacroCard icon={<Droplet />} label="Fat" value={data.total.fat} unit="g" color="bg-blue-500" />
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            Meal Components
          </h2>
          <div className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-100">
            {data.confidence} Match
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {data.foods.map((food, idx) => (
            <div key={idx} className="py-6 first:pt-0 last:pb-0">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">{food.name}</h3>
                  {food.hindiName && <p className="text-slate-400 text-sm font-medium">{food.hindiName}</p>}
                </div>
                <span className="text-sm font-bold px-3 py-1 bg-slate-100 rounded-full">{food.portion}</span>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                <MiniPill label="Cal" value={food.calories} />
                <MiniPill label="P" value={food.protein} />
                <MiniPill label="C" value={food.carbs} />
                <MiniPill label="F" value={food.fat} />
              </div>
            </div>
          ))}
        </div>

        {data.notes && (
          <div className="mt-8 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-sm text-blue-700 leading-relaxed italic">
            <strong>Chef's Note:</strong> {data.notes}
          </div>
        )}
      </div>
    </div>
  );
}

function MacroCard({ icon, label, value, unit, color }: any) {
  return (
    <div className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className={`${color} w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-${color}/20`}>
        {icon}
      </div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-slate-900">{value}</span>
        <span className="text-slate-400 text-sm font-bold">{unit}</span>
      </div>
    </div>
  );
}

function MiniPill({ label, value }: any) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl flex-shrink-0">
      <span className="text-[10px] font-bold text-slate-400 uppercase">{label}</span>
      <span className="text-sm font-bold text-slate-700">{value}</span>
    </div>
  );
}