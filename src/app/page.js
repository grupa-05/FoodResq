'use client';
import Link from 'next/link';
import { Utensils, Leaf, ShoppingBag, ArrowUpRight, ShieldCheck, MapPin, Search, ChevronRight } from 'lucide-react';

export default function LandingPage() {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#FCFDFB',
            fontFamily: 'Inter, sans-serif',
            color: '#1A1A1A',
            overflowX: 'hidden'
        }}>

            {/* 1. NAVBAR CU EFECT DE STICLĂ */}
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1.5rem 4rem',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backgroundColor: 'rgba(252, 253, 251, 0.7)',
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
                    <Link href="#how-it-works" style={{ textDecoration: 'none', color: '#4B5563', fontWeight: '600', fontSize: '0.95rem' }}>Cum funcționează</Link>
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
                </div>
            </nav>

            {/* 2. HERO SECTION - DELICII SALVATE */}
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
                        fontSize: '0.9rem',
                        fontWeight: '800',
                        marginBottom: '2rem',
                        border: '1px solid rgba(46, 125, 50, 0.1)'
                    }}>
                        <Leaf size={18} /> SALVEAZĂ MÂNCAREA, CREEAZĂ ZÂMBETE
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
                        maxWidth: '500px',
                        marginBottom: '3rem'
                    }}>
                        Fă rai din ce ai! Alătură-te FoodResq pentru a te bucura de mâncare extraordinară la prețuri incredibile.
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
                        boxShadow: '0 20px 40px -10px rgba(17, 24, 39, 0.3)'
                    }}>
                        VEZI OFERTELE DE AZI <ArrowUpRight size={22} />
                    </Link>

                    {/* LOGO-URI PARTENERI (Subtile) */}
                    <div style={{ marginTop: '4rem', display: 'flex', gap: '2rem', alignItems: 'center', opacity: 0.5 }}>
                        <span style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#9CA3AF', textTransform: 'uppercase' }}>Parteneri:</span>
                        <div style={{ fontWeight: '800' }}>BakeHouse</div>
                        <div style={{ fontWeight: '800' }}>GreenBowl</div>
                        <div style={{ fontWeight: '800' }}>UrbanNGO</div>
                    </div>
                </div>

                {/* IMAGINI STACKED (Ca în design-ul generat) */}
                <div style={{ position: 'relative', display: 'flex', gap: '20px', height: '500px' }}>
                    <div style={{
                        width: '60%',
                        borderRadius: '30px',
                        overflow: 'hidden',
                        boxShadow: '0 30px 60px -15px rgba(0,0,0,0.2)',
                        transform: 'translateY(-20px)'
                    }}>
                        <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{
                        width: '40%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        <div style={{ height: '60%', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.2)' }}>
                            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ height: '40%', borderRadius: '30px', backgroundColor: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: '900' }}>-70%</div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>REDUCERI</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* 3. SECȚIUNEA CUM FUNCȚIONEAZĂ */}
            <section id="how-it-works" style={{ padding: '6rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#9CA3AF', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>Cum funcționează</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>

                    <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '24px', border: '1px solid #F3F4F6' }}>
                        <div style={{ backgroundColor: '#E8F5E9', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669', marginBottom: '1.5rem' }}>
                            <MapPin size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Descoperă</h3>
                        <p style={{ color: '#6B7280', lineHeight: '1.6' }}>Explorează harta interactivă pentru a găsi localurile partenere din apropierea ta.</p>
                    </div>

                    <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '24px', border: '1px solid #F3F4F6' }}>
                        <div style={{ backgroundColor: '#E3F2FD', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', marginBottom: '1.5rem' }}>
                            <Search size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Rezervă</h3>
                        <p style={{ color: '#6B7280', lineHeight: '1.6' }}>Rezervă-ți porția preferată cu un singur click direct din aplicație.</p>
                    </div>

                    <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '24px', border: '1px solid #F3F4F6' }}>
                        <div style={{ backgroundColor: '#FFF3E0', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', marginBottom: '1.5rem' }}>
                            <ShoppingBag size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Salvează</h3>
                        <p style={{ color: '#6B7280', lineHeight: '1.6' }}>Ridică pachetul și bucură-te de mâncare proaspătă reducând în același timp risipa.</p>
                    </div>

                </div>
            </section>

            {/* FOOTER */}
            <footer style={{ padding: '4rem', textAlign: 'center', backgroundColor: '#111827', color: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2rem', opacity: 0.6 }}>
                    <Link href="#" style={{ color: '#fff', textDecoration: 'none' }}>Privacy Policy</Link>
                    <Link href="#" style={{ color: '#fff', textDecoration: 'none' }}>Terms of Service</Link>
                    <Link href="#" style={{ color: '#fff', textDecoration: 'none' }}>Contact</Link>
                </div>
                <p style={{ opacity: 0.4, fontSize: '0.9rem' }}>© 2026 FoodResq. Revoluția sustenabilității alimentare.</p>
            </footer>

        </div>
    );
}