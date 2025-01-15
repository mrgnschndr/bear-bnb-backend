const request = require('supertest');
const app = require('../index'); // Express app
const { pool } = require('./jest.poolTest.js'); // Ensure same instance is used

describe('User Routes', () => {
  it('should get all users', async () => {
    console.log('Executing GET /users...');
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);


    expect(rows.length).toBeGreaterThan(0);
    expect(rows).toEqual(expect.arrayContaining(response.body));
  });
});

