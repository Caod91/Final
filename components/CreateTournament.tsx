
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, Users, MapPin, ListChecks, PlayCircle, Trophy, Sparkles, Loader2, ChevronRight } from 'lucide-react';
import { getTournamentSuggestions } from '../geminiService';

export const CreateTournament: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Series',
    teams: [] as any[],
    stadiums: [] as any[],
    format: 'Standard'
  });

  const handleAISuggest = async () => {
    setLoading(true);
    const suggestion = await getTournamentSuggestions("Give me a cool name and 4 team names for a historic Test cricket tournament.");
    if (suggestion) {
      setFormData(prev => ({
        ...prev,
        name: suggestion.suggestedName,
        teams: suggestion.suggestedTeams
      }));
    }
    setLoading(false);
  };

  const steps = [
    { id: 1, title: 'CORE_INFO', icon: Info },
    { id: 2, title: 'TYPE', icon: Trophy },
    { id: 3, title: 'TEAMS', icon: Users },
    { id: 4, title: 'VENUES', icon: MapPin },
    { id: 5, title: 'FORMAT', icon: ListChecks },
    { id: 6, title: 'DEPLOY', icon: PlayCircle },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
      {/* Sidebar Navigation */}
      <div className="flex flex-col gap-4">
        {steps.map((s) => (
          <button
            key={s.id}
            onClick={() => setStep(s.id)}
            className={`flex items-center justify-between p-6 brutalist-border transition-all ${
              step === s.id ? 'bg-[#00ff00] brutalist-shadow translate-x-2' : 'bg-white hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="font-black text-2xl">{s.id.toString().padStart(2, '0')}</span>
              <span className="font-black uppercase tracking-widest">{s.title}</span>
            </div>
            {step === s.id && <ChevronRight size={24} strokeWidth={3} />}
          </button>
        ))}
      </div>

      {/* Main Panel */}
      <motion.div
        key={step}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white brutalist-border brutalist-shadow p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 font-black opacity-20 text-8xl">
          {step.toString().padStart(2, '0')}
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-12 border-b-8 border-black pb-8">
            <h2 className="text-7xl font-black tracking-tighter">{steps[step - 1].title}</h2>
            {step === 1 && (
              <button
                onClick={handleAISuggest}
                disabled={loading}
                className="bg-black text-[#00ff00] p-6 brutalist-border flex items-center gap-4 hover:translate-x-2 transition-transform disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                <span className="font-black text-xl">GEN_AI_ASSIST</span>
              </button>
            )}
          </div>

          <div className="min-h-[400px]">
            {step === 1 && (
              <div className="space-y-12">
                <div className="flex flex-col">
                  <label className="text-2xl font-black mb-4 uppercase">Tournament_ID_Label</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="INPUT_VALUE_HERE..."
                    className="brutalist-input text-4xl"
                  />
                </div>
                <div className="p-8 bg-black text-white brutalist-border">
                  <p className="font-bold text-lg uppercase italic">System Message: Ensure the name reflects the historical weight of the contest.</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {formData.teams.map((t, idx) => (
                  <div key={idx} className="p-8 brutalist-border bg-white brutalist-shadow flex flex-col items-start hover:bg-[#ff0000] hover:text-white transition-colors">
                    <span className="text-5xl font-black mb-4">{t.shortName}</span>
                    <h4 className="text-2xl font-bold uppercase">{t.name}</h4>
                  </div>
                ))}
                <button className="p-8 brutalist-border border-dashed border-4 flex flex-center justify-center items-center hover:bg-[#00ff00] transition-colors">
                  <span className="text-2xl font-black">+ ADD_TEAM_MANUAL</span>
                </button>
              </div>
            )}

            {step === 6 && (
              <div className="flex flex-col items-center justify-center py-20 gap-8">
                <div className="text-9xl animate-bounce">⚡</div>
                <p className="text-4xl font-black text-center">READY FOR DEPLOYMENT</p>
                <button 
                  onClick={() => alert('INITIALIZING_SIMULATION...')}
                  className="bg-[#ff0000] text-white p-10 text-4xl font-black brutalist-border brutalist-shadow hover:translate-x-2 transition-transform"
                >
                  EXECUTE_CREATE
                </button>
              </div>
            )}
          </div>

          <div className="mt-12 flex justify-between border-t-8 border-black pt-8">
            <button 
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              className="p-6 brutalist-border font-black text-xl hover:bg-black hover:text-white disabled:opacity-0 transition-all"
            >
              PREV_STEP
            </button>
            <button 
              onClick={() => step < 6 ? setStep(step + 1) : null}
              className={`p-6 brutalist-border font-black text-xl transition-all ${step === 6 ? 'hidden' : 'bg-black text-white hover:bg-[#00ff00] hover:text-black'}`}
            >
              NEXT_STEP ->
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
