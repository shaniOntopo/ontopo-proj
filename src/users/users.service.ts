import {Injectable} from '@nestjs/common'
import {User} from '@prisma/client'
import {NewUser} from 'src/graphql.schema'
import {PrismaService} from '../prisma/prisma.service'

// This should be a real class/interface representing a user entity
// export type User = any

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ]

  // async findOne(username: string): Promise<User | undefined> {
  //   //TODO: change user object -> username, password, name, mail,phone
  //   // return this.users.find((user) => user.username === username)
  // }

  async create(input: NewUser): Promise<User> {
    return this.prisma.user.create({
      data: input,
    })
  }
}
