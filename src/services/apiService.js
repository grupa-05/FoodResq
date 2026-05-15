// Preluăm URL-ul de bază din variabilele de mediu, conform documentației [cite: 2]
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://foodresq-backend.onrender.com';

// Funcție centralizată pentru a face request-uri (exact cum cere documentația)
async function apiFetch(path, options = {}) {
    let token = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...(options.headers || {})
        }
    });

    // Tratarea erorilor conform Secțiunii 9 din documentație
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                window.location.href = '/login';
            }
            throw new Error('Sesiune expirată. Te rog să te autentifici din nou.');
        }
        if (response.status === 403) throw new Error('Nu ai permisiunea pentru această acțiune.');
        if (response.status === 404) throw new Error('Resursa nu a fost găsită.');
        if (response.status === 409) throw new Error(errorData.message || 'Conflict de date.');

        throw new Error(errorData.message || 'A apărut o eroare. Încearcă din nou.');
    }

    // Returnăm JSON doar dacă răspunsul are conținut (pentru DELETE/204 nu avem JSON)
    if (response.status !== 204) {
        return response.json();
    }
    return null;
}

export const apiService = {
    // === AUTH ===
    login: async (email, password) => {
        return apiFetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    },

    register: async (name, email, password, role) => {
        return apiFetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, role })
        });
    },

    // === LISTINGS (OFERTE) ===
    getListings: async () => {
        return apiFetch('/api/listings', { method: 'GET' });
    },

    createListing: async (listingData) => {
        return apiFetch('/api/listings', {
            method: 'POST',
            body: JSON.stringify(listingData)
        });
    },

    // === CART (COȘ) ===
    getCart: async () => {
        return apiFetch('/api/cart', { method: 'GET' });
    },

    addToCart: async (listingId, quantity = 1) => {
        return apiFetch('/api/cart/items', {
            method: 'POST',
            body: JSON.stringify({ listingId, quantity })
        });
    },

    removeFromCart: async (itemId) => {
        return apiFetch(`/api/cart/items/${itemId}`, {
            method: 'DELETE'
        });
    },

    checkout: async () => {
        return apiFetch('/api/cart/checkout', { method: 'POST' });
    },

    // === ORDERS (COMENZI) ===
    getMyOrders: async () => {
        return apiFetch('/api/orders/my', { method: 'GET' });
    }
};