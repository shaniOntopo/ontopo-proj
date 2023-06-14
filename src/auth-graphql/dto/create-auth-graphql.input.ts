import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthGraphqlInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
