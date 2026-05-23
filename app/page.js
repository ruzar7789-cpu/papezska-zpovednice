// ... (zbytek kódu zůstává, změň jen funkci submitConfession)
  const submitConfession = async () => {
    try {
      const res = await fetch('/api/confess', {
        method: 'POST',
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
// ...
