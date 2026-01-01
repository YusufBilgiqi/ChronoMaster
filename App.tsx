
import React, { useState, useEffect } from 'react';
import { AppView, ServiceEntry } from './types';
import { PHASES, SYLLABUS_LESSONS, QUIZZES, MOVEMENTS, LOCAL_THEORY_DATA, MOVEMENT_SERVICE_GUIDES, MOVEMENT_TDS, TechnicalPart, PART_SPECS } from './constants';
import { getReviewFeedback, getDeepDive } from './services/gemini';
import { 
  Wrench, 
  BookOpen, 
  GraduationCap, 
  ClipboardList, 
  Briefcase, 
  ChevronRight, 
  Settings, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Play,
  ArrowRight,
  User,
  Star,
  Cpu,
  Zap,
  Dna,
  FileText,
  Layers,
  Info,
  TableProperties,
  Droplet,
  ChevronDown,
  Maximize2,
  ExternalLink,
  Download,
  Crosshair,
  ShieldCheck,
  Target
} from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);
  const [serviceEntries, setServiceEntries] = useState<ServiceEntry[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [topicContent, setTopicContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeepDive = async (topic: string) => {
    setSelectedTopic(topic);
    
    // First, check if we have this text locally
    if (LOCAL_THEORY_DATA[topic]) {
      setTopicContent(LOCAL_THEORY_DATA[topic]);
      return;
    }

    // Otherwise, call the AI Master
    setIsLoading(true);
    const content = await getDeepDive(topic);
    setTopicContent(content);
    setIsLoading(false);
  };

  const SidebarIcon = ({ view, icon: Icon, label }: { view: AppView, icon: any, label: string }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left group ${
        activeView === view 
          ? 'bg-amber-500/10 text-amber-500 border-r-2 border-amber-500' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      }`}
    >
      <Icon size={20} className={activeView === view ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
      <span className="font-medium text-sm">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-amber-500 p-2 rounded-lg">
              <Clock className="text-slate-900" size={24} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-bold tracking-tight font-serif italic text-amber-50">ChronoMaster</h1>
          </div>
          
          <nav className="space-y-1">
            <SidebarIcon view={AppView.DASHBOARD} icon={Settings} label="The Path" />
            <SidebarIcon view={AppView.BENCH} icon={Wrench} label="The Bench" />
            <SidebarIcon view={AppView.LIBRARY} icon={BookOpen} label="The Library" />
            <SidebarIcon view={AppView.EXAM_ROOM} icon={GraduationCap} label="The Exam Room" />
            <SidebarIcon view={AppView.PROGRESS_LOG} icon={ClipboardList} label="Service Book" />
            <SidebarIcon view={AppView.CAREER} icon={Briefcase} label="Career Hub" />
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-amber-500 font-bold">
              AM
            </div>
            <div>
              <p className="text-sm font-semibold">Apprentice Maker</p>
              <p className="text-xs text-slate-500">Level 1 • Foundation</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-gradient-to-br from-slate-950 to-slate-900">
        <header className="sticky top-0 z-10 px-8 py-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex justify-between items-center">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-slate-500 font-bold">Workspace</h2>
            <p className="text-xl font-semibold capitalize">{activeView.replace('_', ' ')}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-[10px] text-slate-400">
                  {i}
                </div>
              ))}
            </div>
            <button className="bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors">
              <Search size={18} />
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {activeView === AppView.DASHBOARD && (
            <Dashboard 
              onPhaseClick={(id) => handleDeepDive(`Detailed Curriculum for Phase ${id}`)} 
              onLessonSelect={handleDeepDive}
            />
          )}
          {activeView === AppView.BENCH && <Bench />}
          {activeView === AppView.LIBRARY && <Library onTopicSelect={handleDeepDive} />}
          {activeView === AppView.EXAM_ROOM && <ExamRoom />}
          {activeView === AppView.PROGRESS_LOG && <ProgressLog entries={serviceEntries} setEntries={setServiceEntries} />}
          {activeView === AppView.CAREER && <CareerHub />}
        </div>

        {/* Modal for Deep Dives */}
        {selectedTopic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500">
                     <FileText size={18} />
                   </div>
                   <h3 className="text-xl font-serif italic text-amber-500">{selectedTopic}</h3>
                </div>
                <button onClick={() => { setSelectedTopic(null); setTopicContent(null); }} className="text-slate-400 hover:text-white transition-colors">
                  ✕
                </button>
              </div>
              <div className="p-8 overflow-y-auto prose prose-invert prose-amber max-w-none">
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-slate-800 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-slate-800 rounded w-1/2 animate-pulse"></div>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap leading-relaxed text-slate-300 font-sans">
                    {topicContent}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

/* --- SUBCOMPONENTS --- */

const Dashboard: React.FC<{ 
  onPhaseClick: (id: number) => void,
  onLessonSelect: (title: string) => void 
}> = ({ onPhaseClick, onLessonSelect }) => {
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);

  return (
    <div className="space-y-12">
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] -mr-32 -mt-32 rounded-full transition-all group-hover:bg-amber-500/20"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-serif font-bold text-slate-50 italic">The Horological Apprenticeship</h1>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              Becoming a professional watchmaker is a journey of "microns and patience." Master the WOSTEP standards through a rigorous 12-month program.
            </p>
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => onPhaseClick(1)}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                Continue Learning <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => onLessonSelect("Lesson 1: Introduction to Horology")}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all"
              >
                View Full Syllabus
              </button>
            </div>
          </div>
          <div className="hidden md:block w-48 h-48 border-4 border-slate-800 rounded-full flex items-center justify-center p-4">
            <div className="w-full h-full border-2 border-amber-500/50 rounded-full flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-amber-500">12</span>
              <span className="text-[10px] uppercase tracking-tighter text-slate-500">Months Left</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PHASES.map((phase) => (
          <div key={phase.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/50 transition-all group cursor-pointer" onClick={() => onPhaseClick(phase.id)}>
            <div className="flex justify-between items-start mb-4">
              <div className="bg-slate-800 p-3 rounded-xl text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors">
                <Clock size={20} />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase">{phase.duration}</span>
            </div>
            <h3 className="text-lg font-bold mb-2">{phase.title}</h3>
            <p className="text-sm text-slate-400 line-clamp-2 mb-4">{phase.goal}</p>
            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-0 transition-all duration-500 group-hover:w-1/4"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <section className="lg:col-span-2">
          <h2 className="text-2xl font-serif font-bold mb-6 italic text-amber-50">Apprenticeship Blueprint</h2>
          <div className="space-y-4">
            {PHASES.map((phase, idx) => (
              <div key={phase.id} className="flex gap-6 items-start">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                    {phase.id}
                  </div>
                  {idx !== PHASES.length - 1 && <div className="w-px h-full bg-slate-800 mt-2 min-h-[40px]"></div>}
                </div>
                <div className="flex-1 pb-10">
                  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:bg-slate-900 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-amber-500 mb-2">Knowledge Core</h4>
                        <ul className="space-y-2">
                          {phase.knowledge.map((k, i) => (
                            <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                              <CheckCircle2 size={14} className="text-slate-600 mt-1 shrink-0" />
                              {k}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col justify-center items-center md:border-l border-slate-800 text-center px-4">
                        <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Phase Quiz</p>
                        <p className="text-lg font-bold mb-4">{phase.quizTopic}</p>
                        <button 
                          onClick={() => onPhaseClick(phase.id)}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors"
                        >
                          Launch Module
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-1">
          <h2 className="text-2xl font-serif font-bold mb-6 italic text-amber-50 flex items-center gap-3">
             <ClipboardList className="text-amber-500" size={24} /> Full Curriculum
          </h2>
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden">
            <div className="max-h-[800px] overflow-y-auto">
              {SYLLABUS_LESSONS.map((lesson) => (
                <div key={lesson.id} className="border-b border-slate-800 last:border-0">
                  <button 
                    onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
                    className="w-full flex items-center justify-between p-5 hover:bg-slate-800/50 transition-colors group"
                  >
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-amber-500 transition-colors">{lesson.title}</span>
                    <ChevronDown size={18} className={`text-slate-600 transition-transform duration-300 ${expandedLesson === lesson.id ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedLesson === lesson.id && (
                    <div className="p-5 bg-slate-950/30 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-xs text-slate-400 mb-4 italic leading-relaxed">{lesson.summary}</p>
                      <button 
                        onClick={() => onLessonSelect(lesson.title)}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-widest text-amber-500 transition-all"
                      >
                        Study Module
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-900 border-t border-slate-800 text-center">
               <p className="text-[10px] text-slate-500 font-bold uppercase">13 Total Lessons Indexed</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const Bench: React.FC = () => {
  const [selectedMovementId, setSelectedMovementId] = useState<string>(MOVEMENTS[0].id);
  const [benchMode, setBenchMode] = useState<'visual' | 'service' | 'tds' | 'pdf'>('visual');
  const [selectedSpecPart, setSelectedSpecPart] = useState<string | null>(null);
  const [partsSearch, setPartsSearch] = useState('');

  const selectedMovement = MOVEMENTS.find(m => m.id === selectedMovementId) || MOVEMENTS[0];
  const serviceGuide = MOVEMENT_SERVICE_GUIDES[selectedMovementId] || "Service guide not available.";
  const tdsParts = MOVEMENT_TDS[selectedMovementId] || [];

  const filteredParts = tdsParts.filter(p => 
    p.name.toLowerCase().includes(partsSearch.toLowerCase()) || 
    p.id.toLowerCase().includes(partsSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(partsSearch.toLowerCase())
  );

  const activeSpec = selectedSpecPart ? PART_SPECS[selectedSpecPart] : null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 min-h-[700px] flex flex-col relative overflow-hidden">
            <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20">
              <button 
                onClick={() => setBenchMode('visual')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${benchMode === 'visual' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                <Layers size={14} /> Visual Workbench
              </button>
              <button 
                onClick={() => setBenchMode('service')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${benchMode === 'service' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                <FileText size={14} /> Service Guide
              </button>
              <button 
                onClick={() => setBenchMode('tds')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${benchMode === 'tds' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                <TableProperties size={14} /> Technical Data (TDS)
              </button>
              <button 
                onClick={() => setBenchMode('pdf')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${benchMode === 'pdf' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                <FileText size={14} className="text-red-500" /> Factory Manual (PDF)
              </button>
            </div>

            {benchMode === 'visual' && (
              <div className="flex-1 flex flex-col items-center pt-10 overflow-y-auto scrollbar-hide">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1509048191080-d2984bad6ad5?auto=format&fit=crop&q=80&w=1200')] bg-cover grayscale"></div>
                
                <div className="relative z-10 text-center space-y-6 mb-8 w-full">
                  <div className="w-40 h-40 mx-auto rounded-full border-[6px] border-slate-800 flex items-center justify-center relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-0 border-4 border-amber-500/20 rounded-full animate-[spin_30s_linear_infinite]"></div>
                    <div className="w-1 h-20 bg-amber-500 absolute -top-4 rounded-full transform origin-bottom animate-[spin_60s_linear_infinite]"></div>
                    <div className="w-12 h-12 bg-slate-900 border-2 border-slate-700 rounded-full flex items-center justify-center z-10 shadow-xl">
                      <Wrench className="text-amber-500" size={24} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif italic text-white">{selectedMovement.name}</h3>
                    <p className="text-slate-400 text-xs max-w-sm mx-auto">Explore key movement components. Click a part to see its technical function, clearances, and assembly requirements.</p>
                  </div>
                </div>

                <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 w-full mb-8 max-h-60 overflow-y-auto p-1 scrollbar-thin">
                  {Object.keys(PART_SPECS).map(part => (
                    <button 
                      key={part} 
                      onClick={() => setSelectedSpecPart(selectedSpecPart === part ? null : part)}
                      className={`p-2 backdrop-blur-md border rounded-xl text-center transition-all group ${selectedSpecPart === part ? 'bg-amber-500 border-amber-400 text-slate-950' : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:border-amber-500 hover:bg-slate-800'}`}
                    >
                      <p className={`text-[9px] font-bold uppercase mb-0.5 ${selectedSpecPart === part ? 'text-slate-900/70' : 'text-slate-500 group-hover:text-amber-500'}`}>Spec</p>
                      <p className={`font-semibold text-[11px] truncate ${selectedSpecPart === part ? 'text-slate-950' : 'text-slate-200'}`}>{part}</p>
                    </button>
                  ))}
                </div>

                {activeSpec && (
                  <div className="relative z-10 w-full bg-slate-950/60 border border-slate-800 rounded-3xl p-6 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-amber-500 text-slate-950 p-2 rounded-xl shadow-lg shadow-amber-500/20">
                          <Crosshair size={20} />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold font-serif italic text-amber-50">{activeSpec.title}</h4>
                          <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">{selectedSpecPart}</p>
                        </div>
                      </div>
                      <button onClick={() => setSelectedSpecPart(null)} className="text-slate-600 hover:text-white transition-colors">✕</button>
                    </div>

                    <p className="text-sm text-slate-300 mb-6 italic leading-relaxed bg-slate-800/30 p-3 rounded-lg border-l-2 border-amber-500">
                      {activeSpec.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">General Requirements</p>
                        <ul className="space-y-2">
                          {activeSpec.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 size={12} className="text-amber-500 mt-0.5 shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                            <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Clearance</p>
                            <p className="font-mono text-xs text-amber-500">{activeSpec.clearances}</p>
                          </div>
                          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                            <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Lubrication</p>
                            <p className="font-mono text-xs text-emerald-500">{activeSpec.lubrication}</p>
                          </div>
                        </div>
                        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
                           <div className="flex items-center gap-2 mb-1">
                             <AlertCircle size={12} className="text-amber-500" />
                             <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">Master's Critical Check</p>
                           </div>
                           <p className="text-[11px] text-slate-400 italic leading-relaxed">{activeSpec.criticalCheck}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {benchMode === 'service' && (
              <div className="flex-1 pt-12 animate-in slide-in-from-bottom-4 duration-500">
                <div className="bg-slate-950/50 rounded-2xl p-8 border border-slate-800 h-full overflow-y-auto">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="bg-amber-500/10 p-2 rounded-lg text-amber-500"><Info size={20} /></div>
                      <h4 className="text-xl font-bold font-serif italic">Technical Service Procedure</h4>
                   </div>
                   <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-300">
                     {serviceGuide}
                   </div>
                </div>
              </div>
            )}

            {benchMode === 'tds' && (
              <div className="flex-1 pt-12 animate-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                <div className="bg-slate-950/50 rounded-2xl border border-slate-800 flex flex-col h-full">
                  <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <h4 className="text-lg font-bold font-serif italic flex items-center gap-2">
                         Exploded Parts List: {selectedMovement.id.toUpperCase()}
                      </h4>
                      <p className="text-xs text-slate-500 font-mono">Reference factory standards for assembly.</p>
                    </div>
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                      <input 
                        type="text" 
                        value={partsSearch}
                        onChange={(e) => setPartsSearch(e.target.value)}
                        placeholder="Search parts by name/ID..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="sticky top-0 bg-slate-900 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="px-6 py-3">Part ID</th>
                          <th className="px-6 py-3">Name</th>
                          <th className="px-6 py-3">Category</th>
                          <th className="px-6 py-3">Lubrication</th>
                          <th className="px-6 py-3">Service Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {filteredParts.map(part => (
                          <tr key={part.id} className="hover:bg-slate-800/30 transition-colors group">
                            <td className="px-6 py-4 font-mono text-amber-500/80 group-hover:text-amber-500">{part.id}</td>
                            <td className="px-6 py-4 font-bold text-slate-200">{part.name}</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-400">{part.category}</span>
                            </td>
                            <td className="px-6 py-4">
                              {part.lubrication ? (
                                <div className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                                  <Droplet size={10} /> {part.lubrication}
                                </div>
                              ) : (
                                <span className="text-slate-600">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-slate-400 italic">{part.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {benchMode === 'pdf' && (
              <div className="flex-1 pt-12 animate-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl flex flex-col h-full overflow-hidden shadow-inner">
                  <div className="p-3 bg-slate-900/80 border-b border-slate-700 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded uppercase">PDF</span>
                      <span className="text-xs font-mono text-slate-400">{selectedMovement.name}_TechGuide.pdf</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="text-slate-400 hover:text-white"><Maximize2 size={16} /></button>
                      <a href={selectedMovement.manualUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider">
                        Open <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-800 relative group">
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity">
                      <Clock size={400} />
                    </div>
                    <iframe 
                      src={selectedMovement.manualUrl + "#toolbar=0&navpanes=0&scrollbar=0"} 
                      className="w-full h-full border-none relative z-10"
                      title={`${selectedMovement.name} Factory Manual`}
                    />
                    <div className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center p-12 bg-slate-900/90 pointer-events-none">
                      <FileText size={64} className="text-slate-700 mb-6" />
                      <h4 className="text-xl font-serif italic text-slate-300 mb-2">Technical Document Bridge</h4>
                      <p className="text-sm text-slate-500 max-w-md">Some browsers require you to open factory documents in a new secure tab. Use the "External Link" button above to view the official PDF.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-100">
              <Cpu size={20} className="text-amber-500" /> Movement Library
            </h3>
            <div className="space-y-3">
              {MOVEMENTS.map(m => (
                <button 
                  key={m.id} 
                  onClick={() => setSelectedMovementId(m.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all group border-2 ${selectedMovementId === m.id ? 'bg-slate-800 border-amber-500/50' : 'bg-slate-900 border-transparent hover:bg-slate-800 hover:border-slate-700'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`font-bold transition-colors ${selectedMovementId === m.id ? 'text-amber-500' : 'text-slate-300'}`}>{m.name}</h4>
                    <span className="px-2 py-0.5 bg-slate-950 text-[10px] rounded font-bold text-slate-400">{m.difficulty}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-2">{m.description}</p>
                  <div className="flex gap-3 text-[10px] text-slate-500 font-bold uppercase">
                    <span className="flex items-center gap-1"><Layers size={10} /> {m.parts} Parts</span>
                    <span className="flex items-center gap-1"><Zap size={10} /> {m.type}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Download size={16} /> Asset Manifest
            </h4>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Factory Reference</p>
              <p className="text-xs font-mono text-slate-300 mb-4">{selectedMovement.name}_Tech_Spec.pdf</p>
              <button 
                onClick={() => window.open(selectedMovement.manualUrl, '_blank')}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-bold uppercase transition-all"
              >
                Download PDF Archive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Library component for digital horological summaries.
const Library: React.FC<{ onTopicSelect: (topic: string) => void }> = ({ onTopicSelect }) => {
  const books = [
    { title: "The Theory of Horology", focus: "Physics & Theory", tags: ["Torque", "Ratios", "Friction"] },
    { title: "Fried’s Watch Repairer’s Manual", focus: "Practical Application", tags: ["Cannon Pinion", "Oiling", "Faults"] },
    { title: "Watchmaking by George Daniels", focus: "Master Level", tags: ["Escapement", "Spring Design"] },
    { title: "Practical Watch Repairing", focus: "Common Calibers", tags: ["Barrel", "Cleaning", "Vintage"] }
  ];

  const topics = [
    "Motive Force", "Torque Calculation", "Hooke's Law", "Going Barrel Advantage", "Mainspring Cubic Strength", "12:1 Motion Work Ratio", "Friction Drive Pips", "Recoiling Click Mechanics"
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-serif italic text-slate-50 mb-2">The Reference Library</h2>
          <p className="text-slate-400">Digital summaries and deep-dives from the most revered horological texts.</p>
        </div>
        <div className="flex gap-2">
          {['All', 'Theory', 'Practical', 'Advanced'].map(cat => (
            <button key={cat} className="px-4 py-1.5 rounded-full text-xs font-bold bg-slate-800 hover:bg-slate-700 transition-colors">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map(book => (
          <div 
            key={book.title} 
            onClick={() => onTopicSelect(book.title)}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:translate-y-[-4px] transition-all group flex flex-col h-full cursor-pointer hover:border-amber-500/50"
          >
            <div className="bg-slate-800 aspect-[3/4] rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
               <BookOpen size={48} className="text-slate-700 group-hover:text-amber-500/40 transition-colors" />
               <div className="absolute bottom-4 left-4 right-4 text-center">
                 <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">{book.focus}</p>
                 <p className="text-[10px] text-slate-500 mt-1">Click to Read Summary</p>
               </div>
            </div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-amber-500 transition-colors">{book.title}</h3>
            <div className="flex flex-wrap gap-1 mt-auto">
              {book.tags.map(tag => (
                <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-slate-800 rounded text-slate-500 font-bold uppercase">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <section>
        <h3 className="text-xl font-serif italic text-amber-500 mb-6 flex items-center gap-2"><Dna size={20} /> Horological Physics Modules</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topics.map(topic => (
            <button
              key={topic}
              onClick={() => onTopicSelect(topic)}
              className="px-4 py-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-amber-500 transition-all flex items-center gap-3 group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 shrink-0">
                <Search size={14} />
              </div>
              <span className="font-semibold text-sm text-slate-300 group-hover:text-white transition-colors">{topic}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

// ExamRoom component for the examination hall and knowledge validation.
const ExamRoom: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState<number | null>(null);

  const startQuiz = (phaseId: number) => {
    setSelectedPhase(phaseId);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setAnswered(null);
  };

  const handleAnswer = (idx: number) => {
    if (answered !== null) return;
    setAnswered(idx);
    const quiz = QUIZZES[selectedPhase!];
    if (idx === quiz[currentQuestion].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    const quiz = QUIZZES[selectedPhase!];
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(q => q + 1);
      setAnswered(null);
    } else {
      setShowResult(true);
    }
  };

  if (selectedPhase === null) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-amber-500/10 rounded-3xl flex items-center justify-center text-amber-500 mx-auto mb-6">
            <GraduationCap size={40} />
          </div>
          <h2 className="text-3xl font-serif italic font-bold">The Examination Hall</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Validate your knowledge across the four pillars of the WOSTEP curriculum. A score of 80% is required to "service" the next phase.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PHASES.map(phase => (
            <div key={phase.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-amber-500 transition-all">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phase {phase.id}</span>
                <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">Timed</span>
              </div>
              <h3 className="text-lg font-bold mb-2">{phase.quizTopic}</h3>
              <p className="text-sm text-slate-400 mb-6">Test covers: {phase.knowledge.slice(0, 2).join(', ').substring(0, 60)}...</p>
              <button 
                onClick={() => startQuiz(phase.id)}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-amber-500 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Start Examination <Play size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const quiz = QUIZZES[selectedPhase];
  const q = quiz[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto py-12">
      {showResult ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-6">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 ${score === quiz.length ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'}`}>
            {Math.round((score / quiz.length) * 100)}%
          </div>
          <h2 className="text-3xl font-serif italic">Examination Complete</h2>
          <p className="text-slate-400">You scored {score} out of {quiz.length} correctly.</p>
          <div className="pt-8 flex gap-4">
            <button onClick={() => setSelectedPhase(null)} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold">Return to Hall</button>
            <button onClick={() => startQuiz(selectedPhase)} className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold">Retake Exam</button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif italic text-amber-500">Question {currentQuestion + 1} of {quiz.length}</h2>
            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 transition-all" style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}></div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8">
            <h3 className="text-2xl font-semibold leading-snug">{q.question}</h3>
            <div className="space-y-3">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full p-6 rounded-2xl text-left border-2 transition-all flex justify-between items-center group ${
                    answered === null 
                      ? 'bg-slate-800 border-transparent hover:border-slate-600 hover:bg-slate-700' 
                      : idx === q.correctAnswer 
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500'
                        : answered === idx
                          ? 'bg-red-500/10 border-red-500 text-red-500'
                          : 'bg-slate-800/50 border-transparent opacity-50'
                  }`}
                >
                  <span className="font-medium">{opt}</span>
                  {answered !== null && idx === q.correctAnswer && <CheckCircle2 size={20} />}
                  {answered === idx && idx !== q.correctAnswer && <AlertCircle size={20} />}
                </button>
              ))}
            </div>

            {answered !== null && (
              <div className="p-6 bg-slate-800/50 rounded-2xl animate-in slide-in-from-bottom-2 duration-300">
                <p className="text-sm text-slate-400 italic">
                  <span className="font-bold text-amber-500 uppercase text-[10px] block mb-1">Instructor Note:</span>
                  {q.explanation}
                </p>
                <button onClick={nextQuestion} className="w-full mt-6 py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition-all">
                  {currentQuestion < quiz.length - 1 ? 'Next Question' : 'Finish Exam'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ProgressLog component for logging bench sessions and receiving AI feedback.
const ProgressLog: React.FC<{ entries: ServiceEntry[], setEntries: (e: ServiceEntry[]) => void }> = ({ entries, setEntries }) => {
  const [newEntry, setNewEntry] = useState('');
  const [selectedPhase, setSelectedPhase] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.trim()) return;

    setIsSubmitting(true);
    const feedback = await getReviewFeedback(newEntry, selectedPhase);
    
    const entry: ServiceEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      title: `Service Record #${entries.length + 1}`,
      description: newEntry,
      phase: selectedPhase,
      status: 'reviewed',
      aiFeedback: feedback
    };

    setEntries([entry, ...entries]);
    setNewEntry('');
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-serif italic text-slate-50 mb-2">The Service Book</h2>
          <p className="text-slate-400">Log your bench hours. Entries are reviewed by our AI WOSTEP Instructor.</p>
        </div>
        <div className="flex bg-slate-900 border border-slate-800 rounded-2xl p-1 gap-1">
          {[1, 2, 3, 4].map(p => (
            <button
              key={p}
              onClick={() => setSelectedPhase(p)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedPhase === p ? 'bg-amber-500 text-slate-950' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Phase {p}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4">
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Describe your bench session. What movements did you work on? What lubricants were applied? Any pivot inspection notes?"
          className="w-full h-40 bg-slate-800 border border-slate-700 rounded-2xl p-6 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none transition-all"
        />
        <div className="flex justify-between items-center">
          <p className="text-xs text-slate-500 italic flex items-center gap-2">
            <Info size={14} /> AI Instructor will analyze technical accuracy.
          </p>
          <button 
            disabled={isSubmitting || !newEntry.trim()}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center gap-2"
          >
            {isSubmitting ? 'Analyzing...' : 'Log Session'}
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {entries.map(entry => (
          <div key={entry.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden animate-in slide-in-from-top-4 duration-500">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-amber-500">
                  <ClipboardList size={24} />
                </div>
                <div>
                  <h4 className="font-bold">{entry.title}</h4>
                  <p className="text-xs text-slate-500">{entry.date} • Phase {entry.phase}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] uppercase font-bold tracking-widest rounded-full border border-emerald-500/20">
                {entry.status}
              </span>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Apprentice Report</p>
                <p className="text-slate-300 leading-relaxed text-sm">{entry.description}</p>
              </div>
              <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800 relative">
                <div className="absolute top-4 right-4 text-amber-500 opacity-20"><User size={40} strokeWidth={1} /></div>
                <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-4">Instructor Feedback</p>
                <p className="text-slate-400 text-sm italic leading-relaxed whitespace-pre-wrap">{entry.aiFeedback}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// CareerHub component for career advice and job readiness checklist.
const CareerHub: React.FC = () => {
  const [showProtocol, setShowProtocol] = useState(false);

  const checklistCategories = [
    {
      title: "Movement Handling",
      items: [
        "Scratch-free assembly verified under 20x magnification",
        "Uniform screw-head alignment across all bridges",
        "Consistent end-shake verified for all 7 wheels",
        "Proper pivot-polishing with 0.5 micron finish"
      ]
    },
    {
      title: "Lubrication Precision",
      items: [
        "Moebius 9415 limited exactly to pallet stone exit faces",
        "HP-1300 depth at exactly 1/3 of jewel cup volume",
        "Zero cross-contamination between silicone and mineral oils",
        "Epilame barrier application verified with UV inspection"
      ]
    },
    {
      title: "Escapement & Regulation",
      items: [
        "Hairspring perfectly flat and centered between regulator pins",
        "Beat error reduced to 0.1ms or lower in all positions",
        "Delta over 5 positions limited to < 10 seconds/day",
        "Guard pin clearance at exactly 0.05mm from roller"
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-serif italic font-bold text-slate-50">Landing Your First Job</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">The watch industry demands perfection. Here is how you demonstrate your readiness to brands like Rolex, Omega, or Patek Philippe.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Star, title: "Bench Portfolio", desc: "A clean school watch with zero scratches under a 40x microscope.", color: "text-amber-500" },
          { icon: Clock, title: "Timing Sheets", desc: "Regulation results in 5 positions (DU, DD, CD, CL, CU).", color: "text-blue-500" },
          { icon: Wrench, title: "Pro Tool Kit", desc: "Proof of investment in Bergeon, Horotec, and Moebius.", color: "text-emerald-500" }
        ].map(item => (
          <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 hover:border-slate-600 transition-colors">
            <div className={`w-16 h-16 rounded-2xl bg-slate-800 mx-auto flex items-center justify-center ${item.color}`}>
              <item.icon size={32} />
            </div>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full"></div>
        <div className="relative z-10 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
               <h3 className="text-2xl font-serif italic font-bold text-amber-50">The "Bench Test" Master Checklist</h3>
               <p className="text-sm text-slate-500">Official WOSTEP Readiness Criteria</p>
             </div>
             <button 
               onClick={() => setShowProtocol(true)}
               className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl transition-all shadow-xl shadow-amber-500/20 flex items-center gap-2 whitespace-nowrap"
             >
                View Full Protocol <ExternalLink size={18} />
             </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {checklistCategories.map(cat => (
               <div key={cat.title} className="space-y-4">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-500 border-b border-emerald-500/20 pb-2">{cat.title}</h4>
                 <ul className="space-y-3">
                    {cat.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 group">
                        <div className="w-5 h-5 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                          <CheckCircle2 size={12} />
                        </div>
                        <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed">{item}</span>
                      </li>
                    ))}
                 </ul>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Career Advice and Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Briefcase size={20} className="text-slate-500" /> Top Recruiting Tiers
          </h4>
          <ul className="space-y-4">
            <li className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <p className="font-bold">Tier 1: Manufacture</p>
                <p className="text-xs text-slate-500">Patek Philippe, Audemars Piguet</p>
              </div>
              <span className="text-[10px] font-bold text-amber-500">ULTRA RARE</span>
            </li>
            <li className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <p className="font-bold">Tier 2: Brand Service</p>
                <p className="text-xs text-slate-500">Rolex RSC, Omega (Swatch Group)</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-500">HI-DEMAND</span>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="font-bold">Tier 3: Retail/Jeweler</p>
                <p className="text-xs text-slate-500">Local Watchmakers, WOS, Tourneau</p>
              </div>
              <span className="text-[10px] font-bold text-blue-500">ENTRY-LEVEL</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <h4 className="text-lg font-bold mb-4">Master's Advice</h4>
          <p className="text-slate-400 italic text-sm leading-relaxed">
            "Don't rush the disassembly. Every scratch on a screw head is a stain on your reputation. In the beginning, speed is your enemy. Precision is your only friend. When your work is clean under 40x, you are ready for a bench test."
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-serif italic text-xl">G</div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest">George D.</p>
              <p className="text-[10px] text-slate-500">Master Watchmaker</p>
            </div>
          </div>
        </div>
      </div>

      {/* Protocol Modal */}
      {showProtocol && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center">
                    <ShieldCheck size={28} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-serif italic text-amber-50">Standard Industry Bench Protocol</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Rolex / Swatch Group RSC Equivalent</p>
                 </div>
               </div>
               <button onClick={() => setShowProtocol(false)} className="text-slate-400 hover:text-white transition-colors">✕</button>
            </div>
            
            <div className="p-10 overflow-y-auto space-y-12">
               <section className="space-y-6">
                 <div className="flex items-center gap-3 text-amber-500 font-bold uppercase text-xs tracking-widest">
                    <Target size={16} /> Phase 1: Tool Preparation (30 Minutes)
                 </div>
                 <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
                    <p className="text-sm text-slate-400 leading-relaxed">
                      The examiner will first inspect your bench setup. 
                      <br /><br />
                      • <strong>Screwdrivers:</strong> Must be dressed to a perfect 90° angle. Any burrs or curved tips result in immediate point deduction.
                      <br />• <strong>Tweezers:</strong> Tips must be perfectly aligned and non-magnetic.
                      <br />• <strong>Ergonomics:</strong> Proper seating height and armrest usage is evaluated.
                    </p>
                 </div>
               </section>

               <section className="space-y-6">
                 <div className="flex items-center gap-3 text-amber-500 font-bold uppercase text-xs tracking-widest">
                    <Target size={16} /> Phase 2: Technical Service (2.5 Hours)
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700">
                       <h5 className="font-bold text-slate-200 mb-3 text-sm">Disassembly & Diagnosis</h5>
                       <p className="text-xs text-slate-400 leading-relaxed">
                         Complete strip-down of an ETA 2824 or 7750 caliber. You must identify a "planted" fault (e.g., a chipped tooth on the third wheel) without being prompted.
                       </p>
                    </div>
                    <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700">
                       <h5 className="font-bold text-slate-200 mb-3 text-sm">Lubrication Mastery</h5>
                       <p className="text-xs text-slate-400 leading-relaxed">
                         Application of four distinct oils. Evaluation focuses on volume control (microliters) and zero spreading.
                       </p>
                    </div>
                 </div>
               </section>

               <section className="space-y-6">
                 <div className="flex items-center gap-3 text-amber-500 font-bold uppercase text-xs tracking-widest">
                    <Target size={16} /> Phase 3: Final Regulation (1 Hour)
                 </div>
                 <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
                    <p className="text-sm text-slate-400 leading-relaxed">
                      <strong>Target:</strong> Amplitude of 270°+ and Rate within ±5s/d.
                      <br /><br />
                      The watch will be measured on a Witschi timing machine in 5 positions. You must be able to explain exactly why a "Dial Down" reading differs from "Dial Up" based on pivot friction analysis.
                    </p>
                 </div>
               </section>

               <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                  <p className="text-xs text-emerald-500 font-medium italic text-center">
                    "Success on the bench is not about how fast you work, but how few mistakes you make. One slipped screwdriver on a gold-plated bridge is an automatic fail."
                  </p>
               </div>
            </div>
            
            <div className="p-6 bg-slate-950/80 border-t border-slate-800 text-center">
               <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-sm transition-all flex items-center gap-2 mx-auto">
                 <Download size={18} /> Download Printable Guide
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
