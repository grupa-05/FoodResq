import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

// Importăm fontul Inter din Google Fonts
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'FoodResQ',
    description: 'Salvează mâncarea, salvează planeta!',
};

export default function RootLayout({ children }) {
    return (
        <html lang="ro">
        <body className={inter.className} style={{ margin: 0, padding: 0, backgroundColor: '#F3F4F6' }}>
        {children}
        {/* Aici adăugăm componenta care afișează notificările elegante */}
        <Toaster
            position="bottom-right"
            toastOptions={{
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    padding: '16px',
                },
            }}
        />
        </body>
        </html>
    );
}