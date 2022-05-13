import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule, AuthModule } from '~/modules';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      expandVariables: true,
    }),
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
