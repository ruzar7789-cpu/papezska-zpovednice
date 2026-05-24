'use client';
import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [confessions, setConfessions] = useState([]);

  useEffect(() => {
    // Simulace načtení dat z databáze (později napojíme na reálnou GET cestu)
    setConfessions([
      { id: 1, text: "Odpusť mi, otče, neboť jsem chyboval...", date: "2026-05-24" }
    ]);
  }, []);

  return (
    <main style={{ padding: '40px', fontFamily: 'Georgia, serif', backgroundColor: '#fdfbf7', minHeight: '100vh' }}>
      <h1 style={{ color: '#8b0000' }}>Administrace zpovědí</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: '#fff' }}>
        <thead>
          <tr style={{ backgroundColor: '#d4af37', color: 'white' }}>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Text zpovědi</th>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Datum</th>
          </tr>
        </thead>
        <tbody>
          {confessions.map(c => (
            <tr key={c.id}>
              <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{c.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{c.text}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{c.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
