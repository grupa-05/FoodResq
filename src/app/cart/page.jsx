'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiService } from '../../services/apiService';

export default function CartPage() {
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (!role || role !== 'USER') {
            router.push('/login');
            return;
        }

        // Definire funcție async în interior
        const loadData = async () => {
            try {
                const data = await apiService.getCart();
                setCart(data);
            } catch (err) {
                console.error("Eroare la încărcare:", err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [router]); // Am scos fetchCart din dependințe ca să nu mai țipe ESLint

    const handleRemove = async (itemId) => {
        try {
            await apiService.removeFromCart(itemId);
            // Reîncărcăm datele după ștergere
            const updatedCart = await apiService.getCart();
            setCart(updatedCart);
        } catch (err) {
            alert("Nu am putut șterge produsul.");
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
        <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', padding: '2rem', fontFamily: 'sans-serif' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Link href="/oferte" style={{ color: '#059669', textDecoration: 'none', fontWeight: 'bold' }}>← Înapoi la oferte</Link>
                <h1 style={{ marginTop: '1rem', color: '#111827' }}>Coșul meu 🛒</h1>

                {isLoading ? (
                    <p style={{ textAlign: 'center', padding: '2rem' }}>Se încarcă coșul... ⏳</p>
                ) : (
                    <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        {cart?.items && cart.items.length > 0 ? (
                            <>
                                {cart.items.map(item => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #F3F4F6' }}>
                                        <span>{item.listingTitle}</span>
                                        <div>
                                            <span style={{ fontWeight: 'bold', marginRight: '1rem' }}>{item.price} RON</span>
                                            <button onClick={() => handleRemove(item.id)} style={{ color: '#DC2626', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Șterge</button>
                                        </div>
                                    </div>
                                ))}
                                <div style={{ textAlign: 'right', marginTop: '1.5rem', borderTop: '2px dashed #eee', paddingTop: '1rem' }}>
                                    <h2 style={{ margin: 0 }}>Total: {cart.totalPrice} RON</h2>
                                </div>
                                <button onClick={handleCheckout} disabled={isCheckoutLoading} style={{ width: '100%', padding: '1rem', backgroundColor: '#111827', color: 'white', borderRadius: '0.75rem', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: isCheckoutLoading ? 'wait' : 'pointer', marginTop: '2rem' }}>
                                    {isCheckoutLoading ? 'Se procesează...' : 'Finalizează Comanda'}
                                </button>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '1rem' }}>
                                <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>Coșul tău este gol.</p>
                                <Link href="/oferte" style={{ backgroundColor: '#059669', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold' }}>Vezi oferte</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}