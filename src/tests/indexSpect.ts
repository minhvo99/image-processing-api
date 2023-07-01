import app from '../index';
import supertest from 'supertest';
import { handleImage, handleImagePath } from '../app/services/imageService';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('Gets /api endpoint', async (done) => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    done();
  });
});

describe('Testing image processing', () => {
  it('Image processing is successfully!', async () => {
    await expectAsync(handleImage('fjord', 200, 200)).toBeResolved();
  });
});