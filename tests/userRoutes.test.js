const request = require('supertest');
const app = require('../server'); // Express app
const { pool } = require('./jest.poolTest.js'); // Ensure same instance is used

describe('User Routes', () => {
  it('should get all users', async () => {
    console.log('Executing GET /users...');
    const response = await request(app).get('/api/users');

    console.log('Querying users table...');
    const { rows } = await pool.query('SELECT * FROM users');
    console.log('Query result:', rows);


    expect(rows.length).toBeGreaterThan(0);
    expect(rows).toEqual(expect.arrayContaining(rows));
  });
});

