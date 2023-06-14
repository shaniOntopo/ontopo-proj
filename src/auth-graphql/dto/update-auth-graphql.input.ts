import { CreateAuthGraphqlInput } from './create-auth-graphql.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthGraphqlInput extends PartialType(CreateAuthGraphqlInput) {
  @Field(() => Int)
  id: number;
}
