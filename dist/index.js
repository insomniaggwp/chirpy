import express from "express";
import { middlewareLogResponses, middlewareMetricsInc, errorMiddleware } from "./api/middleware.js";
import { handlerReadiness } from "./api/handler/readiness.js";
import { handlerMetrics, handlerResetMetrics } from './api/handler/metrics.js';
import { handlerValidateChirp } from "./api/handler/validate_chirp.js";
const app = express();
const PORT = 8080;
app.use(express.json());
app.use("/app", middlewareMetricsInc, express.static("./src/app"));
app.use(middlewareLogResponses);
app.use("/app", express.static("./src/app"));
app.get("/api/healthz", handlerReadiness);
app.get("/admin/metrics", handlerMetrics);
app.post("/admin/reset", handlerResetMetrics);
app.post("/api/validate_chirp", handlerValidateChirp);
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
