import {Field, ObjectType} from '@nestjs/graphql'

ObjectType() //code first approch we create the dtos and add the decorators , all the graphql stuff will be created for us
export class LogoutResponseDto {
  @Field()
  loggedOut: boolean
}
