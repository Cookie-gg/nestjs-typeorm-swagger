import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Open-api tutorial')
  .setDescription('a tutorial of open-api')
  .setVersion('0.0.1')
  .build();
