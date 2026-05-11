"use server";
export const getListings = async (baseUrl) => fetch(`${baseUrl}/api/listings`, { headers: { 'Content-Type': 'application/json' } })
    .then(res => {
        if (!res.ok) throw new Error('Eroare la aducerea ofertelor.');
        return res.json();
    })
