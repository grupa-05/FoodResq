'use client';
import { useAuthStore } from '../../store/useAuthStore';
import { apiService } from '../../services/apiService';

export default function ListingCard({ listing, onActionComplete }) {
    const { role } = useAuthStore();

    const handleAction = async () => {
        try {
            if (role === 'USER' && listing.type === 'SALE') {
                await apiService.reserveListing(listing.id);
                alert('Rezervat cu succes!');
            } else if (role === 'ONG' && listing.type === 'DONATION') {
                await apiService.claimDonation(listing.id);
                alert('Revendicat cu succes!');
            }
            onActionComplete(); // Re-fetch list
        } catch (err) {
            alert('Eroare la procesarea cererii!');
        }
    };

    return (
        <div className="bg-white border rounded shadow-sm p-4 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h2 className="font-bold text-lg">{listing.title}</h2>
                    <span className={`px-2 py-1 text-xs rounded font-bold ${listing.type === 'SALE' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
            {listing.type}
          </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{listing.description}</p>
                <p className="font-semibold text-gray-800">{listing.type === 'SALE' ? `${listing.price} RON` : 'Gratuit (Donație)'}</p>
                <p className="text-xs text-gray-500">Cantitate: {listing.quantity}</p>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="text-sm text-gray-500">Status: <strong>{listing.status}</strong></span>

                {listing.status === 'ACTIVE' && (
                    <>
                        {role === 'USER' && listing.type === 'SALE' && (
                            <button onClick={handleAction} className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">Rezervă</button>
                        )}
                        {role === 'ONG' && listing.type === 'DONATION' && (
                            <button onClick={handleAction} className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium">Revendică</button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}