import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { authSchema } from './schema/auth.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>{
        return{
          secret:config.get<string>('JWT_SECRET'),
          signOptions:{
            expiresIn:config.get<string | number>('JWT_EXPIRES')
          }
        }
      }
    }),
    MongooseModule.forFeature([{name:'Auth',schema:authSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[PassportModule,JwtStrategy]
})
export class AuthModule {}
