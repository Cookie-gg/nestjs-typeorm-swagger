import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/app.module';
import { mocks } from '~/mocks';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => app.close());

  it('/user/create (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/user/create')
      .send({ ...mocks.user.user });
    expect(res.body).toStrictEqual(mocks.user.user);
  });
});
