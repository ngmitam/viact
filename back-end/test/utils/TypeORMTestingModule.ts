import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeOrmTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.TEST_DATABASE_HOST ?? 'localhost',
    port: process.env.TEST_DATABASE_PORT
      ? parseInt(process.env.TEST_DATABASE_PORT, 10)
      : 3306,
    username: process.env.TEST_DATABASE_USER ?? 'test_user',
    password: process.env.TEST_DATABASE_PASS ?? 'test_password',
    database: process.env.TEST_DATABASE_NAME ?? 'test_db',
    entities: [__dirname, '../../**/*.entity{.ts,.js}'],
    synchronize: true,
    retryAttempts: 3,
  }),
];
