'use client';
import { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import { Package, Calendar, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiService.getMyOrders()
            .then(data => setOrders(data || []))
            .catch(() => toast.error("Nu am putut încărca istoricul"))
            .finally(() => setIsLoading(false));
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div style={{ minHeight: '100vh', padding: '40px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                    <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '2rem', fontWeight: '800' }}>
                        <Package size={32} color="#059669" /> Istoric Comenzi
                    </h1>
                    <Link href="/oferte" style={{ color: '#6B7280', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600' }}>
                        <ArrowLeft size={18} /> Înapoi
                    </Link>
                </div>

                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '100px' }}><Loader2 className="animate-spin" size={40} /></div>
                ) : orders.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {orders.map(order => (
                            <div key={order.id} style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.03)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #F3F4F6', paddingBottom: '15px' }}>
                                    <div>
                                        <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>Comanda #{order.id}</div>
                                        <div style={{ color: '#9CA3AF', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <Calendar size={14} /> {formatDate(order.createdAt)}
                                        </div>
                                    </div>
                                    <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '6px 14px', borderRadius: '12px', fontWeight: '700', fontSize: '0.8rem' }}>
                                        {order.status}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {order.items.map((item, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563' }}>
                                            <span><span style={{ fontWeight: 'bold', color: '#111827' }}>{item.quantity}x</span> {item.title}</span>
                                            <span>{item.subtotal} RON</span>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '2px dashed #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#6B7280', fontWeight: '600' }}>Total achitat</span>
                                    <span style={{ fontSize: '1.3rem', fontWeight: '900', color: '#059669' }}>{order.totalPrice} RON</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '100px', backgroundColor: '#fff', borderRadius: '20px' }}>
                        <CheckCircle size={48} color="#D1D5DB" style={{ marginBottom: '15px' }} />
                        <p>Încă nu ai nicio comandă.</p>
                    </div>
                )}
            </div>
        </div>
    );
}