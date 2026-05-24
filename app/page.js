'use client';
import { useState } from 'react';
import QRCodeSVG from 'qrcode.react'; // Použijeme SVG verzi, je elegantnější a stabilnější

export default function Home() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('pending'); // pending, processing, submitted, error

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

  const vaticanColor = '#800000'; // Hluboký vatikánský purpur
  const goldColor = '#d4af37'; // Elegantní zlato

  return (
    <main style={{ backgroundColor: '#fdfbf7', color: '#2c2c2c', minHeight: '100vh', padding: '60px 20px', textAlign: 'center', fontFamily: 'Georgia, serif', lineHeight: '1.6' }}>
      <div style={{ maxWidth: '600px', margin: 'auto', border: '2px solid #e0e0e0', padding: '40px', backgroundColor: '#ffffff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderRadius: '4px' }}>
        
        {/* Vatikánský erb - symbolický */}
        <div style={{ color: goldColor, fontSize: '3rem', marginBottom: '20px' }}>
          &#x2627; {/* Papežský kříž */}
        </div>

        <h1 style={{ color: vaticanColor, fontSize: '2.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px', borderBottom: `2px solid ${goldColor}`, display: 'inline-block', paddingBottom: '10px' }}>
          Confessio Digitalis
        </h1>
        <p style={{ color: '#666', fontStyle: 'italic', fontSize: '0.9rem', marginTop: '10px' }}>Officium Poenitentiariae Apostolicae</p>
        
        <hr style={{ width: '50px', border: `1px solid ${goldColor}`, marginTop: '30px', marginBottom: '30px' }} />
        
        {status === 'pending' && (
          <>
            <p style={{ fontStyle: 'italic', color: '#555', fontSize: '1.1rem', marginBottom: '30px' }}>„Vložte své břemeno do zapečetěného archivu, abyste nalezli milost.“</p>
            <textarea 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              style={{ width: '100%', height: '180px', margin: '0 0 30px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1.1rem', color: '#333' }} 
              placeholder="Zde vložte svou zpověď..." 
            />
            <button 
              onClick={submitConfession} 
              style={{ backgroundColor: vaticanColor, color: 'white', padding: '18px 36px', border: 'none', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}
            >
              <span style={{ fontSize: '1.3rem', marginRight: '10px' }}>&#x2101;</span> {/* Vosková pečeť symbol */}
              Zapečetit zpověď
            </button>
          </>
        )}

        {status === 'processing' && (
          <div style={{ color: vaticanColor, fontStyle: 'italic', fontSize: '1.2rem', marginTop: '30px' }}>
            Pečeť je přikládána do archivu...
          </div>
        )}

        {status === 'submitted' && (
          <div style={{ padding: '20px' }}>
            <h2 style={{ color: goldColor, fontSize: '2.2rem' }}>Zapečetěno.</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>Vaše zpověď byla přijata do věčného archivu pod apoštolskou pečetí.</p>
            
            <div style={{ margin: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <div style={{ margin: '20px' }}>
                <QRCodeSVG 
                  value="SPD*1.0*ACC:5113445033/0800*AM:99.0*CC:CZK*MSG:Duchovni_obet" 
                  size={200}
                  fgColor={vaticanColor}
                  bgColor="#ffffff"
                />
              </div>
              <p style={{ fontSize: '0.9rem', color: '#777' }}>Pro dokončení obřadu prosím vykonejte duchovní oběť 99 Kč na péči o svatyni.</p>
            </div>
            
            <button 
              onClick={() => window.location.reload()} 
              style={{ color: vaticanColor, background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontSize: '1rem' }}
            >
              Návrat na začátek
            </button>
          </div>
        )}

        {status === 'error' && (
          <div style={{ color: '#ff0000', fontSize: '1.2rem', marginTop: '30px' }}>
            <p>Došlo k technické chybě v propojení s Vatikánem.</p>
            <button onClick={() => setStatus('pending')} style={{ color: vaticanColor, textDecoration: 'underline', border: 'none', background: 'none' }}>Zkusit znovu</button>
          </div>
        )}
      </div>
    </main>
  );
}
