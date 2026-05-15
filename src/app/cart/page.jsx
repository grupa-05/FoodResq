'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiService } from '../../services/apiService';
// Importăm icoanele moderne și notificările
import { ShoppingCart, ArrowLeft, Trash2, Utensils, Loader2, Image as ImageIcon } from 'lucide-react';
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
        // Am înlocuit confirm() cu un mic toast pentru fluiditate
        const loadingToast = toast.loading('Se șterge produsul...');
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
        <div style={{ minHeight: '100vh', padding: '40px 20px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ margin: 0, fontSize: '2.2rem', color: '#111827', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <ShoppingCart size={32} color="#059669" /> Coșul meu
                    </h1>
                    <Link href="/oferte" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#059669', fontWeight: 'bold', backgroundColor: '#fff', padding: '10px 16px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <ArrowLeft size={18} /> Înapoi la oferte
                    </Link>
                </div>

                {isLoading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', color: '#6B7280' }}>
                        {/* Aici e spinner-ul care se învârte */}
                        <Loader2 className="animate-spin" size={48} color="#059669" style={{ animation: 'spin 1s linear infinite' }} />
                        <p style={{ marginTop: '15px', fontWeight: '500' }}>Se încarcă bunătățile...</p>
                        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: cart?.items?.length > 0 ? '1fr 320px' : '1fr', gap: '25px' }}>

                        {/* LISTA DE PRODUSE */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {cart?.items && cart.items.length > 0 ? (
                                cart.items.map((item) => (
                                    <div key={item.cartItemId} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-2px)' } }}>
                                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                            {/* Aici am pus placeholder-ul pentru imaginea reală */}
                                            <div style={{ width: '80px', height: '80px', backgroundColor: '#F3F4F6', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>
                                                <ImageIcon size={24} />
                                            </div>
                                            <div>
                                                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#111827', fontWeight: '700' }}>
                                                    {item.title}
                                                </h3>
                                                <p style={{ margin: '6px 0 0 0', color: '#6B7280', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <Utensils size={14} /> {item.quantity} x {item.unitPrice} RON
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: '800', fontSize: '1.3rem', color: '#059669', marginBottom: '12px' }}>
                                                {item.subtotal} RON
                                            </div>
                                            <button
                                                onClick={() => handleRemove(item.cartItemId)}
                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#EF4444', background: '#FEF2F2', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' }}
                                            >
                                                <Trash2 size={16} /> Elimină
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: '80px 20px', borderRadius: '16px', color: '#6B7280', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                    <ShoppingCart size={64} color="#D1D5DB" style={{ marginBottom: '15px' }} />
                                    <h2 style={{ color: '#374151', margin: '0 0 10px 0' }}>Coșul este gol</h2>
                                    <p style={{ margin: 0 }}>Descoperă ofertele și salvează mâncare delicioasă!</p>
                                </div>
                            )}
                        </div>

                        {/* SUMAR COMENZI */}
                        {cart?.items?.length > 0 && (
                            <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '16px', height: 'fit-content', position: 'sticky', top: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                                <h2 style={{ fontSize: '1.3rem', marginTop: 0, color: '#111827', borderBottom: '1px solid #E5E7EB', paddingBottom: '15px', marginBottom: '20px' }}>Sumar Comandă</h2>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#4B5563', fontSize: '1.05rem' }}>
                                    <span>Total Produse:</span>
                                    <span style={{ fontWeight: '600' }}>{cart.items.reduce((acc, item) => acc + item.quantity, 0)}</span>
                                </div>
                                <div style={{ borderTop: '2px dashed #E5E7EB', paddingTop: '20px', marginTop: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: '800', color: '#111827' }}>
                                    <span>Total:</span>
                                    <span style={{ color: '#059669' }}>{cart.total} RON</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckoutLoading}
                                    style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '10px', marginTop: '30px', fontWeight: 'bold', fontSize: '1.05rem', cursor: isCheckoutLoading ? 'wait' : 'pointer', transition: '0.2s', opacity: isCheckoutLoading ? 0.7 : 1 }}
                                >
                                    {isCheckoutLoading ? (
                                        <><Loader2 className="animate-spin" size={20} /> Se procesează...</>
                                    ) : (
                                        'Finalizează Comanda'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}