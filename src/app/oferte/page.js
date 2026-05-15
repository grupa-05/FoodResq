'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiService } from '../../services/apiService';
import { getListings } from "@/app/oferte/fetch_oferte";
// Importăm icoanele și toast
import { ShoppingCart, Package, PlusCircle, LogOut, LogIn, UserPlus, Utensils, Info, Loader2, Tag, Gift } from 'lucide-react';
import toast from 'react-hot-toast';

const ListingCard = ({ listing }) => {
    const [isActionLoading, setIsActionLoading] = useState(false);

    const handleActionClick = async () => {
        setIsActionLoading(true);
        const loadingToast = toast.loading('Se procesează...');
        try {
            if (listing.type === 'DONATION') {
                await apiService.claimDonation(listing.id);
                toast.success('Felicitări! Ai revendicat donația! 🎉', { id: loadingToast });
            } else {
                await apiService.addToCart(listing.id, 1);
                toast.success('Mâncarea a fost adăugată în coș! 🛒', { id: loadingToast });
            }
        } catch (error) {
            toast.error(error.message, { id: loadingToast });
        } finally {
            setIsActionLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#fff', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s' }}>
            <div style={{ height: '200px', backgroundColor: '#E5E7EB', position: 'relative' }}>
                <img
                    src={'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop'}
                    alt={listing.title || 'Produs'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: listing.type === 'DONATION' ? '#059669' : '#2563EB', color: '#fff', padding: '6px 16px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {listing.type === 'DONATION' ? <Gift size={14} /> : <Tag size={14} />}
                    {listing.type === 'DONATION' ? 'DONAȚIE' : 'REDUCERE'}
                </div>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', margin: '0 0 0.5rem 0' }}>{listing.title || 'Produs'}</h2>
                <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1, lineHeight: '1.5' }}>{listing.description || 'Fără descriere disponibilă.'}</p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', backgroundColor: '#F9FAFB', padding: '12px', borderRadius: '12px' }}>
                    <div>
                        <p style={{ fontSize: '0.7rem', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 0.2rem 0' }}>Preț</p>
                        <p style={{ fontSize: '1.4rem', fontWeight: '900', color: listing.type === 'DONATION' ? '#059669' : '#2563EB', margin: '0' }}>
                            {listing.price === 0 ? 'Gratis' : `${listing.price} RON`}
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.7rem', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 0.2rem 0' }}>Porții</p>
                        <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#374151', margin: '0' }}>{listing.quantity || '0'}</p>
                    </div>
                </div>

                <button
                    onClick={handleActionClick}
                    disabled={isActionLoading}
                    style={{ width: '100%', padding: '1rem', backgroundColor: listing.type === 'DONATION' ? '#059669' : '#111827', color: '#fff', border: 'none', borderRadius: '1rem', fontWeight: 'bold', cursor: isActionLoading ? 'wait' : 'pointer', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', transition: '0.2s' }}
                >
                    {isActionLoading ? <Loader2 className="animate-spin" size={20} /> : (listing.type === 'DONATION' ? <Gift size={20} /> : <ShoppingCart size={20} />)}
                    {isActionLoading ? 'Se procesează...' : (listing.type === 'DONATION' ? 'Revendică' : 'Adaugă în Coș')}
                </button>
            </div>
        </div>
    );
};

export default function OfertePage() {
    const [oferte, setOferte] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token && role) {
            setIsLoggedIn(true);
            setUserRole(role);
        }

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://foodresq-backend.onrender.com';
        getListings(baseUrl)
            .then(data => { setOferte(data); setIsLoading(false); })
            .catch(err => { setError(err.message); setIsLoading(false); });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        setUserRole(null);
        toast.success('Te-ai deconectat!');
        router.push('/');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F3F4F6' }}>
            {/* NAV BAR MODERN */}
            <nav style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', padding: '1rem 2rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
                <Link href="/" style={{ textDecoration: 'none', fontSize: '1.6rem', fontWeight: '900', color: '#059669', letterSpacing: '-1px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Utensils size={28} /> FoodResq<span style={{ color: '#111827' }}>.</span>
                </Link>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {isLoggedIn ? (
                        <>
                            {userRole === 'USER' && (
                                <>
                                    <Link href="/cart" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#111827', backgroundColor: '#fff', border: '1px solid #E5E7EB', padding: '0.6rem 1.2rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                        <ShoppingCart size={18} /> Coș
                                    </Link>
                                    <Link href="/orders" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#4B5563', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Package size={18} /> Comenzi
                                    </Link>
                                </>
                            )}
                            {userRole === 'BUSINESS' && (
                                <Link href="/create" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#fff', backgroundColor: '#059669', padding: '0.6rem 1.2rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <PlusCircle size={18} /> Adaugă Ofertă
                                </Link>
                            )}
                            <button onClick={handleLogout} style={{ border: 'none', background: 'transparent', color: '#DC2626', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', padding: '0.5rem' }}>
                                <LogOut size={18} /> Ieșire
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#4B5563', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <LogIn size={18} /> Login
                            </Link>
                            <Link href="/register" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#fff', backgroundColor: '#111827', padding: '0.6rem 1.2rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <UserPlus size={18} /> Înscriere
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#111827', margin: '0 0 0.5rem 0', letterSpacing: '-1px' }}>Oferte Active</h1>
                    <p style={{ color: '#6B7280', fontSize: '1.2rem', margin: 0 }}>Mâncare delicioasă salvată de la risipă.</p>
                </div>

                {isLoading && (
                    <div style={{ textAlign: 'center', padding: '8rem 0' }}>
                        <Loader2 className="animate-spin" size={48} color="#059669" style={{ margin: '0 auto' }} />
                        <p style={{ marginTop: '15px', color: '#6B7280', fontWeight: '600' }}>Se caută cele mai bune oferte...</p>
                        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                )}

                {error && (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#FEF2F2', borderRadius: '1.5rem', color: '#B91C1C', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <Info size={32} />
                        <p style={{ fontWeight: 'bold', margin: 0 }}>Ups! Ceva n-a mers bine: {error}</p>
                    </div>
                )}

                {!isLoading && !error && oferte.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                        {oferte.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
                    </div>
                )}

                {!isLoading && !error && oferte.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '8rem 0', color: '#6B7280' }}>
                        <Utensils size={48} style={{ marginBottom: '15px', opacity: 0.3 }} />
                        <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Momentan nu există oferte disponibile.</p>
                        <p>Revino mai târziu pentru a salva mâncare!</p>
                    </div>
                )}
            </div>
        </div>
    );
}