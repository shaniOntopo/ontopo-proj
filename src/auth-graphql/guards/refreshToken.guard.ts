import {ExecutionContext, Injectable} from '@nestjs/common'
import {GqlExecutionContext} from '@nestjs/graphql'
import {AuthGuard} from '@nestjs/passport'

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  // this guard will work with the strategy with the same name ,
  //if the token is expired we can use the refreshtoken logic to create new access token and refresh token
  constructor() {
    super()
  }

  getRequest(context: ExecutionContext) {
    //when using graphql we need to create an graphql context , we cant use http
    const ctx = GqlExecutionContext.create(context)
    // const req = ctx.getContext().req
    // console.log('req.user', req.user)
    // console.log('ctx', ctx)
    // console.log('req', req)
    return ctx.getContext().req
  }
}
