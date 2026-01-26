import { createClient } from "@libsql/client";

async function main() {
  console.log("🔍 Starting Connection Diagnosis...");

  // PASTE DIRECTLY HERE (No .env file)
  const client = createClient({
    url: "libsql://jwells-diwakar644.aws-ap-south-1.turso.io", 
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NjkzNzAzODYsImlkIjoiNzg2MTgyZTktMGZmYy00YTJjLThhYmMtMjMxYmZiM2E3YWQ2IiwicmlkIjoiZDFjYzkyZWYtNDRlMC00NzFmLTk1MjQtNTYzYzY5YWExNWQ4In0.LI2jv_AeXRN19q_JoPNwCn8NPDf-GZy7KQ7f3cvOxbhz0gTV3X42Feg-w2_INVy7rPhLo-VbDl05aRlCuwm3CQ"
  });

  try {
    // Attempt a simple handshake
    const rs = await client.execute("SELECT 1");
    console.log("✅ SUCCESS! The Token is valid.");
    console.log("👉 The issue is in your .env file formatting, not the token.");
  } catch (e) {
    console.error("❌ FAILURE. The Token or URL is definitely wrong.");
    console.error("Error details:", e);
  }
}

main();