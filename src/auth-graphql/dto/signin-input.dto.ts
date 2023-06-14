import {Field, ObjectType} from '@nestjs/graphql'
import {IsEmail} from 'class-validator'

//ObjectType and Field will tell graphql to create this in the schema
@ObjectType() // can create auth crfedantials
export class SignInInputDto {
  //can do validation etc
  @IsEmail()
  @Field()
  mail: string

  @Field()
  password: string
}
