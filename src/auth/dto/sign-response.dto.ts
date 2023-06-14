import {Field, ObjectType} from '@nestjs/graphql'
import {User} from 'src/graphql.schema'

//ObjectType and Field will tell graphql to create this in the schema
@ObjectType() // can create auth crfedantials
export class SignResponseDto {
  // represent the response we get
  @Field()
  accessToken: string

  @Field()
  refreshToken: string

  @Field(() => User)
  user: User
}
