'use client';
import { useState } from 'react';
import QRCode from 'qrcode.react';

export default function Home() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('pending');

  const submitConfession = async () => {
    setStatus('processing');
    try {
      const res = await fetch('/api/confess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret_text: text }),
      });
      if (res.ok) {
        setStatus('submitted');
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <main style={{ backgroundColor: '#fdfbf7', color: '#2c2c2c', minHeight: '100vh', padding: '60px 20px', textAlign: 'center', fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: '600px', margin: 'auto', border: '1px solid #d4af37', padding: '40px', backgroundColor: '#ffffff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#8b0000', fontSize: '2.5rem', marginBottom: '10px' }}>Confessio Digitalis</h1>
        <hr style={{ width: '50px', border: '1px solid #d4af37', marginBottom: '30px' }} />
        
        {status === 'pending' && (
          <>
            <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>„Kdo vyzná své viny, nalezne pokoj.“</p>
            <textarea 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              style={{ width: '100%', height: '150px', margin: '20px 0', padding: '15px', border: '1px solid #ccc', borderRadius: '4px' }} 
              placeholder="Zde vložte svou zpověď..." 
            />
            <button 
              onClick={submitConfession} 
              style={{ backgroundColor: '#8b0000', color: 'white', padding: '15px 30px', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', textTransform: 'uppercase' }}
            >
              Odevzdat k zapečetění
            </button>
          </>
        )}

        {status === 'processing' && <p>Zpracovává se v archivu...</p>}

        {status === 'submitted' && (
          <div style={{ padding: '20px' }}>
            <h2 style={{ color: '#d4af37' }}>Téměř hotovo</h2>
            <p>Vaše zpověď byla přijata do digitálního archivu. Pro dokončení obřadu prosím načtěte tento kód pro oběť 99 Kč:</p>
            
            <div style={{ margin: '30px', display: 'flex', justifyContent: 'center' }}>
              <QRCode 
                value="SPD*1.0*ACC:5113445033/0800*AM:99.0*CC:CZK*MSG:Duchovni_obet" 
                size={200}
                fgColor="#8b0000"
                bgColor="#ffffff"
              />
            </div>
            
            <button 
              onClick={() => window.location.reload()} 
              style={{ color: '#8b0000', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Návrat na začátek
            </button>
          </div>
        )}

        {status === 'error' && (
          <div style={{ color: '#8b0000' }}>
            <p>Došlo k technické chybě. Svatyně je dočasně nedostupná.</p>
            <button onClick={() => setStatus('pending')} style={{ color: '#8b0000', textDecoration: 'underline', border: 'none', background: 'none' }}>Zkusit znovu</button>
          </div>
        )}
      </div>
    </main>
  );
          }
