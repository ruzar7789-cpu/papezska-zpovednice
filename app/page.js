'use client';
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');

  const submitConfession = async () => {
    setStatus('Odesílám...');
    try {
      const res = await fetch('/api/confess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret_text: text }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatus('Tvé odevzdání bylo přijato.');
        setText('');
      } else {
        setStatus('Chyba: ' + (data.error || 'Neznámá chyba'));
      }
    } catch (e) {
      setStatus('Technická chyba: ' + e.message);
    }
  };

  return (
    <main style={{ padding: '40px', maxWidth: '600px', margin: 'auto', textAlign: 'center', fontFamily: 'serif' }}>
      <h1 style={{ fontSize: '2rem' }}>Digitální zpovědnice</h1>
      <p>Odevzdej své břemeno do posvátného prostoru.</p>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        style={{ width: '100%', height: '150px', margin: '20px 0', padding: '10px' }}
        placeholder="Zde napiš svou zpověď..."
      />
      <button onClick={submitConfession} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Odevzdat (Příspěvek 99 Kč)
      </button>
      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>{status}</div>
    </main>
  );
}
