import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI no está definido en .env.local");
}

export const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "cantera-eventos",
    });
    console.log("Conectado a MongoDB 🚀");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB", error);
    process.exit(1);
  }
};
