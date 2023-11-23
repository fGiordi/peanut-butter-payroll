"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const employees_1 = require("../controllers/employees");
const router = express_1.default.Router();
// GET All
router.get('/', employees_1.getEmployees);
// GET Specific
router.get('/:id', middleware_1.validateMongoId, employees_1.getEmployeeById);
// CREATE Employee
router.post('/', employees_1.createEmployee);
// Update Employee
router.put('/:id', middleware_1.validateMongoId, employees_1.updateEmployeeById);
// Delete Employee
router.delete('/:id', middleware_1.validateMongoId, employees_1.deleteEmployeeById);
exports.default = router;
