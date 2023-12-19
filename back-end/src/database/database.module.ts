import { Module } from '@nestjs/common';
import { databaseProviders } from './database.service';

@Module({
  imports: [],
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {
  static forRoot() {
    return {
      module: DatabaseModule,
      providers: [...databaseProviders],
      exports: [...databaseProviders],
    };
  }
}
