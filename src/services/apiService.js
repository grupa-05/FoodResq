const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://foodresq-backend.onrender.com';

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

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                window.location.href = '/login';
            }
        }
        throw new Error(errorData.message || `Eroare server: ${response.status}`);
    }

    // FIX: Citim ca text brut pentru a evita eroarea "Unexpected end of JSON"
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

export const apiService = {
    login: (email, password) => apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    }),
    register: (name, email, password, role) => apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role })
    }),
    getListings: () => apiFetch('/api/listings'),
    getCart: () => apiFetch('/api/cart'),
    addToCart: (listingId, quantity = 1) => apiFetch('/api/cart/items', {
        method: 'POST',
        body: JSON.stringify({ listingId, quantity })
    }),
    removeFromCart: (itemId) => apiFetch(`/api/cart/items/${itemId}`, {
        method: 'DELETE'
    }),
    checkout: () => apiFetch('/api/cart/checkout', { method: 'POST' }),
    getMyOrders: () => apiFetch('/api/orders/my')
};