import express from 'express';
import EmployeeModel from '../models/Employee';
import { Employee } from '../interfaces/Schemas';
import { Types } from 'mongoose';

const router = express.Router();

type EmployeeResponse = Employee[];

interface CreatedEmployeeResponse extends Employee {
  _id: Types.ObjectId;
} 

router.get<{}, EmployeeResponse | { error: string }>('/', async (req, res) => {
  try {
    const employees = await EmployeeModel.find();

    res.json(employees);
  } catch (error: unknown) {
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
});

router.post<{}, CreatedEmployeeResponse | {}>('/', async (req, res) => {
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
    console.log('error', error.message);
    res.status(500).json({ error: error.message });

  }
});



export default router;
