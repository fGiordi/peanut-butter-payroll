import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import ErrorResponse from '@/src/interfaces/Responses/ErrorResponse';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}


export function validateMongoId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = req.params.id as string;
  if (id && mongoose.Types.ObjectId.isValid(id)) {
    next(); 
  } else {
    const error = new Error('Invalid MongoDB ObjectId');
    res.status(400);
    next(error);
  }
}