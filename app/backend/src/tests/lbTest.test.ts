import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

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
