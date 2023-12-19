import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST ?? 'localhost',
        port: 3306,
        username: 'admin',
        password: 'admin_pass',
        database: 'viact',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: isTestEnv(),
      });

      return dataSource.initialize();
    },
  },
];
function isTestEnv(): boolean | undefined {
  if (process.env.ENV !== 'prod') return true;
}
