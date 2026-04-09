import { Heart, Calendar, Gauge, Fuel, MapPin, ChevronRight } from 'lucide-react';
import { Car } from '../types';
import { COUNTRIES } from '../data/mockData';

interface CarCardProps {
  car: Car;
  isFavorite: boolean;
  toggleFav: (car: Car) => void;
  openDetails: (car: Car) => void;
}

export const CarCard = ({ car, isFavorite, toggleFav, openDetails }: CarCardProps) => (
    <div className="group glass rounded-2xl overflow-hidden hover:border-brand/50 transition-all duration-300 flex flex-col">
        <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => openDetails(car)}>
            <img src={car.img} alt={car.make} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-dark/80 backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded border border-white/10">
                    {car.source.toUpperCase()}
                </span>
            </div>
            <button 
                onClick={(e) => { e.stopPropagation(); toggleFav(car); }}
                className="absolute top-3 right-3 p-2 rounded-full glass hover:scale-110 transition-transform"
            >
                <Heart size={18} className={isFavorite ? "fill-brand text-brand" : "text-white"} />
            </button>
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg leading-tight cursor-pointer" onClick={() => openDetails(car)}>
                    {car.make} {car.model}
                    <span className="block text-sm font-normal text-slate-400">{car.version}</span>
                </h3>
                <span className="text-brand font-bold text-xl tracking-tight">€{car.price.toLocaleString()}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-y-2 mt-auto pt-4 border-t border-white/5 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-brand" /> {car.year}.
                </div>
                <div className="flex items-center gap-2">
                    <Gauge size={14} className="text-brand" /> {car.km.toLocaleString()} km
                </div>
                <div className="flex items-center gap-2">
                    <Fuel size={14} className="text-brand" /> {car.fuel}
                </div>
                <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-brand" /> {COUNTRIES[car.country]?.flag} {car.city}
                </div>
            </div>
            
            <button 
                className="w-full mt-4 py-2.5 rounded-xl bg-white/5 hover:bg-brand hover:text-dark font-semibold text-sm transition-all flex items-center justify-center gap-2 group-hover:bg-brand group-hover:text-dark"
                onClick={() => openDetails(car)}
            >
                Pogledaj detalje <ChevronRight size={16} />
            </button>
        </div>
    </div>
);
