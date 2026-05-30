import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./routes/chatroutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

const ALLOWED_ORIGINS = [
  "https://felipelanidnezz.github.io",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
];

function isAllowedOrigin(origin) {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed))) return true;
  if (origin.endsWith(".onrender.com")) return true;
  return false;
}

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(express.json());
app.use(express.static("public"));
app.use("/server", router);

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 })
    .then(() => console.log("Conectado a MongoDB"))
    .catch((err) => {
      console.warn("MongoDB no disponible — usando memoria local:", err.message);
    });
} else {
  console.log("Sin MONGODB_URI — mensajes en memoria (se pierden al reiniciar)");
}

if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️  Falta GEMINI_API_KEY en .env — las IAs no podrán responder");
}

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
