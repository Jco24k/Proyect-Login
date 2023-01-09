import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { RolesModule } from '../src/roles/roles.module';
import passport from 'passport';
import { RolesService } from '../src/roles/roles.service';

describe('RolesController (e2e)', () => {
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
  
  it('should findAll Roles', async () => {
    return await request(app.getHttpServer())
      .get('/roles')
      .auth(token, { type: "bearer" })
      .expect(200)
  });

  it('should create Roles return 200', async () => {
    var generateValue = Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000);
    return await request(app.getHttpServer())
      .post('/roles')
      .auth(token, { type: "bearer" })
      .send({
        name: 'new_roles_prueba' + generateValue,
        status: true
      })
      .expect(201)
  });

  it('should create Roles return 400 BadRequestException', async () => {
    //CREAMOS UN USUARIO EXISTENTE PARA VERIFICAR QUE LA VALIDACION FUNCIONA (name is unique)
    return await request(app.getHttpServer())
      .post('/roles')
      .auth(token, { type: "bearer" })//ENVIAMOS EL TOKEN
      .send({
        name: 'admin',
        status: true
      })
      .expect(400)
  });

  it('should findOne Roles return 200', async () => {
    const search = 'admin'; //PUEDE BUSCAR POR NOMBRE O ID
    return await request(app.getHttpServer())
      .get(`/roles/${search}`)
      .auth(token, { type: "bearer" })//ENVIAMOS EL TOKEN
      .expect(200)
  });

  it('should update Roles return 200', async () => {
    const id = '6385ac659cc7ea9e4d7f8ca8'; //BUSCAR POR ID
    return await request(app.getHttpServer())
      .patch(`/roles/${id}`)
      .auth(token, { type: "bearer" })//ENVIAMOS EL TOKEN
      .send({
        name: 'admin'
      })
      .expect(200)
  });

  it('should update Roles return 400 BadRequestException', async () => {
    //CAMBIAMOS EL NOMBRE POR UN DATO EXISTENTE PARA VERIFICAR QUE LA VALIDACION FUNCIONA (name is unique)

    const id = '6385ac659cc7ea9e4d7f8ca8'; //BUSCAR POR ID
    return await request(app.getHttpServer())
      .patch(`/roles/${id}`)
      .auth(token, { type: "bearer" }) //ENVIAMOS EL TOKEN
      .send({
        name: 'user'
      })
      .expect(400)
  });

  it('should delete Roles return 500 InternalServerErrorException', async () => {
    // MANDA ERROR PROQUE EL ROL ESTA EN USO

    const id = '6385ac659cc7ea9e4d7f8ca8'; //BUSCAR POR ID
    return await request(app.getHttpServer())
      .delete(`/roles/${id}`)
      .auth(token, { type: "bearer" }) //ENVIAMOS EL TOKEN
      .expect(500)
  });


  it('should delete Roles return 400 BadRequestException', async () => {
    // MANDA ERROR PROQUE EL ROL NO ENCONTRADO

    const id = '6385ac659cc7ea9e4d5f3ca1'; //BUSCAR POR ID
    return await request(app.getHttpServer())
      .delete(`/roles/${id}`)
      .auth(token, { type: "bearer" }) //ENVIAMOS EL TOKEN
      .expect(500)
  });


});
