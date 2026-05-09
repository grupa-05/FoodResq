'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiService } from '../../services/apiService';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await apiService.getMyOrders();
                setOrders(data);
            } catch (err) {
                console.error(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        const role = localStorage.getItem('role');
        if (!role || role !== 'USER') {
            router.push('/login');
            return;
        }
        fetchOrders();
    }, [router]);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', padding: '2rem', fontFamily: 'sans-serif' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <Link href="/oferte" style={{ color: '#059669', textDecoration: 'none', fontWeight: 'bold' }}>← Înapoi la oferte</Link>
                <h1 style={{ marginTop: '1rem', color: '#111827' }}>Istoric Comenzi 📦</h1>

                {isLoading ? <p>Se încarcă...</p> : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {orders.length > 0 ? orders.map(order => (
                            <div key={order.id} style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', pb: '0.5rem', mb: '1rem' }}>
                                    <strong>Comanda #{order.id}</strong>
                                    <span style={{ color: '#059669', fontWeight: 'bold' }}>{order.status}</span>
                                </div>
                                {order.items.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                        <span>{item.quantity}x {item.listingTitle}</span>
                                        <span>{item.subtotal} RON</span>
                                    </div>
                                ))}
                                <div style={{ textAlign: 'right', marginTop: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>Total: {order.totalAmount} RON</div>
                            </div>
                        )) : <p>Nu ai nicio comandă plasată încă.</p>}
                    </div>
                )}
            </div>
        </div>
    );
}