import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs'
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

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

