import {Resolver, Mutation, Args, Int} from '@nestjs/graphql'
import {AuthGraphqlService} from './auth-graphql.service'
import {SignUpInputDto} from './dto/signup-input.dto'
import {SignResponseDto} from './dto/sign-response.dto'
import {SignInInputDto} from './dto/signin-input.dto'
import {
  ExecutionContext,
  HttpCode,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common'
import {LogoutResponseDto} from './dto/logout-response.dto'
import {Public} from './decorators/public.decorator'
import {NewTokensResponse} from './dto/new-tokens-response.dto'
import {CurrentUserId} from './decorators/currUserId.decorator'
import {CurrentUser} from './decorators/currUser.decorator'
import {RefreshTokenGuard} from './guards/refreshToken.guard'
import {RefreshInputDto} from './dto/refresh-input.dto'
import {CurrentUserData} from './decorators/currUserData.decorator'

@Resolver('Auth')
export class AuthGraphqlResolver {
  constructor(private readonly authGraphqlService: AuthGraphqlService) {}

  @Public()
  @Mutation('signUp') // what type we return
  // @HttpCode(HttpStatus.CREATED)
  async signup(
    @Args('input') //must use the word input  -> to get user input etc
    signUpInputDto: SignUpInputDto
  ): Promise<SignResponseDto> {
    try {
      return await this.authGraphqlService.signup(signUpInputDto)
    } catch (err) {
      // Custom error handling
      if (err instanceof HttpException) {
        throw err // Rethrow NestJS HttpExceptions
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      }
    }
  }

  @Public()
  @Mutation('signIn') // what type we return
  // @HttpCode(HttpStatus.OK)
  async signin(
    @Args('input') //must use the word input  -> to get user input etc
    signInInput: SignInInputDto
  ): Promise<SignResponseDto> {
    try {
      return await this.authGraphqlService.signin(signInInput)
    } catch (err) {
      if (err instanceof HttpException) {
        throw err
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      }
    }
  }

  // @UseGuards(AuthGuard('jwt')) //add guard for access token
  // @Public() // will allow  access tot the route
  @Mutation('logOut') //the name need to be the same at the schema.graphql
  // @HttpCode(HttpStatus.OK)
  removeAuthGraphql(
    @Args('id', {type: () => Int}) id: string
  ): Promise<LogoutResponseDto> {
    return this.authGraphqlService.logout(id)
  }

  @Public() // we need the public to access it when we dont have a valid token
  @Mutation('getNewTokens') //the name need to be the same at the schema.graphql
  // @UseGuards(RefreshTokenGuard)
  // @HttpCode(HttpStatus.OK) // TODO: maybe call it Refresh
  getNewTokens(
    // @Req() req: Request
    // @CurrentUserId() userId: string, // we use the decorator to get the userId , and refreshToken , we have access to the refresh token cause we use the strategy that will return it
    @CurrentUserData() payloadData: any
  ): Promise<NewTokensResponse> {
    const {userId, refreshToken} = payloadData
    console.log('payloadData', payloadData)
    // console.log('refreshToken', refreshToken)
    return this.authGraphqlService.getNewTokens(userId, refreshToken)
  }

  // @Query(() => [AuthGraphql], {name: 'authGraphql'})
  // findAll() {
  //   return this.authGraphqlService.findAll()
  // }

  // @Query(() => AuthGraphql, {name: 'authGraphql'})
  // findOne(@Args('id', {type: () => Int}) id: number) {
  //   return this.authGraphqlService.findOne(id)
  // }

  // @Mutation(() => AuthGraphql)
  // updateAuthGraphql(
  //   @Args('updateAuthGraphqlInput')
  //   updateAuthGraphqlInput: UpdateAuthGraphqlInput
  // ) {
  //   return this.authGraphqlService.update(
  //     updateAuthGraphqlInput.id,
  //     updateAuthGraphqlInput
  //   )
  // }

  // @Mutation(() => AuthGraphql)
  // removeAuthGraphql(@Args('id', {type: () => Int}) id: number) {
  //   return this.authGraphqlService.remove(id)
  // }
}
