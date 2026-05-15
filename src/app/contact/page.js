'use client';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, ArrowLeft, Utensils, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Mesajul a fost trimis! Te vom contacta în curând.');
        e.target.reset();
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FCFDFB', fontFamily: 'Inter, sans-serif' }}>

            {/* HEADER / NAVBAR */}
            <nav style={{ padding: '1.5rem 4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: '900', color: '#059669' }}>
                    <Utensils size={28} /> FoodResq.
                </Link>
                <Link href="/" style={{ textDecoration: 'none', color: '#4B5563', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <ArrowLeft size={18} /> Înapoi la Start
                </Link>
            </nav>

            <main style={{ maxWidth: '1100px', margin: '4rem auto', padding: '0 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#111827', letterSpacing: '-2px', marginBottom: '1rem' }}>Să vorbim! 💬</h1>
                    <p style={{ color: '#6B7280', fontSize: '1.2rem' }}>Ai întrebări despre cum poți salva mâncarea? Suntem aici să te ajutăm.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }}>

                    {/* FORMULAR DE CONTACT */}
                    <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', border: '1px solid #F3F4F6' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Nume Complet</label>
                                <input required type="text" placeholder="Ex: Andrei Ionescu" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '1rem', outlineColor: '#059669' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Email</label>
                                <input required type="email" placeholder="nume@exemplu.com" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '1rem', outlineColor: '#059669' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Mesaj</label>
                                <textarea required rows="5" placeholder="Cu ce te putem ajuta?" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '1rem', outlineColor: '#059669', resize: 'none' }}></textarea>
                            </div>
                            <button type="submit" style={{ backgroundColor: '#111827', color: '#fff', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                Trimite Mesajul <Send size={18} />
                            </button>
                        </form>
                    </div>

                    {/* DETALII DE CONTACT */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ padding: '2rem', backgroundColor: '#E8F5E9', borderRadius: '24px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                            <div style={{ backgroundColor: '#059669', color: '#fff', padding: '12px', borderRadius: '12px' }}><Mail size={24} /></div>
                            <div>
                                <h4 style={{ margin: '0 0 5px 0', fontWeight: '800' }}>Email Oficial</h4>
                                <p style={{ margin: 0, color: '#065F46', fontWeight: '500' }}>contact@foodresq.ro</p>
                            </div>
                        </div>

                        <div style={{ padding: '2rem', backgroundColor: '#F3F4F6', borderRadius: '24px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                            <div style={{ backgroundColor: '#111827', color: '#fff', padding: '12px', borderRadius: '12px' }}><Phone size={24} /></div>
                            <div>
                                <h4 style={{ margin: '0 0 5px 0', fontWeight: '800' }}>Telefon</h4>
                                <p style={{ margin: 0, color: '#4B5563', fontWeight: '500' }}>+40 7xx xxx xxx</p>
                            </div>
                        </div>

                        <div style={{ padding: '2rem', backgroundColor: '#FFF3E0', borderRadius: '24px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                            <div style={{ backgroundColor: '#F59E0B', color: '#fff', padding: '12px', borderRadius: '12px' }}><MapPin size={24} /></div>
                            <div>
                                <h4 style={{ margin: '0 0 5px 0', fontWeight: '800' }}>Locație</h4>
                                <p style={{ margin: 0, color: '#92400E', fontWeight: '500' }}>București, România</p>
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto', padding: '2rem', textAlign: 'center', border: '2px dashed #E5E7EB', borderRadius: '24px' }}>
                            <Globe size={32} color="#D1D5DB" style={{ marginBottom: '10px' }} />
                            <p style={{ margin: 0, color: '#9CA3AF', fontWeight: '600' }}>Suntem activi non-stop pentru mediu!</p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}