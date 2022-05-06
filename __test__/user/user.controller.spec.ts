import { Test, TestingModule } from '@nestjs/testing';
import { mocks } from '~/mocks';
import { UserController } from '~/user/user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const user = controller.createUser(mocks.user.user);
    expect(user).toStrictEqual(mocks.user.user);
  });
});
