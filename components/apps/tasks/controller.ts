import { Request, Response, NextFunction } from "express";
import TaskService from "./service";
import { TaskSchema } from "../../../utils/validation/taskValidator";
import {baseLogger} from "../../../logging/log";

const taskService = new TaskService();

const controller = {
  read: async (req: any, res: any, next: any) => {
    try {
    res.status(200).json(await taskService.read(req.id)); // return the created task
    } catch (error) {
      next(error);
    }
  },
  save: async (req: any, res: any, next: any) => {
    try {
      
      const parsed = TaskSchema.safeParse(req.body);

      if (!parsed.success) {
       baseLogger.error({ err: parsed.error.format(), sessionId: req.id });
        res.status(400).json({
          message: "Validation error",
          errors: parsed.error.format(),
        });
        return;
      }
     res.status(200).json(await taskService.save(req.body, req.id)); 
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: any, res: any, next: any) => {
    try {

      const { taskId } = req.params;
     res.status(200).json(await taskService.delete(taskId, req.id)); 
    } catch (error) {
      next(error);
    }
  },
   update: async (req: any, res: any, next: any) => {
    try {
      const data = req.body;
     res.status(200).json(await taskService.update(data, req.id)); 
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
