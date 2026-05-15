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
        } catch (err) { console.error(err.message); }
        finally { setIsLoading(false); }
    }, []);

    useEffect(() => { fetchCart(); }, [fetchCart]);

    const handleRemove = async (itemId) => {
        try {
            await apiService.removeFromCart(itemId);
            fetchCart();
        } catch (err) { alert(err.message); }
    };

    const handleCheckout = async () => {
        try {
            await apiService.checkout();
            alert('Comandă plasată!');
            router.push('/orders');
        } catch (err) { alert(err.message); }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h1>Coșul meu 🛒</h1>
            {isLoading ? <p>Se încarcă...</p> : (
                <>
                    {cart?.items?.length > 0 ? (
                        cart.items.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #ddd' }}>
                                <div>
                                    <strong>{item.listingTitle}</strong>
                                    <p>Cantitate: {item.quantity}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p>{item.price} RON</p>
                                    <button onClick={() => handleRemove(item.id || item.cartItemId || item.itemId)}>Elimină</button>
                                </div>
                            </div>
                        ))
                    ) : <p>Coșul e gol.</p>}
                    {cart?.items?.length > 0 && (
                        <div style={{ marginTop: '20px', textAlign: 'right' }}>
                            <h2>Total: {cart.totalPrice} RON</h2>
                            <button onClick={handleCheckout} style={{ padding: '10px 20px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Finalizează Comanda</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}