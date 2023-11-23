import express, { Request, Response } from 'express';
import { validateMongoId } from '../middleware';
import { EmployeeResponse, CreatedEmployeeResponse } from '../interfaces/Responses/EmployeeResponse';
import { createEmployee, deleteEmployeeById, getEmployeeById, getEmployees, updateEmployeeById } from '../controllers/employees';

const router = express.Router();

// GET All
router.get<{}, EmployeeResponse | { }>('/', getEmployees);
// GET Specific
router.get<{}, CreatedEmployeeResponse | {}>('/:id', validateMongoId, getEmployeeById);
// CREATE Employee
router.post<{}, CreatedEmployeeResponse | {}>('/', createEmployee);
// Update Employee
router.put<{}, CreatedEmployeeResponse | {}>('/:id', validateMongoId, updateEmployeeById);
// Delete Employee
router.delete<{}, {}>('/:id', validateMongoId, deleteEmployeeById);


export default router;
