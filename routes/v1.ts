import {Router} from "express";
const router = Router();

const task = require('../components/apps/tasks');
const taskPath = task.mount(router);
// Base v1 Responder
router.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: [ taskPath],
  });
});

export const v1Router = router;
