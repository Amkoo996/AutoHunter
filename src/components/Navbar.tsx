import { Heart } from 'lucide-react';

interface NavbarProps {
  favoritesCount: number;
  setPage: (page: string) => void;
}

export const Navbar = ({ favoritesCount, setPage }: NavbarProps) => (
    <nav className="sticky top-0 z-50 bg-[#111111] border-b border-white/5 px-4 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('home')}>
                <h1 className="text-2xl font-bold tracking-tight">Auto<span className="text-brand">Hunter</span></h1>
            </div>
            <div className="flex items-center gap-6">
                <button 
                    onClick={() => setPage('home')}
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block"
                >
                    Home
                </button>
                <button 
                    onClick={() => setPage('favorites')}
                    className="relative flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                    <Heart size={20} className={favoritesCount > 0 ? "fill-brand text-brand" : "text-white"} />
                    <span className="hidden sm:inline">Favoriti</span>
                    {favoritesCount > 0 && (
                        <span className="absolute -top-2 -right-3 bg-brand text-dark text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                            {favoritesCount}
                        </span>
                    )}
                </button>
            </div>
        </div>
    </nav>
);
