'use client';
import { useState } from 'react';
import Link from 'next/link';

// ==========================================
// 1. DATELE FALSE (MOCK DATA)
// ==========================================
const mockListings = [
    {
        id: '1',
        title: '🥐 Patiserie Asortată',
        description: 'Croissante și pateuri proaspete, rămase de la sfârșitul programului.',
        quantity: 15,
        price: 3.5,
        type: 'SALE',
        status: 'ACTIVE'
    },
    {
        id: '2',
        title: '🍎 Lădiță Fructe & Legume',
        description: 'Mere, banane și morcovi - perfecte pentru consum. Exclusiv pentru ONG-uri.',
        quantity: 20,
        price: 0,
        type: 'DONATION',
        status: 'ACTIVE'
    },
    {
        id: '3',
        title: '🍲 Porții Meniul Zilei',
        description: 'Porții calde (supă + felul doi) din meniul zilei, neatinse.',
        quantity: 4,
        price: 12.5,
        type: 'SALE',
        status: 'ACTIVE'
    }
];

// ==========================================
// 2. COMPONENTA CARD (Mutată direct aici)
// ==========================================
const ListingCard = ({ listing }) => {
    const handleAction = () => {
        alert(`Ai dat click pe ${listing.title}! Fiind un demo, acțiunea e doar de formă.`);
    };

    return (
        <div className="bg-white border rounded-xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h2 className="font-bold text-lg text-gray-800">{listing.title}</h2>
                    <span className={`px-2 py-1 text-xs rounded-full font-bold ${listing.type === 'SALE' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
            {listing.type === 'SALE' ? 'VÂNZARE' : 'DONAȚIE'}
          </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{listing.description}</p>

                <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-xl text-gray-900">
                        {listing.type === 'SALE' ? `${listing.price} RON` : 'Gratuit'}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">Cantitate: {listing.quantity}</p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="text-sm text-gray-500">Status: <strong className="text-green-600">{listing.status}</strong></span>

                <button
                    onClick={handleAction}
                    className={`text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition ${listing.type === 'SALE' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {listing.type === 'SALE' ? 'Rezervă' : 'Revendică'}
                </button>
            </div>
        </div>
    );
};

// ==========================================
// 3. PAGINA PRINCIPALĂ (HOME)
// ==========================================
export default function Home() {
    const [filter, setFilter] = useState('ALL');

    // Filtrăm datele
    const filteredListings = mockListings.filter(listing => {
        if (filter === 'ALL') return true;
        return listing.type === filter;
    });

    return (
        <div className="flex flex-col gap-16 pb-10">

            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-br from-green-500 to-emerald-700 text-white rounded-3xl p-10 md:p-20 text-center shadow-xl mt-4 overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Salvează Mâncarea.<br/>Ajută Comunitatea.
                    </h1>
                    <p className="text-xl md:text-2xl text-green-50 max-w-3xl mx-auto mb-10 font-light">
                        FoodResq conectează afacerile locale cu persoanele și ONG-urile care au nevoie. Mai puțină risipă, mai multe zâmbete.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/login" className="bg-white text-green-700 font-bold text-lg py-4 px-8 rounded-full hover:bg-gray-100 hover:scale-105 transition-all shadow-lg">
                            Intră în Comunitate
                        </Link>
                        <button
                            onClick={() => document.getElementById('oferte').scrollIntoView({ behavior: 'smooth' })}
                            className="bg-green-800 text-white font-bold text-lg py-4 px-8 rounded-full border border-green-600 hover:bg-green-900 transition-all"
                        >
                            Vezi Ofertele
                        </button>
                    </div>
                </div>
            </section>

            {/* CUM FUNCȚIONEAZĂ */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-4xl mb-4">🏪</div>
                    <h3 className="text-xl font-bold mb-2">1. Localurile postează</h3>
                    <p className="text-gray-600">Restaurantele și magazinele adaugă mâncarea nevândută la preț redus sau gratuit.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-4xl mb-4">📱</div>
                    <h3 className="text-xl font-bold mb-2">2. Tu rezervi</h3>
                    <p className="text-gray-600">Găsești oferte în zona ta, rezervi prin aplicație și ridici comanda.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-4xl mb-4">🌍</div>
                    <h3 className="text-xl font-bold mb-2">3. Salvăm planeta</h3>
                    <p className="text-gray-600">Reduci emisiile de CO2 și susții afacerile locale în combaterea risipei.</p>
                </div>
            </section>

            {/* ZONA DE PRODUSE */}
            <section id="oferte" className="px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-3xl font-bold text-gray-800">Cele mai recente oferte</h2>

                    <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl border">
                        <button
                            onClick={() => setFilter('ALL')}
                            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${filter === 'ALL' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500 hover:text-gray-800'}`}
                        >
                            Toate
                        </button>
                        <button
                            onClick={() => setFilter('SALE')}
                            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${filter === 'SALE' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
                        >
                            Reduceri
                        </button>
                        <button
                            onClick={() => setFilter('DONATION')}
                            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${filter === 'DONATION' ? 'bg-white shadow-sm text-green-600' : 'text-gray-500 hover:text-gray-800'}`}
                        >
                            Donații
                        </button>
                    </div>
                </div>

                {/* GRID-UL */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredListings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            </section>

        </div>
    );
}