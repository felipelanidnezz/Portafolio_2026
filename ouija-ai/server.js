import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./routes/chatroutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

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
