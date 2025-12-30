import express from "express";
const app = express();
const PORT = 8080;
const handlerReadiness = (req, res) => {
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.send('OK');
};
const middlewareLogResponses = (req, res, next) => {
    res.on("finish", () => {
        const statusCode = res.statusCode;
        if (statusCode >= 300) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${statusCode}`);
        }
    });
    next();
};
app.use("/app", express.static("./src/app"));
app.use(middlewareLogResponses);
app.get("/healthz", handlerReadiness);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
