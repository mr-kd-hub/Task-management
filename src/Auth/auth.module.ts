import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "./auth.service";
import { Auth, authSchema } from "./auth.model";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from "./auth.stratagy";
import { JwtAuthGuard } from "./Guards/auth.guard";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Auth.name, schema: authSchema }]),
        PassportModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('hddndhj_sbfsfsf_fsbfsfsf_sffsf'),
            signOptions: { expiresIn: '1h' },
          }),
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy, JwtAuthGuard],
      exports: [AuthService, JwtAuthGuard]
})
export class AuthModule {}
