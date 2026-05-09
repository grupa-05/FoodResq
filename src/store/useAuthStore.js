'use client';

export const useAuthStore = () => {
    const login = (token, role) => {
        // Salvăm datele primite în memoria browserului, conform documentației
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
        }
    };

    const logout = () => {
        // Ștergem datele când ieșim din cont
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        }
    };

    return { login, logout };
};