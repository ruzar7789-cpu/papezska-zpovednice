'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [confessions, setConfessions] = useState([]);

  useEffect(() => {
    // Tady budeme později volat funkci pro načtení zpráv
    setConfessions([{ id: 1, text: "Toto je ukázková zpověď z databáze." }]);
  }, []);

  return (
    <main style={{ padding: '40px', fontFamily: 'serif' }}>
      <h1>Papežský Admin Panel</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Zpověď</th>
          </tr>
        </thead>
        <tbody>
          {confessions.map(c => (
            <tr key={c.id}>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{c.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{c.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
