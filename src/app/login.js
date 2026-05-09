'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '../../services/apiService';
import { useAuthStore } from '../../store/useAuthStore';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuthStore();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await apiService.login(email, password);
            login(data.token, data.role);
            router.push('/');
        } catch (error) {
            alert('Eroare la autentificare!');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email" placeholder="Email" required value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="password" placeholder="Parola" required value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Intră în cont</button>
            </form>
        </div>
    );
}