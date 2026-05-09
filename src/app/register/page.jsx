'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiService } from '../../services/apiService';
import { useAuthStore } from '../../store/useAuthStore';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER'); // Default e client normal
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuthStore();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validare simplă pentru parolă
        if (password.length < 8) {
            setError('Parola trebuie să aibă minim 8 caractere!');
            setIsLoading(false);
            return;
        }

        try {
            // Trimitem datele către backend
            const data = await apiService.register(name, email, password, role);

            // Backend-ul ne loghează automat după register, așa că salvăm token-ul
            login(data.token, data.role);

            // Redirecționăm către acasă
            router.push('/');
        } catch (err) {
            setError(err.message || 'Eroare la înregistrare!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>

            <Link href="/" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold', marginBottom: '2rem', backgroundColor: '#D1FAE5', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                ← Înapoi la Acasă
            </Link>

            <div style={{ backgroundColor: '#fff', padding: '3rem 2rem', borderRadius: '1.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '500px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111827', marginBottom: '0.5rem', textAlign: 'center' }}>
                    Creează Cont
                </h1>
                <p style={{ color: '#6B7280', textAlign: 'center', marginBottom: '2rem' }}>
                    Alătură-te FoodResq și ajută la salvarea mâncării!
                </p>

                {error && (
                    <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 'bold' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>Nume complet / Nume Restaurant</label>
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Popescu Ion" style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #D1D5DB', fontSize: '1rem', boxSizing: 'border-box' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>E-mail</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="exemplu@email.com" style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #D1D5DB', fontSize: '1rem', boxSizing: 'border-box' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>Parolă (minim 8 caractere)</label>
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #D1D5DB', fontSize: '1rem', boxSizing: 'border-box' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>Cine ești?</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #D1D5DB', fontSize: '1rem', boxSizing: 'border-box', backgroundColor: '#fff' }}>
                            <option value="USER">Sunt client (Vreau să salvez mâncare)</option>
                            <option value="BUSINESS">Sunt restaurant (Vreau să postez oferte)</option>
                            <option value="ONG">Sunt ONG (Vreau să preiau donații)</option>
                        </select>
                    </div>

                    <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '1rem', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '0.75rem', fontWeight: 'bold', fontSize: '1.1rem', cursor: isLoading ? 'not-allowed' : 'pointer', marginTop: '0.5rem', opacity: isLoading ? 0.7 : 1 }}>
                        {isLoading ? 'Se creează contul...' : 'Creează cont'}
                    </button>

                    <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#6B7280', marginTop: '1rem' }}>
                        Ai deja cont? <Link href="/login" style={{ color: '#059669', fontWeight: 'bold', textDecoration: 'none' }}>Intră aici.</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}