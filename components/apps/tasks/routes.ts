import express, { Request, Response, NextFunction, Router } from "express";
import controller from "./controller"; // use default export in controller

const routes: Router = express.Router();

routes.get('/', async (req: Request, res: Response, next: NextFunction) => {
  await controller.read(req, res, next);
});

routes.post('/', async (req: any, res: any, next:any) => {
  await controller.save(req, res, next);
});

routes.delete("/:taskId", async (req: any, res: any, next: any) => {
  try {
    await controller.delete(req, res, next);
  } catch (err) {
    next(err);
  }
});

routes.put("/:taskId", async (req: any, res: any, next: any) => {
  try {
    await controller.update(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default routes;