import { Car, Country } from '../types';

export const MOCK_CARS: Car[] = [
    { id: 1, make: "Volkswagen", model: "Golf 7", version: "2.0 TDI Highline", price: 13900, year: 2018, km: 145000, fuel: "Dizel", power: 150, country: "DE", city: "München", source: "mobile.de", img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800" },
    { id: 2, make: "BMW", model: "320d", version: "M Sport", price: 28500, year: 2021, km: 89000, fuel: "Dizel", power: 190, country: "AT", city: "Beč", source: "willhaben.at", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800" },
    { id: 3, make: "Audi", model: "A4", version: "Avant 40 TDI", price: 24900, year: 2019, km: 112000, fuel: "Dizel", power: 190, country: "FR", city: "Pariz", source: "leboncoin.fr", img: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=800" },
    { id: 4, make: "Mercedes-Benz", model: "C 200", version: "AMG Line", price: 36700, year: 2022, km: 45000, fuel: "Benzin", power: 204, country: "IT", city: "Milano", source: "subito.it", img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800" },
    { id: 5, make: "Skoda", model: "Octavia", version: "2.0 TDI Style", price: 18500, year: 2020, km: 120000, fuel: "Dizel", power: 150, country: "DE", city: "Berlin", source: "autoscout24.com", img: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800" },
    { id: 6, make: "Volkswagen", model: "Passat", version: "B8 2.0 TDI Elegance", price: 17200, year: 2019, km: 160000, fuel: "Dizel", power: 150, country: "CH", city: "Zurich", source: "tutti.ch", img: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=800" },
    { id: 7, make: "Audi", model: "A6", version: "3.0 TDI Quattro", price: 26500, year: 2018, km: 180000, fuel: "Dizel", power: 286, country: "DE", city: "Frankfurt", source: "mobile.de", img: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800" },
    { id: 8, make: "BMW", model: "530d", version: "xDrive Luxury", price: 38900, year: 2020, km: 95000, fuel: "Dizel", power: 286, country: "AT", city: "Salzburg", source: "willhaben.at", img: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=800" },
    { id: 9, make: "Mercedes-Benz", model: "E 220d", version: "Avantgarde", price: 41000, year: 2021, km: 75000, fuel: "Dizel", power: 194, country: "FR", city: "Lyon", source: "leboncoin.fr", img: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=800" },
    { id: 10, make: "Renault", model: "Megane", version: "1.5 dCi Bose", price: 12500, year: 2019, km: 110000, fuel: "Dizel", power: 115, country: "IT", city: "Rim", source: "subito.it", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800" },
    { id: 11, make: "Peugeot", model: "308", version: "1.2 PureTech Allure", price: 14800, year: 2020, km: 85000, fuel: "Benzin", power: 130, country: "FR", city: "Marseille", source: "leboncoin.fr", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800" },
    { id: 12, make: "Volkswagen", model: "Tiguan", version: "2.0 TDI R-Line", price: 31000, year: 2021, km: 65000, fuel: "Dizel", power: 200, country: "DE", city: "Hamburg", source: "mobile.de", img: "https://images.unsplash.com/photo-1517672651691-24622a91b550?auto=format&fit=crop&q=80&w=800" },
    { id: 13, make: "Toyota", model: "RAV4", version: "2.5 Hybrid AWD", price: 35500, year: 2022, km: 40000, fuel: "Hibrid", power: 222, country: "CH", city: "Ženeva", source: "tutti.ch", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800" },
    { id: 14, make: "Ford", model: "Focus", version: "1.5 TDCi Titanium", price: 11900, year: 2018, km: 135000, fuel: "Dizel", power: 120, country: "AT", city: "Graz", source: "willhaben.at", img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800" },
    { id: 15, make: "Hyundai", model: "Tucson", version: "1.6 T-GDI N Line", price: 27800, year: 2021, km: 55000, fuel: "Benzin", power: 150, country: "IT", city: "Torino", source: "subito.it", img: "https://images.unsplash.com/photo-1633493721558-816223126868?auto=format&fit=crop&q=80&w=800" }
];

export const COUNTRIES: Record<string, Country> = {
    DE: { name: "Njemačka", flag: "🇩🇪" },
    AT: { name: "Austrija", flag: "🇦🇹" },
    IT: { name: "Italija", flag: "🇮🇹" },
    FR: { name: "Francuska", flag: "🇫🇷" },
    CH: { name: "Švicarska", flag: "🇨🇭" }
};
