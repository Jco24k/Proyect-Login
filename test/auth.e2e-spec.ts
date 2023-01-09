import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should signIn Auth return 200', async () => {

    return await request(app.getHttpServer())
      .post('/auth').send({ username: 'UsEr_OnE01', password: '12345abcde' }).expect(200);

  });

  it('should signIn Auth return 401 UnauthorizedException', async () => {
    //EXCEPTION POR CONTRASEÑA INCORRECTA
    return await request(app.getHttpServer())
      .post('/auth').send({ username: 'UsEr_OnE01', password: '1afasAasdfasfasf' }).expect(401);
  });

});
