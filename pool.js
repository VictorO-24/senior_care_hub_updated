const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',         // Your PostgreSQL username
  host: 'localhost',             // Host (could be localhost or a remote host)
  database: 'db',// Your database name
  password: 'VSCode-2024',     // Your PostgreSQL password
  port: 5432,                    // Default PostgreSQL port
});

module.exports = pool;
