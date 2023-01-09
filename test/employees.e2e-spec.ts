import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('EmployeeController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('token should be defined', async () => {

    //LOGIN PARA OBTENER EL TOKEN
    const user = await request(app.getHttpServer())
      .post('/auth').send({ username: 'UsEr_OnE01', password: '12345abcde' }).expect(200);
    token = user.body.token

  });

  it('should findAll Employees', async () => {
    return await request(app.getHttpServer())
      .get('/employees')
      .auth(token, { type: "bearer" })
      .expect(200)
  });

  it('should create Employees return 201', async () => {
    var generateValue = Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000);
    return await request(app.getHttpServer())
      .post('/employees')
      .auth(token, { type: "bearer" })
      .send({
        names: "Nuevo"+generateValue,
        phone: "9"+generateValue,
        dni: generateValue
      })
      .expect(201)
  });

  it('should create employees return 400 BadRequestException', async () => {
    //CREAMOS UN EMPLEADO EXISTENTE PARA VERIFICAR QUE LA VALIDACION FUNCIONA (phone and dni are unique)
    return await request(app.getHttpServer())
      .post('/employees')
      .auth(token, { type: "bearer" })//ENVIAMOS EL TOKEN
      .send({
        names: "Nuevo",
        phone: "999666888",
        dni: "12345612"
      })
      .expect(400)
  });

  it('should findOne employees return 200', async () => {
    const search = '12345612'; //PUEDE BUSCAR POR DNI O ID
    return await request(app.getHttpServer())
      .get(`/employees/${search}`)
      .auth(token, { type: "bearer" })//ENVIAMOS EL TOKEN
      .expect(200)
  });

  it('should update Employees return 200', async () => {
    const id = '6385ac659cc7ea9e4d7f8caf'; //BUSCAR POR ID
    return await request(app.getHttpServer())
      .patch(`/employees/${id}`)
      .auth(token, { type: "bearer" })//ENVIAMOS EL TOKEN
      .send({
        dni: "12345611",
        status: true
      })
      .expect(200)
  });

  it('should update Employees return 400 BadRequestException', async () => {
    //CAMBIAMOS EL DNI POR UN DATO EXISTENTE PARA VERIFICAR QUE LA VALIDACION FUNCIONA (dni is unique)

    const id = '6385ac659cc7ea9e4d7f8caf'; //BUSCAR POR ID
    return await request(app.getHttpServer())
      .patch(`/employees/${id}`)
      .auth(token, { type: "bearer" }) //ENVIAMOS EL TOKEN
      .send({
        dni: '12345678'
      })
      .expect(400)
  });


  it('should delete Employees return 200', async () => {
    //EL ESTADO LO PASA A FALSE
    const id = '6385ac659cc7ea9e4d7f8caf'; //BUSCAR POR ID
    return await request(app.getHttpServer())
      .delete(`/employees/${id}`)
      .auth(token, { type: "bearer" }) //ENVIAMOS EL TOKEN
      .expect(200)
  });


});
