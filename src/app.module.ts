import {Module} from '@nestjs/common'
import {GraphQLModule} from '@nestjs/graphql'
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo'
import {ApolloServerPluginLandingPageLocalDefault} from '@apollo/server/plugin/landingPage/default'

import {PostsModule} from './posts/posts.module'
// import {AuthModule} from './auth/auth.module'
import {UsersModule} from './users/users.module'
import {AuthGraphqlModule} from './auth-graphql/auth-graphql.module'
import {ConfigModule} from '@nestjs/config'
import {PrismaService} from './prisma/prisma.service'
import {APP_GUARD} from '@nestjs/core'
import {AccessTokenGuard} from './auth-graphql/guards/accessToken.guard'

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UsersModule,
    PostsModule,
    AuthGraphqlModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  providers: [PrismaService, {provide: APP_GUARD, useClass: AccessTokenGuard}], //for passport need to use guards with strategy
})
export class AppModule {}
