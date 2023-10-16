import { Types } from 'mongoose';
import { Employee } from '../Schemas';

export type EmployeeResponse = Employee[];

export interface CreatedEmployeeResponse extends Employee {
  _id: Types.ObjectId;
} 