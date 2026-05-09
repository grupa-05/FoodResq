import api from '../lib/axios';

export const apiService = {
    login: async (email, password) => {
        const { data } = await api.post('/api/auth/login', { email, password });
        return data;
    },

    getListings: async () => {
        const { data } = await api.get('/api/listings');
        return data;
    },

    createListing: async (listingData) => {
        const { data } = await api.post('/api/listings', listingData);
        return data;
    },

    reserveListing: async (id) => {
        return api.post(`/api/listings/${id}/reserve`);
    },

    claimDonation: async (id) => {
        return api.post(`/api/listings/${id}/claim`);
    }
};