'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  TrendingDown, 
  ShieldCheck, 
  Calculator, 
  Loader2, 
  Smartphone, 
  X, 
  Menu, 
  ArrowRight, 
  ChevronRight, 
  User, 
  Calendar, 
  CreditCard,
  PieChart,
  Unlock,
  ExternalLink,
  Download // <--- Added missing tool here!
} from 'lucide-react';

// --- MOCK DATA GENERATORS (The "Financial Advisor" Brain) ---

const generateMockResults = (query: string) => [
  {
    type: 'SNOWBALL',
    title: `Psychological Win Strategy`,
    description: 'Pay off the smallest debt first to build momentum. Best for motivation.',
    timeline: 'Debt Free in 18 Months',
    savings: 'Save $1,200 in Interest',
    score: 95,
  },
  {
    type: 'AVALANCHE',
    title: `Math-Optimal Strategy`,
    description: 'Pay off the highest interest rate first. Saves the most money mathematically.',
    timeline: 'Debt Free in 16 Months',
    savings: 'Save $2,100 in Interest',
    score: 98,
  },
  {
    type: 'CONSOLIDATION',
    title: `One Payment Solution`,
    description: 'Combine all debts into a single low-interest loan. Simplifies your life instantly.',
    timeline: 'Debt Free in 12 Months',
    savings: 'Save $3,500 in Interest',
    score: 90,
  },
];

const MOCK_BLOG_POSTS = [
  {
    id: 1,
    title: "The 0% Balance Transfer Hack",
    excerpt: "How to stop paying interest for 18 months legally. A step-by-step guide to balance transfers.",
    image: "https://placehold.co/800x400/334155/10b981?text=Zero+Percent+Hack",
    date: "Dec 10, 2025",
    author: "Credit Expert",
    category: "Hacking"
  },
  {
    id: 2,
    title: "Snowball vs. Avalanche: Which One Actually Works?",
    excerpt: "The math says one thing, but psychology says another. Here is how to choose the right method for your brain.",
    image: "https://placehold.co/800x400/1e293b/ffffff?text=Debt+Strategy",
    date: "Dec 08, 2025",
    author: "Money Coach",
    category: "Strategy"
  },
  {
    id: 3,
    title: "5 Side Hustles to Pay Off Debt Fast",
    excerpt: "Need an extra $500/month for your payments? These gigs require zero startup capital.",
    image: "https://placehold.co/800x400/0f172a/10b981?text=Extra+Income",
    date: "Dec 05, 2025",
    author: "Side Hustle Pro",
    category: "Income"
  },
];

// --- AD COMPONENTS ---

