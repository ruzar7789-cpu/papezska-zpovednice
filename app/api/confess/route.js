import { Pool } from 'pg';

export async function POST(req) {
  try {
    const body = await req.json();
    const { secret_text } = body;

    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    await pool.query('INSERT INTO confessions (secret_text) VALUES ($1)', [secret_text]);
    await pool.end();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    // Teď nám to vrátí chybu přímo do prohlížeče
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
