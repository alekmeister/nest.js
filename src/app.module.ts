import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TaskModule } from './task/task.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './config/typeorm.config.js';
import { MovieModule } from './movie/movie.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TaskModule,
    // есть еще обычный forRoot, но async лучше
    // 1) можно выполнять код типа getOrThrow
    // 2) можно асинхронно сходить куда-то и потом подключиться к бд
    TypeOrmModule.forRootAsync({
      useFactory: getTypeOrmConfig,
      inject: [ConfigService],
    }),
    MovieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
