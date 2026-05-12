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
            // DEBUG: Verifică în consola browserului (F12) cum arată obiectul primit
            console.log("Cart Data:", data);
            setCart(data);
        } catch (err) {
            console.error("Fetch error:", err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleRemove = async (itemId) => {
        if (!itemId) {
            alert("Eroare: ID-ul acestui element din coș nu a fost găsit.");
            return;
        }

        try {
            await apiService.removeFromCart(itemId);
            fetchCart(); // Reîmprospătăm lista după ștergere
        } catch (err) {
            // Dacă primești 405 aici, e de la backend (CORS sau rute nepermise)
            alert("Nu s-a putut șterge: " + err.message);
        }
    };

    const handleCheckout = async () => {
        setIsCheckoutLoading(true);
        try {
            await apiService.checkout();
            alert('Comandă reușită!');
            router.push('/orders');
        } catch (err) {
            alert(err.message);
        } finally {
            setIsCheckoutLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', padding: '40px 20px', fontFamily: 'sans-serif' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <h1 style={{ margin: 0 }}>Coșul meu 🛒</h1>
                    <Link href="/oferte" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold' }}>← Înapoi la oferte</Link>
                </div>

                {isLoading ? <p>Se încarcă produsele...</p> : (
                    <div style={{ display: 'grid', gridTemplateColumns: cart?.items?.length > 0 ? '1fr 300px' : '1fr', gap: '20px' }}>

                        {/* LISTA PRODUSE */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {cart?.items && cart.items.length > 0 ? (
                                cart.items.map((item) => {
                                    // REPARARE DATE: Căutăm titlul și prețul în item SAU în item.listing
                                    const title = item.listing?.title || item.listingTitle || "Produs FoodResQ";
                                    const price = item.listing?.price || item.price || 0;
                                    const quantity = item.quantity || 1;

                                    return (
                                        <div key={item.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                                <div style={{ width: '50px', height: '50px', backgroundColor: '#F3F4F6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🥘</div>
                                                <div>
                                                    <h3 style={{ margin: 0, fontSize: '1rem' }}>{title}</h3>
                                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#6B7280' }}>Cantitate: {quantity}</p>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#059669', marginBottom: '5px' }}>{price} RON</div>
                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    style={{ color: '#EF4444', background: '#FEF2F2', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}
                                                >
                                                    Elimină
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : <p>Coșul este gol.</p>}
                        </div>

                        {/* SUMAR */}
                        {cart?.items?.length > 0 && (
                            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', height: 'fit-content', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                                <h2 style={{ fontSize: '1.2rem', marginTop: 0 }}>Sumar</h2>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span>Subtotal:</span>
                                    <span style={{ fontWeight: 'bold' }}>{cart.totalPrice || 0} RON</span>
                                </div>
                                <div style={{ borderTop: '2px solid #F3F4F6', paddingTop: '10px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                    <span>Total:</span>
                                    <span>{cart.totalPrice || 0} RON</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckoutLoading}
                                    style={{ width: '100%', padding: '12px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '8px', marginTop: '20px', fontWeight: 'bold', cursor: 'pointer' }}
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