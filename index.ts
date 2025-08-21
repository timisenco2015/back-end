import express, { Router } from "express";
import config from "config";
import { v1Router } from "./routes/v1";
import { httpLogger, baseLogger } from "./logging/log";
import cors from "cors";
import { PrismaClient } from "../back-end/db/generated/prisma";

let probeId;
const apiRouter = Router();
const app = express();

// Logger
const logger = httpLogger();
app.use(logger);

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API
apiRouter.use(v1Router);
app.use(config.get("server.apiPath"), apiRouter);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  if (err) baseLogger.error(err);
});

// Graceful shutdown
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

async function cleanup() {
  baseLogger.info("Service no longer accepting traffic");
  clearInterval(probeId);

  const prisma = new PrismaClient();
  await prisma.$disconnect();

  setTimeout(() => process.exit(), 10000);
}

function shutdown() {
  baseLogger.info("Received kill signal. Shutting down...");
  setTimeout(cleanup, 3000);
}

// Get host and port from config
const PORT = config.get<number>("server.port");
const HOST = config.get<string>("server.host");

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
