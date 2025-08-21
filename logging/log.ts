import { Request, Response } from "express";
import { randomUUID } from "crypto";
import pino from "pino";
import pinoHttp from "pino-http";
import fs from "fs";
import path from "path";

const logDir = path.resolve(__dirname, "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

const streams = [
  { stream: pino.transport({ target: "pino-pretty", options: { colorize: true } }) },
//  { stream: pino.destination({ dest: path.join(logDir, "app.log"), sync: false }) }
];

export const baseLogger: any = pino({ level: "info" }, pino.multistream(streams));

export const httpLogger = (): any =>
  pinoHttp({
    logger: baseLogger,
    autoLogging: false,
    genReqId: (req: Request, res: Response) => {
      const existingID = (req as any).id ?? req.headers["x-request-id"];
      if (existingID) return existingID as string;
      const id = randomUUID();
      res.setHeader("X-Request-Id", id);
      return id;
    },
    serializers: {
      err: pino.stdSerializers.err,
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res
    },
    wrapSerializers: true,
    customLogLevel: (req: Request, res: Response, error?: Error) => {
      if (res.statusCode >= 400 && res.statusCode < 500) return "warn";
      if (res.statusCode >= 500 || error) return "error";
      if (res.statusCode >= 300 && res.statusCode < 400) return "silent";
      return "info";
    },
    customSuccessMessage: (_req, res) =>
      res.statusCode === 404 ? "resource not found" : "request completed",
    customReceivedMessage: (req) => "request received: " + req.method,
    customErrorMessage: (_req, res) =>
      "request errored with status code: " + res.statusCode,
    customAttributeKeys: {
      req: "request",
      res: "response",
      err: "error",
      responseTime: "timeTaken"
    },
    customProps: (_req, res) => ({
      customProp: (_req as any).customProp,
      customProp2: res.locals?.myCustomData
    })
  });
