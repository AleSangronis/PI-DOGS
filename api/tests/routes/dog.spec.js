/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/bd/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  weight: {
    "imperial": "6 - 13",
    "metric": "3 - 6"
  },
  height: {
    "imperial": "9 - 11.5",
    "metric": "23 - 29"
  }
};
const dog2 = {
  name: 'Pug',
  weight: {
    "imperial": "6 - 13",
    "metric": "3 - 6"
  }
};


describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
    it('should get 200 when searching a name created', () =>
      agent.get('/dogs').send("Pug").expect(200)
    );
  });
});
  describe('POST /dogs', () => {
    it('should get 404', async () =>{
     agent.post("/dogs").send(dog2).expect(404);
    });
    it('should get error', async () =>{
      agent.post("/dogs").send(dog2).expect("Faltan datos");
     });
  }); 

  describe('GET /dogs', () => {
    it('should get 202', async () =>{
     agent.get("/dogs/3").expect(202);
    });
    it('should get details id', async () =>{
      agent.get("/dogs/3").expect({
        weight: {
          "imperial": "44 - 66",
          "metric": "20 - 30"
        },
        height: {
          "imperial": "30",
          "metric": "76"
        },
        id: 3,
       name: "African Hunting Dog",
      bred_for: "A wild pack animal",
      life_span: "11 years",
        temperament: "Wild, Hardworking, Dutiful",
        origin: "",
      reference_image_id: "rkiByec47",
        image: {
          "id": "rkiByec47",
          "width": 500,
          "height": 335,
          "url": "https://cdn2.thedogapi.com/images/rkiByec47.jpg"
        }
      });
     });
  }); 



 