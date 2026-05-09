import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    token: typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null,
    role: typeof window !== 'undefined' ? localStorage.getItem('user_role') : null,

    login: (token, role) => {
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user_role', role);
        set({ token, role });
    },

    logout: () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_role');
        set({ token: null, role: null });
    }
}));