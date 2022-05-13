import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { mocks } from '~/mocks';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../ormconfig.test';
import { TestResponse } from '~/types/api';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserModule } from '~/modules/user';
import { UserEntity } from '~/domain/entities/user';
import { User } from '~/domain/models/user';
import { UserService } from '~/services';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({ ...config, entities: [UserEntity] }), UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    moduleFixture.get<UserService>(UserService).clear();
  });

  afterAll(() => app.close());

  it('/user (POST)', async () => {
    const res: TestResponse<User> = await request(app.getHttpServer())
      .post('/user')
      .send({ ...mocks.user.user, password: 'drowssap' });
    expect(res.body).toStrictEqual(expect.objectContaining(mocks.user.user));
  });

  it('/user:id (Get)', async () => {
    const res: TestResponse<User> = await request(app.getHttpServer()).get(
      `/user/${mocks.user.user.uid}`,
    );
    expect(res.body).toStrictEqual(expect.objectContaining(mocks.user.user));
  });

  it('/user:id (Update)', async () => {
    const res: TestResponse<UpdateResult> = await request(app.getHttpServer())
      .put(`/user/${mocks.user.user.uid}`)
      .send({
        ...mocks.user.user,
        email: 'updated@exmaple.com',
      });
    expect(res.body.affected).toBe(1);
  });

  it('/user:id (Delete)', async () => {
    const res: TestResponse<DeleteResult> = await request(app.getHttpServer()).delete(
      `/user/${mocks.user.user.uid}`,
    );
    expect(res.body.affected).toBe(1);
  });
});
