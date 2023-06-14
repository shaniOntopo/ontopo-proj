import {Module} from '@nestjs/common'
import {AuthGraphqlService} from './auth-graphql.service'
import {AuthGraphqlResolver} from './auth-graphql.resolver'
import {JwtModule, JwtService} from '@nestjs/jwt'
import {PrismaService} from 'src/prisma/prisma.service'
import {PrismaModule} from 'src/prisma/prisma.module'
import {AccessTokenStrategy} from './strategy/accessToken.strategy'
import {RefreshTokenStrategy} from './strategy/refreshToken.strategy'

@Module({
  providers: [
    AuthGraphqlResolver,
    AuthGraphqlService,
    JwtService,
    PrismaService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  imports: [PrismaModule, JwtModule.register({})],
})
export class AuthGraphqlModule {}
