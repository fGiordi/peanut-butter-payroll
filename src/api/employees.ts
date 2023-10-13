import express from 'express';
import EmployeeModel from '../models/Employee';
import { Employee } from '../interfaces/Schemas';

const router = express.Router();

// TODO to add types here to Employees
type EmployeeResponse = Employee[];

router.get<{}, EmployeeResponse | { error: string }>('/', async (req, res) => {
  try {
    const employees = await EmployeeModel.find();

    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post<{}, EmployeeResponse | any>('/', async (req, res) => {
  console.log('posting employees');
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

    console.log('savedEmployee', savedEmployee);

    res.status(201).json(savedEmployee); 
  } catch (error: any) {
    throw new Error(error.message);
  }
});



export default router;
