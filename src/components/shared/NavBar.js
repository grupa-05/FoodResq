'use client';
import Link from 'next/link';
import { useAuthStore } from '../../store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const { role, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center mb-6">
            <Link href="/" className="text-2xl font-bold text-green-600">FoodResq</Link>
            <div className="flex gap-4 items-center">
                <Link href="/" className="hover:text-green-600 font-medium">Home</Link>
                {role === 'BUSINESS' && (
                    <Link href="/create" className="bg-green-500 text-white px-4 py-2 rounded font-medium hover:bg-green-600">
                        + Creare Listing
                    </Link>
                )}
                {role ? (
                    <button onClick={handleLogout} className="text-red-500 font-medium ml-4">Logout ({role})</button>
                ) : (
                    <Link href="/login" className="text-blue-600 font-medium">Login</Link>
                )}
            </div>
        </nav>
    );
}