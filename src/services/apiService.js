const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://foodresq-backend.onrender.com';

const getAuthHeaders = () => {
    let token = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const apiService = {
    login: async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) throw new Error('Email sau parolă incorecte!');
        return response.json();
    },

    register: async (name, email, password, role) => {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Eroare la crearea contului!');
        }
        return response.json();
    },

    createListing: async (listingData) => {
        const response = await fetch(`${API_BASE_URL}/api/listings`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(listingData)
        });
        if (!response.ok) throw new Error('Eroare la crearea ofertei.');
        return response.json();
    },

    deleteListing: async (id) => {
        const response = await fetch(`${API_BASE_URL}/api/listings/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Nu poți șterge această ofertă.');
    },

    getCart: async () => {
        const response = await fetch(`${API_BASE_URL}/api/cart`, { method: 'GET', headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Eroare la încărcarea coșului.');
        return response.json();
    },

    addToCart: async (listingId, quantity = 1) => {
        const response = await fetch(`${API_BASE_URL}/api/cart/items`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ listingId, quantity })
        });
        if (!response.ok) throw new Error('Eroare la adăugarea în coș.');
    },

    removeFromCart: async (itemId) => {
        const response = await fetch(`${API_BASE_URL}/api/cart/items/${itemId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Eroare la ștergerea din coș.');
    },

    checkout: async () => {
        const response = await fetch(`${API_BASE_URL}/api/cart/checkout`, { method: 'POST', headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Eroare la checkout.');
        return response.json();
    },

    getMyOrders: async () => {
        const response = await fetch(`${API_BASE_URL}/api/orders/my`, { method: 'GET', headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Eroare la istoricul comenzilor.');
        return response.json();
    }
};