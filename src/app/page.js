'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Utensils, Leaf, ShoppingBag, ArrowUpRight, ShieldCheck, MapPin, Search, LogOut, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LandingPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Verificăm starea autentificării din localStorage
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        toast.success('Te-ai deconectat cu succes!');
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#FCFDFB',
            fontFamily: 'Inter, sans-serif',
            color: '#1A1A1A',
            overflowX: 'hidden'
        }}>

            {/* NAVBAR CU EFECT DE STICLĂ */}
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1.5rem 4rem',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backgroundColor: 'rgba(252, 253, 251, 0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.6rem', fontWeight: '900', color: '#059669', letterSpacing: '-1px' }}>
                    <div style={{ backgroundColor: '#059669', color: '#fff', padding: '8px', borderRadius: '12px', display: 'flex' }}>
                        <Utensils size={24} />
                    </div>
                    FoodResq.
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                    <Link href="/contact" style={{ textDecoration: 'none', color: '#4B5563', fontWeight: '600', fontSize: '0.95rem' }}>Contact</Link>

                    {isLoggedIn ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <Link href="/oferte" style={{ textDecoration: 'none', color: '#111827', fontWeight: '700', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Search size={18} /> Explorează
                            </Link>
                            <button onClick={handleLogout} style={{
                                backgroundColor: '#FEE2E2', color: '#DC2626', border: 'none', padding: '10px 20px',
                                borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                            }}>
                                <LogOut size={18} /> Ieșire
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" style={{ textDecoration: 'none', color: '#111827', fontWeight: '700', fontSize: '0.95rem' }}>Login</Link>
                            <Link href="/register" style={{
                                textDecoration: 'none',
                                backgroundColor: '#059669',
                                color: '#fff',
                                padding: '12px 24px',
                                borderRadius: '14px',
                                fontWeight: 'bold',
                                boxShadow: '0 10px 20px -5px rgba(5, 150, 105, 0.4)'
                            }}>REGISTER</Link>
                        </>
                    )}
                </div>
            </nav>

            {/* HERO SECTION */}
            <main style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                padding: '6rem 4rem',
                maxWidth: '1400px',
                margin: '0 auto',
                alignItems: 'center',
                gap: '4rem'
            }}>
                <div>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#E8F5E9',
                        color: '#2E7D32',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        fontSize: '0.85rem',
                        fontWeight: '800',
                        marginBottom: '2rem',
                        border: '1px solid rgba(46, 125, 50, 0.1)'
                    }}>
                        <Leaf size={18} /> {isLoggedIn ? 'BINE AI REVENIT ÎN COMUNITATE' : 'SALVEAZĂ MÂNCAREA, CREEAZĂ ZÂMBETE'}
                    </div>

                    <h1 style={{
                        fontSize: '5.5rem',
                        fontWeight: '900',
                        lineHeight: '0.95',
                        letterSpacing: '-4px',
                        marginBottom: '2rem',
                        color: '#111827'
                    }}>
                        Delicii Salvate,<br />
                        <span style={{ color: '#059669' }}>Zâmbete Create.</span>
                    </h1>

                    <p style={{
                        fontSize: '1.25rem',
                        color: '#6B7280',
                        lineHeight: '1.6',
                        maxWidth: '520px',
                        marginBottom: '3rem'
                    }}>
                        {isLoggedIn
                            ? 'Ești gata să salvezi porția de astăzi? Aruncă o privire la ofertele proaspete și sustenabile din zona ta.'
                            : 'Fă rai din ce ai! Alătură-te FoodResq pentru a te bucura de mâncare extraordinară la prețuri incredibile, reducând risipa.'}
                    </p>

                    <Link href="/oferte" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        textDecoration: 'none',
                        backgroundColor: '#111827',
                        color: '#fff',
                        padding: '20px 40px',
                        borderRadius: '18px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        boxShadow: '0 20px 40px -10px rgba(17, 24, 39, 0.3)',
                        transition: 'transform 0.2s'
                    }}>
                        {isLoggedIn ? 'VEZI OFERTELE NOI' : 'VEZI OFERTELE DE AZI'} <ArrowUpRight size={22} />
                    </Link>
                </div>

                {/* COLALJ IMAGINI DIN DESIGN */}
                <div style={{ position: 'relative', display: 'flex', gap: '20px', height: '520px' }}>
                    <div style={{
                        width: '60%',
                        borderRadius: '32px',
                        overflow: 'hidden',
                        boxShadow: '0 30px 60px -15px rgba(0,0,0,0.15)',
                        transform: 'translateY(-20px)'
                    }}>
                        <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Food 1" />
                    </div>
                    <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ height: '60%', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.15)' }}>
                            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Food 2" />
                        </div>
                        <div style={{ height: '40%', borderRadius: '32px', backgroundColor: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textAlign: 'center' }}>
                            <div>
                                <div style={{ fontSize: '2.2rem', fontWeight: '900' }}>-70%</div>
                                <div style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.9, letterSpacing: '1px' }}>REDUCERI</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* FOOTER */}
            <footer style={{
                padding: '5rem 4rem 3rem',
                backgroundColor: '#111827',
                color: '#fff',
                marginTop: '4rem'
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#059669', marginBottom: '10px' }}>FoodResq.</div>
                        <p style={{ color: '#9CA3AF', maxWidth: '300px', fontSize: '0.9rem' }}>Mâncare de calitate, prețuri mici, impact mare asupra mediului.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '3rem' }}>
                        <Link href="/contact" style={{ color: '#fff', textDecoration: 'none', fontWeight: '600' }}>Contact</Link>
                        <Link href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Privacy Policy</Link>
                        <Link href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Terms</Link>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '3rem', paddingTop: '2rem', textAlign: 'center', color: '#4B5563', fontSize: '0.85rem' }}>
                    © 2026 FoodResq. Creat pentru un viitor mai verde.
                </div>
            </footer>
        </div>
    );
}