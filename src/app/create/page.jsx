'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiService } from '../../services/apiService';

export default function CreateListingPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '', description: '', quantity: 1, price: 0,
        type: 'SALE', category: 'PREPARED', expirationDate: ''
    });

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'BUSINESS') {
            alert('Doar restaurantele pot accesa această pagină!');
            router.push('/oferte');
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const payload = {
                ...formData,
                expirationDate: new Date(formData.expirationDate).toISOString(),
                minimumPrice: 0, discountPercentage: 0, latitude: 44.4, longitude: 26.1
            };
            await apiService.createListing(payload);
            alert('Ofertă publicată!');
            router.push('/oferte');
        } catch (err) {
            alert(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', padding: '2rem', fontFamily: 'sans-serif' }}>
            <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#fff', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Adaugă Ofertă</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input type="text" placeholder="Titlu Preparat" required onChange={e => setFormData({...formData, title: e.target.value})} style={{ padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #ddd' }} />
                    <textarea placeholder="Descriere" onChange={e => setFormData({...formData, description: e.target.value})} style={{ padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #ddd' }} />
                    <input type="number" placeholder="Preț (RON)" required onChange={e => setFormData({...formData, price: e.target.value})} style={{ padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #ddd' }} />
                    <input type="number" placeholder="Cantitate" required onChange={e => setFormData({...formData, quantity: e.target.value})} style={{ padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #ddd' }} />
                    <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Data expirării:</label>
                    <input type="datetime-local" required onChange={e => setFormData({...formData, expirationDate: e.target.value})} style={{ padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #ddd' }} />
                    <button type="submit" disabled={isLoading} style={{ padding: '1rem', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}>
                        {isLoading ? 'Se publică...' : 'Publică Ofertă'}
                    </button>
                    <Link href="/oferte" style={{ textAlign: 'center', color: '#6B7280', textDecoration: 'none', fontSize: '0.9rem' }}>Anulează</Link>
                </form>
            </div>
        </div>
    );
}