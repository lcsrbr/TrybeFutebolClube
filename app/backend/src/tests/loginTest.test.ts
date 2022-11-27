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

