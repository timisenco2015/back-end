import { Application } from "express";
import routes from "./routes"; // ES module import

const setupMount = (type: string, app: Application, router: any) => {
  const p = `/${type}`;
  app.use(p, router);
  return p;
};

export const mount = (app: Application): string => {
  return setupMount("task", app, routes);
};
