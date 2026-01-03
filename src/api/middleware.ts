import type { Request, Response, NextFunction } from "express";
import { config } from '../config.js'
import { NotFoundError, BadRequestError } from "./custom_errors.js";

export function middlewareLogResponses(req: Request, res: Response, next: NextFunction) {
  res.on("finish", () => {
    const statusCode = res.statusCode;
    if (statusCode >= 300) {
      console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${statusCode}`);
    }
  });
  next();
}

export function middlewareMetricsInc(req: Request, res: Response, next: NextFunction) {
  config.fileserverHits += 1
  next()
}

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof NotFoundError) {
    res.status(404).send({ error: err.message });
  } else if (err instanceof BadRequestError) {
    res.status(400).send({ error: err.message });
  } else {
    res.status(500).send("Internal Server Error");
  }
}