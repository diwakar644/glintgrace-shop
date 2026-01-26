import { Hono } from 'hono';
import productRoutes from './products'; // Import the new file

const app = new Hono();

app.get('/', (c) => c.text('The 30 LPA System is Running!'));

// Mount the routes
// Any request to "/products" goes to our new file
app.route('/products', productRoutes);

export default {
  port: 3000,
  fetch: app.fetch,
};