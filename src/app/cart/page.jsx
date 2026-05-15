'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiService } from '../../services/apiService';
import { ShoppingCart, ArrowLeft, Trash2, Utensils, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

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
            toast.error("Eroare la încărcarea coșului!");
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

    const handleRemove = async (cartItemId) => {
        const loadingToast = toast.loading('Se elimină produsul...');
        try {
            await apiService.removeFromCart(cartItemId);
            await fetchCart();
            toast.success('Produs eliminat!', { id: loadingToast });
        } catch (err) {
            toast.error(err.message, { id: loadingToast });
        }
    };

    const handleCheckout = async () => {
        setIsCheckoutLoading(true);
        const loadingToast = toast.loading('Procesăm comanda...');
        try {
            await apiService.checkout();
            toast.success('Comandă plasată cu succes! 🎉', { id: loadingToast });
            router.push('/orders');
        } catch (err) {
            toast.error(err.message, { id: loadingToast });
        } finally {
            setIsCheckoutLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F3F4F6', padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

                {/* HEADER */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h1 style={{ margin: 0, fontSize: '2.2rem', color: '#111827', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ShoppingCart size={32} color="#059669" /> Coșul meu
                    </h1>
                    <Link href="/oferte" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#059669', fontWeight: 'bold', backgroundColor: '#fff', padding: '12px 20px', borderRadius: '14px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <ArrowLeft size={18} /> Înapoi la oferte
                    </Link>
                </div>

                {isLoading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0' }}>
                        <Loader2 className="animate-spin" size={48} color="#059669" />
                        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: cart?.items?.length > 0 ? '1fr 350px' : '1fr', gap: '30px' }}>

                        {/* LISTA DE PRODUSE */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {cart?.items && cart.items.length > 0 ? (
                                cart.items.map((item) => (
                                    <div key={item.cartItemId} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '24px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>

                                            {/* IMAGINEA CA ÎN OFERTE */}
                                            <div style={{ width: '100px', height: '100px', borderRadius: '18px', overflow: 'hidden', backgroundColor: '#F3F4F6' }}>
                                                <img
                                                    src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop"
                                                    alt={item.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>

                                            <div>
                                                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: '#111827', fontWeight: '800' }}>
                                                    {item.title}
                                                </h3>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                    <span style={{ color: '#6B7280', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                        <Utensils size={14} /> {item.quantity} porții
                                                    </span>
                                                    <span style={{ color: '#9CA3AF' }}>•</span>
                                                    <span style={{ fontWeight: '600', color: '#4B5563' }}>{item.unitPrice} RON / buc</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: '900', fontSize: '1.4rem', color: '#059669', marginBottom: '10px' }}>
                                                {item.subtotal} RON
                                            </div>
                                            <button
                                                onClick={() => handleRemove(item.cartItemId)}
                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#EF4444', background: '#FEF2F2', border: 'none', padding: '10px 16px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' }}
                                            >
                                                <Trash2 size={16} /> Elimină
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: '80px 20px', borderRadius: '24px', color: '#6B7280' }}>
                                    <ShoppingCart size={64} style={{ marginBottom: '20px', opacity: 0.2 }} />
                                    <h2 style={{ color: '#111827' }}>Coșul tău este gol</h2>
                                    <p>Începe să salvezi mâncare adăugând produse din oferte.</p>
                                </div>
                            )}
                        </div>

                        {/* SUMAR PLATĂ */}
                        {cart?.items?.length > 0 && (
                            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '24px', height: 'fit-content', position: 'sticky', top: '20px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)' }}>
                                <h2 style={{ fontSize: '1.4rem', marginTop: 0, color: '#111827', marginBottom: '20px' }}>Sumar</h2>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#6B7280' }}>
                                    <span>Subtotal</span>
                                    <span>{cart.total} RON</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: '#6B7280' }}>
                                    <span>Taxă salvare</span>
                                    <span style={{ color: '#059669', fontWeight: 'bold' }}>Gratuit</span>
                                </div>
                                <div style={{ borderTop: '2px solid #F3F4F6', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '1.6rem', fontWeight: '900', color: '#111827' }}>
                                    <span>Total</span>
                                    <span style={{ color: '#059669' }}>{cart.total} RON</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckoutLoading}
                                    style={{
                                        width: '100%', padding: '18px', backgroundColor: '#111827', color: 'white',
                                        border: 'none', borderRadius: '16px', marginTop: '30px', fontWeight: 'bold',
                                        fontSize: '1.1rem', cursor: isCheckoutLoading ? 'wait' : 'pointer',
                                        boxShadow: '0 10px 15px -3px rgba(17, 24, 39, 0.3)'
                                    }}
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