import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WidgetsModule } from 'widgets/widgets.module';
import mongoConfig from 'config/mongo.config';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mongoConfig],
      validate,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        entities: ['./dist/widgets/entities'],
        type: 'mongo',
        dbName: configService.get('mongo.dbName'),
        clientUrl: configService.get('mongo.url'),
      }),
    }),
    WidgetsModule,
  ],
})
export class AppModule {}
