import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
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

  it('should findAll user', async () => {
    return await request(app.getHttpServer())
      .get('/user')
      .auth(token, { type: "bearer" })
      .expect(200)
  });

  it('should create user return 400 BadRequestException', async () => {
    //ERROR PORQUE USERNAME YA EXISTE(username is unique)
    return await request(app.getHttpServer())
      .post('/user')
      .auth(token, { type: "bearer" })
      .send({
        id_employee: "6385ac659cc7ea9e4d7f8caf",
        roles: [
          "6385ac659cc7ea9e4d7f8ca9",
          "6385ac659cc7ea9e4d7f8ca8",
          "6385ac659cc7ea9e4d7f8caa",
        ],
        username: "UsEr_OnE02",
        password: "Nuevo_pass1"
      })
      .expect(400)
  });


  it('should findOne user return 200', async () => {
    const search = 'UsEr_OnE01'; //PUEDE BUSCAR POR USERNAME O ID
    return await request(app.getHttpServer())
      .get(`/user/${search}`)
      .auth(token, { type: "bearer" })//ENVIAMOS EL TOKEN
      .expect(200)
  });


  it('should update user return 400 BadRequestException', async () => {
    //CAMBIAMOS EL USERNAME POR UN DATO EXISTENTE PARA VERIFICAR QUE LA VALIDACION FUNCIONA (USERNAME is unique)

    const id = '6385ac659cc7ea9e4d7f8cb6'; //BUSCAR POR ID
    return await request(app.getHttpServer())
      .patch(`/user/${id}`)
      .auth(token, { type: "bearer" }) //ENVIAMOS EL TOKEN
      .send({
        username: 'UsEr_OnE02'
      })
      .expect(400)
  });


  it('should delete user return 200', async () => {
    //EL ESTADO LO PASA A FALSE
    const id = '6385ac659cc7ea9e4d7f8cb7'; //BUSCAR POR ID
    return await request(app.getHttpServer())
      .delete(`/user/${id}`)
      .auth(token, { type: "bearer" }) //ENVIAMOS EL TOKEN
      .expect(200)
  });


});
