import request from 'supertest';
import chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

import app from '../src/app';

describe('Integration Test for POST /api/v1/employees', () => {
  it('should create a new employee and return a 201 status code', () => {
    const updatedInfo = {
      firstName: 'John',
      lastName: 'Doe',
      employeeNumber: 12345,
      profileColor: 'Blue',
      grossSalary: 60000,
      salutation: 'Mr.',
      gender: 'Male',
    };
    // const expect = chai.expect;

    return request(app)
      .put('/api/v1/employees/652931efee0ded3d8aa9503f')
      .set('Accept', 'application/json')
      .send(updatedInfo)
      .then((response) => {
        console.log('response', response.body);
        console.log('response', response.status);
        expect(response.status).toBe(200);
      });

   
  }, 30000);

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
  }, 30000);

  
});
