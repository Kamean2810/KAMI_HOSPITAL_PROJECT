import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in .env");
  }

  try {
    await mongoose.connect(mongoUri, { dbName: "LEARNING_MANAGEMENT_SYSTEM" });
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw error;
  }
};
