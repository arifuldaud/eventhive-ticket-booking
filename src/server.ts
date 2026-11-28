
import app from "./app";
import { pool } from "./config/db";
import { initDatabase } from "./config/initdb";
import { jwtHeplers } from "./utils/jwtHelpers";
const PORT = Number(process.env.PORT) || 5000;

initDatabase();

const startServer = async() => {
  try {

   const time = await pool.query("SELECT NOW()");
 console.log("Database is connected Successfully On:", time.rows[0]);

    const server = app.listen(PORT, () => {
      console.log(`EventHive is running on port ${PORT}`);
    });

    server.on("error", (error) => {
      console.error("Failed to start server:", error);
    });

  } catch (error) {
    console.error("Failed to connect the server:", error);
  }
};

startServer();
