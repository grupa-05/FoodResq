'use client';
import { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiService.getMyOrders()
            .then(data => setOrders(data || []))
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h1>Istoric Comenzi 📦</h1>
            {isLoading ? <p>Se încarcă...</p> : orders.map(order => (
                <div key={order.id} style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '20px', borderRadius: '10px' }}>
                    <h3>Comanda #{order.id} - <span style={{color: '#059669'}}>{order.status}</span></h3>
                    <p>Data: {new Date(order.orderDate).toLocaleDateString('ro-RO')}</p>
                    <ul>
                        {order.items?.map((item, i) => (
                            <li key={i}>{item.quantity}x {item.listingTitle} - {item.subtotal} RON</li>
                        ))}
                    </ul>
                    <hr />
                    <p style={{ textAlign: 'right', fontWeight: 'bold' }}>Total: {order.totalAmount} RON</p>
                </div>
            ))}
        </div>
    );
}