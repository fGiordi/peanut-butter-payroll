import { Schema, model, Document } from 'mongoose';
import { Employee } from '../interfaces/Schemas';

const employeeSchema = new Schema<Employee>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  salutation: { type: String, required: true },
  employeeNumber: { type: Number, required: true },
  gender: { type: String, required: true },
  grossSalary: { type: Number, required: true },
  profileColor: { type: String, required: true },
});

const EmployeeModel = model<Employee>('Employee', employeeSchema);

export default EmployeeModel;