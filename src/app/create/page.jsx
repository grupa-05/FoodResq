'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiService } from '../../services/apiService';

export default function CreateListingPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Verificăm dacă e logat și are rolul corect
    useEffect(() => {
        const role = localStorage.getItem('role');
        if (!role) {
            router.push('/login');
        } else if (role !== 'BUSINESS') {
            alert('Acces interzis! Doar restaurantele pot accesa această pagină.');
            router.push('/');
        }
    }, [router]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        quantity: 1,
        price: 0,
        minimumPrice: 0,
        discountPercentage: 0,
        expirationDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // Mâine
        type: 'SALE',
        category: 'PREPARED',
        latitude: 44.4268, // Default București
        longitude: 26.1025
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Formatăm datele exact cum cere serverul
            const payload = {
                ...formData,
                quantity: parseInt(formData.quantity),
                price: parseFloat(formData.price),
                minimumPrice: parseFloat(formData.minimumPrice),
                discountPercentage: parseInt(formData.discountPercentage),
                expirationDate: new Date(formData.expirationDate).toISOString()
            };

            await apiService.createListing(payload);
            alert('Oferta a fost adăugată cu succes!');
            router.push('/oferte');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', fontFamily: 'sans-serif' }}>
            <nav style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '1rem 2rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: '900', color: '#059669', letterSpacing: '-1px' }}>
                    FoodResq<span style={{ color: '#111827' }}>.</span>
                </Link>
                <Link href="/oferte" style={{ textDecoration: 'none', color: '#4B5563', fontWeight: 'bold' }}>
                    ← Înapoi la Oferte
                </Link>
            </nav>

            <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
                <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#111827', marginBottom: '1.5rem' }}>Adaugă Ofertă Nouă</h1>

                    {error && (
                        <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Titlul preparatului</label>
                            <input type="text" name="title" required value={formData.title} onChange={handleChange} placeholder="Ex: 2 Porții de Paște Carbonara" style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB' }} />
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Descriere</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Oferă câteva detalii..." style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB', minHeight: '80px' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Tip Ofertă</label>
                            <select name="type" value={formData.type} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB', backgroundColor: '#fff' }}>
                                <option value="SALE">Vânzare cu Reducere</option>
                                <option value="DONATION">Donație (Gratuit)</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Categorie</label>
                            <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB', backgroundColor: '#fff' }}>
                                <option value="PREPARED">Mâncare Gătită</option>
                                <option value="BAKERY">Patiserie / Panificație</option>
                                <option value="VEGETABLES">Legume</option>
                                <option value="FRUITS">Fructe</option>
                                <option value="OTHER">Altele</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Număr porții</label>
                            <input type="number" name="quantity" min="1" required value={formData.quantity} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Preț total (RON)</label>
                            <input type="number" name="price" step="0.5" min="0" required value={formData.price} onChange={handleChange} disabled={formData.type === 'DONATION'} style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB', backgroundColor: formData.type === 'DONATION' ? '#E5E7EB' : '#fff' }} />
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Expiră la data/ora</label>
                            <input type="datetime-local" name="expirationDate" required value={formData.expirationDate} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB' }} />
                        </div>

                        <button type="submit" disabled={isLoading} style={{ gridColumn: '1 / -1', padding: '1rem', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem', cursor: isLoading ? 'wait' : 'pointer', marginTop: '1rem' }}>
                            {isLoading ? 'Se adaugă pe platformă...' : 'Publică Oferta'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}