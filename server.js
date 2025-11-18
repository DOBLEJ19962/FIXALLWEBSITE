// server.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// Necesario para poder usar __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👉 Servir la carpeta .well-known desde la raíz del proyecto
//    Esto hace que https://tudominio.com/.well-known/assetlinks.json funcione
app.use(
  "/.well-known",
  express.static(path.join(__dirname, ".well-known"))
);

// 👉 Servir frontend desde /public
app.use(express.static(path.join(__dirname, "public")));

// Importar APIs
import jobsRoutes from "./controllers/jobsController.js";
import userRoutes from "./controllers/userController.js";
import trackingRoutes from "./controllers/trackingController.js";

// Usar APIs
app.use("/api/jobs", jobsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tracking", trackingRoutes);

// Landing
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`FIXALL Server running on port ${PORT}`));
