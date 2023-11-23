"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db");
// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv_1 = __importDefault(require("dotenv"));
// eslint-disable-next-line import/no-extraneous-dependencies
const serverless_http_1 = __importDefault(require("serverless-http"));
dotenv_1.default.config();
(0, db_1.connectDB)();
const port = process.env.PORT || 5000;
app_1.default.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});
exports.handler = (0, serverless_http_1.default)(app_1.default);
