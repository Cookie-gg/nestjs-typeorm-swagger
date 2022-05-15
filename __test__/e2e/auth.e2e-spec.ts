import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { mocks } from '~/mocks';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../ormconfig.test';
import { TestResponse } from '~/types/api';
import { AppModule } from '~/app.module';
import { Auth } from '~/domain/models/auth';
import { UserService } from '~/services';
import { UserEntity } from '~/domain/entities/user';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let refreshToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({ ...config, entities: [UserEntity] }), AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
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
