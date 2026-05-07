'use client';
import { useState } from 'react';
import Link from 'next/link';

// ==========================================
// 1. DATELE FALSE (Cu imagini adăugate)
// ==========================================
const mockListings = [
    {
        id: '1',
        title: '🥐 Patiserie Asortată',
        description: 'Croissante cu unt și pateuri proaspete, rămase de la sfârșitul programului.',
        quantity: 15,
        price: 3.5,
        type: 'SALE',
        status: 'ACTIVE',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: '2',
        title: '🍎 Lădiță Fructe & Legume',
        description: 'Mere, banane și morcovi - perfecte pentru consum. Exclusiv pentru ONG-uri.',
        quantity: 20,
        price: 0,
        type: 'DONATION',
        status: 'ACTIVE',
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: '3',
        title: '🍲 Meniul Zilei (Cald)',
        description: 'Porții calde (supă cremă + felul doi) din meniul zilei, neatinse.',
        quantity: 4,
        price: 12.5,
        type: 'SALE',
        status: 'ACTIVE',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop'
    }
];

// ==========================================
// 2. COMPONENTA CARD (Design Premium)
// ==========================================
const ListingCard = ({ listing }) => {
    const handleAction = () => {
        alert(`Acțiune declanșată pentru: ${listing.title}`);
    };

    return (
        <div className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1 border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col">
            {/* Imaginea Produsului */}
            <div className="relative h-56 w-full overflow-hidden">
                <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badge-ul pus peste imagine */}
                <div className="absolute top-4 right-4">
          <span className={`px-4 py-1.5 text-xs font-black tracking-wider rounded-full shadow-md ${
              listing.type === 'SALE'
                  ? 'bg-white text-blue-600'
                  : 'bg-emerald-500 text-white'
          }`}>
            {listing.type === 'SALE' ? 'REDUCERE' : 'DONAȚIE'}
          </span>
                </div>
            </div>

            {/* Conținutul Cardului */}
            <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                    <h2 className="font-extrabold text-xl text-gray-900 mb-2">{listing.title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                        {listing.description}
                    </p>
                </div>

                <div>
                    <div className="flex justify-between items-end mb-5">
                        <div>
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Preț</p>
                            <p className="font-black text-2xl text-emerald-600">
                                {listing.type === 'SALE' ? `${listing.price} RON` : 'Gratuit'}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Cantitate</p>
                            <p className="font-bold text-gray-700">{listing.quantity} porții</p>
                        </div>
                    </div>

                    <button
                        onClick={handleAction}
                        className={`w-full py-3.5 rounded-xl text-sm font-bold shadow-sm transition-all ${
                            listing.type === 'SALE'
                                ? 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'
                                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                        }`}
                    >
                        {listing.type === 'SALE' ? 'Rezervă Acum' : 'Revendică Donația'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// ==========================================
// 3. PAGINA PRINCIPALĂ (HOME)
// ==========================================
export default function Home() {
    const [filter, setFilter] = useState('ALL');

    const filteredListings = mockListings.filter(listing => {
        if (filter === 'ALL') return true;
        return listing.type === filter;
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            {/* NAVBAR FAKE (Să pară complet) */}
            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-black text-emerald-600 tracking-tighter">FoodResq<span className="text-gray-900">.</span></div>
                <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-emerald-600 transition-colors">
                    Intră în cont
                </Link>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col gap-20">

                {/* HERO SECTION - Design Modern */}
                <section className="relative bg-gradient-to-br from-emerald-600 via-green-500 to-teal-400 text-white rounded-[2.5rem] p-10 md:p-24 text-center shadow-2xl overflow-hidden">
                    {/* Cercuri decorative în background */}
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-teal-300 opacity-20 rounded-full blur-2xl"></div>

                    <div className="relative z-10 flex flex-col items-center">
            <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm border border-white/30">
              Salvăm împreună planeta
            </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight">
                            Mâncare delicioasă.<br/>Prețuri salvatoare.
                        </h1>
                        <p className="text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto mb-12 font-medium">
                            Conectăm localurile tale preferate cu tine și ONG-urile din zonă. Salvează porțiile nevândute și bucură-te de reduceri masive!
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                            <button
                                onClick={() => document.getElementById('oferte').scrollIntoView({ behavior: 'smooth' })}
                                className="bg-white text-emerald-600 font-extrabold text-lg py-4 px-10 rounded-2xl hover:bg-gray-50 hover:scale-105 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                            >
                                Vezi Produsele
                            </button>
                        </div>
                    </div>
                </section>

                {/* CUM FUNCȚIONEAZĂ - Variante rafinate */}
                <section className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-gray-900">Cum funcționează FoodResq?</h2>
                        <p className="text-gray-500 mt-3 font-medium">Trei pași simpli pentru a face o faptă bună (și a mânca bine).</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                        <div className="flex flex-col items-center group">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:-translate-y-2 transition-transform duration-300">🏪</div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Localurile postează</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">Restaurantele adaugă mâncarea proaspătă nevândută la preț redus la finalul zilei.</p>
                        </div>
                        <div className="flex flex-col items-center group">
                            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:-translate-y-2 transition-transform duration-300">📱</div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Tu rezervi rapid</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">Alegi ce îți e poftă direct din aplicație, plătești mult mai puțin și rezervi porția.</p>
                        </div>
                        <div className="flex flex-col items-center group">
                            <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:-translate-y-2 transition-transform duration-300">🛍️</div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Ridici și savurezi</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">Mergi la locație în intervalul stabilit, arăți rezervarea și te bucuri de mâncare!</p>
                        </div>
                    </div>
                </section>

                {/* ZONA DE PRODUSE - Filtre premium */}
                <section id="oferte" className="pt-10 scroll-mt-24">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 mb-2">Oferte Active</h2>
                            <p className="text-gray-500 font-medium text-sm">Grăbește-te, cantitățile sunt limitate!</p>
                        </div>

                        <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm">
                            <button
                                onClick={() => setFilter('ALL')}
                                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${filter === 'ALL' ? 'bg-gray-900 shadow-md text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                Toate
                            </button>
                            <button
                                onClick={() => setFilter('SALE')}
                                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${filter === 'SALE' ? 'bg-blue-600 shadow-md text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                Mâncare (-50%)
                            </button>
                            <button
                                onClick={() => setFilter('DONATION')}
                                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${filter === 'DONATION' ? 'bg-emerald-600 shadow-md text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                Donații (ONG)
                            </button>
                        </div>
                    </div>

                    {/* GRID-UL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredListings.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}