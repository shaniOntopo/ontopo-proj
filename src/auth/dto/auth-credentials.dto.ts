import {Field} from '@nestjs/graphql'
import {IsEmail, IsNotEmpty, IsString, Length} from 'class-validator'

export class AuthCredentialsDto {
  @IsString()
  @Field()
  username: string

  @IsString()
  @Field()
  name: string

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, {message: 'Passowrd has to be at between 3 and 20 chars'})
  @Field()
  password: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Field()
  mail: string

  @IsNotEmpty()
  @IsString()
  // @IsPhone() Todo: implement a decorator for this
  @Field()
  phone: string
}
