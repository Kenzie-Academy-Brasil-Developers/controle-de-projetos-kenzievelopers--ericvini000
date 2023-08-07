import { Router } from "express";
import { createDeveloper } from "../controllers";

const developerRouter: Router = Router();

developerRouter.post("", createDeveloper);

export default developerRouter;
