'use client';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', padding: '4rem 2rem', fontFamily: 'sans-serif' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                {/* Buton Înapoi */}
                <Link href="/" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold', marginBottom: '3rem', display: 'inline-block', backgroundColor: '#D1FAE5', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                    ← Înapoi la Acasă
                </Link>

                {/* Titlu și Subtitlu */}
                <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#111827', marginBottom: '1rem', textAlign: 'center' }}>
                    Contactează-ne
                </h1>
                <p style={{ color: '#6B7280', textAlign: 'center', marginBottom: '4rem', fontSize: '1.25rem' }}>
                    Echipa FoodResq este aici pentru a te ajuta. Alege metoda preferată de contact.
                </p>

                {/* Secțiuni Contact (Stilizate ca pașii de la Despre Noi) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Card 1: Suport Clienți (Verde) */}
                    <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1.5rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ fontSize: '2rem', backgroundColor: '#D1FAE5', minWidth: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1rem' }}>
                            📧
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827' }}>Scrie-ne un E-mail</h2>
                            <p style={{ color: '#4B5563', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                Pentru întrebări generale sau suport tehnic: <br/>
                                <strong style={{ color: '#059669' }}>salut@foodresq.ro</strong>
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Parteneriate Restaurante (Albastru) */}
                    <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1.5rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ fontSize: '2rem', backgroundColor: '#DBEAFE', minWidth: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1rem' }}>
                            🤝
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827' }}>Devino Partener</h2>
                            <p style={{ color: '#4B5563', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                Ai un restaurant și vrei să reducem risipa împreună? <br/>
                                <strong style={{ color: '#2563EB' }}>parteneri@foodresq.ro</strong>
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Social Media (Portocaliu) */}
                    <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1.5rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ fontSize: '2rem', backgroundColor: '#FFEDD5', minWidth: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1rem' }}>
                            📱
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827' }}>Urmărește-ne</h2>
                            <p style={{ color: '#4B5563', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                Suntem activi pe Instagram și Facebook. Caută-ne: <br/>
                                <strong style={{ color: '#EA580C' }}>@FoodResqRomania</strong>
                            </p>
                        </div>
                    </div>

                </div>

                {/* Footer mic pe pagina de contact */}
                <p style={{ textAlign: 'center', marginTop: '4rem', color: '#9CA3AF', fontSize: '0.9rem' }}>
                    FoodResq S.R.L. | Proiect creat cu ❤️ pentru planetă.
                </p>
            </div>
        </div>
    );
}