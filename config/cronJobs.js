const pool = require("./database");
const cron = require("node-cron");

const updateServiceQuery = `
  UPDATE personnel
  SET service = 'NSmen'
  WHERE ord IS NOT NULL AND CURRENT_DATE > ord AND service <> 'NSmen';
`;

// Schedule the cron job to run daily at midnight
cron.schedule("0 0 * * *", async () => {
	try {
		const res = await pool.query(updateServiceQuery);
		console.log(`Service status updated: ${res.rowCount} rows affected`);
	} catch (err) {
		console.error("Error executing query", err.stack);
	}
});
