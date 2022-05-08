import { User } from '~/entities/user';
import { RequiredPicks } from '~/types/addons';

const user: RequiredPicks<User> = {
  id: 1,
  name: 'test',
  uid: 'test_id',
  email: 'test@example.com',
  password: 'drowssap',
};

const users = [user];

export const mockUser = {
  user,
  users,
};
