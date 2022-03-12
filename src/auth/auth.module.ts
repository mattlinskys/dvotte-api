import { Module } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { AuthController } from 'auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
