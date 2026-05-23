'use client';
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('pending'); // pending, submitted, paid

  const submitConfession = async () => {
    setStatus('processing');
    const res = await fetch('/api/confess', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret_text: text }),
    });
    if (res.ok) setStatus('submitted');
    else setStatus('error');
  };

  return (
    <main style={{ backgroundColor: '#fdfbf7', color: '#2c2c2c', minHeight: '100vh', padding: '60px 20px', textAlign: 'center', fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: '600px', margin: 'auto', border: '1px solid #d4af37', padding: '40px', backgroundColor: '#ffffff' }}>
        <h1 style={{ color: '#8b0000', fontSize: '2.5rem', marginBottom: '10px' }}>Confessio Digitalis</h1>
        <hr style={{ width: '50px', border: '1px solid #d4af37', marginBottom: '30px' }} />
        
        {status === 'pending' && (
          <>
            <p>„Kdo vyzná své viny, nalezne pokoj.“</p>
            <textarea value={text} onChange={(e) => setText(e.target.value)} style={{ width: '100%', height: '150px', margin: '20px 0', padding: '15px', border: '1px solid #ccc' }} placeholder="Zde vložte svou zpověď..." />
            <button onClick={submitConfession} style={{ backgroundColor: '#8b0000', color: 'white', padding: '15px 30px', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Odevzdat k zapečetění</button>
          </>
        )}

        {status === 'submitted' && (
          <div style={{ padding: '20px' }}>
            <h2 style={{ color: '#d4af37' }}>Téměř hotovo</h2>
            <p>Vaše zpověď byla přijata do digitálního archivu. Pro dokončení obřadu prosím přispějte na údržbu svatyně.</p>
            {/* Zde bude tvůj QR kód */}
            <div style={{ margin: '30px', padding: '20px', border: '2px dashed #d4af37' }}>
              [ ZDE BUDE VÁŠ QR KÓD PRO PLATBU 99 CZK ]
            </div>
            <button onClick={() => window.location.reload()} style={{ color: '#8b0000', background: 'none', border: 'none', textDecoration: 'underline' }}>Návrat na začátek</button>
          </div>
        )}
      </div>
    </main>
  );
}
