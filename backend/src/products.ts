import { Hono } from 'hono';
import { createClient } from '@libsql/client';

const app = new Hono();

// 1. DATABASE CONNECTION (Using .env)
const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error("❌ Missing Database Credentials! Check your .env file.");
}

const client = createClient({
  url: url,
  authToken: authToken,
});

// 2. HELPER: Fix "BigInt" Error
// This prevents the "cannot serialize BigInt" error you saw earlier
const safeJson = (data: any) => {
  return JSON.parse(JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ));
};

// --- ROUTES ---

// GET ALL PRODUCTS
app.get('/', async (c) => {
  try {
    const result = await client.execute('SELECT * FROM products');
    return c.json(safeJson(result.rows));
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// GET SINGLE PRODUCT
app.get('/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const result = await client.execute({
      sql: 'SELECT * FROM products WHERE id = ?',
      args: [id]
    });
    if (result.rows.length === 0) return c.json({ error: 'Product not found' }, 404);
    return c.json(safeJson(result.rows[0]));
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// CREATE PRODUCT
app.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const { name, price, image, category, description } = body;

    const result = await client.execute({
      sql: `INSERT INTO products (name, price, image, category, description) 
            VALUES (?, ?, ?, ?, ?) RETURNING *`,
      args: [name, parseFloat(price), image, category, description || '']
    });

    return c.json(safeJson(result.rows[0]), 201);
  } catch (err: any) {
    console.error("Create Error:", err);
    return c.json({ error: err.message }, 500);
  }
});

// UPDATE PRODUCT
app.put('/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const body = await c.req.json();
    const { name, price, image, category, description } = body;

    const result = await client.execute({
      sql: `UPDATE products 
            SET name = ?, price = ?, image = ?, category = ?, description = ? 
            WHERE id = ? RETURNING *`,
      args: [name, parseFloat(price), image, category, description || '', id]
    });

    if (result.rows.length === 0) return c.json({ error: 'Product not found' }, 404);
    return c.json(safeJson(result.rows[0]));
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// DELETE PRODUCT
app.delete('/:id', async (c) => {
  const id = c.req.param('id');
  try {
    await client.execute({
      sql: 'DELETE FROM products WHERE id = ?',
      args: [id]
    });
    return c.json({ message: 'Deleted successfully' });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

export default app;