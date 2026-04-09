import { X, ExternalLink, Heart, Calendar, Gauge, Fuel, Zap, MapPin } from 'lucide-react';
import { Car } from '../types';
import { COUNTRIES } from '../data/mockData';

interface ModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  toggleFav: (car: Car) => void;
  isFavorite: boolean;
}

export const Modal = ({ car, isOpen, onClose, toggleFav, isFavorite }: ModalProps) => {
    if (!isOpen || !car) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-surface w-full max-w-3xl rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-200 shadow-2xl border border-white/10 flex flex-col max-h-[90vh]">
                <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-dark/50 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors border border-white/10">
                    <X size={20} />
                </button>
                <div className="h-64 sm:h-96 w-full overflow-hidden shrink-0">
                    <img src={car.img} className="w-full h-full object-cover" alt={`${car.make} ${car.model}`} />
                </div>
                <div className="p-6 overflow-y-auto">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold">{car.make} {car.model}</h2>
                            <p className="text-lg text-slate-400 mt-1">{car.version}</p>
                        </div>
                        <span className="text-3xl font-extrabold text-brand">€{car.price.toLocaleString('de-DE')}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-5 rounded-xl bg-dark/50 border border-white/5 mb-6">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-slate-400 text-xs uppercase tracking-wider"><Calendar size={14}/> Godište</div>
                            <p className="font-semibold text-lg">{car.year}.</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-slate-400 text-xs uppercase tracking-wider"><Gauge size={14}/> Kilometri</div>
                            <p className="font-semibold text-lg">{car.km.toLocaleString('de-DE')}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-slate-400 text-xs uppercase tracking-wider"><Fuel size={14}/> Gorivo</div>
                            <p className="font-semibold text-lg">{car.fuel}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-slate-400 text-xs uppercase tracking-wider"><Zap size={14}/> Snaga</div>
                            <p className="font-semibold text-lg">{car.power} KS</p>
                        </div>
                        <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
                            <div className="flex items-center gap-1.5 text-slate-400 text-xs uppercase tracking-wider"><MapPin size={14}/> Lokacija</div>
                            <p className="font-semibold text-lg">{COUNTRIES[car.country]?.flag} {car.city}</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-bold text-lg mb-2">Opis vozila</h3>
                        <p className="text-slate-300 leading-relaxed text-sm">
                            Odlično očuvan {car.make} {car.model} iz {car.year}. godine. Vozilo se nalazi u {car.city} ({COUNTRIES[car.country]?.name}) i prodaje se preko {car.source}. Redovno servisiran, bez skrivenih mana. Za više informacija i kontakt sa prodavcem, otvorite originalni oglas.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <a 
                            href="#" 
                            className="flex-grow flex items-center justify-center gap-2 bg-brand text-dark font-bold py-3.5 rounded-xl hover:bg-[#00b359] transition-colors text-lg"
                            onClick={(e) => { e.preventDefault(); window.open('#', '_blank'); }}
                        >
                            Otvori originalni oglas <ExternalLink size={20} />
                        </a>
                        <button 
                            onClick={() => toggleFav(car)}
                            className={`p-3.5 rounded-xl border-2 transition-all flex items-center justify-center gap-2 sm:w-auto w-full ${isFavorite ? 'border-[#ff3366] bg-[#ff3366]/10 text-[#ff3366]' : 'border-white/10 hover:border-white/30 text-white'}`}
                        >
                            <Heart size={24} className={isFavorite ? "fill-[#ff3366]" : ""} />
                            <span className="sm:hidden font-semibold">{isFavorite ? 'Ukloni iz favorita' : 'Dodaj u favorite'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
