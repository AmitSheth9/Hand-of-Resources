const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Sport = require('../lib/models/Sport');
const Country = require('../lib/models/Country');


describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  const testSport = {
    sport: 'soccer',
    players: 10
  };
  const expectedSport = {
    id: expect.any(String),
    sport: 'soccer',
    players: 10
  };

  it('should post a sport', async () => {
    const res = await request(app)
      .post('/sports')
      .send(testSport);

    expect(res.body).toEqual(expectedSport);
  });
  it('should get all sports', async () => {
    await Sport.insert(testSport);

    const res = await request(app)
      .get('/sports');

    expect(res.body).toEqual([{
      id: expect.any(String),
      sport: 'baseball',
      players: 9
    },
    {
      id: expect.any(String),
      sport: 'soccer',
      players: 10
    }]);
  });
  it('should get sport by id', async () => {
    const sport = await Sport.insert(testSport);
    const res = await request(app)
      .get(`/sports/${sport.id}`);

    expect(res.body).toEqual(sport);
  });
  it('should update sport by id', async () => {
    const sport = await Sport.insert(testSport);

    const res = await request(app)
      .patch(`/sports/${sport.id}`)
      .send({ sport: 'basketball', players: 5 });

    const expected = {
      id: expect.any(String),
      sport: 'basketball',
      players: 5
    };

    expect(res.body).toEqual(expected);
  });
  it('should delete a sport', async () => {
    const sport = await Sport.insert(testSport);

    const res = await request(app)
      .delete(`/sports/${sport.id}`);

    expect(await Sport.getById(sport.id)).toBeNull();
  });
});
