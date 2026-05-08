import './globals.css'; // Asta "pornește" culorile și aranjarea (Tailwind)
import { Inter } from 'next/font/google';

// Aici aducem un font frumos de la Google
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FoodResq - Salvează Mâncarea',
  description: 'Aplicație împotriva risipei alimentare',
};

export default function RootLayout({ children }) {
  return (
      <html lang="ro">
      {/* Aplicăm fontul frumos pe tot site-ul */}
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
      {children}
      </body>
      </html>
  );
}