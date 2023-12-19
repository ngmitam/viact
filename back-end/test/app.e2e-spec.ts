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
    await app.close();
    const connection = createConnection({
      host: 'localhost',
      user: 'test_user',
      password: 'test_password',
      database: 'test_db',
    });
    try {
      await connection.promise().query('DROP TABLE `test_db`.`users`');
    } catch (error) {
      // console.log('error =', error);
    }
    await connection.promise().end();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('').expect(404);
  });
});
