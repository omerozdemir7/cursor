import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export async function connectToDatabase() {
  const mongoUriFromEnv = process.env.MONGO_URI;
  mongoose.set("strictQuery", true);

  if (!mongoUriFromEnv || mongoUriFromEnv === "memory") {
    const mem = await MongoMemoryServer.create();
    const uri = mem.getUri();
    await mongoose.connect(uri);
    console.log("Connected to in-memory MongoDB");
    return;
  }

  await mongoose.connect(mongoUriFromEnv, {
    dbName: mongoUriFromEnv.split("/").pop(),
  });
  console.log("Connected to MongoDB");
}

