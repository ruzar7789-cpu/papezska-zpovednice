import { Client } from 'pg';

export async function POST(req) {
  const { secret_text } = await req.json();
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  await client.query('INSERT INTO confessions (secret_text) VALUES ($1)', [secret_text]);
  await client.end();
  
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
