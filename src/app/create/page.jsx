'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '../../services/apiService';
import { PlusCircle, ArrowLeft, Loader2, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function CreateListingPage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        quantity: '1', // Implicit 1 pentru a respecta @Min(1) din Java
        expirationDate: '',
        category: 'FOOD', // Corelat cu enum-ul ProductCategory
        type: 'SALE'      // Corelat cu enum-ul ListingType
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --- VALIDĂRI LOCALE PENTRU EVITAREA ERORII 400 ---
        if (!formData.title.trim()) {
            return toast.error("Titlul este obligatoriu!");
        }

        const parsedQuantity = parseInt(formData.quantity);
        if (isNaN(parsedQuantity) || parsedQuantity < 1) {
            return toast.error("Cantitatea trebuie să fie de cel puțin 1 porție!");
        }

        const parsedPrice = parseFloat(formData.price);
        if (isNaN(parsedPrice) || parsedPrice < 0) {
            return toast.error("Prețul nu poate fi negativ!");
        }

        if (!formData.expirationDate) {
            return toast.error("Data expirării este obligatorie!");
        }

        setIsLoading(true);
        const loadingToast = toast.loading('Se publică oferta...');

        // Formatare dată: datetime-local oferă YYYY-MM-DDTHH:MM.
        // Adăugăm manual secundele ":00" pentru ca LocalDateTime din Java să o accepte perfect.
        let formattedDate = formData.expirationDate;
        if (formattedDate && formattedDate.split(':').length === 2) {
            formattedDate = `${formattedDate}:00`;
        }

        // Mapare directă la proprietățile din com.foodresq.listing.dto.CreateListingRequest
        const payload = {
            title: formData.title.trim(),
            description: formData.description.trim() || null,
            quantity: parsedQuantity,                         // Integer >= 1 (@Min(1))
            price: parsedPrice,                               // BigDecimal >= 0.0
            minimumPrice: parsedPrice,                        // BigDecimal >= 0.0
            discountPercentage: 0,                            // Integer între 0 și 100 (@Max(100))
            expirationDate: formattedDate,                   // LocalDateTime (fără 'Z' sau offset-uri)
            latitude: 44.4268,                               // Double (@NotNull) - Implicite București
            longitude: 26.1025,                              // Double (@NotNull)
            type: formData.type,                              // Enum ListingType (SALE / DONATION)
            category: formData.category                       // Enum ProductCategory (FOOD / BAKERY / OTHER)
        };

        try {
            await apiService.createListing(payload);
            toast.success('Ofertă publicată cu succes! 🍕', { id: loadingToast });
            router.push('/oferte');
        } catch (err) {
            // Prindem mesajul de eroare întors de validatorul Spring Boot
            toast.error(err.message || "Eroare 400: Datele nu respectă formatul serverului", { id: loadingToast });
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
                        <p style={{ color: '#6B7280', marginTop: '10px' }}>Datele sunt sincronizate în timp real cu serverul Spring Boot.</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Titlu Produs *</label>
                            <input required type="text" placeholder="Ex: Meniu Zilei - Supă și Felul doi" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                                   style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', outlineColor: '#059669' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Descriere</label>
                            <textarea rows="3" placeholder="Detalii ingrediente, alergeni sau mod de ridicare..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                                      style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', outlineColor: '#059669', resize: 'none' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Preț (RON) *</label>
                                <input required type="number" step="0.01" placeholder="15.50" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
                                       style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', outlineColor: '#059669' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Porții Disponibile *</label>
                                <input required type="number" min="1" placeholder="1" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                                       style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', outlineColor: '#059669' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Tipul Ofertei *</label>
                                <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}
                                        style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', outlineColor: '#059669', backgroundColor: '#fff', fontWeight: '600' }}>
                                    <option value="SALE">REDUCERE (Vânzare)</option>
                                    <option value="DONATION">DONAȚIE (Gratuit)</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Categorie Produs *</label>
                                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', outlineColor: '#059669', backgroundColor: '#fff', fontWeight: '600' }}>
                                    <option value="FOOD">FOOD (Mâncare Gătită)</option>
                                    <option value="BAKERY">BAKERY (Patiserie)</option>
                                    <option value="OTHER">OTHER (Altele)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Valabil Până La (Dată și Oră) *</label>
                            <input required type="datetime-local" value={formData.expirationDate} onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
                                   style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', outlineColor: '#059669' }} />
                        </div>

                        <div style={{ display: 'flex', gap: '10px', backgroundColor: '#F3F4F6', padding: '12px', borderRadius: '12px', fontSize: '0.85rem', color: '#4B5563', alignItems: 'center' }}>
                            <Info size={16} style={{ shrink: 0, color: '#059669' }} />
                            <span>Câmpurile marcate cu (*) sunt validate strict de serverul de producție.</span>
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