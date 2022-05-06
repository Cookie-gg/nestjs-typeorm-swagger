import { User } from '~/user/user.model';

const user: User = {
  name: 'test',
  uid: 'test_id',
  password: 'drowssap',
};

const users: User[] = [user];

export const mockUser = {
  user,
  users,
};
