import { Search, Heart } from 'lucide-react';

interface NavbarProps {
  favoritesCount: number;
  setPage: (page: string) => void;
}

export const Navbar = ({ favoritesCount, setPage }: NavbarProps) => (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('home')}>
                <div className="bg-brand p-1.5 rounded-lg">
                    <Search size={24} className="text-dark" strokeWidth={3} />
                </div>
                <h1 className="text-xl font-bold tracking-tighter italic">AUTO<span className="text-brand">HUNTER</span></h1>
            </div>
            <button 
                onClick={() => setPage('favorites')}
                className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
            >
                <Heart size={24} className={favoritesCount > 0 ? "fill-brand text-brand" : "text-white"} />
                {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand text-dark text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-dark">
                        {favoritesCount}
                    </span>
                )}
            </button>
        </div>
    </nav>
);
