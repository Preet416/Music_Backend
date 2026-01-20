import express from "express";
import cors from "cors";
import apiRouter from "./routes";

const app = express();

app.get("/", (req, res) => {
  res.send("Backend running ✅");
});


// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", apiRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
