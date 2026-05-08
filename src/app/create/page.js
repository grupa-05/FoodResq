'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '../../services/apiService';

export default function CreateListingPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '', description: '', quantity: 1, price: 0, minimumPrice: 0,
        expirationDate: '', latitude: 44.4268, longitude: 26.1025, type: 'SALE'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiService.createListing(formData);
            router.push('/');
        } catch (err) {
            alert('Eroare la crearea listing-ului!');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Creare Listing Nou</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <select
                    className="border p-2 rounded" value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value, price: e.target.value === 'DONATION' ? 0 : formData.price})}
                >
                    <option value="SALE">Vânzare</option>
                    <option value="DONATION">Donație</option>
                </select>

                <input type="text" placeholder="Titlu" required className="border p-2 rounded"
                       onChange={e => setFormData({...formData, title: e.target.value})} />

                <textarea placeholder="Descriere" required className="border p-2 rounded"
                          onChange={e => setFormData({...formData, description: e.target.value})} />

                <div className="flex gap-4">
                    <input type="number" placeholder="Cantitate" required className="border p-2 rounded w-full"
                           onChange={e => setFormData({...formData, quantity: Number(e.target.value)})} />

                    {formData.type === 'SALE' && (
                        <>
                            <input type="number" placeholder="Preț" required className="border p-2 rounded w-full"
                                   onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                            <input type="number" placeholder="Preț Minim" required className="border p-2 rounded w-full"
                                   onChange={e => setFormData({...formData, minimumPrice: Number(e.target.value)})} />
                        </>
                    )}
                </div>

                <input type="datetime-local" required className="border p-2 rounded"
                       onChange={e => setFormData({...formData, expirationDate: new Date(e.target.value).toISOString()})} />

                <button type="submit" className="bg-green-600 text-white p-2 rounded font-bold hover:bg-green-700 mt-4">
                    Salvează Listing
                </button>
            </form>
        </div>
    );
}