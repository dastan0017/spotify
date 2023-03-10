import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors()
    await app.listen(PORT, () => {
      console.log("App is listening port ", PORT)
    })
  } catch (e) {
    console.log(e);
  }
};

start()
