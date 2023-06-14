import {Field, ObjectType} from '@nestjs/graphql'
import {User} from '@prisma/client'
// import {User} from '../../user/user.entity'

//ObjectType and Field will tell graphql to create this in the schema
@ObjectType() // can create auth crfedantials
export class SignResponseDto {
  @Field()
  accessToken: string

  @Field()
  refreshToken: string

  @Field()
  user: User
}
