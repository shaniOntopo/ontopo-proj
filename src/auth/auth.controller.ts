import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common'
import {AuthService} from './auth.service'
import {Public} from './decorators/public.decorator'
import {AuthCredentialsDto} from './dto/auth-credentials.dto'
import {NewUser} from 'src/graphql.schema'

//rest api way
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup') // test auth credentials
  signUp(@Body() authCredentialsDto: NewUser) {
    return this.authService.signUp(authCredentialsDto)
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
