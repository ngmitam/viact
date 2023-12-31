import { Inject, Module } from '@nestjs/common';
import { databaseProviders } from './database.service';

@Module({
  imports: [],
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
