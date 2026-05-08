'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// ----------------------------------------------------
// COMPONENTA CARD (Rescrisă cu stiluri garantate)
// ----------------------------------------------------
const ListingCard = ({ listing }) => {
    return (
        <div style={{ backgroundColor: '#fff', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
            {/* Imaginea */}
            <div style={{ height: '200px', backgroundColor: '#E5E7EB', position: 'relative' }}>
                <img
                    src={listing.image || 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop'}
                    alt={listing.title || listing.nume || 'Produs'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: '#059669', color: '#fff', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    OFERTĂ
                </div>
            </div>

            {/* Detaliile */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.5rem 0' }}>
                    {listing.title || listing.nume || 'Produs Fără Nume'}
                </h2>
                <p style={{ color: '#6B7280', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1, lineHeight: '1.5' }}>
                    {listing.description || listing.descriere || 'Mâncare delicioasă gata să fie salvată.'}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 0.2rem 0' }}>Preț</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: '900', color: '#059669', margin: '0' }}>{listing.price || listing.pret || '0'} RON</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 0.2rem 0' }}>Cantitate</p>
                        <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#374151', margin: '0' }}>{listing.quantity || listing.cantitate || '1'} porții</p>
                    </div>
                </div>

                <button
                    onClick={() => alert(`Ai rezervat: ${listing.title || listing.nume}`)}
                    style={{ width: '100%', padding: '1rem', backgroundColor: '#D1FAE5', color: '#047857', border: 'none', borderRadius: '0.75rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
                >
                    Rezervă Acum
                </button>
            </div>
        </div>
    );
};

// ----------------------------------------------------
// PAGINA PRINCIPALĂ DE OFERTE
// ----------------------------------------------------
export default function OfertePage() {
    const [oferte, setOferte] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // AICI SCHIMBI LINKUL CÂND ÎȚI DAU BĂIEȚII CALEA CORECTĂ
        const backendUrl = 'https://unusual-chastity-iodize.ngrok-free.dev/api/listings';

        fetch(backendUrl, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) throw new Error('Eroare de server');
                return response.json();
            })
            .then(data => {
                setOferte(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', fontFamily: 'sans-serif' }}>

            {/* NAVBAR */}
            <nav style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '1rem 2rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
                <Link href="/" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: '900', color: '#059669', letterSpacing: '-1px' }}>
                    FoodResq<span style={{ color: '#111827' }}>.</span>
                </Link>
                <Link href="/" style={{ textDecoration: 'none', color: '#4B5563', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    ← Înapoi la Acasă
                </Link>
            </nav>

            {/* CONȚINUT */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111827', margin: '0 0 0.5rem 0' }}>Oferte Active</h1>
                    <p style={{ color: '#6B7280', fontSize: '1.1rem', margin: 0 }}>Salvează mâncarea direct de la restaurante!</p>
                </div>

                {/* MESAJ ÎNCĂRCARE */}
                {isLoading && (
                    <div style={{ textAlign: 'center', padding: '5rem 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
                        Se încarcă ofertele delicioase... ⏳
                    </div>
                )}

                {/* MESAJ EROARE BACKEND */}
                {error && (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#FEE2E2', borderRadius: '1rem', color: '#B91C1C' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚠️ Nu ne-am putut conecta la bucătărie!</h2>
                        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Eroare: Baza de date nu a răspuns.</p>
                        <p style={{ fontSize: '0.9rem', color: '#7F1D1D' }}>Asigură-te că băieții au pornit serverul și link-ul este corect.</p>
                    </div>
                )}

                {/* GRID PRODUSE REALE */}
                {!isLoading && !error && oferte.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                        {oferte.map((listing, index) => (
                            <ListingCard key={listing.id || index} listing={listing} />
                        ))}
                    </div>
                )}

                {/* Dacă merge serverul dar e gol */}
                {!isLoading && !error && oferte.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '5rem 0', fontSize: '1.2rem', color: '#6B7280', fontWeight: 'bold' }}>
                        Momentan nu există oferte disponibile. 😔
                    </div>
                )}
            </div>
        </div>
    );
}