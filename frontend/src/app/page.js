"use client";
import { useState } from 'react';
import salim from "../images/SalimProfessiona.jpg";
import ar from "../images/archita.jpeg";
export default function Home() {
  const [formData, setFormData] = useState({ radius: '', texture: '', smoothness: '', compactness: '', concavity: '' });
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
     //changez
const response = await fetch('https://prediction-ai-pee9.onrender.com/predict', { 
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
      const data = await response.json();
      setRes(data.result);
    } catch (error) {
      alert("Error: Backend server (app.py) is not running!");
    }
    setLoading(false);
    console.log(formData);
  };

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 scroll-smooth">
      
      {/* --- 1. Hero Banner Section --- */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 hover:scale-110"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            ProtonixIT <span className="text-teal-400 underline decoration-teal-500">Cancer AI</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 font-light max-w-3xl mx-auto leading-relaxed">
            Revolutionizing early diagnosis with high-precision machine learning. 
            Instant, reliable, and data-driven insights for a healthier tomorrow.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#predict" className="bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-teal-500/50 uppercase tracking-widest text-sm">
              Start Diagnosis
            </a>
            <a href="#about" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-10 py-4 rounded-xl font-bold transition-all uppercase tracking-widest text-sm">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* --- 2. Prediction Section --- */}
      <section id="predict" className="py-24 px-6 bg-gray-50">
        <div className="max-w-xl mx-auto bg-white p-10 md:p-14 rounded-[2.5rem] shadow-2xl border border-gray-100 -mt-40 relative z-20">
          <div className="mb-10 text-center">
            <span className="text-teal-600 font-bold tracking-widest text-xs uppercase">AI Analysis Portal</span>
            <h2 className="text-4xl font-extrabold text-gray-800 mt-2">Clinical Metrics</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {Object.keys(formData).map(key => (
                <div key={key} className="flex flex-col">
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-2 ml-2 tracking-widest">{key}</label>
                  <input 
                    type="number" step="any" placeholder={`0.00`} required
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-gray-700"
                    onChange={(e) => setFormData({...formData, [key]: e.target.value})} 
                  />
                </div>
              ))}
            </div>
            <button 
              disabled={loading}
              className="w-full bg-teal-600 text-white p-5 rounded-2xl font-black text-lg hover:bg-teal-700 shadow-xl shadow-teal-200 transition-all transform active:scale-[0.98] disabled:bg-gray-400 mt-4 uppercase tracking-widest"
            >
              {loading ? "Analyzing Data..." : "Run AI Analysis"}
            </button>
          </form>

          {res !== null && (
            <div className={`mt-10 p-8 rounded-3xl text-center border-2 animate-in fade-in zoom-in duration-500 ${res === 1 ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'}`}>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-3">Diagnostic Result</h3>
              <p className="text-5xl font-black italic">
                {res === 1 ? "MALIGNANT" : "BENIGN"}
              </p>
              <p className="mt-4 text-sm font-medium leading-relaxed italic opacity-80">
                {res === 1 ? "Warning: High risk of malignancy detected. Consult a doctor immediately." : "Data suggests the condition is likely Benign (Non-Cancerous)."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* --- 3. About Us Section (With Image) --- */}
      <section id="about" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070" 
              alt="Lab Research" 
              className="rounded-[3rem] shadow-2xl z-10 relative h-[500px] w-full object-cover"
            />
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-teal-100 rounded-full -z-0"></div>
          </div>
          <div className="space-y-8">
            <span className="text-teal-600 font-black tracking-widest text-sm uppercase">About Our Mission</span>
            <h2 className="text-5xl font-bold text-gray-900 leading-tight">ProtonixIT Innovation Hub</h2>
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              We specialize in the intersection of Artificial Intelligence and Healthcare. Our mission is to provide 
              low-cost, high-speed diagnostic tools to rural and underserved populations.
            </p>
            <div className="flex items-center gap-6 p-6 bg-teal-50 rounded-3xl border border-teal-100">
              <div className="text-4xl">🔬</div>
              <div>
                <h4 className="font-bold text-teal-900 uppercase text-sm tracking-widest">Dataset Quality</h4>
                <p className="text-teal-700 text-sm">Powered by the Wisconsin Breast Cancer Diagnostic Dataset (UCI Repository).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. Team Members Section --- */}
      <section className="py-32 bg-gray-900 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-4 italic">Meet The Founders</h2>
            <p className="text-gray-400 tracking-[0.2em] uppercase text-sm">The brains behind ProtonixIT</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            {/* Team Member 1 */}
            <div className="group text-center">
              <div className="relative inline-block">
                <img 
                  src={salim}
                  alt="JD" 
                  className="w-48 h-48 rounded-[2.5rem] object-cover border-4 border-gray-800 transition-all group-hover:border-teal-500 group-hover:rotate-3 shadow-2xl mb-8 mx-auto"
                />
              </div>
              <h3 className="text-3xl font-bold mb-1 tracking-tight">Mohammad Salim</h3>
              <p className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-6">Lead AI Scientist</p>
              <div className="h-0.5 w-12 bg-gray-700 mx-auto group-hover:w-24 transition-all duration-500"></div>
            </div>

            {/* Team Member 2 */}
            <div className="group text-center">
              <div className="relative inline-block">
                <img 
                  src={ar} 
                  alt="AS" 
                  className="w-48 h-48 rounded-[2.5rem] object-cover border-4 border-gray-800 transition-all group-hover:border-teal-500 group-hover:-rotate-3 shadow-2xl mb-8 mx-auto"
                />
              </div>
              <h3 className="text-3xl font-bold mb-1 tracking-tight">Archita Nath</h3>
              <p className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-6">Full Stack Developer</p>
              <div className="h-0.5 w-12 bg-gray-700 mx-auto group-hover:w-24 transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 bg-black text-center border-t border-gray-900">
        <p className="text-gray-600 text-xs font-bold uppercase tracking-[0.5em]">
          © 2026 ProtonixIT Innovation Lab | Health-Tech Division
        </p>
      </footer>
    </main>
  );
}