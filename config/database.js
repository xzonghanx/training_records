const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
// const connectionString = "postgresql://unit4_owner:9iMaYTvKPr8j@ep-wild-darkness-a1xv33as.ap-southeast-1.aws.neon.tech/sqltest?sslmode=require";

const pool = new Pool({
	connectionString,
});

// pool.on("connect", () => {
// 	console.log("Connected to the PostgreSQL database");
// });

// Log connection information
// pool.on("connect", (client) => {
// 	console.log(`Connected to PostgreSQL database at ${client.host}, Port:${client.port}`);
// });

// pool.on("error", (err, client) => {
// 	console.error("Unexpected error on idle client", err);
// 	process.exit(-1);
// });

// Function to check the database connection
const checkDatabaseConnection = async () => {
	try {
		const client = await pool.connect();
		console.log(`Connected to PostgreSQL database at ${client.host}, Port:${client.port}`);
		client.release(); // Release the client back to the pool
	} catch (err) {
		console.error("Error connecting to the database", err.stack);
		process.exit(-1); // Exit the process if unable to connect to the database
	}
};

// Check the connection immediately
checkDatabaseConnection();

pool.on("error", (err) => {
	console.error("Unexpected error on idle client", err);
	process.exit(-1); // Optional: Exit the process if a critical error occurs
});

module.exports = pool;
