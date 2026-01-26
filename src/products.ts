import { Hono } from 'hono';
import { db } from './db';
import { products } from './db/schema';
import { eq } from 'drizzle-orm'; // 1. Import this at the very top of the file!
const app = new Hono();

// GET /products -> List all items
app.get('/', async (c) => {
  try {
    // 1. Fetch all rows from the products table
    const allProducts = await db.select().from(products);
    
    // 2. Return them as JSON
    return c.json(allProducts);
  } catch (error) {
    return c.json({ error: "Failed to list products" }, 500);
  }
});



// POST /products -> Adds a new item to the database
app.post('/', async (c) => {
  try {
    // 1. Read the data sent by the user (Frontend)
    const body = await c.req.json();

    // 2. Insert into Database
    const result = await db.insert(products).values({
      name: body.name,
      price: body.price,
      image: body.image,
      category: body.category,
      description: body.description,
    }).returning(); // .returning() gives us back the new item

    // 3. Send success response
    return c.json({
      message: "✅ Product Added Successfully!",
      product: result[0]
    });

  } catch (error) {
    return c.json({ error: "Failed to add product", details: String(error) }, 500);
  }
});

// DELETE /products/:id -> Remove an item
app.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    // Delete where ID matches
    await db.delete(products).where(eq(products.id, Number(id)));

    return c.json({ message: "Deleted!" });
  } catch (error) {
    return c.json({ error: "Failed to delete" }, 500);
  }
});

// export default app;
export default app;