import { Request, Response, NextFunction } from "express";

export type Middleware = (req: Request, res: Response, next: NextFunction) => void
export type MiddlewareBuilder = (db: PrismaClient) => Middleware
