import request from 'supertest';
import app from '../src/app';
import { connectDB, disconnectDB, cleanData } from '../src/db';

require('dotenv').config();

describe('API Intergration Test', () => {

  beforeAll(() => {
    connectDB();
  });

  beforeEach(cleanData);

  afterAll(disconnectDB);

  it('should get all employees', async () => {
    const response = await request(app)
      .get('/api/v1/employees');

    expect(response.status).toBe(200);
    console.log('response', response.body);

  });

  it('should create employee', async () => {
    const newInfo = {
      firstName: 'Johnoaia',
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
      .send(newInfo);

  
    expect(response.status).toBe(201);

  });

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
  });
});


