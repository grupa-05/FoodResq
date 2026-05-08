'use client';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            {/* ========================================== */}
            {/* 1. NAVBAR (Bara de Navigație)              */}
            {/* ========================================== */}
            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">

                {/* Logo-ul în stânga */}
                <Link href="/" className="text-2xl font-black text-emerald-600 tracking-tighter hover:opacity-80 transition-opacity">
                    FoodResq<span className="text-gray-900">.</span>
                </Link>

                {/* Butoanele în dreapta (toate cu același design) */}
                <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    <Link
                        href="/despre"
                        style={{ textDecoration: 'none', color: '#047857', fontWeight: 'bold', fontSize: '14px', backgroundColor: '#D1FAE5', padding: '8px 20px', borderRadius: '12px' }}
                    >
                        Despre Noi
                    </Link>

                    <Link
                        href="/contact"
                        style={{ textDecoration: 'none', color: '#047857', fontWeight: 'bold', fontSize: '14px', backgroundColor: '#D1FAE5', padding: '8px 20px', borderRadius: '12px' }}
                    >
                        Contactează-ne
                    </Link>

                    <Link
                        href="/login"
                        style={{ textDecoration: 'none', color: '#047857', fontWeight: 'bold', fontSize: '14px', backgroundColor: '#D1FAE5', padding: '8px 20px', borderRadius: '12px' }}
                    >
                        Intră în cont
                    </Link>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col gap-20">

                {/* ========================================== */}
                {/* 2. HERO SECTION (Zona de Impact)           */}
                {/* ========================================== */}
                <section className="relative bg-gradient-to-br from-emerald-600 via-green-500 to-teal-400 text-white rounded-[2.5rem] p-10 md:p-24 text-center shadow-2xl overflow-hidden">
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

                        <div className="flex justify-center w-full">
                            <Link
                                href="/oferte"
                                className="bg-white text-emerald-600 font-extrabold text-lg py-4 px-10 rounded-2xl hover:bg-gray-50 hover:scale-105 transition-transform duration-300 shadow-xl inline-block"
                            >
                                Vezi Produsele
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ========================================== */}
                {/* 3. CUM FUNCȚIONEAZĂ (Pașii)                */}
                {/* ========================================== */}
                <section className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-gray-900">Cum funcționează FoodResq?</h2>
                        <p className="text-gray-500 mt-3 font-medium">Trei pași simpli pentru a face o faptă bună (și a mânca bine).</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                        <div className="flex flex-col items-center group">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center text-4xl font-black mb-6 shadow-sm group-hover:-translate-y-2 transition-transform duration-300">1</div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Localurile postează</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">Restaurantele adaugă mâncarea proaspătă nevândută la preț redus la finalul zilei.</p>
                        </div>
                        <div className="flex flex-col items-center group">
                            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center text-4xl font-black mb-6 shadow-sm group-hover:-translate-y-2 transition-transform duration-300">2</div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Tu rezervi rapid</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">Alegi ce îți e poftă direct din aplicație, plătești mult mai puțin și rezervi porția.</p>
                        </div>
                        <div className="flex flex-col items-center group">
                            <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center text-4xl font-black mb-6 shadow-sm group-hover:-translate-y-2 transition-transform duration-300">3</div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Ridici și savurezi</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">Mergi la locație în intervalul stabilit, arăți rezervarea și te bucuri de mâncare!</p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}