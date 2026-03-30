import { Play } from 'lucide-react';

// This tells TypeScript exactly what to expect
interface MediaCardProps {
  title: string;
  platform: string;
  date: string;
  image: string;
}

export default function MediaCard({ title, platform, date, image }: MediaCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:border-gold-500/50">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <Play className="h-12 w-12 text-white fill-white" />
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-500">
          {platform}
        </p>
        <h3 className="mt-2 text-xl font-serif font-bold text-white leading-tight">
          {title}
        </h3>
        <p className="mt-4 text-sm text-slate-400">
          {date}
        </p>
      </div>
    </div>
  );
}