import { Pool } from 'pg';

// Použijeme poolování, což je pro Vercel stabilnější
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { secret_text } = body;

    // Přímý zápis do databáze
    await pool.query('INSERT INTO confessions (secret_text) VALUES ($1)', [secret_text]);

    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
