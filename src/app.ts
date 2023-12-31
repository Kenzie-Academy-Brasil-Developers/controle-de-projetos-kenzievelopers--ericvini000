import "express-async-errors";
import express, { Application } from "express";
import "dotenv/config";
import { developerRouter, projectRouter } from "./routers";
import { errorHandler } from "./middlewares";

const app: Application = express();

app.use(express.json());
app.use("/developers", developerRouter);
app.use("/projects", projectRouter);

app.use(errorHandler);

export default app;
