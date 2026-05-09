'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiService } from '../../services/apiService';

export default function CartPage() {
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (!role || role !== 'USER') {
            alert('Acces interzis! Doar clienții au coș de cumpărături.');
            router.push('/');
            return;
        }

        // Am mutat funcția AICI în interior, ca să existe înainte de a fi strigată!
        const fetchCart = async () => {
            try {
                const data = await apiService.getCart();
                setCart(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCart();
    }, [router]);

    const handleCheckout = async () => {
        setIsCheckoutLoading(true);
        try {
            await apiService.checkout();
            alert('Comandă finalizată cu succes! Poți merge să ridici mâncarea.');
            router.push('/orders');
        } catch (err) {
            alert(err.message);
        } finally {
            setIsCheckoutLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', fontFamily: 'sans-serif' }}>
            <nav style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '1rem 2rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: '900', color: '#059669', letterSpacing: '-1px' }}>
                    FoodResq<span style={{ color: '#111827' }}>.</span>
                </Link>
                <Link href="/oferte" style={{ textDecoration: 'none', color: '#4B5563', fontWeight: 'bold' }}>
                    ← Continuă cumpărăturile
                </Link>
            </nav>

            <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#111827', marginBottom: '2rem' }}>Coșul meu</h1>

                {isLoading ? (
                    <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#6B7280' }}>Se încarcă coșul... ⏳</p>
                ) : error ? (
                    <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '1rem', borderRadius: '0.5rem', fontWeight: 'bold' }}>{error}</div>
                ) : !cart || !cart.items || cart.items.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#fff', borderRadius: '1rem' }}>
                        <p style={{ fontSize: '1.2rem', color: '#6B7280', marginBottom: '1rem' }}>Coșul tău este gol. 😔</p>
                        <Link href="/oferte" style={{ display: 'inline-block', padding: '0.8rem 1.5rem', backgroundColor: '#059669', color: '#fff', textDecoration: 'none', borderRadius: '0.5rem', fontWeight: 'bold' }}>
                            Vezi ofertele
                        </Link>
                    </div>
                ) : (
                    <div style={{ backgroundColor: '#fff', borderRadius: '1rem', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {cart.items.map(item => (
                                <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #E5E7EB' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>{item.listingTitle}</h3>
                                        <p style={{ margin: 0, color: '#6B7280', fontSize: '0.9rem' }}>Cantitate: {item.quantity}</p>
                                    </div>
                                    <div style={{ fontWeight: 'bold', color: '#059669', fontSize: '1.2rem' }}>
                                        {item.price === 0 ? 'Gratis' : `${item.price} RON`}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1rem', borderTop: '2px dashed #E5E7EB' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#374151' }}>Total:</span>
                            <span style={{ fontSize: '1.8rem', fontWeight: '900', color: '#111827' }}>{cart.totalPrice} RON</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={isCheckoutLoading}
                            style={{ width: '100%', padding: '1rem', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem', cursor: isCheckoutLoading ? 'wait' : 'pointer', marginTop: '2rem' }}
                        >
                            {isCheckoutLoading ? 'Se procesează comanda...' : 'Finalizează Comanda'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}