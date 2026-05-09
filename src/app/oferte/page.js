'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Componenta Card (Stil garantat)
const ListingCard = ({ listing }) => {
    return (
        <div style={{ backgroundColor: '#fff', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '200px', backgroundColor: '#E5E7EB', position: 'relative' }}>
                <img
                    src={'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop'}
                    alt={listing.title || 'Produs'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: listing.type === 'DONATION' ? '#059669' : '#2563EB', color: '#fff', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    {listing.type === 'DONATION' ? 'DONAȚIE' : 'REDUCERE'}
                </div>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.5rem 0' }}>
                    {listing.title || 'Produs'}
                </h2>
                <p style={{ color: '#6B7280', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1, lineHeight: '1.5' }}>
                    {listing.description || 'Fără descriere.'}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 0.2rem 0' }}>Preț</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: '900', color: listing.type === 'DONATION' ? '#059669' : '#2563EB', margin: '0' }}>
                            {listing.price === 0 ? 'Gratis' : `${listing.price} RON`}
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 0.2rem 0' }}>Porții</p>
                        <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#374151', margin: '0' }}>{listing.quantity || '0'}</p>
                    </div>
                </div>

                <button
                    onClick={() => alert('Trebuie să fii logat pentru a rezerva!')}
                    style={{ width: '100%', padding: '1rem', backgroundColor: listing.type === 'DONATION' ? '#D1FAE5' : '#DBEAFE', color: listing.type === 'DONATION' ? '#047857' : '#1D4ED8', border: 'none', borderRadius: '0.75rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
                >
                    {listing.type === 'DONATION' ? 'Revendică' : 'Rezervă'}
                </button>
            </div>
        </div>
    );
};

export default function OfertePage() {
    const [oferte, setOferte] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Luăm link-ul din fișierul .env.local (sau punem fallback-ul cerut de backend)
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://foodresq-backend.onrender.com';
        const apiUrl = `${baseUrl}/api/listings`;

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) throw new Error('Eroare de server sau CORS blochează cererea.');
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
            <nav style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '1rem 2rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
                <Link href="/" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: '900', color: '#059669', letterSpacing: '-1px' }}>
                    FoodResq<span style={{ color: '#111827' }}>.</span>
                </Link>
                <Link href="/" style={{ textDecoration: 'none', color: '#4B5563', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    ← Înapoi
                </Link>
            </nav>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111827', margin: '0 0 0.5rem 0' }}>Oferte Active</h1>
                    <p style={{ color: '#6B7280', fontSize: '1.1rem', margin: 0 }}>Mâncare delicioasă gata de salvat!</p>
                </div>

                {isLoading && (
                    <div style={{ textAlign: 'center', padding: '5rem 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
                        Se încarcă oferte... ⏳ <br/>
                        <span style={{ fontSize: '1rem', color: '#6B7280', fontWeight: 'normal' }}>(Prima încărcare poate dura până la 30 de secunde conform platformei Render)</span>
                    </div>
                )}

                {error && (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#FEE2E2', borderRadius: '1rem', color: '#B91C1C' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚠️ Nu ne-am putut conecta la server!</h2>
                        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Eroare: {error}</p>
                        <p style={{ fontSize: '0.9rem', color: '#7F1D1D' }}>Dacă backend-ul este pornit, asigură-te că băieții au adăugat `http://localhost:3000` în CORS Config.</p>
                    </div>
                )}

                {!isLoading && !error && oferte.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                        {oferte.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                )}

                {!isLoading && !error && oferte.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '5rem 0', fontSize: '1.2rem', color: '#6B7280', fontWeight: 'bold' }}>
                        Momentan nu există oferte disponibile. 😔
                    </div>
                )}
            </div>
        </div>
    );
}