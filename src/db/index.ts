import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { config } from "dotenv";
import * as schema from "./schema";

// 1. Load the secret passwords from .env
config({ path: ".env" });

// 2. Safety Check (Interview Best Practice)
if (!process.env.TURSO_URL || !process.env.TURSO_TOKEN) {
  throw new Error("❌ Fatal Error: Database keys are missing in .env file!");
}

// 3. Create the Connection
const client = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_TOKEN,
});

// 4. Export the connected database
export const db = drizzle(client, { schema });