import "dotenv/config";

import { connectDB } from "./shared/config/db";
import app from "./app";

const port = process.env.PORT || 3000;

async function bootstrap() {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Start Server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

bootstrap();