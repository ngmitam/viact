import { UsersEntity } from './users.entity';

describe('UsersEntity', () => {
  it('should be defined with 0 field', () => {
    const usersEntity = new UsersEntity({});
    expect(usersEntity).toBeDefined();
    expect(usersEntity).toBeInstanceOf(UsersEntity);
    expect(usersEntity.id).not.toBeDefined();
    expect(usersEntity.createdAt).toBeDefined();
  });

  it('should be defined with 1 field (id)', () => {
    const usersEntity = new UsersEntity({ id: '1' });
    expect(usersEntity).toBeDefined();
    expect(usersEntity).toBeInstanceOf(UsersEntity);
    expect(usersEntity.id).toBe('1');
    expect(usersEntity.createdAt).toBeDefined();
  });

  it('should be defined with 2 fields (id, createdAt)', () => {
    const usersEntity = new UsersEntity({ id: '1', createdAt: new Date() });
    expect(usersEntity).toBeDefined();
    expect(usersEntity).toBeInstanceOf(UsersEntity);
    expect(usersEntity.id).toBe('1');
    expect(usersEntity.createdAt).toBeDefined();
  });

  it('should be defined with 2 fields (username, password)', () => {
    const usersEntity = new UsersEntity({ username: 'user1', password: 'abc' });
    expect(usersEntity).toBeDefined();
    expect(usersEntity).toBeInstanceOf(UsersEntity);
    expect(usersEntity.id).not.toBeDefined();
    expect(usersEntity.createdAt).toBeDefined();
    expect(usersEntity.username).toBe('user1');
    expect(usersEntity.password).toBe('abc');
  });
});
