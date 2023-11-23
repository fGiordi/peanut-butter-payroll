"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMongoId = exports.errorHandler = exports.notFound = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}
exports.notFound = notFound;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err, req, res, next) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
}
exports.errorHandler = errorHandler;
function validateMongoId(req, res, next) {
    const id = req.params.id;
    if (id && mongoose_1.default.Types.ObjectId.isValid(id)) {
        next();
    }
    else {
        const error = new Error('Invalid MongoDB ObjectId');
        res.status(400);
        next(error);
    }
}
exports.validateMongoId = validateMongoId;
