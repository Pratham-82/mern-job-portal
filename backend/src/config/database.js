import mongoose from "mongoose";
import { seedDemoData } from "../utils/seed.js";

let mongodInstance = null;

export default async function connectDatabase() {
  const targetUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/job-portal";

  try {
    // Attempt connecting to the configured URI with a 3s timeout
    await mongoose.connect(targetUri, { serverSelectionTimeoutMS: 3000 });
    console.log(`Connected to MongoDB at ${targetUri}`);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`\nCould not connect to external MongoDB at ${targetUri}.`);
      console.log("Spinning up local in-memory MongoDB instance for development...");
      try {
        const { MongoMemoryServer } = await import("mongodb-memory-server");
        mongodInstance = await MongoMemoryServer.create();
        const memoryUri = mongodInstance.getUri();
        await mongoose.connect(memoryUri);
        console.log(`Connected to local in-memory MongoDB at ${memoryUri}`);
      } catch (memError) {
        console.error("Failed to start in-memory MongoDB:", memError.message);
        process.exit(1);
      }
    } else {
      console.error("MongoDB connection failed:", error.message);
      process.exit(1);
    }
  }

  // Auto-seed demo data if empty
  await seedDemoData();
}

export async function disconnectDatabase() {
  try {
    await mongoose.disconnect();
    if (mongodInstance) {
      await mongodInstance.stop();
    }
  } catch (err) {
    console.warn("Disconnect error:", err.message);
  }
}
