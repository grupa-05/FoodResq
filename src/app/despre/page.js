'use client';
import Link from 'next/link';

export default function DesprePage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', padding: '4rem 2rem', fontFamily: 'sans-serif' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                {/* Buton Înapoi */}
                <Link href="/" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold', marginBottom: '3rem', display: 'inline-block', backgroundColor: '#D1FAE5', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                    ← Înapoi la Acasă
                </Link>

                {/* Titlu */}
                <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#111827', marginBottom: '1rem', textAlign: 'center' }}>
                    Cum funcționează FoodResq?
                </h1>
                <p style={{ color: '#6B7280', textAlign: 'center', marginBottom: '4rem', fontSize: '1.25rem' }}>
                    Trei pași simpli pentru a face o faptă bună (și a mânca bine).
                </p>

                {/* Pașii */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Pasul 1 */}
                    <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1.5rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#059669', backgroundColor: '#D1FAE5', minWidth: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1rem' }}>
                            1
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827' }}>Localurile postează</h2>
                            <p style={{ color: '#4B5563', fontSize: '1.1rem', lineHeight: '1.6' }}>Restaurantele adaugă mâncarea proaspătă nevândută la preț redus la finalul zilei.</p>
                        </div>
                    </div>

                    {/* Pasul 2 */}
                    <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1.5rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#2563EB', backgroundColor: '#DBEAFE', minWidth: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1rem' }}>
                            2
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827' }}>Tu rezervi rapid</h2>
                            <p style={{ color: '#4B5563', fontSize: '1.1rem', lineHeight: '1.6' }}>Alegi ce îți e poftă direct din aplicație, plătești mult mai puțin și rezervi porția.</p>
                        </div>
                    </div>

                    {/* Pasul 3 */}
                    <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1.5rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#EA580C', backgroundColor: '#FFEDD5', minWidth: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1rem' }}>
                            3
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827' }}>Ridici și savurezi</h2>
                            <p style={{ color: '#4B5563', fontSize: '1.1rem', lineHeight: '1.6' }}>Mergi la locație în intervalul stabilit, arăți rezervarea și te bucuri de mâncare!</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}