import express from "express";
import { env } from "./config";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
