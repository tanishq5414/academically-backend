import express from "express";
import { env } from "./config";
import { Gateway } from "./gateway";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "https://academically-backend.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));

Gateway.initGateway(app);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
