import { Car, Country } from '../types';

export const MOCK_CARS: Car[] = [
    { id: 1, make: "Volkswagen", model: "Golf 7", version: "2.0 TDI R-Line", price: 18500, year: 2018, km: 125000, fuel: "Diesel", country: "DE", city: "Munich", source: "mobile.de", img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800" },
    { id: 2, make: "BMW", model: "320d", version: "M Sport Pack", price: 24900, year: 2019, km: 98000, fuel: "Diesel", country: "AT", city: "Vienna", source: "willhaben.at", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800" },
    { id: 3, make: "Audi", model: "A4", version: "Avant Quattro", price: 21200, year: 2017, km: 145000, fuel: "Diesel", country: "IT", city: "Milan", source: "subito.it", img: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=800" },
    { id: 4, make: "Mercedes-Benz", model: "CLA", version: "220d AMG Line", price: 29500, year: 2020, km: 65000, fuel: "Diesel", country: "FR", city: "Paris", source: "leboncoin.fr", img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800" },
    { id: 5, make: "Volkswagen", model: "Golf 7", version: "GTI Performance", price: 22000, year: 2019, km: 85000, fuel: "Benzin", country: "CH", city: "Zurich", source: "tutti.ch", img: "https://images.unsplash.com/photo-1566474074640-4f9c31343291?auto=format&fit=crop&q=80&w=800" },
    { id: 6, make: "BMW", model: "320d", version: "Luxury Line", price: 16800, year: 2015, km: 180000, fuel: "Diesel", country: "DE", city: "Berlin", source: "autoscout24.com", img: "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&q=80&w=800" },
];

export const COUNTRIES: Record<string, Country> = {
    DE: { name: "Njemačka", flag: "🇩🇪" },
    AT: { name: "Austrija", flag: "🇦🇹" },
    IT: { name: "Italija", flag: "🇮🇹" },
    FR: { name: "Francuska", flag: "🇫🇷" },
    CH: { name: "Švicarska", flag: "🇨🇭" }
};
