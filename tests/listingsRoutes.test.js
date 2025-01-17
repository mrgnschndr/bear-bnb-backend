// const request = require('supertest');
// const app = require('../server');
// const pool = require('./jest.poolTest.js'); // Ensure same instance is used

// describe('Listings Routes', () => {
//     it('should get all listings', async () => {
//         const response = await request(app).get('/api/listings');
//         expect(response.statusCode).toBe(200);
//         expect(Array.isArray(response.body)).toBe(true);
//     });

//     it('should get listings by host ID', async () => {
//         const hostId = 8; // Replace with a valid host ID from your seed data
//         const response = await request(app).get(`/api/listings/host/${hostId}`);
//         expect(response.statusCode).toBe(200);
//         expect(Array.isArray(response.body)).toBe(true);
//     });
// });
