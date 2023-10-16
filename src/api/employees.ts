import express, { Request, Response } from 'express';
import EmployeeModel from '../models/Employee';
import { Employee } from '../interfaces/Schemas';
import { Types } from 'mongoose';

const router = express.Router();

type EmployeeResponse = Employee[];

interface CreatedEmployeeResponse extends Employee {
  _id: Types.ObjectId;
} 

router.get<{}, EmployeeResponse | { }>('/', async (req: Request, res: Response) => {
  try {
    const employees = await EmployeeModel.find();

    res.status(200).json({ employees: employees, message: 'All Employees - 👋🌎🌍🌏' });
  } catch (error: unknown) {
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
});

router.get<{}, CreatedEmployeeResponse | {}>('/:employeeId', async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const employeeId = req.params.employeeId;
  
    // Validate that `employeeId`

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

router.put<{}, CreatedEmployeeResponse | {}>('/:employeeId', async (req:Request, res:Response) => {
  try {
    // @ts-ignore
    const employeeId = req.params.employeeId;

    // Validate that `employeeId` is valid

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

router.delete<{}, {}>('/:employeeId', async (req:Request, res:Response) => {
  try {
    // @ts-ignore
    const employeeId = req.params.employeeId as string;

    // Validate that `employeeId` is a valid

    // Find the employee by ID
    const employee = await EmployeeModel.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // @ts-ignore TODO to fix this
    await employee.remove();

    res.status(204).send(); // Respond with a status code of 204
    // TODO add message
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});



export default router;
