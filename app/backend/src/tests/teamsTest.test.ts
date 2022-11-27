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

