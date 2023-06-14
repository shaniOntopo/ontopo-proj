import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AuthGraphql {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
