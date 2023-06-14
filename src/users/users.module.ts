import {Module} from '@nestjs/common'
import {UsersService} from './users.service'
import {UsersResolvers} from './users.resolvers'
import {PrismaModule} from 'src/prisma/prisma.module'

@Module({
  providers: [UsersResolvers, UsersService],
  exports: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
