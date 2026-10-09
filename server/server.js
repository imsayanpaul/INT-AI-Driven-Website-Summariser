import express from "express";
import cors from "cors";
import "dotenv/config";
import summariseRouter from "./routes/summarise.js"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("ok");
});

app.use("/api", summariseRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
