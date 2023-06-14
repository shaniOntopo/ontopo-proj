import {createParamDecorator, ExecutionContext} from '@nestjs/common'
import {JwtPayloadWithRefreshToken} from '../types'
import {GqlExecutionContext} from '@nestjs/graphql'

export const CurrentUser = createParamDecorator(
  (
    data: keyof JwtPayloadWithRefreshToken | undefined,
    context: ExecutionContext
  ) => {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req
    if (data) return req.user[data]

    return req.user
  }
)
