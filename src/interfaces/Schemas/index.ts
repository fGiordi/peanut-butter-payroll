
export type TSalutation = 'Mr.' | 'Dr.' | 'Ms.' | 'Mrs' | 'Mx';
export type TGender = 'Male' | 'Female' | 'Unspecified';
export type TColor = 'Green' | 'Blue' | ' Red' | 'Default';

export interface Employee extends Document {
  firstName: string;
  lastName: string;
  salutation: TSalutation;
  gender: TGender;
  employeeNumber: number;
  grossSalary: number;
  profileColor: TColor
}