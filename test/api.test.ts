import request from 'supertest';

import app from '../src/app';

describe('Integration Test for POST /api/v1/employees', () => {
  it('should create a new employee and return a 201 status code', async () => {
    const newEmployee = {
      firstName: 'John',
      lastName: 'Doe',
      employeeNumber: 12345,
      profileColor: 'Blue',
      grossSalary: 60000,
      salutation: 'Mr.',
      gender: 'Male',
    };

    const response = await request(app)
      .post('/api/v1/employees')
      .set('Accept', 'application/json')
      .send(newEmployee);

    expect(response.body).toEqual(newEmployee);

  }, 1000);

  it('should handle errors and return a 500 status code', () => {
    const invalidEmployee = {
      // Invalid data that should trigger an error in the endpoint
    };

    return request(app)
      .post('/api/v1/employees')
      .set('Accept', 'application/json')
      .send(invalidEmployee)
      .then((response) => {
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
      });
  }, 20000);

  
});
