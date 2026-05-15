'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiService } from '../../services/apiService';

export default function CartPage() {
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
    const router = useRouter();

    const fetchCart = useCallback(async () => {
        try {
            const data = await apiService.getCart();
            setCart(data);
        } catch (err) {
            console.error("Eroare la încărcare coș:", err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        // Verificăm dacă utilizatorul are rolul corect (USER) conform documentației [cite: 4]
        const role = localStorage.getItem('role');
        if (!role || role !== 'USER') {
            router.push('/login');
            return;
        }
        fetchCart();
    }, [router, fetchCart]);

    const handleRemove = async (itemId) => {
        if (!confirm("Sigur vrei să ștergi acest produs din coș?")) return;

        try {
            await apiService.removeFromCart(itemId);
            await fetchCart(); // Reîncărcăm coșul după ștergere
        } catch (err) {
            alert(err.message);
        }
    };

    const handleCheckout = async () => {
        setIsCheckoutLoading(true);
        try {
            await apiService.checkout();
            alert('Comandă finalizată cu succes!');
            router.push('/orders');
        } catch (err) {
            alert(err.message);
        } finally {
            setIsCheckoutLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F3F4F6', padding: '40px 20px', fontFamily: 'sans-serif' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ margin: 0, fontSize: '2.2rem', color: '#111827', fontWeight: '800' }}>Coșul meu 🛒</h1>
                    <Link href="/oferte" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold', backgroundColor: '#fff', padding: '8px 16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        ← Înapoi la cumpărături
                    </Link>
                </div>

                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '50px', color: '#6B7280' }}>Se încarcă produsele... ⏳</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: cart?.items?.length > 0 ? '1fr 320px' : '1fr', gap: '25px' }}>

                        {/* LISTA DE PRODUSE DIN COȘ */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {cart?.items && cart.items.length > 0 ? (
                                cart.items.map((item) => (
                                    <div key={item.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                            <div style={{ width: '60px', height: '60px', backgroundColor: '#F3F4F6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🥘</div>
                                            <div>
                                                {/* Folosim exact câmpurile din documentație: listingTitle și quantity  */}
                                                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111827' }}>{item.listingTitle}</h3>
                                                <p style={{ margin: '4px 0 0 0', color: '#6B7280', fontSize: '0.9rem' }}>Cantitate: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            {/* Folosim exact câmpul price din documentație  */}
                                            <div style={{ fontWeight: '800', fontSize: '1.2rem', color: '#059669', marginBottom: '8px' }}>{item.price} RON</div>
                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                style={{ color: '#EF4444', background: '#FEF2F2', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' }}
                                            >
                                                Elimină
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: '60px', borderRadius: '16px', color: '#6B7280' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🧺</div>
                                    Coșul tău este gol.
                                </div>
                            )}
                        </div>

                        {/* SUMARUL COMENZII */}
                        {cart?.items?.length > 0 && (
                            <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '16px', height: 'fit-content', position: 'sticky', top: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                                <h2 style={{ fontSize: '1.3rem', marginTop: 0, color: '#111827' }}>Sumar Comandă</h2>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#4B5563' }}>
                                    <span>Total Produse:</span>
                                    <span>{cart.totalItems}</span>
                                </div>
                                <div style={{ borderTop: '2px solid #F3F4F6', paddingTop: '15px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: '800', color: '#111827' }}>
                                    <span>Total de plată:</span>
                                    {/* Folosim totalPrice din documentație  */}
                                    <span>{cart.totalPrice} RON</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckoutLoading}
                                    style={{ width: '100%', padding: '14px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '10px', marginTop: '25px', fontWeight: 'bold', fontSize: '1rem', cursor: isCheckoutLoading ? 'wait' : 'pointer' }}
                                >
                                    {isCheckoutLoading ? 'Se procesează...' : 'Finalizează Comanda'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}