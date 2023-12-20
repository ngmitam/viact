interface MockUsersService {
  hideCredentials: (user: any) => any;
  findOneByEmail: (email: string) => Promise<any>;
  verifyPassword: (password: string, hash: string) => Promise<boolean>;
  create: (email: string, password: string) => Promise<any>;
}

const mockUserDatabase = [
  {
    id: '1',
    email: 'existingUser',
    password: 'password',
  },
];

const mockUsersService: MockUsersService = {
  hideCredentials: jest.fn().mockImplementation((user: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }),
  findOneByEmail: jest.fn().mockImplementation((email: string) => {
    const user = mockUserDatabase.find((user) => user.email === email);
    return Promise.resolve(user ?? null);
  }),
  verifyPassword: jest
    .fn()
    .mockImplementation((password: string, hash: string) => {
      return Promise.resolve(password === hash);
    }),

  create: jest.fn().mockImplementation((email: string, password: string) => {
    if (!email || !password) {
      return Promise.resolve({
        result: false,
        message: 'Email and password are required',
      });
    }

    return mockUsersService
      .findOneByEmail(email)
      .then((user: any) => {
        if (user) {
          return {
            result: false,
            message: 'User already exists',
          };
        }

        mockUserDatabase.push({
          id: `${mockUserDatabase.length + 1}`,
          email,
          password,
        });

        return {
          result: true,
        };
      })
      .catch(() => {
        return {
          result: false,
          message: 'Something went wrong',
        };
      });
  }),
};

export default mockUsersService;
