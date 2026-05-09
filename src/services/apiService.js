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
    // --- AUTENTIFICARE ---
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

    // --- OFERTE ---
    createListing: async (listingData) => {
        const response = await fetch(`${API_BASE_URL}/api/listings`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(listingData)
        });
        if (response.status === 403) throw new Error('Doar restaurantele (BUSINESS) pot adăuga oferte!');
        if (!response.ok) throw new Error('Eroare la crearea ofertei.');
        return response.json();
    },
    reserveListing: async (id) => {
        const response = await fetch(`${API_BASE_URL}/api/listings/${id}/reserve`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
        if (response.status === 401) throw new Error('Trebuie să fii logat pentru a rezerva!');
        if (response.status === 403) throw new Error('Doar clienții simpli pot rezerva!');
        if (!response.ok) throw new Error('Produsul nu mai este disponibil.');
        return response.json();
    },
    claimDonation: async (id) => {
        const response = await fetch(`${API_BASE_URL}/api/listings/${id}/claim`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
        if (response.status === 401) throw new Error('Trebuie să fii logat!');
        if (response.status === 403) throw new Error('Doar ONG-urile pot revendica donații!');
        if (!response.ok) throw new Error('Donația a fost deja preluată.');
        return response.json();
    },

    // --- COȘ DE CUMPĂRĂTURI & COMENZI ---
    getCart: async () => {
        const response = await fetch(`${API_BASE_URL}/api/cart`, { method: 'GET', headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Nu am putut încărca coșul.');
        return response.json();
    },
    addToCart: async (listingId, quantity = 1) => {
        const response = await fetch(`${API_BASE_URL}/api/cart/items`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ listingId, quantity })
        });
        if (!response.ok) throw new Error('Nu am putut adăuga în coș.');
    },
    checkout: async () => {
        const response = await fetch(`${API_BASE_URL}/api/cart/checkout`, { method: 'POST', headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Eroare la finalizarea comenzii.');
        return response.json();
    },
    getMyOrders: async () => {
        const response = await fetch(`${API_BASE_URL}/api/orders/my`, { method: 'GET', headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Eroare la încărcarea comenzilor.');
        return response.json();
    }
};