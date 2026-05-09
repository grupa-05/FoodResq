'use client';
import Link from 'next/link';

export default function Home() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>

            {/* LOGO MARE */}
            <h1 style={{ fontSize: '5rem', fontWeight: '900', color: '#059669', marginBottom: '1rem', letterSpacing: '-0.05em' }}>
                FoodResq<span style={{ color: '#111827' }}>.</span>
            </h1>

            {/* TEXTELE ADĂUGATE ACUM */}
            <h2 style={{ fontSize: '3rem', fontWeight: '800', color: '#111827', lineHeight: '1.2', marginBottom: '1.5rem' }}>
                Mâncare delicioasă.<br/>Prețuri salvatoare.
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#4B5563', maxWidth: '600px', marginBottom: '2rem', lineHeight: '1.6' }}>
                Conectăm localurile tale preferate cu tine și ONG-urile din zonă. Salvează porțiile nevândute și bucură-te de reduceri masive!
            </p>

            {/* BUTONUL CĂTRE OFERTE */}
            <Link
                href="/oferte"
                style={{ textDecoration: 'none', backgroundColor: '#059669', color: 'white', padding: '1rem 2.5rem', borderRadius: '2rem', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '4rem', boxShadow: '0 10px 15px -3px rgba(5, 150, 105, 0.3)' }}
            >
                Vezi Produsele
            </Link>

            {/* CELE 3 BUTOANE MARI */}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '1000px' }}>

                <Link href="/despre" style={buttonStyle}>
                    Despre Noi
                </Link>

                <Link href="/contact" style={buttonStyle}>
                    Contactează-ne
                </Link>

                <Link href="/login" style={buttonStyle}>
                    Intră în cont
                </Link>

            </div>
        </div>
    );
}

// Designul pentru butoanele mari (Verde deschis, text verde închis)
const buttonStyle = {
    textDecoration: 'none',
    color: '#047857',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    backgroundColor: '#D1FAE5',
    padding: '2rem 1.5rem',
    borderRadius: '1rem',
    textAlign: 'center',
    flex: '1',
    minWidth: '200px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};