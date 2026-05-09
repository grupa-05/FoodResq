'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiService } from '../../services/apiService';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (!role || role !== 'USER') {
            alert('Acces interzis! Doar clienții au istoric de comenzi.');
            router.push('/');
            return;
        }

        const fetchOrders = async () => {
            try {
                const data = await apiService.getMyOrders();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [router]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ro-RO', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', fontFamily: 'sans-serif' }}>
            <nav style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '1rem 2rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: '900', color: '#059669', letterSpacing: '-1px' }}>
                    FoodResq<span style={{ color: '#111827' }}>.</span>
                </Link>
                <Link href="/" style={{ textDecoration: 'none', color: '#4B5563', fontWeight: 'bold' }}>
                    ← Acasă
                </Link>
            </nav>

            <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#111827', marginBottom: '2rem' }}>Istoric Comenzi</h1>

                {isLoading ? (
                    <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#6B7280' }}>Aducem istoricul... ⏳</p>
                ) : error ? (
                    <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '1rem', borderRadius: '0.5rem', fontWeight: 'bold' }}>{error}</div>
                ) : orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#fff', borderRadius: '1rem' }}>
                        <p style={{ fontSize: '1.2rem', color: '#6B7280' }}>Nu ai plasat nicio comandă încă.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {orders.map(order => (
                            <div key={order.id} style={{ backgroundColor: '#fff', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '5px solid #059669' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>
                                    <div>
                                        <p style={{ margin: '0 0 0.2rem 0', fontSize: '0.8rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 'bold' }}>Comanda #{order.id}</p>
                                        <p style={{ margin: 0, fontWeight: 'bold', color: '#111827' }}>{formatDate(order.orderDate)}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ backgroundColor: order.status === 'COMPLETED' ? '#D1FAE5' : '#FEF3C7', color: order.status === 'COMPLETED' ? '#047857' : '#D97706', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                                    {order.items.map((item, idx) => (
                                        <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#4B5563', marginBottom: '0.5rem' }}>
                                            <span>{item.quantity}x {item.listingTitle}</span>
                                            <span style={{ fontWeight: 'bold' }}>{item.subtotal} RON</span>
                                        </li>
                                    ))}
                                </ul>

                                <div style={{ textAlign: 'right', fontWeight: '900', fontSize: '1.2rem', color: '#111827' }}>
                                    Total Plătit: {order.totalAmount} RON
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}