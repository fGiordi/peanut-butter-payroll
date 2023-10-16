import express, { Request, Response } from 'express';
import EmployeeModel from '../models/Employee';
import { validateMongoId } from '../middlewares';
import { EmployeeResponse, CreatedEmployeeResponse } from '../interfaces/Responses/EmployeeResponse';

const router = express.Router();

router.get<{}, EmployeeResponse | { }>('/', async (req: Request, res: Response) => {
  try {
    const employees = await EmployeeModel.find();

    res.status(200).json({ employees: employees, message: 'All Employees - 👋🌎🌍🌏' });
  } catch (error: unknown) {
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
});

router.get<{}, CreatedEmployeeResponse | {}>('/:id', validateMongoId,  async (req: Request, res: Response) => {
  try {
    const employeeId = req.params.id as string;
  
    // Find the employee by ID
    const employee =  await EmployeeModel.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post<{}, CreatedEmployeeResponse | {}>('/', async (req:Request, res:Response) => {
  try {
    const { firstName, lastName, employeeNumber, profileColor, grossSalary, salutation, gender } = req.body;

    const newEmployee = new EmployeeModel({
      firstName,
      lastName,
      employeeNumber,
      profileColor,
      grossSalary,
      salutation,
      gender,
    });

    // Save the new product to the database
    const savedEmployee = await newEmployee.save();


    res.status(201).json(savedEmployee); 
  } catch (error: any) {
    res.status(500).json({ error: error.message });

  }
});

router.put<{}, CreatedEmployeeResponse | {}>('/:id', validateMongoId, async (req:Request, res:Response) => {
  try {
    const employeeId = req.params.id as string;
    const { firstName, lastName, profileColor, grossSalary, salutation, gender } = req.body;

    // Find the existing employee by ID
    const existingEmployee = await EmployeeModel.findById(employeeId);

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

    // Save the updated employee to the database
    const updatedEmployee = await existingEmployee.save();

    res.status(200).json(updatedEmployee);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete<{}, {}>('/:id', validateMongoId, async (req:Request, res:Response) => {
  try {
    const employeeId = req.params.id as string;

    // Find the employee by ID
    const employee = await EmployeeModel.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // @ts-ignore TODO to fix this
    await employee.remove();

    res.status(204).send(); 
    // TODO add message
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});



export default router;
