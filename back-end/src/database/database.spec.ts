import { databaseProviders } from './database.service';

describe('Database', () => {
  it('should be defined', () => {
    expect(databaseProviders).toBeDefined();
  });
});
