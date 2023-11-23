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
exports.deleteEmployeeById = exports.updateEmployeeById = exports.createEmployee = exports.getEmployeeById = exports.getEmployees = void 0;
const Employee_1 = __importDefault(require("../models/Employee"));
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield Employee_1.default.find();
        res.status(200).json({ employees, message: 'All Employees - 👋🌎🌍🌏' });
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});
exports.getEmployees = getEmployees;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeId = req.params.id;
        const employee = yield Employee_1.default.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});
exports.getEmployeeById = getEmployeeById;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, employeeNumber, profileColor, grossSalary, salutation, gender } = req.body;
        const newEmployee = new Employee_1.default({
            firstName,
            lastName,
            employeeNumber,
            profileColor,
            grossSalary,
            salutation,
            gender,
        });
        console.log('creating new user', req.body);
        // Save the new employee to the database
        const savedEmployee = yield newEmployee.save();
        res.status(201).json(savedEmployee);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
        // @ts-ignore
        console.log('error on create', error.message);
    }
});
exports.createEmployee = createEmployee;
const updateEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeId = req.params.id;
        const { firstName, lastName, profileColor, grossSalary, salutation, gender, employeeNumber } = req.body;
        // Find the existing employee by ID
        const existingEmployee = yield Employee_1.default.findById(employeeId);
        if (!existingEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        // Update employee properties
        existingEmployee.firstName = firstName;
        existingEmployee.lastName = lastName;
        existingEmployee.profileColor = profileColor;
        existingEmployee.grossSalary = grossSalary;
        existingEmployee.salutation = salutation;
        existingEmployee.gender = gender;
        existingEmployee.employeeNumber = employeeNumber;
        // Save the updated employee to the database
        const updatedEmployee = yield existingEmployee.save();
        res.status(200).json(updatedEmployee);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});
exports.updateEmployeeById = updateEmployeeById;
const deleteEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeId = req.params.id;
        // Find the employee by ID
        const employee = yield Employee_1.default.findByIdAndRemove(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        // @ts-ignore
        res.status(204).send(); // No content
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});
exports.deleteEmployeeById = deleteEmployeeById;
