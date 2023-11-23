"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanData = exports.disconnectDB = exports.connectDB = void 0;
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.9knoiqg.mongodb.net/?retryWrites=true&w=majority`;
let mongod;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let dbUrl = MONGO_URI;
        if (process.env.NODE_ENV === 'test') {
            mongod = yield mongodb_memory_server_1.MongoMemoryServer.create();
            dbUrl = mongod.getUri();
        }
        const conn = yield mongoose_1.default.connect(dbUrl, {});
        console.log('MongoDB connected:', conn.connection.host);
    }
    catch (err) {
        console.log(err);
    }
});
exports.connectDB = connectDB;
const disconnectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connection.close();
        if (mongod) {
            yield mongod.stop();
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.disconnectDB = disconnectDB;
const cleanData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
});
exports.cleanData = cleanData;
