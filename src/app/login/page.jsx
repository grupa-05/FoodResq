'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiService } from '../../services/apiService';
import { useAuthStore } from '../../store/useAuthStore';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuthStore();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Trimitem datele către backend
            const data = await apiService.login(email, password);

            // Salvăm token-ul și rolul în localStorage
            login(data.token, data.role);

            // Redirecționăm către prima pagină
            router.push('/');
        } catch (err) {
            setError(err.message || 'Eroare la autentificare!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>

            {/* Buton Înapoi */}
            <Link href="/" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold', marginBottom: '2rem', backgroundColor: '#D1FAE5', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                ← Înapoi la Acasă
            </Link>

            {/* Formular de Login */}
            <div style={{ backgroundColor: '#fff', padding: '3rem 2rem', borderRadius: '1.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '450px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111827', marginBottom: '0.5rem', textAlign: 'center' }}>
                    Bine ai revenit
                </h1>
                <p style={{ color: '#6B7280', textAlign: 'center', marginBottom: '2rem' }}>
                    Intră în cont pentru a salva mâncare.
                </p>

                {error && (
                    <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 'bold' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>E-mail</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="exemplu@email.com"
                            style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #D1D5DB', fontSize: '1rem', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>Parolă</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #D1D5DB', fontSize: '1rem', boxSizing: 'border-box' }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{ width: '100%', padding: '1rem', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '0.75rem', fontWeight: 'bold', fontSize: '1.1rem', cursor: isLoading ? 'not-allowed' : 'pointer', marginTop: '1rem', opacity: isLoading ? 0.7 : 1 }}
                    >
                        {isLoading ? 'Se conectează...' : 'Intră în cont'}
                    </button>

                    {/* Aici este scurtătura nouă adăugată pentru Register */}
                    <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#6B7280', marginTop: '0.5rem' }}>
                        Nu ai cont? <Link href="/register" style={{ color: '#059669', fontWeight: 'bold', textDecoration: 'none' }}>Înregistrează-te rapid acum!</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}