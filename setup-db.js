const { Client } = require("pg");
require("dotenv").config();

async function setupDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS new_hires (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      start_date DATE NOT NULL,
      slack_user_id VARCHAR(255),
      welcome_sent BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("✅ Database table created!");
  await client.end();
}

setupDatabase().catch(console.error);