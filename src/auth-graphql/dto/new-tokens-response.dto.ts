import {Field, ObjectType} from '@nestjs/graphql'

@ObjectType() // if its a response we nned to provide objectType , if we recive input we can use the InputType decorator
export class NewTokensResponse {
  @Field() // graphql will be able to genrate the schema
  accessToken: string
  @Field()
  refreshToken: string
}
