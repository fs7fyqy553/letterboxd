const request = require('supertest');
const Film = require('../models/film');
const app = require('./app');
const initializeMongoServer = require('./mongoConfigTesting');

beforeAll(initializeMongoServer);

describe('GET /films', () => {

  it('should return an array of all films', async () => {

    const testFilmObjArray = [
      {
        _id: '64384cdf791d61235a7a52ed',
        filmTitle: 'Film 1',
        releaseYearString: '2019',
        directorNameArray: ['Director 1'],
        averageRatingString: '4.6',
        filmPosterURL: 'filmposter1.com',
      },
      {
        _id: '64384cdf791d61235a7a52ee',
        filmTitle: 'Film 2',
        releaseYearString: '1986',
        directorNameArray: ['Director 2', 'Director 3'],
        averageRatingString: '4.6',
        filmPosterURL: 'filmposter1.com',
      },
    ];
    const testFilmDocArray = testFilmObjArray.map((testFilmObj) => new Film(testFilmObj));
    await Promise.all(testFilmDocArray.map((testFilmDoc) => testFilmDoc.save()));
    const res = await request(app).get('/films').set('Accept', 'application/json');

    expect(res.statusCode).toEqual(200);
    expect(res.header['content-type']).toEqual(expect.stringMatching(/json/));
    expect(res.body).toHaveProperty('films');
    expect(res.body.films).toHaveLength(testFilmObjArray.length);

  });

});

describe('GET /films?twoFilmsWithDifferentRatings=true', () => {

  it('should return 404 error', async () => {

    const res = await request(app)
      .get('/films?twoFilmsWithDifferentRatings=true')
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(404);

  });

  it('should return two films with different ratings', async () => {

    const testFilmObj = {
      _id: '64384cdf791d61235a7a52ef',
      filmTitle: 'Film 2',
      releaseYearString: '1986',
      directorNameArray: ['Director 2', 'Director 3'],
      averageRatingString: '2.1',
      filmPosterURL: 'filmposter1.com',
    };
    const testFilmDoc = new Film(testFilmObj);
    await testFilmDoc.save();
    const res = await request(app)
      .get('/films?twoFilmsWithDifferentRatings=true')
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(200);
    expect(res.header['content-type']).toEqual(expect.stringMatching(/json/));
    expect(res.body).toHaveProperty('films');
    expect(res.body.films).toHaveLength(2);

  });
});
