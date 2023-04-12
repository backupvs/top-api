import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { AppModule } from "../src/app.module";
import { AuthDto } from "../src/auth/dto/auth.dto";
import { disconnect } from "mongoose";
import { BAD_CREDENTIALS_ERROR } from "../src/auth/auth.constants";

const successAuthDto: AuthDto = {
  login: 'b@b.com',
  password: "1"
};

const failPasswordAuthDto: AuthDto = {
  login: 'b@b.com',
  password: "2"
};

const failLoginAuthDto: AuthDto = {
  login: 'c@c.com',
  password: "2"
};

const expectedFailResponse = {
  statusCode: 401,
  message: BAD_CREDENTIALS_ERROR,
  error: 'Unauthorized'
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(successAuthDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
      })
  });

  it('/auth/login (POST) - fail password', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(failPasswordAuthDto)
      .expect(401, expectedFailResponse)
  });

  it('/auth/login (POST) - fail login', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(failLoginAuthDto)
      .expect(401, expectedFailResponse)
  });

  afterAll(() => {
    disconnect();
  });
})