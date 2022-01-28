const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Drink = require('../lib/models/Drink');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });

  const testDrink = {
    drink: 'shirley temple',
    carbonated: true
  };

  const expectedDrink = {
    id: expect.any(String),
    drink: 'shirley temple',
    carbonated: true
  };

  it('should post a drink', async () => {
    const res = await request(app)
      .post('/drinks')
      .send(testDrink);

    expect(res.body).toEqual(expectedDrink);
  });
  it('should get all drinks', async () => {
    await Drink.insert(testDrink);
    const res = await request(app)
      .get('/drinks');

    expect(res.body).toEqual([{
      id: expect.any(String),
      drink: 'coke',
      carbonated: true
    },
    {
      id: expect.any(String),
      drink: 'shirley temple',
      carbonated: true
    }
    ]);
  });
  it('should get a drink by id', async () => {
    const drink = await Drink.insert(testDrink);
    const res = await request(app)
      .get(`/drinks/${drink.id}`);

    expect(res.body).toEqual(drink);
  });
  it('it should update a drink by id', async () => {
    const drink = await Drink.insert(testDrink);
    const res = await request(app)
      .patch(`/drinks/${drink.id}`)
      .send({ drink: 'sprite' });

    const expected = {
      id: drink.id,
      drink: 'sprite',
      carbonated: true
    };
    console.log(res.body, expected);
    expect(res.body).toEqual(expected);
  });
  it('should delete a drink by id', async () => {
    const drink = await Drink.insert(testDrink);
    const res = await request(app)
      .delete(`/drinks/${drink.id}`);

    expect(await Drink.getById(drink.id)).toBeNull();

  });
});
