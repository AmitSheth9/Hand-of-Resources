const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Language = require('../lib/models/Language');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
    
  afterAll(() => {
    pool.end();
  });
  
  const testLanguage = {
    name: 'python',
    created: 1991
  };
  
  const expectedLanguage = {
    id: expect.any(String),
    name: 'python',
    created: 1991
  };
  
  it('should post a language', async () => {
    const res = await request(app)
      .post('/languages')
      .send(testLanguage);
  
    expect(res.body).toEqual(expectedLanguage);
  });
  it('should get all languages', async () => {
    await Language.insert(testLanguage);
    const res = await request(app)
      .get('/languages');
  
    expect(res.body).toEqual([{
      id: expect.any(String),
      name: 'javascript',
      created: 1995
    },
    {
      id: expect.any(String),
      name: 'python',
      created: 1991
    }
    ]);
  });
  it('should get a language by id', async () => {
    const language = await Language.insert(testLanguage);
    const res = await request(app)
      .get(`/languages/${language.id}`);
  
    expect(res.body).toEqual(language);
  });
  it('it should update a language by id', async () => {
    const language = await Language.insert(testLanguage);
    const res = await request(app)
      .patch(`/languages/${language.id}`)
      .send({ name: 'html' });
  
    const expected = {
      id: language.id,
      name: 'html',
      created: 1991
    };
    console.log(res.body, expected);
    expect(res.body).toEqual(expected);
  });
  it('should delete a language by id', async () => {
    const language = await Language.insert(testLanguage);
    const res = await request(app).delete(`/languages/${language.id}`);
    console.log(res.body);
  
    console.log(expect(await Language.getById(language.id)).toBeNull());
  
  });
});
  
