const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Car = require('../lib/models/Car');


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
    await Car.insert({
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
  it('should get a car by id', async () => { 
    const car = await Car.insert({
      make: 'Toyota',
      color: 'black'
    });
    const res = await request(app)
      .get(`/cars/${car.id}`);

    expect(res.body).toEqual(car);
  });

  it('should update a car', async () => {
    const car = await Car.insert({
      make: 'xfinity',
      color: 'black'
    });

    const res = await request(app)
      .patch(`/cars/${car.id}`)
      .send({ color: 'red' });

    const expected = {
      id: expect.any(String),
      make: 'xfinity',
      color: 'red'
    };
    console.log(res.body);  
    expect(res.body).toEqual(expected);
  });
  it('should delete a car', async () => {
    const car = await Car.insert({
      make: 'honda',
      color: 'gold'
    });

    const res = await request(app)
      .delete(`/cars/${car.id}`);

    expect(await Car.getById(car.id)).toBeNull();
  });
});

