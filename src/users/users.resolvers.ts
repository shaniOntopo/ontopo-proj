import {Resolver, Mutation, Args, Subscription} from '@nestjs/graphql'
import {UsersService} from './users.service'
import {User, NewUser} from 'src/graphql.schema'
// import {CreateUserDto} from './dto/create-user.dto'
import {PubSub} from 'graphql-subscriptions'

const pubSub = new PubSub()

@Resolver('User')
export class UsersResolvers {
  constructor(private readonly userService: UsersService) {}

  @Mutation('createUser') //use authCredentialsDto
  async create(@Args('input') user: NewUser): Promise<User> {
    // hash password if needed
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await this.userService.create(user)
    // pubSub.publish('userCreated', {userCreated: createdUser})
    return createdUser
  }

  // @Subscription('userCreated')
  // userCreated() {
  //   return pubSub.asyncIterator('userCreated')
  // }
}
