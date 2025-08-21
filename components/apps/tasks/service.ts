import BaseService from "../../base/BaseService"
import { PrismaClient } from "../../../db/generated/prisma";
import {Task} from "../../apps/entities/Task";

const prisma = new PrismaClient();
export default class TaskService extends BaseService {
  constructor() {
    super();
     
  }

  async read(sessionId: string) {
    await this.logger.info(`Getting All Tasks... ${sessionId}`); // uses the shared singleton
    try {
       return await prisma.tasks.findMany();
    } catch (error) {
      this.logger.error({ err: error, sessionId: sessionId });
      throw error;
    }
 }
 
  async save(task:Task, sessionId: string) {
    await this.logger.info(`Saving Tasks... ${sessionId}`); // uses the shared singleton
    let savedTask;
    try {
      savedTask = await prisma.tasks.create({
        data: {
          title:task.title,
          color:task.color,
          status: task.status,
          timestamps: task.timeStamp
        },
      });
     
      return await new Task(savedTask?.id, savedTask?.title??"", savedTask?.color??"", savedTask?.status??"", savedTask?.timestamps??"");
    } catch (error) {
      this.logger.error({ err: error, sessionId: sessionId });
      throw error;
    }
    
  }

  async delete(taskId: number, sessionId: string) {
    await this.logger.info(`Deleting Task... ${sessionId}`); // uses the shared singleton
    try {
      const deletedTask = await prisma.tasks.delete({
        where: { id: Number(taskId) },
      });
      if(deletedTask && Object.keys(deletedTask).length>0) {
        return await prisma.tasks.findMany();
      }
    } catch (error) {
      this.logger.error({ err: error, taskId: sessionId });
      throw error;
    }
    
  }

  async update(task: Task, sessionId: string) {
    await this.logger.info(`Updating Task... ${sessionId}`); // uses the shared singleton
    try {
      const updateTasks = await prisma.tasks.update({
        where: { id: task.id },
        data: {
          title:task.title,
          color:task.color,
          status: task.status,
          timestamps: task.timeStamp
        },
      })
      if(updateTasks && Object.keys(updateTasks).length>0) {
        return await prisma.tasks.findMany();
      }
    } catch (error) {
      this.logger.error({ err: error, taskId: sessionId });
      throw error;
    }
    
  }
}
