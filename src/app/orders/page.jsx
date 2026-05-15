'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiService } from '../../services/apiService';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchOrders = useCallback(async () => {
        try {
            const data = await apiService.getMyOrders();
            setOrders(data || []);
        } catch (err) {
            console.error("Eroare la încărcare comenzi:", err.message);
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
        fetchOrders();
    }, [router, fetchOrders]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ro-RO', {
            day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F3F4F6', padding: '40px 20px', fontFamily: 'sans-serif' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ margin: 0, fontSize: '2.2rem', color: '#111827', fontWeight: '800' }}>Istoric Comenzi 📦</h1>
                    <Link href="/oferte" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold', backgroundColor: '#fff', padding: '8px 16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        ← Înapoi la oferte
                    </Link>
                </div>

                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '50px', color: '#6B7280' }}>Se încarcă istoricul... ⏳</div>
                ) : orders.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {orders.map((order) => (
                            <div key={order.id} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>

                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #F3F4F6', paddingBottom: '15px', marginBottom: '15px' }}>
                                    <div>
                                        <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#111827' }}>Comanda #{order.id}</h2>
                                        {/* Aici folosim "createdAt" din clasa ei OrderResponse */}
                                        <p style={{ margin: '5px 0 0 0', color: '#6B7280', fontSize: '0.9rem' }}>{formatDate(order.createdAt)}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {order.items?.map((item, index) => (
                                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1rem', color: '#374151' }}>
                                            <div>
                                                <span style={{ fontWeight: 'bold', marginRight: '10px', color: '#111827' }}>{item.quantity}x</span>
                                                {/* Aici folosim "title" din clasa ei OrderItemResponse */}
                                                {item.title}
                                            </div>
                                            <div>
                                                {/* Aici folosim "subtotal" */}
                                                {item.subtotal} RON
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '2px solid #F3F4F6', paddingTop: '15px', marginTop: '15px' }}>
                                    <div style={{ fontSize: '1.2rem', color: '#111827' }}>
                                        <strong>Total: </strong>
                                        {/* Aici folosim "totalPrice" din clasa ei OrderResponse */}
                                        <span style={{ fontWeight: '900', color: '#059669' }}>
                                            {order.totalPrice} RON
                                        </span>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: '60px', borderRadius: '16px', color: '#6B7280', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📄</div>
                        Nu ai plasat nicio comandă până acum.
                    </div>
                )}
            </div>
        </div>
    );
}