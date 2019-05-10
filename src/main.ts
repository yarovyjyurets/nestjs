import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const port = 3000;
export const start = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    console.log(`>>Server listening on port ${port}`)
  });
}
start();
