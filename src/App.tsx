import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, Loader2, Info } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { CarCard } from './components/CarCard';
import { Modal } from './components/Modal';
import { MOCK_CARS } from './data/mockData';
import { Car } from './types';

export default function App() {
    const [page, setPage] = useState('home');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Car[]>([]);
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState<Car[]>(() => JSON.parse(localStorage.getItem('favs') || '[]'));
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [sortBy, setSortBy] = useState('newest');

    // Filters
    const [filters, setFilters] = useState({
        priceMax: '',
        yearFrom: '',
        kmMax: '',
        fuel: '',
        country: ''
    });

    useEffect(() => {
        localStorage.setItem('favs', JSON.stringify(favorites));
    }, [favorites]);

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!query && page === 'home') return;
        
        setLoading(true);
        setPage('results');
        
        // Simulisani API poziv (Scraping simulation)
        setTimeout(() => {
            let filtered = MOCK_CARS.filter(car => 
                car.make.toLowerCase().includes(query.toLowerCase()) || 
                car.model.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
            setLoading(false);
        }, 1200);
    };

    const toggleFavorite = (car: Car) => {
        setFavorites(prev => 
            prev.find(f => f.id === car.id) 
            ? prev.filter(f => f.id !== car.id) 
            : [...prev, car]
        );
    };

    const sortedResults = useMemo(() => {
        const list = page === 'favorites' ? favorites : results;
        return [...list].sort((a, b) => {
            if (sortBy === 'cheapest') return a.price - b.price;
            if (sortBy === 'expensive') return b.price - a.price;
            if (sortBy === 'newest') return b.year - a.year;
            if (sortBy === 'km') return a.km - b.km;
            return 0;
        });
    }, [results, favorites, sortBy, page]);

    return (
        <div className="min-h-screen pb-20">
            <Navbar favoritesCount={favorites.length} setPage={setPage} />

            {/* HERO / SEARCH SECTION */}
            {page === 'home' && (
                <main className="max-w-4xl mx-auto px-4 pt-16 sm:pt-24 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 animate-bounce">
                        <span className="w-2 h-2 bg-brand rounded-full"></span>
                        Pretražuje se preko 2,450,000 oglasa trenutno
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight">
                        Pronađi savršen automobil <br/>
                        <span className="text-brand">bez muke.</span>
                    </h1>
                    <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                        Agregator oglasa iz cijele Evrope. Unesi marku i model, mi ćemo uraditi ostalo.
                    </p>

                    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-12">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand transition-colors">
                                <Search size={24} />
                            </div>
                            <input 
                                type="text"
                                placeholder="npr. Golf 7, BMW 320d, Audi A4..."
                                className="w-full bg-surface border-2 border-white/10 rounded-2xl py-5 pl-14 pr-32 text-lg focus:outline-none focus:border-brand transition-all accent-shadow"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button 
                                type="submit"
                                className="absolute right-2.5 top-2.5 bottom-2.5 bg-brand text-dark font-bold px-6 rounded-xl hover:scale-[0.98] transition-transform flex items-center gap-2"
                            >
                                Pretraži
                            </button>
                        </div>
                    </form>

                    <div className="flex flex-wrap justify-center gap-3">
                        {['Golf', 'Passat', 'A4', 'E-Class', 'BMW 3', 'Tesla'].map(tag => (
                            <button 
                                key={tag}
                                onClick={() => { setQuery(tag); handleSearch(); }}
                                className="px-5 py-2 glass rounded-full text-sm font-medium hover:border-brand hover:text-brand transition-colors"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </main>
            )}

            {/* RESULTS / FAVORITES PAGE */}
            {page !== 'home' && (
                <div className="max-w-7xl mx-auto px-4 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold">
                                {page === 'favorites' ? 'Moji Favoriti' : `Rezultati za "${query}"`}
                            </h2>
                            <p className="text-slate-400">{sortedResults.length} pronađenih oglasa</p>
                        </div>
                        
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="flex items-center gap-2 bg-surface border border-white/10 rounded-xl px-3 py-2">
                                <ArrowUpDown size={16} className="text-brand" />
                                <select 
                                    className="bg-transparent text-sm focus:outline-none cursor-pointer"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="newest">Najnoviji prvo</option>
                                    <option value="cheapest">Najjeftiniji</option>
                                    <option value="expensive">Najskuplji</option>
                                    <option value="km">Najmanje km</option>
                                </select>
                            </div>
                            <button className="flex items-center gap-2 bg-surface border border-white/10 rounded-xl px-4 py-2 text-sm md:hidden">
                                <Filter size={16} /> Filteri
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Desktop Sidebar Filters */}
                        <aside className="hidden md:block space-y-6">
                            <div className="glass p-5 rounded-2xl sticky top-24">
                                <h3 className="font-bold mb-4 flex items-center gap-2 italic">
                                    <SlidersHorizontal size={18} className="text-brand" /> FILTERI
                                </h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-slate-400 block mb-1">Maksimalna cijena (€)</label>
                                        <input type="number" placeholder="20000" className="w-full bg-dark border border-white/10 rounded-lg p-2 text-sm focus:border-brand outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-400 block mb-1">Godište od</label>
                                        <input type="number" placeholder="2015" className="w-full bg-dark border border-white/10 rounded-lg p-2 text-sm focus:border-brand outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-400 block mb-1">Zemlja</label>
                                        <select className="w-full bg-dark border border-white/10 rounded-lg p-2 text-sm focus:border-brand outline-none cursor-pointer">
                                            <option>Sve zemlje</option>
                                            <option>Njemačka</option>
                                            <option>Austrija</option>
                                            <option>Italija</option>
                                        </select>
                                    </div>
                                    <button className="w-full bg-brand text-dark font-bold py-2.5 rounded-xl text-sm mt-4">Primijeni</button>
                                </div>
                            </div>
                        </aside>

                        {/* Grid of Results */}
                        <div className="md:col-span-3">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <Loader2 size={48} className="text-brand animate-spin mb-4" />
                                    <p className="text-slate-400 animate-pulse italic font-medium">Pretražujemo Mobile.de, Willhaben, AutoScout24...</p>
                                </div>
                            ) : sortedResults.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {sortedResults.map(car => (
                                        <CarCard 
                                            key={car.id} 
                                            car={car} 
                                            isFavorite={favorites.some(f => f.id === car.id)}
                                            toggleFav={toggleFavorite}
                                            openDetails={setSelectedCar}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 glass rounded-3xl">
                                    <Info size={48} className="mx-auto text-slate-500 mb-4" />
                                    <p className="text-xl font-semibold mb-2">Nema rezultata</p>
                                    <p className="text-slate-400 mb-6">Pokušaj sa drugim modelom ili manje filtera.</p>
                                    <button onClick={() => setPage('home')} className="text-brand font-bold">Vrati se na početnu</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Modal 
                car={selectedCar} 
                isOpen={!!selectedCar} 
                onClose={() => setSelectedCar(null)} 
                toggleFav={toggleFavorite}
                isFavorite={selectedCar ? favorites.some(f => f.id === selectedCar.id) : false}
            />

            {/* Footer - Mini */}
            <footer className="mt-20 border-t border-white/5 py-10 px-4 text-center">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-white/10 p-1.5 rounded-lg">
                            <Search size={20} className="text-white" />
                        </div>
                        <h1 className="text-lg font-bold tracking-tighter italic">AUTO<span className="text-brand">HUNTER</span></h1>
                    </div>
                    <p className="text-slate-500 text-sm">© 2026 AutoHunter App. Razvijeno za pametnije kupce automobila.</p>
                    <div className="flex gap-6 text-slate-400 text-sm">
                        <a href="#" className="hover:text-brand">Privatnost</a>
                        <a href="#" className="hover:text-brand">Kontakt</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
