"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const employeeSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    salutation: { type: String, required: true, enum: ['Mr.', 'Dr.', 'Ms.', 'Mrs.', 'Mx.'] },
    employeeNumber: { type: Number, required: true, unique: true, index: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Unspecified'] },
    grossSalary: { type: Number, required: true },
    profileColor: { type: String, required: true, enum: ['Green', 'Blue', 'Red', 'Default'] },
});
const EmployeeModel = (0, mongoose_1.model)('Employee', employeeSchema);
EmployeeModel.createIndexes();
exports.default = EmployeeModel;
