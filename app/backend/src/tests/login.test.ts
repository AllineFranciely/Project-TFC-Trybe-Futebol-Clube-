import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { describe } from 'mocha';
import { app } from '../app';
import User from '../database/models/Users';

chai.use(chaiHttp);

const { expect } = chai;

const token = {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoxLCJpYXQiOjE2NjA4NDk2NzcsImV4cCI6MTY2MTcxMzY3N30.VEJ-IHfYmmHHBPxj_Tyb3X6LP9oI5czWVO-CaxvEO3c",
}

describe('Testando a rota /login', () => {
  describe('Fazendo novo login', () => {
    let obj = {
      email: 'admin@admin.com',
      password: 'secret_admin',
    };
    beforeEach(() => {
      obj = {
        email: 'admin@admin.com',
        password: 'secret_admin',
      }
      sinon.restore();
    })
    it('retorna erro 400 ao passar email em branco', async () => {
      obj.email = '';
      const response = await chai.request(app)
        .post('/login')
        .send(obj);
      expect(response).to.have.status(400);
    })
    it('retorna erro 400 ao passar senha em branco', async () => {
      obj.password = '';
      const response = await chai.request(app)
        .post('/login')
        .send(obj);
      expect(response).to.have.status(400);
    })
    it('retorna erro 400 ao passar email errado', async () => {
      obj.email = 'email@errado.com';
      const response = await chai.request(app)
        .post('/login')
        .send(obj);
      expect(response).to.have.status(400);
    })
    it('retorna erro 401 se passar email inválido', async () => {
      obj.email = 'email';
      const response = await chai.request(app)
        .post('/login')
        .send(obj);
      expect(response).to.have.status(401);
    })
    it('retorna erro 401 ao passar password inválido', async () => {
      obj.password = 'ab12';
      const response = await chai.request(app)
        .post('/login')
        .send(obj);
      expect(response).to.have.status(401);
    })
    it('retorna um token ao fazer login corretamente', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(obj);
      expect(response.body).to.have.property('token');
    })
    it('retorna erro 404 caso o token seja inválido', async () => {
      const response = await chai.request(app)
        .get('/login/validate');
      expect(response).to.have.status(404);
    })
  })
})