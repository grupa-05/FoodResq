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
            console.log("Date primite in COS (F12):", data);
            setCart(data);
        } catch (err) {
            console.error("Eroare la incarcare cos:", err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (!role || role !== 'USER') {
            router.push('/login');
            return;
        }
        fetchCart();
    }, [router, fetchCart]);

    const handleRemove = async (itemId) => {
        // FOARTE IMPORTANT: Verificam daca avem un ID valid
        if(!itemId) {
            alert("Eroare: ID-ul produsului lipseste.");
            return;
        }

        if(!confirm("Sigur vrei să ștergi acest produs din coș?")) return;

        try {
            await apiService.removeFromCart(itemId);
            // Reincarcam cosul imediat dupa stergere
            const updatedData = await apiService.getCart();
            setCart(updatedData);
        } catch (err) {
            console.error("Eroare stergere:", err);
            alert("Eroare la ștergere: " + err.message);
        }
    };

    const handleCheckout = async () => {
        setIsCheckoutLoading(true);
        try {
            await apiService.checkout();
            alert('Comandă finalizată cu succes!');
            router.push('/orders');
        } catch (err) {
            alert("Eroare la checkout: " + err.message);
        } finally {
            setIsCheckoutLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F3F4F6', padding: '40px 20px', fontFamily: 'sans-serif' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#111827', margin: 0 }}>Coșul meu 🛒</h1>
                    <Link href="/oferte" style={{ color: '#059669', textDecoration: 'none', fontWeight: 'bold', padding: '10px 20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        ← Înapoi la cumpărături
                    </Link>
                </div>

                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}>Se încarcă...</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: cart?.items?.length > 0 ? '1fr 320px' : '1fr', gap: '25px' }}>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {cart?.items && cart.items.length > 0 ? (
                                cart.items.map((item) => {
                                    // REPARARE DATE: API-ul trimite detaliile in item.listing
                                    const title = item.listing?.title || item.listingTitle || "Produs FoodResQ";
                                    const price = item.listing?.price || item.price || 0;
                                    const quantity = item.quantity || 1;
                                    const imageUrl = item.listing?.imageUrl || "https://via.placeholder.com/150?text=Food";

                                    return (
                                        <div key={item.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '18px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                                {/* AFISARE POZA */}
                                                <img
                                                    src={imageUrl}
                                                    alt={title}
                                                    style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', backgroundColor: '#eee' }}
                                                    onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Food"; }}
                                                />
                                                <div>
                                                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111827' }}>{title}</h3>
                                                    <p style={{ margin: '4px 0 0 0', color: '#6B7280', fontSize: '0.9rem' }}>Bucăți: {quantity}</p>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontWeight: '800', fontSize: '1.2rem', color: '#059669', marginBottom: '8px' }}>{price} RON</div>
                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    style={{ color: '#EF4444', background: '#FEF2F2', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}
                                                >
                                                    Elimină
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: '50px', borderRadius: '20px' }}>Coșul tău este gol.</div>
                            )}
                        </div>

                        {cart?.items?.length > 0 && (
                            <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', height: 'fit-content', position: 'sticky', top: '20px' }}>
                                <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Sumar</h2>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#6B7280' }}>
                                    <span>Total produse:</span>
                                    <span>{cart.items.length}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '15px', borderTop: '2px solid #F3F4F6', fontWeight: '800', fontSize: '1.4rem' }}>
                                    <span>Total de plată:</span>
                                    <span>{cart.totalPrice || 0} RON</span>
                                </div>
                                <button onClick={handleCheckout} disabled={isCheckoutLoading} style={{ width: '100%', padding: '15px', backgroundColor: '#111827', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '25px', cursor: 'pointer' }}>
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