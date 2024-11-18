


// Import required modules
const request = require('supertest'); 
const app = require('../app'); 
const mongoose = require('mongoose'); 

// Mock the mongoose module
jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue(true),
  connection: {
    close: jest.fn(),
  },
}));

describe('POST /api/schedule-email', () => {
  afterAll(async () => {
    // Close the mocked MongoDB connection after tests
    await mongoose.connection.close();
  });

  it('should schedule an email when authenticated', async () => {
    const token = 'valid-jwt-token'; 
    const response = await request(app)
      .post('/api/schedule-email')
      .set('Authorization', `Bearer ${token}`)
      .send({ to: 'test@example.com', subject: 'Test Subject', text: 'Test email text' });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Email scheduled successfully');
  });

  it('should return 401 if no token is provided', async () => {
    const response = await request(app)
      .post('/api/schedule-email')
      .send({ to: 'test@example.com', subject: 'Test Subject', text: 'Test email text' });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
  });

  it('should return 403 if the token is invalid', async () => {
    const token = 'invalid-token';
    const response = await request(app)
      .post('/api/schedule-email')
      .set('Authorization', `Bearer ${token}`)
      .send({ to: 'test@example.com', subject: 'Test Subject', text: 'Test email text' });

    expect(response.statusCode).toBe(403);
    expect(response.body.error).toBe('Forbidden');
  });
});
