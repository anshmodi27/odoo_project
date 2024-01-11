import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URL environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true, // Add this option to avoid deprecation warning
      useUnifiedTopology: true, // Add this option to avoid deprecation warning
    };

    cached.promise = mongoose
      .connect(MONGODB_URL, opts)
      .then((mongoose) => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw new Error(`Unable to connect to the database: ${e.message}`);
  }
};
export const mongooseInstance = mongoose;

export default dbConnect;
