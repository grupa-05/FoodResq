'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '../../services/apiService';
import { PlusCircle, ArrowLeft, Loader2, Utensils } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function CreateListingPage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        quantity: '',
        expirationDate: '', // Fix cheie: exact ca în Postman!
        category: 'OTHER',   // Implicit cum e în testul vostru
        type: 'SALE'
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const loadingToast = toast.loading('Se publică oferta...');

        // Construim payload-ul exact după modelul de succes din Postman
        const payload = {
            title: formData.title,
            description: formData.description,
            quantity: parseInt(formData.quantity) || 0,
            price: parseFloat(formData.price) || 0,
            minimumPrice: 0, // Adăugat implicit ca în imagine
            expirationDate: formData.expirationDate, // Formatul din datetime-local (ex: 2026-05-17T18:00:00) se potrivește perfect
            latitude: 44.4268,   // Coordonate implicite București ca în Postman
            longitude: 26.1025,  // Coordonate implicite ca în Postman
            type: formData.type,
            category: formData.category
        };

        try {
            await apiService.createListing(payload);
            toast.success('Ofertă publicată cu succes! 🍕', { id: loadingToast });
            router.push('/oferte');
        } catch (err) {
            toast.error(err.message || "Eroare la trimiterea datelor", { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FCFDFB', padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Link href="/oferte" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#6B7280', marginBottom: '2rem', fontWeight: '600' }}>
                    <ArrowLeft size={18} /> Înapoi la oferte
                </Link>

                <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', border: '1px solid #F3F4F6' }}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <div style={{ backgroundColor: '#E8F5E9', width: '60px', height: '60px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669', margin: '0 auto 15px' }}>
                            <PlusCircle size={32} />
                        </div>
                        <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#111827', margin: 0 }}>Adaugă Ofertă</h1>
                        <p style={{ color: '#6B7280', marginTop: '10px' }}>Datele vor fi salvate direct în baza de date.</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Titlu Produs</label>
                            <input required type="text" placeholder="Ex: Pasta with tomato" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                                   style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', outlineColor: '#059669' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Descriere</label>
                            <textarea rows="3" placeholder="Ex: good fresh pasta" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                                      style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', outlineColor: '#059669', resize: 'none' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Preț (RON)</label>
                                <input required type="number" placeholder="15" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
                                       style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', outlineColor: '#059669' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Porții (Cantitate)</label>
                                <input required type="number" placeholder="3" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                                       style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', outlineColor: '#059669' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Tip ofertă</label>
                                <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}
                                        style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', outlineColor: '#059669', backgroundColor: '#fff' }}>
                                    <option value="SALE">REDUCERE</option>
                                    <option value="DONATION">DONAȚIE</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Categorie</label>
                                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', outlineColor: '#059669', backgroundColor: '#fff' }}>
                                    <option value="OTHER">OTHER</option>
                                    <option value="FOOD">FOOD</option>
                                    <option value="BAKERY">BAKERY</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Data expirării</label>
                            <input required type="datetime-local" value={formData.expirationDate} onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
                                   style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', outlineColor: '#059669' }} />
                        </div>

                        <button type="submit" disabled={isLoading} style={{ backgroundColor: '#111827', color: '#fff', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: 'bold', fontSize: '1.1rem', cursor: isLoading ? 'wait' : 'pointer', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Publică Oferta'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}