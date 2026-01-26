import { Hono } from 'hono';
import { cors } from 'hono/cors';
import productRoutes from './products';

const app = new Hono();

// 1. Allow the Frontend to talk to the Backend (CORS)
app.use('/*', cors());

// 2. Simple health check
app.get('/', (c) => c.text('The 30 LPA System is Running!'));

// 3. Connect the Products API
app.route('/products', productRoutes);

// POST /login -> Check admin password
app.post('/login', async (c) => {
  const body = await c.req.json();
  
  // THE "SECRET" PASSWORD
  if (body.password === "admin123") {
    return c.json({ success: true, token: "fake-jwt-token-secret" });
  } else {
    return c.json({ error: "Invalid Password" }, 401);
  }
});



export default {
  port: 3000,
  fetch: app.fetch,
};