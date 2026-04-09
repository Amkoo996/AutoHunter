import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, Loader2, Info, Car as CarIcon } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { CarCard } from './components/CarCard';
import { Modal } from './components/Modal';
import { MOCK_CARS, COUNTRIES } from './data/mockData';
import { Car } from './types';

export default function App() {
    const [page, setPage] = useState('home');
    
    // Odvojeni state za input polje i za aktivnu pretragu
    const [searchInput, setSearchInput] = useState('');
    const [activeQuery, setActiveQuery] = useState('');
    
    const [results, setResults] = useState<Car[]>([]);
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState<Car[]>(() => JSON.parse(localStorage.getItem('favs') || '[]'));
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [sortBy, setSortBy] = useState('newest');
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Filters
    const [filters, setFilters] = useState({
        priceMax: 100000,
        yearFrom: 2000,
        yearTo: new Date().getFullYear(),
        kmMax: 300000,
        fuel: [] as string[],
        country: [] as string[]
    });

    // Čuvanje favorita u localStorage
    useEffect(() => {
        localStorage.setItem('favs', JSON.stringify(favorites));
    }, [favorites]);

    // Glavna funkcija za pretragu (okida se na Enter, klik dugmeta ili klik na popularnu pretragu)
    const handleSearch = (e?: React.FormEvent, overrideQuery?: string) => {
        if (e) e.preventDefault();
        
        const queryToSearch = overrideQuery !== undefined ? overrideQuery : searchInput;
        
        // Ako smo na početnoj i nema upita, ne radi ništa
        if (!queryToSearch.trim() && page === 'home') return;
        
        if (overrideQuery !== undefined) {
            setSearchInput(overrideQuery);
        }
        
        setLoading(true);
        setPage('results');
        
        // Simulacija mrežnog zahtjeva (700-1000ms)
        const delay = Math.floor(Math.random() * 300) + 700;
        
        setTimeout(() => {
            setActiveQuery(queryToSearch.trim());
            setLoading(false);
        }, delay);
    };

    const toggleFavorite = (car: Car) => {
        setFavorites(prev => 
            prev.find(f => f.id === car.id) 
            ? prev.filter(f => f.id !== car.id) 
            : [...prev, car]
        );
    };

    const handleFuelChange = (fuel: string) => {
        setFilters(prev => ({
            ...prev,
            fuel: prev.fuel.includes(fuel) ? prev.fuel.filter(f => f !== fuel) : [...prev.fuel, fuel]
        }));
    };

    const handleCountryChange = (countryCode: string) => {
        setFilters(prev => ({
            ...prev,
            country: prev.country.includes(countryCode) ? prev.country.filter(c => c !== countryCode) : [...prev.country, countryCode]
        }));
    };

    // Real-time filtriranje i sortiranje
    const filteredAndSortedResults = useMemo(() => {
        const baseList = page === 'favorites' ? favorites : MOCK_CARS;
        
        let filtered = baseList.filter(car => {
            const searchLower = activeQuery.toLowerCase();
            const carFullName = `${car.make} ${car.model}`.toLowerCase();
            
            const matchesQuery = activeQuery === '' || 
                                 car.make.toLowerCase().includes(searchLower) || 
                                 car.model.toLowerCase().includes(searchLower) ||
                                 carFullName.includes(searchLower);
                                 
            const matchesPrice = car.price <= filters.priceMax;
            const matchesYear = car.year >= filters.yearFrom && car.year <= filters.yearTo;
            const matchesKm = car.km <= filters.kmMax;
            const matchesFuel = filters.fuel.length === 0 || filters.fuel.includes(car.fuel);
            const matchesCountry = filters.country.length === 0 || filters.country.includes(car.country);
            
            return matchesQuery && matchesPrice && matchesYear && matchesKm && matchesFuel && matchesCountry;
        });

        return filtered.sort((a, b) => {
            if (sortBy === 'cheapest') return a.price - b.price;
            if (sortBy === 'expensive') return b.price - a.price;
            if (sortBy === 'newest') return b.year - a.year;
            if (sortBy === 'km') return a.km - b.km;
            return 0;
        });
    }, [activeQuery, filters, favorites, sortBy, page]);

    const popularSearches = [
        { title: "Golf 7", query: "Golf 7" },
        { title: "BMW 320d", query: "320d" },
        { title: "Audi A4", query: "A4" },
        { title: "Mercedes E-Class", query: "E 220d" },
        { title: "Passat", query: "Passat" },
        { title: "CLA 200", query: "CLA" }
    ];

    const resetFilters = () => {
        setFilters({
            priceMax: 100000, 
            yearFrom: 2000, 
            yearTo: new Date().getFullYear(), 
            kmMax: 300000, 
            fuel: [], 
            country: []
        });
    };

    return (
        <div className="min-h-screen pb-20">
            <Navbar favoritesCount={favorites.length} setPage={setPage} />

            {/* HERO / SEARCH SECTION */}
            {page === 'home' && (
                <main className="max-w-5xl mx-auto px-4 pt-16 sm:pt-24 text-center">
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

                    <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto mb-8">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand transition-colors">
                                <Search size={24} />
                            </div>
                            <input 
                                type="text"
                                placeholder="Unesi marku i model vozila... (npr. Golf 7)"
                                className="w-full bg-surface border-2 border-white/10 rounded-2xl py-5 pl-14 pr-36 text-lg focus:outline-none focus:border-brand transition-all accent-shadow placeholder:text-slate-500"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <button 
                                type="submit"
                                className="absolute right-2.5 top-2.5 bottom-2.5 bg-brand text-dark font-bold px-8 rounded-xl hover:bg-[#00b359] transition-colors flex items-center gap-2"
                            >
                                Pretraži
                            </button>
                        </div>
                    </form>

                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        <button onClick={() => setFilters(prev => ({...prev, yearFrom: 2020}))} className="px-4 py-2 bg-surface border border-white/10 rounded-full text-sm font-medium hover:border-brand hover:text-brand transition-colors">Godište 2020+</button>
                        <button onClick={() => setFilters(prev => ({...prev, priceMax: 20000}))} className="px-4 py-2 bg-surface border border-white/10 rounded-full text-sm font-medium hover:border-brand hover:text-brand transition-colors">Do 20.000€</button>
                        <button onClick={() => setFilters(prev => ({...prev, kmMax: 150000}))} className="px-4 py-2 bg-surface border border-white/10 rounded-full text-sm font-medium hover:border-brand hover:text-brand transition-colors">Do 150.000 km</button>
                        <button onClick={() => handleFuelChange('Dizel')} className={`px-4 py-2 bg-surface border ${filters.fuel.includes('Dizel') ? 'border-brand text-brand' : 'border-white/10'} rounded-full text-sm font-medium hover:border-brand hover:text-brand transition-colors`}>Dizel</button>
                        <button onClick={() => handleFuelChange('Benzin')} className={`px-4 py-2 bg-surface border ${filters.fuel.includes('Benzin') ? 'border-brand text-brand' : 'border-white/10'} rounded-full text-sm font-medium hover:border-brand hover:text-brand transition-colors`}>Benzin</button>
                    </div>

                    <div className="text-left max-w-4xl mx-auto">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><CarIcon size={20} className="text-brand"/> Popularne pretrage</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                            {popularSearches.map(search => (
                                <button 
                                    key={search.title}
                                    onClick={() => handleSearch(undefined, search.query)}
                                    className="p-4 bg-surface border border-white/5 rounded-xl hover:border-brand/50 hover:bg-white/5 transition-all text-center font-medium shadow-sm"
                                >
                                    {search.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </main>
            )}

            {/* RESULTS / FAVORITES PAGE */}
            {page !== 'home' && (
                <div className="max-w-7xl mx-auto px-4 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold">
                                {page === 'favorites' ? 'Moji Favoriti' : `Rezultati za "${activeQuery}"`}
                            </h2>
                            {!loading && (
                                <p className="text-slate-400 mt-1 font-medium">
                                    Pronađeno <strong className="text-white">{filteredAndSortedResults.length}</strong> oglasa
                                </p>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="flex items-center gap-2 bg-surface border border-white/10 rounded-xl px-3 py-2 shadow-sm">
                                <ArrowUpDown size={16} className="text-brand" />
                                <select 
                                    className="bg-transparent text-sm focus:outline-none cursor-pointer font-medium text-white"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="newest" className="bg-surface">Najnoviji prvo</option>
                                    <option value="cheapest" className="bg-surface">Najjeftiniji</option>
                                    <option value="expensive" className="bg-surface">Najskuplji</option>
                                    <option value="km" className="bg-surface">Najmanje km</option>
                                </select>
                            </div>
                            <button 
                                onClick={() => setShowMobileFilters(!showMobileFilters)}
                                className="flex items-center gap-2 bg-surface border border-white/10 rounded-xl px-4 py-2 text-sm md:hidden font-medium"
                            >
                                <Filter size={16} /> Filteri
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Sidebar Filters */}
                        <aside className={`${showMobileFilters ? 'block' : 'hidden'} md:block space-y-6`}>
                            <div className="bg-surface p-6 rounded-2xl sticky top-24 border border-white/5 shadow-lg">
                                <h3 className="font-bold mb-6 flex items-center gap-2 text-lg">
                                    <SlidersHorizontal size={20} className="text-brand" /> Filteri
                                </h3>
                                
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-sm font-medium text-slate-300 block mb-2 flex justify-between">
                                            Cijena <span>do {filters.priceMax.toLocaleString('de-DE')} €</span>
                                        </label>
                                        <input 
                                            type="range" min="0" max="100000" step="1000" 
                                            value={filters.priceMax} 
                                            onChange={(e) => setFilters({...filters, priceMax: parseInt(e.target.value)})}
                                            className="w-full accent-brand" 
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="text-sm font-medium text-slate-300 block mb-2">Godište</label>
                                        <div className="flex gap-2">
                                            <input 
                                                type="number" placeholder="Od" 
                                                value={filters.yearFrom}
                                                onChange={(e) => setFilters({...filters, yearFrom: parseInt(e.target.value) || 1990})}
                                                className="w-full bg-dark border border-white/10 rounded-lg p-2.5 text-sm focus:border-brand outline-none" 
                                            />
                                            <input 
                                                type="number" placeholder="Do" 
                                                value={filters.yearTo}
                                                onChange={(e) => setFilters({...filters, yearTo: parseInt(e.target.value) || new Date().getFullYear()})}
                                                className="w-full bg-dark border border-white/10 rounded-lg p-2.5 text-sm focus:border-brand outline-none" 
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-slate-300 block mb-2 flex justify-between">
                                            Kilometraža <span>do {filters.kmMax.toLocaleString('de-DE')} km</span>
                                        </label>
                                        <input 
                                            type="range" min="0" max="300000" step="5000" 
                                            value={filters.kmMax} 
                                            onChange={(e) => setFilters({...filters, kmMax: parseInt(e.target.value)})}
                                            className="w-full accent-brand" 
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-slate-300 block mb-3">Gorivo</label>
                                        <div className="space-y-2">
                                            {['Dizel', 'Benzin', 'Hibrid', 'Električni'].map(fuel => (
                                                <label key={fuel} className="flex items-center gap-3 cursor-pointer group">
                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.fuel.includes(fuel) ? 'bg-brand border-brand' : 'border-white/20 group-hover:border-brand/50'}`}>
                                                        {filters.fuel.includes(fuel) && <div className="w-2.5 h-2.5 bg-dark rounded-sm"></div>}
                                                    </div>
                                                    <input type="checkbox" className="hidden" checked={filters.fuel.includes(fuel)} onChange={() => handleFuelChange(fuel)} />
                                                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{fuel}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-slate-300 block mb-3">Zemlja</label>
                                        <div className="space-y-2">
                                            {Object.entries(COUNTRIES).map(([code, country]) => (
                                                <label key={code} className="flex items-center gap-3 cursor-pointer group">
                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.country.includes(code) ? 'bg-brand border-brand' : 'border-white/20 group-hover:border-brand/50'}`}>
                                                        {filters.country.includes(code) && <div className="w-2.5 h-2.5 bg-dark rounded-sm"></div>}
                                                    </div>
                                                    <input type="checkbox" className="hidden" checked={filters.country.includes(code)} onChange={() => handleCountryChange(code)} />
                                                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{country.flag} {country.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={resetFilters}
                                        className="w-full bg-white/5 text-white font-medium py-2.5 rounded-xl text-sm mt-2 hover:bg-white/10 transition-colors"
                                    >
                                        Poništi filtere
                                    </button>
                                </div>
                            </div>
                        </aside>

                        {/* Grid of Results */}
                        <div className="md:col-span-3">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-32">
                                    <Loader2 size={48} className="text-brand animate-spin mb-6" />
                                    <p className="text-slate-400 animate-pulse font-medium text-lg">Pretražujemo baze podataka...</p>
                                </div>
                            ) : filteredAndSortedResults.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredAndSortedResults.map(car => (
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
                                <div className="text-center py-24 bg-surface rounded-3xl border border-white/5 shadow-sm">
                                    <Info size={56} className="mx-auto text-slate-500 mb-5" />
                                    <p className="text-2xl font-bold mb-3">Nema rezultata</p>
                                    <p className="text-slate-400 mb-8 max-w-md mx-auto">Nismo pronašli nijedan oglas koji odgovara vašim kriterijumima. Pokušajte proširiti filtere ili promijeniti pretragu.</p>
                                    <button 
                                        onClick={() => {
                                            resetFilters();
                                            setSearchInput('');
                                            setActiveQuery('');
                                        }} 
                                        className="bg-brand text-dark font-bold px-6 py-3 rounded-xl hover:bg-[#00b359] transition-colors inline-block"
                                    >
                                        Poništi sve filtere
                                    </button>
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

            {/* Footer */}
            <footer className="mt-24 border-t border-white/5 py-12 px-4 text-center bg-[#111111]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold tracking-tight">Auto<span className="text-brand">Hunter</span></h1>
                    </div>
                    <p className="text-slate-500 text-sm">© {new Date().getFullYear()} AutoHunter. Razvijeno za pametnije kupce automobila.</p>
                    <div className="flex gap-6 text-slate-400 text-sm font-medium">
                        <a href="#" className="hover:text-brand transition-colors">Privatnost</a>
                        <a href="#" className="hover:text-brand transition-colors">Uslovi</a>
                        <a href="#" className="hover:text-brand transition-colors">Kontakt</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
