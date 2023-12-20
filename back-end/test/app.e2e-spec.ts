import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmTestingModule } from './utils/TypeORMTestingModule';
import { createConnection } from 'mysql2';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  jest.setTimeout(30000);
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule(), AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app?.close();
    const connection = createConnection({
      host: 'localhost',
      user: 'test_user',
      password: 'test_password',
      database: 'test_db',
    });
    try {
      await connection.promise().query('DROP TABLE `test_db`.`users_entity`');
    } catch (error) {
      // console.log('error =', error);
    }
    await connection.promise().end();
  });

  it('register user then login should return access_token', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        email: 'newUser',
        password: 'password',
      })
      .expect(200);
    const result = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: 'newUser',
        password: 'password',
      })
      .expect(200);
    expect(result.body).toHaveProperty('data');
    expect(result.body.data).toHaveProperty('access_token');
  });
});
