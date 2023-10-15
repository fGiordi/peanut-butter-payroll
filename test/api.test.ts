import request from 'supertest';
import chai from 'chai';

// @ts-ignore
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

import app from '../src/app';

import mongoose from 'mongoose';
require('dotenv').config();

// @ts-ignore
import { MongoMemoryServer } from 'mongodb-memory-server';
import {  disconnect } from '../src/db';



it('should create a new employee and return a 201 status code', async () => {
  const updatedInfo = {
    firstName: 'John',
    lastName: 'Doe',
    employeeNumber: 12345,
    profileColor: 'Blue',
    grossSalary: 60000,
    salutation: 'Mr.',
    gender: 'Male',
  };

  // const response = await request(app)
  //   .put('/api/v1/employees/employeeId')
  //   .set('Accept', 'application/json')
  //   .send(updatedInfo);

  // expect(response.status).toBe(200);
});

describe('API test', () => {
  beforeAll(() => {
    
  });

  afterAll(() => {
    disconnect();
  });

  describe('Intergration Test', () => {
    it('GET Employees', async () => {
      const response = await request(app)
        .get('/api/v1/employees');

  
      expect(response.status).toBe(200);

    });

    it('PUT Employee', async () => {
      const updatedInfo = {
        firstName: 'John',
        lastName: 'Doe',
        employeeNumber: 12345,
        profileColor: 'Blue',
        grossSalary: 60000,
        salutation: 'Mr.',
        gender: 'Male',
      };

      // const response = await request(app)
      //   .get('/api/v1/employees');

      // console.log('response', response.status);
      // console.log('response', response.body);
  

      
    
      const response = await request(app)
        .put('/api/v1/employees/652931efee0ded3d8aa9503f')
        .set('Accept', 'application/json')
        .send(updatedInfo);
    
      expect(response.status).toBe(200);

    });
  });
});


describe('Integration Test for POST /api/v1/employees', () => {

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

