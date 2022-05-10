import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { mocks } from '~/mocks';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '~/entities/user';
import { config } from '../ormconfig.test';
import { UserService } from '~/user/user.service';
import { TestResponse } from '~/types/api';
import { Auth } from '~/entities/auth';
import { AppModule } from '~/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let refreshToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({ ...config, entities: [User] }), AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const service = moduleFixture.get<UserService>(UserService);
    service.clear();
    await service.create({ ...mocks.user.user, password: 'drowssap' });
  });

  afterAll(() => app.close());

  it('/login (POST)', async () => {
    const res: TestResponse<Auth> = await request(app.getHttpServer())
      .post('/auth')
      .send({ uniqueInfo: mocks.user.user.uid, password: 'drowssap' });
    const { user, ...rest } = res.body;
    token = rest.token;
    refreshToken = rest.refreshToken;
    Object.values(rest).map((token) => {
      expect(token).not.toBeUndefined();
      expect(token).not.toBeNull();
    });
    expect(user).toStrictEqual(expect.objectContaining(mocks.user.user));
  });

  it('/auth/status (Get)', async () => {
    const res: TestResponse<Auth> = await request(app.getHttpServer())
      .get('/auth/status')
      .set('authorization', `bearer ${token}`);
    const { user, ...rest } = res.body;
    token = rest.token;
    refreshToken = rest.refreshToken;
    Object.values(rest).map((token) => {
      expect(token).not.toBeUndefined();
      expect(token).not.toBeNull();
    });
    expect(user).toStrictEqual(expect.objectContaining(mocks.user.user));
  });

  it('/auth/refresh (Get)', async () => {
    const res: TestResponse<Auth> = await request(app.getHttpServer())
      .get('/auth/refresh')
      .set('authorization', `bearer ${refreshToken}`);
    const { user, ...rest } = res.body;
    token = rest.token;
    refreshToken = rest.refreshToken;
    Object.values(rest).map((token) => {
      expect(token).not.toBeUndefined();
      expect(token).not.toBeNull();
    });
    expect(user).toStrictEqual(expect.objectContaining(mocks.user.user));
  });
});
