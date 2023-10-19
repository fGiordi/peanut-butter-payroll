import { Request, Response } from 'express';
import  EmployeeModel  from '../models/Employee'; 

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).json({ employees, message: 'All Employees - 👋🌎🌍🌏' });
  } catch (error) {
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employeeId = req.params.id as string;

    const employee = await EmployeeModel.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
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

    console.log('creating new user', req.body);

    // Save the new employee to the database
    const savedEmployee = await newEmployee.save();

    res.status(201).json(savedEmployee);
  } catch (error) {
    // @ts-ignore
    res.status(500).json({ error: error.message });
    // @ts-ignore
    console.log('error on create', error.message);
  }
};

export const updateEmployeeById = async (req: Request, res: Response) => {
  try {
    const employeeId = req.params.id as string;
    const { firstName, lastName, profileColor, grossSalary, salutation, gender, employeeNumber } = req.body;

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
    existingEmployee.employeeNumber = employeeNumber;

    // Save the updated employee to the database
    const updatedEmployee = await existingEmployee.save();

    res.status(200).json(updatedEmployee);
  } catch (error) {
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
};

export const deleteEmployeeById = async (req: Request, res: Response) => {
  try {
    const employeeId = req.params.id as string;
    // Find the employee by ID
    const employee = await EmployeeModel.findByIdAndRemove(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    // @ts-ignore
    res.status(204).send(); // No content
  } catch (error) {
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
};