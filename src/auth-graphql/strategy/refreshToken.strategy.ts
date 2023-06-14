import {PassportStrategy} from '@nestjs/passport'
import {ExtractJwt, Strategy} from 'passport-jwt'
import {Request} from 'express'
import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {JwtPayload, JwtPayloadWithRefreshToken} from '../types'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh' // need to provied the same string to our coressponding guard
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //extract the token
      secretOrKey: config.get<string>('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true, // will have access to the req obj in the validate func
    })
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRefreshToken {
    const refreshToken = req?.get('Authorization')?.replace('Bearer', '').trim() // extract the refreshToken
    console.log('refreshToken', refreshToken)
    return {...payload, refreshToken} // the payload will have the user info we saved , we need the refreshToken to get a new access token and refresh token
  }
}
