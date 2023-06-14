import {ExecutionContext, Injectable} from '@nestjs/common'
import {Reflector} from '@nestjs/core'
import {GqlExecutionContext} from '@nestjs/graphql'
import {AuthGuard} from '@nestjs/passport'
import {Observable} from 'rxjs'

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  // this guard will work with the strategy with the same name ,
  //if the token is expired we can use the refreshtoken logic to create new access token and refresh token
  constructor(private reflector: Reflector) {
    super()
  }

  getRequest(context: ExecutionContext) {
    //when using graphql we need to create an graphql context , we cant use http
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]) // we use the public decorator we created , to allow access if its public, if the query if mut has a decorator public
    if (isPublic) {
      return true
    }
    return super.canActivate(context) // use the jwt auth check , only enter if the access token valid and not exp
  }
}
