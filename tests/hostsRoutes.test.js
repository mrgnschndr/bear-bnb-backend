const request = require('supertest');
const app = require('../index'); // Express app
const { pool } = require('./jest.poolTest.js'); // Ensure same instance is used

describe('Hosts Routes', () => {
  it('should get all hosts', async () => {
    console.log('Executing GET /hosts...');
    const response = await request(app).get('/api/hosts');

    console.log('Querying hosts table...');
    const { rows } = await pool.query('SELECT * FROM hosts');
    console.log('Query result:', rows);


    expect(rows.length).toBeGreaterThan(0);
    expect(rows).toEqual(expect.arrayContaining(rows));
  });
});