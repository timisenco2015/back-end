import { z } from "zod";
import {TaskColor} from  '../../components/apps/entities/TaskColor'

export const TaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  color: z.enum(TaskColor),
  status: z.string().min(1, "Completed status required"),
});