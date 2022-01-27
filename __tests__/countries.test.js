const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Country = require('../lib/models/Country');


describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should post a country', async () => {
    const res = await request(app)
      .post('/countries')
      .send({ country: 'mexico', landmass: .761 });

    expect(res.body).toEqual({ 
      id: expect.any(String),
      country: 'mexico',
      landmass: .761 
    });
  });

  it('should get all cars', async () => {
    await Country.insert({
      country: 'china',
      landmass: 3.705
    });
    const res = await request(app)
      .get('/countries');

    expect(res.body).toEqual([{
      id: expect.any(String),
      country: 'United States',
      landmass: 3.797
    },
    {
      id: expect.any(String),
      country: 'china',
      landmass: 3.705
    }
    ]);
  });
  it('should get a car by id', async () => { 
    const country = await Country.insert({
      country: 'mexico',
      landmass: .761 
    });
    const res = await request(app)
      .get(`/countries/${country.id}`);

    expect(res.body).toEqual(country);
  });

  it('should update a car', async () => {
    const country = await Country.insert({
      country: 'mexico',
      landmass: .761 
    });

    const res = await request(app)
      .patch(`/countries/${country.id}`)
      .send({ country: 'china',
        landmass: 3.705 });

    const expected = {
      id: expect.any(String),
      country: 'china',
      landmass: 3.705
    };
    console.log(res.body);  
    expect(res.body).toEqual(expected);
  });
  it('should delete a car', async () => {
    const country = await Country.insert({
      country: 'china',
      landmass: 3.705
    });

    const res = await request(app)
      .delete(`/countries/${country.id}`);

    expect(await Country.getById(country.id)).toBeNull();
  });
});
