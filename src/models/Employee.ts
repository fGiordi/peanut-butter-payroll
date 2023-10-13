import { Schema, model  } from 'mongoose';
import { Employee } from '../interfaces/Schemas';

const employeeSchema = new Schema<Employee>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  salutation: { type: String, required: true, enum: ['Mr.', 'Dr.', 'Ms.', 'Mrs', 'Mx'] },
  employeeNumber: { type: Number, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Unspecified'] },
  grossSalary: { type: Number, required: true },
  profileColor: { type: String, required: true, enum: ['Green', 'Blue', 'Red', 'Default'] },
});

const EmployeeModel = model<Employee>('Employee', employeeSchema);

export default EmployeeModel;