const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://foodresq-backend.onrender.com';

export const apiService = {
    // Funcția veche de login
    login: async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) throw new Error('Email sau parolă incorecte!');
        return response.json();
    },

    // Funcția NOUĂ de înregistrare
    register: async (name, email, password, role) => {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });

        if (!response.ok) {
            // Încercăm să prindem eroarea exactă de la server (ex: "Email-ul există deja")
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Eroare la crearea contului! Verifică datele.');
        }

        return response.json();
    }
};