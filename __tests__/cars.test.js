const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should post a car', async () => {
    const res = await request(app)
      .post('/cars')
      .send({ make: 'BMW', color: 'black' });

    expect(res.body).toEqual({ 
      id: expect.any(String),
      make: 'BMW',
      color: 'black' 
    });
  });

  it('should get all cars', async () => {
    await Cars.insert({
      make: 'Honda',
      color: 'gold'
    });
    const res = await request(app)
      .get('/cars');

    expect(res.body).toEqual([{
      id: expect.any(String),
      make: 'Volvo',
      color: 'Silver'
    },
    {
      id: expect.any(String),
      make: 'Honda',
      color: 'gold'
    }
    ]);
  });
});

