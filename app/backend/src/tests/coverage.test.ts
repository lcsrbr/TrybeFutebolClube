import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs'
// @ts-ignore
import chaiHttp = require('chai-http');

import Users from '../database/models/Users'
import Matches from '../database/models/Matches'

import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const mockLoginBody = {
  email: 'string',
  password: 'string'
}

const returnMockLoginBody = {
  id: 1,
  username: 'string',
  role: 'string',
  email: 'string',
  password: 'string',
}

describe('teste login/user', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(returnMockLoginBody as Users); // colocar tipagem do mock
  });

  afterEach(sinon.restore);
  it('Login post', async () => {
    sinon.stub(bcrypt, "compareSync").returns(true);
    chaiHttpResponse = await chai.request(app).post('/login').send(mockLoginBody)
    expect(chaiHttpResponse.status).to.be.eq(200)
    expect(chaiHttpResponse.body.token).to.be.an('string');
  })
  it('Login post error 400', async () => {
    sinon.stub(bcrypt, "compareSync").returns(true);
    chaiHttpResponse = await chai.request(app).post('/login').send(mockLoginBody.email)
    expect(chaiHttpResponse.status).to.be.eq(400)
    expect(chaiHttpResponse.body.message).to.be.an('string');
  })
  it('Login post error 401', async () => {
    sinon.stub(bcrypt, "compareSync").returns(false);
    chaiHttpResponse = await chai.request(app).post('/login').send({email: mockLoginBody.email, password: 'adasdasf' })
    expect(chaiHttpResponse.status).to.be.eq(401)
    expect(chaiHttpResponse.body.message).to.be.an('string');
  })
  it('Login post error 401', async () => {
    sinon.stub(bcrypt, "compareSync").returns(false);
    chaiHttpResponse = await chai.request(app).post('/login').send({email: 'mockLoginBody.email', password: 'adasdasf' })
    expect(chaiHttpResponse.status).to.be.eq(401)
    expect(chaiHttpResponse.body.message).to.be.an('string');
  })
  it('Login get/validate', async () => {
    sinon.stub(bcrypt, "compareSync").returns(true);
    chaiHttpResponse = await chai.request(app).get('/login/validate').send(chaiHttpResponse.body.token)
    expect(chaiHttpResponse.status).to.be.eq(200)
    // expect(chaiHttpResponse.body.role).to.be.eq('string');
  })
})

const mockMatchesBody = {
  homeTeam: 1,
  awayTeam: 2,
  homeTeamGoals: 3,
  awayTeamGoals: 4
}

const mockMatchesBodyError422 = {
  homeTeam: 1,
  awayTeam: 1,
  homeTeamGoals: 3,
  awayTeamGoals: 4
}

const mockMatchesBodyError404 = {
  homeTeam: 999,
  awayTeam: 1,
  homeTeamGoals: 3,
  awayTeamGoals: 4
}

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJ1c2VybmFtZSI6IlVzZXIiLCJpYXQiOjE2NjEzNjQxOTR9.1ThbyIN41FrUaoS9SJ-NZXRnTDTxh7gGCT-Wga6TRgw'

describe('teste matches', () => {
  let chaiHttpResponse: Response;

  // beforeEach(async () => {
  //   sinon
  //     .stub(Matches, "findAll")
  //     .resolves(returnMockLoginBody as Matches); // colocar tipagem do mock
  // });

  afterEach(sinon.restore);
  it('Matches get', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches').send()
    expect(chaiHttpResponse.status).to.be.eq(200)
  })
  it('Matches get inProgress', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true').send()
    expect(chaiHttpResponse.status).to.be.eq(200)
  })
  it('Matches get id', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches/id').send()
    expect(chaiHttpResponse.status).to.be.eq(200)
  })
  it('Matches post create', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches').set({authorization: tokenMock}).send(mockMatchesBody)
    expect(chaiHttpResponse.status).to.be.eq(201)
  })
  it('Matches post create error 401', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches').set({}).send(mockMatchesBody)
    expect(chaiHttpResponse.status).to.be.eq(401)
  })
  it('Matches post create error 422', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches').set({authorization: tokenMock}).send(mockMatchesBodyError422)
    expect(chaiHttpResponse.status).to.be.eq(422)
  })
  it('Matches post create error 404', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches').set({authorization: tokenMock}).send(mockMatchesBodyError404)
    expect(chaiHttpResponse.status).to.be.eq(404)
  })
  it('Matches patch id', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/1').set({authorization: tokenMock}).send()
    expect(chaiHttpResponse.status).to.be.eq(200)
  })
  it('Matches patch id finish', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish').set({authorization: tokenMock}).send()
    expect(chaiHttpResponse.status).to.be.eq(200)
  })
})


describe('teste teams', () => {
  let chaiHttpResponse: Response;
  
  afterEach(sinon.restore);
  it('teams get', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams').send()
    expect(chaiHttpResponse.status).to.be.eq(200)
  })
  it('teams get id', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/id').send()
    expect(chaiHttpResponse.status).to.be.eq(200)
  })
})
  

describe('teste leaderboard', () => {
  let chaiHttpResponse: Response;
  afterEach(sinon.restore);


  it('leaderboard get', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard').send()
    expect(chaiHttpResponse.status).to.be.eq(200)
  })

  it('leaderboard get home', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home').send()
    expect(chaiHttpResponse.status).to.be.eq(200)
  })
  it('leaderboard get away', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away').send()
    expect(chaiHttpResponse.status).to.be.eq(200)
  })
  it('leaderboard get teste', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/teste').send()
    expect(chaiHttpResponse.status).to.be.eq(200)
  })
})
