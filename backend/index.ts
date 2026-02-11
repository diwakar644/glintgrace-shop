import { Hono } from 'hono';
import { cors } from 'hono/cors';
import productRoutes from './src/products'; // Ensure this path is correct

const app = new Hono();

// 1. ENABLE CORS
app.use('/*', cors({
  origin: '*', 
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// 2. HEALTH CHECK
app.get('/', (c) => c.text('The 30 LPA System is Running!'));

// 3. CONNECT ROUTES
// This makes the products available at http://localhost:3005/products
app.route('/products', productRoutes);

export default {
  port: 3005,
  fetch: app.fetch,
};