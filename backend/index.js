import express from "express";
import AuthRouter from "./src/routers/authRouter.js";
import connectDB from "./src/config/db.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", AuthRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server Working" });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Started at", port);
  connectDB();
});
