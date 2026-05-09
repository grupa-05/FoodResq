// Luăm adresa din .env.local, exact cum cere documentația
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://foodresq-backend.onrender.com';

export const apiService = {
    login: async (email, password) => {
        // Documentația cere metoda POST și adresa /api/auth/login
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Email sau parolă incorecte!');
        }

        // Returnează token-ul și rolul (USER, BUSINESS sau ONG)
        return response.json();
    }
};