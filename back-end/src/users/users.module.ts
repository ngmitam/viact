import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersProviders } from './users.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...UsersProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
