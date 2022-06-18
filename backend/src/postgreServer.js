import pg from "pg"
const { Pool } = pg

export const pool = new Pool({
	user: 'nus',
	host: 'localhost',
	database: 'nus_jun14',
	password: '12345678',
	port: 5432
})