const AdUnit = ({ format = "horizontal", label = "Sponsor" }) => {
  const isVertical = format === "vertical";
  const isSticky = format === "sticky";
  
  if (isSticky) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.5)] z-50 p-2 flex justify-center animate-in slide-in-from-bottom-full duration-700">
        <div className="w-full max-w-[728px] h-[90px] bg-slate-800 border border-dashed border-slate-600 rounded flex flex-col items-center justify-center text-slate-400 text-xs font-mono">
          <span className="font-bold text-emerald-400 animate-pulse">SOFI LOANS: CHECK YOUR RATE (NO CREDIT IMPACT)</span>
          <span>Google AdSense 728x90</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-slate-800/50 border border-dashed border-slate-700 rounded-lg flex flex-col items-center justify-center text-slate-400 text-sm font-medium p-2 relative overflow-hidden group ${isVertical ? 'h-[600px] w-full' : 'h-32 w-full my-6'}`}>
      <span className="z-10 font-bold text-slate-300 mb-1">SPONSORED ({label})</span>
      <span className="z-10 text-xs opacity-50">Secure Ad Slot</span>
    </div>
  );
};

// --- LEAD MAGNET MODAL ---

const DownloadModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState('capture'); 
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setStep('download'), 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" 
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden"
          >
            <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full z-20">
              <X size={20} />
            </button>

            <div className="p-0">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-10 text-center text-white relative overflow-hidden border-b border-slate-700">
                <Calculator className="mx-auto mb-4 drop-shadow-xl relative z-10 text-emerald-400" size={56} />
                <h3 className="text-3xl font-black mb-2 relative z-10">Get the Planner 📊</h3>
                <p className="text-slate-300 font-medium relative z-10">Unlock the printable Debt Payoff Calendar & Budget Sheet.</p>
              </div>

              <div className="p-8 bg-slate-900 text-white">
                {step === 'capture' ? (
                  <>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Secure Delivery Email</label>
                        <input 
                          type="email" 
                          required
                          placeholder="finance@freedom.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-5 py-4 rounded-xl border border-slate-600 bg-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all font-medium text-lg text-white placeholder:text-slate-500"
                        />
                      </div>
                      <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 text-lg group">
                        Send My Plan <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                    <div className="mt-6 flex justify-center gap-4 text-slate-500">
                        <span className="text-xs font-medium flex items-center gap-1"><ShieldCheck size={12}/> 256-bit Encryption</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <div className="w-16 h-16 bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/50">
                        <Unlock size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Plan Unlocked. 🔓</h3>
                    <p className="text-slate-400 mb-8 text-sm">
                      We sent the worksheets to <strong>{email}</strong>. Download the app for credit tracking:
                    </p>
                    <div className="space-y-3">
                      <button className="w-full bg-black text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors font-bold shadow-lg border border-slate-700">
                        <span>Download on the <br/><span className="text-xs font-normal">App Store</span></span>
                      </button>
                      <button className="w-full bg-slate-800 text-white border border-slate-600 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-700 transition-colors font-bold shadow-lg">
                        <span>Get it on <br/><span className="text-xs font-normal">Google Play</span></span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- BLOG COMPONENTS ---

const BlogCard = ({ post, onClick }: { post: any; onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer group flex flex-col h-full"
  >
    <div className="h-48 overflow-hidden relative bg-slate-700">
      <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-3 py-1 rounded-sm text-xs font-bold text-emerald-400 uppercase tracking-widest border border-emerald-500/20">
        {post.category}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-emerald-400 transition-colors">{post.title}</h3>
      <p className="text-slate-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
      <div className="mt-auto flex items-center justify-between text-xs text-slate-500 border-t border-slate-700 pt-4 font-mono">
        <span className="flex items-center gap-1"><User size={12}/> {post.author}</span>
        <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
      </div>
    </div>
  </div>
);

const BlogPostView = ({ post, onBack, onOpenDownload }: { post: any; onBack: () => void; onOpenDownload: () => void }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-emerald-500 hover:text-emerald-400 mb-6 font-mono uppercase tracking-widest">
      <ChevronRight className="rotate-180" size={16} /> Return to Dashboard
    </button>

    <div className="flex flex-col lg:flex-row gap-12">
      {/* Main Article Content */}
      <article className="flex-1">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-700 font-mono">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-500 border border-emerald-500/30">DD</div>
              <span>By {post.author}</span>
           </div>
           <span>•</span>
           <span>{post.date}</span>
        </div>

        <img src={post.image} alt={post.title} className="w-full h-[400px] object-cover rounded-xl mb-10 shadow-2xl border border-slate-700 bg-slate-800" />

        <div className="prose prose-lg prose-invert max-w-none text-slate-300">
          <p className="lead text-xl text-white font-medium mb-6">
            Debt feels like a trap, but it's actually just a math problem. The moment you have a plan, the anxiety drops by 50%.
          </p>
          
          <AdUnit label="In-Article Top" />

          <h2 className="text-2xl font-bold text-emerald-400 mt-8 mb-4">1. The Math of Momentum</h2>
          <p className="mb-6">
            Paying the smallest debt first gives you a dopamine hit. Paying the highest interest first saves you money. Our AI calculates both paths so you can choose.
          </p>

          <h2 className="text-2xl font-bold text-emerald-400 mt-8 mb-4">2. Your Custom Plan</h2>
          <p className="mb-6">
            Based on your inputs, here are your payoff options:
          </p>

          {/* Embedded Product Cards */}
          <div className="grid gap-6 my-8 not-prose">
             {generateMockResults("Blog Context").map((item, i) => (
                <div key={i} className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm flex flex-col md:flex-row gap-6 items-center hover:border-emerald-500/30 transition-colors">
                   <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-bold px-2 py-0.5 rounded font-mono">{item.type}</span>
                        <span className="font-bold text-white font-mono">{item.timeline}</span>
                      </div>
                      <h4 className="font-bold text-lg mb-1 text-white">{item.title}</h4>
                      <p className="text-sm text-slate-400 mb-3">{item.description}</p>
                      <button className="text-emerald-400 font-bold text-sm flex items-center gap-1 hover:text-emerald-300">
                        Activate Strategy <ExternalLink size={14}/>
                      </button>
                   </div>
                </div>
             ))}
          </div>

          <AdUnit label="In-Article Middle" />
        </div>

        {/* Article CTA */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 text-white rounded-2xl p-8 mt-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
           <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <Download size={32} className="text-black" />
           </div>
           <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Need the Tracker?</h3>
              <p className="text-slate-300 mb-4">Download the app to auto-sync your bank accounts.</p>
              <button 
                onClick={onOpenDownload}
                className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-emerald-500 hover:text-black transition-all inline-flex items-center gap-2"
              >
                Download App <ArrowRight size={18} />
              </button>
           </div>
        </div>
      </article>

      {/* Sidebar */}
      <aside className="w-full lg:w-80 space-y-8 shrink-0">
         <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-sm sticky top-24">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2"><TrendingDown size={16} className="text-emerald-400"/> Interest Rates</h4>
            <div className="space-y-4">
               {[1,2,3].map((_, i) => (
                  <div key={i} className="flex gap-3 group cursor-pointer border-b border-slate-700 pb-3 last:border-0">
                     <div className="w-16 h-16 bg-slate-700 rounded-lg shrink-0 overflow-hidden border border-slate-600">
                        <img src={`https://placehold.co/100x100/334155/10b981?text=Rate+${i+1}`} className="w-full h-full object-cover"/>
                     </div>
                     <div>
                        <h5 className="text-sm font-bold text-slate-200 leading-tight group-hover:text-emerald-400 transition-colors">Why 24% APR is Killing You</h5>
                        <span className="text-xs text-slate-500 font-mono">3 min read</span>
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="my-6 border-t border-slate-700 pt-6">
               <AdUnit format="vertical" label="Sidebar Ad" />
            </div>

            <button 
              onClick={onOpenDownload}
              className="w-full bg-emerald-500 text-black py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-400 transition-colors"
            >
              Get Debt Destroyer
            </button>
         </div>
      </aside>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function Home() {
  const [view, setView] = useState('HOME'); // HOME, SEARCH_RESULTS, BLOG_LIST, BLOG_POST
  const [activePost, setActivePost] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(!query) return;
    setIsLoading(true);
    setView('SEARCH_RESULTS');
    
    setTimeout(() => {
       setResults(generateMockResults(query));
       setIsLoading(false);
    }, 2500);
  };

  const openBlog = () => setView('BLOG_LIST');
  
  const openPost = (post: any) => {
    setActivePost(post);
    setView('BLOG_POST');
    window.scrollTo(0,0);
  };

  const goHome = () => {
    setView('HOME');
    setQuery('');
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans text-slate-100 overflow-x-hidden pb-24 selection:bg-emerald-500 selection:text-black">
      
      {/* TOP AD BANNER */}
      <div className="bg-slate-800 text-slate-400 py-1.5 text-center text-[10px] md:text-xs font-black tracking-[0.2em] uppercase border-b border-slate-700">
         System Status: Secure • Fed Rate: 5.50%
      </div>

      {/* NAVIGATION */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={goHome}>
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-slate-600 group-hover:border-emerald-500 transition-colors">
                 {/* Ensure logo.png is in your public folder */}
                 <img src="/logo.png" alt="Destroyer" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter leading-none text-white">Debt<span className="text-emerald-500">Destroyer</span></span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-emerald-500/80 transition-colors">Financial Freedom Engine</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={openBlog} className={`text-sm font-bold tracking-wide uppercase transition-colors ${view.includes('BLOG') ? 'text-emerald-500' : 'text-slate-400 hover:text-white'}`}>
                Strategies
              </button>
              <button className="text-sm font-bold tracking-wide uppercase text-slate-400 hover:text-white transition-colors">Calculators</button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-500 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center gap-2"
              >
                <Smartphone size={16} /> Get App
              </button>
            </div>

            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
           <div className="md:hidden bg-slate-900 border-b border-slate-700 p-4 space-y-4">
              <button onClick={() => {openBlog(); setIsMenuOpen(false)}} className="block w-full text-left font-bold text-slate-300 hover:text-emerald-500 uppercase tracking-wider">Strategies</button>
              <button onClick={() => setIsModalOpen(true)} className="block w-full bg-emerald-500 text-black py-3 rounded-lg font-bold">Get App</button>
           </div>
        )}
      </nav>

      {/* MAIN CONTENT SWITCHER */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* VIEW: HOME */}
        {view === 'HOME' && (
           <div className="flex flex-col items-center animate-in fade-in duration-700">
              <div className="max-w-5xl w-full text-center py-16 md:py-24 relative">
                 
                 {/* Background Glow */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-800/50 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

                 <div className="inline-flex items-center gap-3 bg-slate-800 border border-slate-600 shadow-sm rounded-full px-5 py-2 mb-8 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></span>
                    <span className="text-xs font-bold text-slate-300 tracking-widest uppercase font-mono">Snowball Method v2.0 • Active</span>
                 </div>
                 
                 <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight mb-8 leading-[1.1]">
                   Watch Your Debt <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Melt Away.</span>
                 </h1>
                 
                 <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                    Stop paying interest. Start paying principal. Tell us your balances, and we will build a mathematical <span className="text-white font-bold">Exit Strategy</span> for you.
                 </p>
                 
                 {/* Search Box */}
                 <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto group z-10">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative flex items-center bg-slate-900 rounded-full p-2 shadow-2xl border border-slate-700 group-hover:border-emerald-500/50 transition-colors">
                       <div className="pl-6 text-emerald-500">
                          <CreditCard />
                       </div>
                       <input 
                         type="text" 
                         value={query}
                         onChange={(e) => setQuery(e.target.value)}
                         placeholder="e.g. $5k Chase (24%), $2k Amex (18%)..." 
                         className="w-full px-6 py-5 text-lg md:text-xl font-medium outline-none bg-transparent text-white placeholder:text-slate-600"
                       />
                       <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-black px-10 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                          Calculate
                       </button>
                    </div>
                 </form>

                 {/* Hero Image Display */}
                 <div className="mt-20 w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent z-10"></div>
                    {/* Ensure hero.png is in your public folder */}
                    <img src="/hero.png" alt="Debt Free Desk" className="w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    {/* Floating HUD Elements */}
                    <div className="absolute bottom-10 left-10 z-20 hidden md:block animate-in slide-in-from-left duration-1000">
                        <div className="bg-slate-900/80 backdrop-blur border border-slate-600 p-4 rounded-lg flex items-center gap-4">
                            <div className="text-emerald-500"><PieChart /></div>
                            <div>
                                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Interest Saved</div>
                                <div className="text-xl font-bold text-white font-mono">$4,200.50</div>
                            </div>
                        </div>
                    </div>
                 </div>
              </div>
              
              <AdUnit label="Home Hero Banner" />

              {/* Latest Blog Posts Section */}
              <div className="w-full mt-24">
                 <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
                    <h2 className="text-2xl font-black text-white flex items-center gap-2"><DollarSign className="text-emerald-500"/> Financial Freedom</h2>
                    <button onClick={openBlog} className="text-slate-400 font-bold hover:text-emerald-500 uppercase tracking-widest text-xs flex items-center gap-1 transition-colors">
                       View Archive <ArrowRight size={14} />
                    </button>
                 </div>
                 <div className="grid md:grid-cols-3 gap-8">
                    {MOCK_BLOG_POSTS.map(post => (
                       <BlogCard key={post.id} post={post} onClick={() => openPost(post)} />
                    ))}
                 </div>
              </div>
           </div>
        )}

        {/* VIEW: SEARCH RESULTS */}
        {view === 'SEARCH_RESULTS' && (
           <div className="min-h-[60vh]">
              {isLoading ? (
                 <div className="flex flex-col items-center justify-center py-32">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full border-4 border-slate-800 border-t-emerald-500 animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Calculator className="text-emerald-500 animate-pulse" size={32} />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold mt-8 text-white animate-pulse">Crunching Numbers...</h3>
                    <p className="text-slate-500 font-mono mt-2 text-sm uppercase tracking-widest">Optimizing Payment Order</p>
                 </div>
              ) : (
                 <div className="animate-in fade-in slide-in-from-bottom-8">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 border-b border-slate-700 pb-8">
                       <div>
                           <p className="text-emerald-500 font-mono text-xs uppercase tracking-widest mb-2">Analysis Complete</p>
                           <h2 className="text-3xl md:text-4xl font-black text-white">Target: "{query}"</h2>
                       </div>
                       <button onClick={goHome} className="text-slate-400 font-bold hover:text-white border border-slate-700 px-6 py-3 rounded-lg hover:border-emerald-500 transition-colors uppercase text-sm tracking-wide">New Calculation</button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                       {results.map((item, i) => (
                          <div key={i} className="bg-slate-900 rounded-2xl p-1 border border-slate-700 hover:border-emerald-500/50 transition-colors group h-full flex flex-col">
                             <div className="bg-slate-900 rounded-xl p-6 h-full flex flex-col relative overflow-hidden">
                                 <div className="flex items-center justify-between mb-6">
                                     <div className={`text-xs font-black px-3 py-1 rounded uppercase tracking-widest ${
                                         item.type === 'SNOWBALL' ? 'bg-blue-900/30 text-blue-400 border border-blue-500/30' : 
                                         item.type === 'AVALANCHE' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30' : 
                                         'bg-purple-900/30 text-purple-400 border border-purple-500/30'
                                     }`}>
                                         {item.type}
                                     </div>
                                     <div className="flex items-center gap-1 text-emerald-500 font-bold text-sm">Score: {item.score}</div>
                                 </div>

                                 <h3 className="font-bold text-2xl text-white mb-3 leading-tight">{item.title}</h3>
                                 <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-1">{item.description}</p>
                                 
                                 <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700">
                                     <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                         <TrendingDown size={14} /> Timeline
                                     </div>
                                     <div className="text-xl font-mono font-bold text-white">{item.timeline}</div>
                                 </div>

                                 <div className="flex flex-wrap gap-2 mb-6">
                                     <span className="text-[10px] bg-slate-800 text-emerald-300 px-2 py-1 rounded border border-slate-600">{item.savings}</span>
                                 </div>

                                 <button className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-emerald-500 transition-colors uppercase tracking-wide text-sm shadow-lg">
                                     See Schedule
                                 </button>
                             </div>
                          </div>
                       ))}
                    </div>
                    
                    <AdUnit label="Search Results Bottom" />
                 </div>
              )}
           </div>
        )}

        {/* VIEW: BLOG LIST */}
        {view === 'BLOG_LIST' && (
           <div className="animate-in fade-in">
              <div className="text-center py-16">
                 <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">Wealth Knowledge</h1>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto">Guides to saving money, building credit, and investing the surplus.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                 {[...MOCK_BLOG_POSTS, ...MOCK_BLOG_POSTS].map((post, i) => (
                    <BlogCard key={i} post={post} onClick={() => openPost(post)} />
                 ))}
              </div>
              <div className="mt-16 text-center">
                 <button className="bg-slate-900 border border-slate-700 text-white px-8 py-4 rounded-full font-bold hover:border-emerald-500 hover:text-emerald-500 transition-colors uppercase tracking-widest text-sm">
                    Load More Tips
                 </button>
              </div>
           </div>
        )}

        {/* VIEW: BLOG POST */}
        {view === 'BLOG_POST' && activePost && (
           <BlogPostView 
             post={activePost} 
             onBack={openBlog} 
             onOpenDownload={() => setIsModalOpen(true)} 
           />
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-700 pt-20 pb-32 mt-20">
         <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 rounded bg-emerald-500 flex items-center justify-center">
                   <DollarSign className="text-black" />
               </div>
               <span className="font-black text-2xl text-white tracking-tight">Debt<span className="text-emerald-500">Destroyer</span></span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mb-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
               <button onClick={openBlog} className="hover:text-white transition-colors">Credit Repair</button>
               <button className="hover:text-white transition-colors">Refinance</button>
               <button className="hover:text-white transition-colors">About</button>
               <button onClick={() => setIsModalOpen(true)} className="hover:text-emerald-500 transition-colors">Get App</button>
            </div>
            <p className="text-slate-600 text-xs font-mono">
                © 2025 Debt Destroyer AI. Financial Freedom Systems.<br/>
                Not financial advice.
            </p>
         </div>
      </footer>

      {/* STICKY FOOTER AD */}
      <AdUnit format="sticky" />

      {/* LEAD MAGNET MODAL */}
      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
}