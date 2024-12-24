import express from "express";
import { env } from "./config";
import { Gateway } from "./gateway";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

Gateway.initGateway(app);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
