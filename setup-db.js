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
      timezone VARCHAR(100) DEFAULT 'America/Los_Angeles',
      slack_user_id VARCHAR(255),
      welcome_sent BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add timezone column to existing table if it doesn't exist
  await client.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'new_hires' AND column_name = 'timezone'
      ) THEN
        ALTER TABLE new_hires ADD COLUMN timezone VARCHAR(100) DEFAULT 'America/Los_Angeles';
      END IF;
    END $$;
  `);

  console.log("✅ Database table created/updated!");
  await client.end();
}

setupDatabase().catch(console.error);