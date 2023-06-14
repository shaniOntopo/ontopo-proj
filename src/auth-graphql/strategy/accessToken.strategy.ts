import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {PassportStrategy} from '@nestjs/passport'
import {ExtractJwt, Strategy} from 'passport-jwt'
import {JwtPayload} from '../types'

// type JwtPayload = {
//   mail: string
//   userId: string
// }

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(public config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('ACCESS_TOKEN_SECRET'), //process.env.ACCESS_TOKEN_SECRET,
      passReqToCallback: true, // access to the req obj
    })
  }

  validate(payload: JwtPayload) {
    console.log('payload', payload)
    return payload
  }
}
