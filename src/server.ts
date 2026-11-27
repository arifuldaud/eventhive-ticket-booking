
import app from "./app";

const PORT = Number(process.env.PORT) || 5000;

const startServer = () => {
  try {
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
