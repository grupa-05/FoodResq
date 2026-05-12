'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiService } from '../../services/apiService';

export default function CartPage() {
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchCart = useCallback(async () => {
        try {
            const data = await apiService.getCart();
            setCart(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleRemove = async (itemId) => {
        try {
            await apiService.removeFromCart(itemId);
            fetchCart();
        } catch (err) {
            alert("Eroare Backend (405): Serverul nu permite ștergerea încă.");
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h1>Coșul meu 🛒</h1>
            {isLoading ? <p>Se încarcă...</p> : (
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    {cart?.items?.length > 0 ? (
                        cart.items.map((item) => {
                            // LOGICA DE SALVARE: Căutăm datele în item sau în item.listing
                            const title = item.listing?.title || item.listingTitle || "Produs";
                            const price = item.listing?.price || item.price || 0;
                            const img = item.listing?.imageUrl || "https://via.placeholder.com/100";

                            return (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <img src={img} alt="" style={{ width: '60px', borderRadius: '8px' }} />
                                        <div>
                                            <div style={{ fontWeight: 'bold' }}>{title}</div>
                                            <div style={{ fontSize: '0.9rem', color: '#666' }}>Cantitate: {item.quantity}</div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 'bold', color: '#059669' }}>{price} RON</div>
                                        <button onClick={() => handleRemove(item.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold', marginTop: '5px' }}>Elimină</button>
                                    </div>
                                </div>
                            );
                        })
                    ) : <p>Coșul este gol.</p>}

                    {cart?.items?.length > 0 && (
                        <div style={{ marginTop: '20px', textAlign: 'right' }}>
                            <h2 style={{ borderTop: '2px solid #eee', paddingTop: '10px' }}>Total: {cart.totalPrice} RON</h2>
                            <button onClick={() => apiService.checkout().then(() => { alert("Comandă trimisă!"); router.push('/orders'); })} style={{ backgroundColor: '#000', color: '#fff', padding: '15px 30px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginTop: '10px' }}>Finalizează Comanda</button>
                        </div>
                    )}
                </div>
            )}
            <Link href="/oferte" style={{ display: 'block', marginTop: '20px', textAlign: 'center', color: '#666' }}>← Înapoi la oferte</Link>
        </div>
    );
}