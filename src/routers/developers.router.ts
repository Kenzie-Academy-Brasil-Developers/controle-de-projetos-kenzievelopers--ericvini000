import { Router } from "express";
import {
  createDeveloper,
  deleteDeveloper,
  findDeveloper,
  updateDeveloper,
} from "../controllers";
import { checkIdExists } from "../middlewares";
import checkEmailExists from "../middlewares/checkEmailExists.middleware";

const developerRouter: Router = Router();

developerRouter.post("", checkEmailExists, createDeveloper);

developerRouter.use("/:id", checkIdExists);

developerRouter.get("/:id", findDeveloper);
developerRouter.patch("/:id", checkEmailExists, updateDeveloper);
developerRouter.delete("/:id", deleteDeveloper);


export default developerRouter;
