'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Play, BookOpen, ArrowRight, Download, 
  ShieldCheck, PieChart, Users, X, Maximize2, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [appearances, setAppearances] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: app } = await supabase.from('media_appearances').select('*').order('appearance_date', { ascending: false });
      const { data: art } = await supabase.from('publications').select('*').order('published_date', { ascending: false });
      if (app) setAppearances(app);
      if (art) setArticles(art);
    };
    fetchData();

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    const videoId = url.includes('youtu.be/') 
      ? url.split('youtu.be/')[1]?.split('?')[0] 
      : url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&color=white`;
  };

  const getThumbnailUrl = (url: string) => {
    if (!url) return '';
    const videoId = url.includes('youtu.be/') 
      ? url.split('youtu.be/')[1]?.split('?')[0] 
      : url.split('v=')[1]?.split('&')[0];
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const expertise = [
    { title: "Fiscal Justice", icon: <ShieldCheck size={28} />, desc: "Human-rights centered budget analysis." },
    { title: "Gender Budgeting", icon: <PieChart size={28} />, desc: "Addressing systemic gender inequality through spend." },
    { title: "Social Infrastructure", icon: <Users size={28} />, desc: "Prioritizing schools and healthcare over luxury spend." }
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] selection:bg-gold-500/30 overflow-x-hidden font-sans">
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 border-b ${isScrolled ? 'bg-white/70 backdrop-blur-2xl border-black/5 py-4 shadow-sm' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <span className="font-serif italic text-2xl tracking-tight text-[#1A1A1A]">M.Lencoasa</span>
          <div className="hidden md:flex gap-8 text-sm font-semibold tracking-wide text-slate-600">
            <a href="#analysis" className="hover:text-gold-600 transition-colors">Analysis</a>
            <a href="#insights" className="hover:text-gold-600 transition-colors">Insights</a>
            <a href="#writing" className="hover:text-gold-600 transition-colors">Writing</a>
          </div>
          <Menu className="md:hidden text-[#1A1A1A]" />
        </div>
      </nav>

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] rounded-full bg-amber-600/5 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full bg-slate-400/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] invert" />
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-6 z-10 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="mb-12 relative">
          <div className="absolute -inset-8 bg-amber-900/5 rounded-full blur-3xl" />
          <img src="/images/profile/profile_matshidiso.png" alt="Matshidiso Lencoasa" className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full object-cover ring-1 ring-black/5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)]" />
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col items-center">
          <span className="text-slate-500 tracking-[0.35em] uppercase text-[9px] md:text-[10px] font-black mb-4 block">Fiscal Justice & Human Rights</span>
          <h1 className="text-[3.5rem] md:text-8xl font-serif leading-[0.9] tracking-tight text-[#111] mb-6">
            Matshidiso <br /> <span className="italic text-slate-800">Lencoasa</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-light max-w-lg mx-auto leading-relaxed px-4">
            Transforming policy into <span className="text-[#111] font-medium underline decoration-gold-400/40 decoration-2 underline-offset-8">social dignity</span>.
          </p>
        </motion.div>
        
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <button className="bg-[#181818] text-white h-12 md:h-14 w-[260px] sm:w-auto px-10 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold-700 active:scale-95 transition-all shadow-xl">Latest Analysis</button>
          <button className="bg-transparent border border-black/15 text-[#111] h-12 md:h-14 w-[260px] sm:w-auto px-10 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:bg-black/5 active:scale-95 transition-all">Media Kit</button>
        </motion.div>
      </section>

      {/* EXPERTISE */}
      <section className="py-20 md:py-32 z-10 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-600 mb-6 flex items-center gap-4">
              <div className="h-[1px] w-8 bg-gold-600" />
              Areas of Practice
            </h2>
            <div className="h-[1px] w-full bg-black/10" />
          </div>

          <div className="flex flex-col">
            {expertise.map((item, i) => (
              <motion.div 
                key={item.title}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative py-10 md:py-16 border-b border-black/10 hover:bg-black/[0.02] active:bg-black/[0.05] transition-colors cursor-pointer px-4 -mx-4 rounded-2xl"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-3 text-gold-600">
                    <div className="transform md:group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80">Core Focus</span>
                  </div>
                  {/* MOB FIRST: Gold by default on mobile, gray on desktop until hovered */}
                  <span className="text-6xl md:text-7xl font-serif italic text-gold-400 md:text-black/10 md:group-hover:text-gold-400 transition-colors duration-500 leading-none mt-[-10px]">
                    0{i + 1}
                  </span>
                </div>

                <div className="pr-12 md:pr-24">
                  <h3 className="text-3xl md:text-5xl font-serif text-[#111] mb-4 tracking-tight md:group-hover:translate-x-2 transition-transform duration-500">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                {/* MOB FIRST: Arrow visible on mobile, hidden on desktop until hover */}
                <div className="absolute bottom-10 right-4 text-gold-600 opacity-100 translate-x-0 md:opacity-0 md:-translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500">
                  <ArrowRight size={24} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA WALL */}
      <section id="analysis" className="max-w-7xl mx-auto py-24 md:py-32 px-6 z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-t-2 border-[#111] pt-8">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-600 mb-4">Media & Press</h2>
            <h3 className="text-4xl md:text-6xl font-serif text-[#111] tracking-tight">Broadcast Archive</h3>
          </div>
          <p className="text-slate-500 mt-4 md:mt-0 text-lg italic md:max-w-xs md:text-right">Strategic commentary across national news platforms.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {appearances.map((item) => (
            <div 
              key={item.id} 
              className="group cursor-pointer flex flex-col"
              onClick={() => setSelectedVideo(item.video_url)}
            >
              {/* TACTILE TAP: Added active:scale-[0.98] so the whole video card 'squishes' when tapped */}
              <div className="aspect-video bg-[#111] rounded-[2rem] overflow-hidden relative mb-6 shadow-sm md:group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-all duration-500">
                
                {/* MOB FIRST: Full color/opacity on mobile. Grayscale only applied via md: breakpoint */}
                <img 
                  src={item.custom_thumbnail || getThumbnailUrl(item.video_url)} 
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale-0 opacity-100 md:grayscale md:contrast-125 md:opacity-80 md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:scale-110 transition-all duration-1000 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-30 md:opacity-60 md:group-hover:opacity-30 transition-opacity duration-700" />
                
                {/* MOB FIRST: Play button is Solid Gold on mobile. Glass on desktop until hovered. */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl bg-gold-500 border-gold-500 md:border-white/30 md:bg-black/10 md:backdrop-blur-md md:group-hover:scale-110 md:group-hover:bg-gold-500 md:group-hover:border-gold-500">
                    <Play className="transition-colors duration-500 ml-1 text-black fill-black md:text-white md:fill-transparent md:group-hover:text-black md:group-hover:fill-black" size={24} />
                  </div>
                </div>

              </div>

              <div className="flex flex-col border-l-2 border-gold-500 md:border-transparent md:group-hover:border-gold-500 pl-4 md:pl-0 md:group-hover:pl-4 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-gold-600 text-[10px] font-black uppercase tracking-[0.2em]">{item.platform}</span>
                  <span className="text-slate-400 text-[10px] font-medium tracking-widest uppercase">{new Date(item.appearance_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
                <h4 className="text-2xl font-serif leading-snug text-[#111] md:group-hover:text-gold-700 transition-colors">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSIGHTS */}
      <section id="insights" className="bg-[#111] text-white py-24 md:py-32 mt-12 rounded-t-[4rem] z-10 relative shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-500 mb-4 flex items-center gap-4">
                <div className="h-[1px] w-8 bg-gold-500" />Data Storytelling
              </h2>
              <h3 className="text-4xl md:text-6xl font-serif tracking-tight text-white">Visualizing Justice</h3>
            </div>
            <p className="text-slate-400 font-light mt-4 md:mt-0 text-lg md:text-right max-w-sm">High-resolution fiscal breakdowns. Click any exhibit to expand.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 md:gap-12">
            {[
              { src: "/images/infographics/20260216_credibility_gap.jpg", title: "The Credibility Gap", tag: "SONA 2026 Analysis" },
              { src: "/images/infographics/20260303_social_infrastructure_crisis.jpg", title: "Roads vs. Rights", tag: "Budget Priorities" }
            ].map((img, i) => (
              <div key={img.src} className="flex flex-col group cursor-zoom-in" onClick={() => setSelectedImg(img.src)}>
                
                {/* TACTILE TAP: Added active:scale-[0.98] */}
                <div className="relative w-full aspect-[4/5] bg-[#1a1a1a] rounded-[2rem] overflow-hidden mb-6 border border-white/5 shadow-lg md:group-hover:shadow-2xl active:scale-[0.98] transition-all duration-500 p-4 md:p-6">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-black ring-1 ring-white/10 shadow-inner">
                    
                    {/* MOB FIRST: Full color default */}
                    <img 
                      src={img.src} 
                      className="w-full h-full object-cover object-top grayscale-0 opacity-100 md:grayscale md:opacity-70 md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-1000 ease-out transform md:group-hover:scale-105" 
                      alt={img.title} 
                    />
                    
                    <div className="absolute inset-0 bg-transparent md:bg-black/20 md:group-hover:bg-transparent transition-colors duration-700" />
                    
                    {/* MOB FIRST: Expand button visible and solid on mobile */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="text-white p-5 rounded-full border border-white/20 transition-all duration-500 shadow-2xl bg-black/60 md:bg-black/40 md:backdrop-blur-md scale-100 md:scale-75 md:group-hover:scale-100">
                        <Maximize2 size={28} strokeWidth={1.5} />
                      </div>
                    </div>

                  </div>
                </div>

                <div className="flex flex-col pl-4 border-l-2 border-gold-500 md:border-transparent md:group-hover:border-gold-500 transition-all duration-500">
                  <span className="text-gold-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{img.tag}</span>
                  <h4 className="text-3xl font-serif text-white md:group-hover:text-gold-400 transition-colors duration-300">{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WRITTEN WORK */}
      <section id="writing" className="bg-[#FDFBF7] text-[#1A1A1A] py-32 z-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-serif mb-16 text-center text-[#111]">Published Thought</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {articles.map((article) => (
              <div key={article.id} className="group border-t border-black/10 pt-8 cursor-pointer active:bg-black/[0.02] transition-colors rounded-xl -mx-4 px-4 pb-4">
                <p className="text-[10px] font-black text-gold-600 uppercase tracking-widest mb-3">{article.publisher} • {article.published_date}</p>
                <h3 className="text-2xl md:text-4xl font-serif leading-tight md:group-hover:text-gold-700 transition-colors mb-4">{article.title}</h3>
                <p className="text-slate-600 leading-relaxed font-light italic">"{article.excerpt}"</p>
                
                {/* MOB FIRST: Read article arrow visible on mobile */}
                <div className="mt-8 flex items-center gap-2 font-bold text-xs uppercase tracking-tighter text-[#1A1A1A] md:text-black/40 md:group-hover:text-gold-600 transition-colors">
                  Read Article <ArrowRight size={14} className="text-gold-500 md:text-inherit" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-24 px-6 text-center border-t border-black/5">
        <button className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white hover:bg-gold-600 px-10 py-5 rounded-full font-bold shadow-xl active:scale-95 transition-all">
          <Download size={20} /> Download Media Kit
        </button>
        <div className="mt-20 text-slate-400 text-[10px] tracking-[0.5em] uppercase">Matshidiso Lencoasa Digital Portal 2026</div>
      </footer>

      {/* IOS MODAL OVERLAY - Images */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 cursor-zoom-out">
            <button className="absolute top-8 right-8 text-white/50 hover:text-white"><X size={32} /></button>
            <motion.img initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} src={selectedImg} className="max-h-[85vh] w-auto rounded-xl shadow-2xl ring-1 ring-white/10" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* YOUTUBE CINEMA MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedVideo(null)} className="fixed inset-0 z-[300] flex items-center justify-center bg-[#050505]/95 backdrop-blur-2xl p-4 md:p-12 cursor-zoom-out">
            <button className="absolute top-6 right-6 md:top-10 md:right-10 text-white/40 hover:text-white transition-colors z-[310]">
              <X size={40} strokeWidth={1} />
            </button>
            <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>
              <iframe src={getEmbedUrl(selectedVideo)} className="w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </main>
  );
}