import {Field, ObjectType} from '@nestjs/graphql'

//ObjectType and Field will tell graphql to create this in the schema
@ObjectType() // can create auth crfedantials
export class RefreshInputDto {
  // not good only for testing
  //can do validation etc
  @Field()
  userId: string

  @Field()
  refreshToken: string
}
