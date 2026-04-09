import { X, ExternalLink, Heart } from 'lucide-react';
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-dark/90 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative glass w-full max-w-2xl rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 glass rounded-full hover:bg-white/20 transition-colors">
                    <X size={20} />
                </button>
                <div className="h-64 sm:h-80 w-full overflow-hidden">
                    <img src={car.img} className="w-full h-full object-cover" alt={`${car.make} ${car.model}`} />
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">{car.make} {car.model} <span className="font-light text-slate-400">{car.version}</span></h2>
                        <span className="text-2xl font-bold text-brand">€{car.price.toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/5 mb-6">
                        <div className="text-center">
                            <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Godište</p>
                            <p className="font-semibold">{car.year}.</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Kilometri</p>
                            <p className="font-semibold">{car.km.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Gorivo</p>
                            <p className="font-semibold">{car.fuel}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Lokacija</p>
                            <p className="font-semibold">{COUNTRIES[car.country]?.flag} {car.city}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <a 
                            href="#" 
                            className="flex-grow flex items-center justify-center gap-2 bg-brand text-dark font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
                            onClick={(e) => e.preventDefault()}
                        >
                            Otvori originalni oglas <ExternalLink size={18} />
                        </a>
                        <button 
                            onClick={() => toggleFav(car)}
                            className={`p-3 rounded-xl border-2 transition-all ${isFavorite ? 'border-brand bg-brand/10 text-brand' : 'border-white/10 hover:border-white/30'}`}
                        >
                            <Heart size={24} className={isFavorite ? "fill-brand" : ""} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
