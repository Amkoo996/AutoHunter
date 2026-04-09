import { Heart, Calendar, Gauge, Fuel, MapPin, Zap, ExternalLink } from 'lucide-react';
import { Car } from '../types';
import { COUNTRIES } from '../data/mockData';

interface CarCardProps {
  car: Car;
  isFavorite: boolean;
  toggleFav: (car: Car) => void;
  openDetails: (car: Car) => void;
}

export const CarCard = ({ car, isFavorite, toggleFav, openDetails }: CarCardProps) => (
    <div className="group bg-surface rounded-2xl overflow-hidden border border-white/5 hover:border-brand/50 transition-all duration-300 flex flex-col shadow-lg">
        <div className="relative h-52 overflow-hidden cursor-pointer" onClick={() => openDetails(car)}>
            <img src={car.img} alt={car.make} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-dark/80 backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded border border-white/10">
                    {car.source.toUpperCase()}
                </span>
            </div>
            <button 
                onClick={(e) => { e.stopPropagation(); toggleFav(car); }}
                className="absolute top-3 right-3 p-2 rounded-full bg-dark/50 backdrop-blur-md hover:scale-110 transition-transform border border-white/10"
            >
                <Heart size={18} className={isFavorite ? "fill-[#ff3366] text-[#ff3366]" : "text-white"} />
            </button>
        </div>
        <div className="p-5 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg leading-tight cursor-pointer hover:text-brand transition-colors" onClick={() => openDetails(car)}>
                    {car.make} {car.model}
                    <span className="block text-sm font-normal text-slate-400 mt-1">{car.version}</span>
                </h3>
            </div>
            <div className="mb-4">
                <span className="text-2xl font-extrabold tracking-tight">€{car.price.toLocaleString('de-DE')}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-y-3 mt-auto pt-4 border-t border-white/5 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                    <Calendar size={15} className="text-slate-500" /> {car.year}.
                </div>
                <div className="flex items-center gap-2">
                    <Gauge size={15} className="text-slate-500" /> {car.km.toLocaleString('de-DE')} km
                </div>
                <div className="flex items-center gap-2">
                    <Fuel size={15} className="text-slate-500" /> {car.fuel}
                </div>
                <div className="flex items-center gap-2">
                    <Zap size={15} className="text-slate-500" /> {car.power} KS
                </div>
                <div className="flex items-center gap-2 col-span-2 mt-1 text-slate-400">
                    <MapPin size={15} className="text-slate-500" /> {COUNTRIES[car.country]?.flag} {COUNTRIES[car.country]?.name} • {car.city}
                </div>
            </div>
            
            <button 
                className="w-full mt-5 py-3 rounded-xl bg-white/5 hover:bg-brand hover:text-dark font-semibold text-sm transition-all flex items-center justify-center gap-2 group-hover:bg-brand group-hover:text-dark"
                onClick={(e) => { e.stopPropagation(); window.open('#', '_blank'); }}
            >
                Otvori originalni oglas <ExternalLink size={16} />
            </button>
        </div>
    </div>
);
