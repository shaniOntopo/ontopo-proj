import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common'
import {UpdateAuthGraphqlInput} from './dto/update-auth-graphql.input'
import * as argon from 'argon2'
import {PrismaService} from 'src/prisma/prisma.service'
import {JwtService} from '@nestjs/jwt'
import {ConfigService} from '@nestjs/config'
import {SignInUser, SignUpUser} from 'src/graphql.schema'

@Injectable()
export class AuthGraphqlService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}
  //{username, password, mail, name, phone}: SignUpInputDto
  async signup({username, password, mail, name, phone}: SignUpUser) {
    //check if we already has a user with this mail
    const foundUser = await this.prisma.user.findUnique({
      where: {mail},
    })
    if (foundUser) {
      throw new ForbiddenException('mail already exist')
    }

    const hashedPassword = await argon.hash(password) // use argon to hash the password

    let user
    try {
      user = await this.prisma.user.create({
        // maybe use the userService to create
        // will create the user in the db
        data: {
          username,
          hashedPassword,
          name,
          mail,
          phone,
        },
      })
    } catch (error) {
      throw new ForbiddenException('Failed to create a user')
    }

    const {accessToken, refreshToken} = await this.createTokens(
      //here we create the accessToken and refresh token from the user object
      //this will encode the info in the jwt token
      user.id,
      user.mail
    )
    try {
      await this.updateRefreshToken(user.id, refreshToken) //put the refresh token in the user
    } catch (err) {
      throw new NotFoundException('User not found')
    }
    return {accessToken, refreshToken, user}
  }

  async signin({password, mail}: SignInUser) {
    console.log('password', password)
    const user = await this.prisma.user.findUnique({
      where: {mail},
    })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    //compare the passwords
    const isPasswordMatch = await argon.verify(user.hashedPassword, password)
    if (!isPasswordMatch) {
      throw new ForbiddenException('Invalid password')
    } // use the refresh token if is valid use it , if is not create new one , dont allow creating the same email , error handle

    const {accessToken, refreshToken} = await this.createTokens(
      user.id,
      user.mail
    ) // get new access token , and the refresh token the user has
    await this.updateRefreshToken(user.id, refreshToken) //todo: handle errors here

    // if (
    //   !user.hashedRefreshToken ||
    //   this.isRefreshTokenExpired(refreshToken) //user.hashedRefreshToken
    // ) {
    //   // only if the refresh token is expired create a new one and save on the user
    //   console.log('exp refresh')
    //   await this.updateRefreshToken(user.id, refreshToken) //todo: handle errors here
    // }

    return {accessToken, refreshToken, user}
  }

  findOne(id: number) {
    return `This action returns a #${id} authGraphql`
  }

  update(id: number, updateAuthGraphqlInput: UpdateAuthGraphqlInput) {
    return `This action updates a #${id} authGraphql`
  }

  remove(id: number) {
    return `This action removes a #${id} authGraphql`
  }

  //create new access token and get the refreshToken
  async createTokens(userId: string, mail: string) {
    const accessToken = this.jwtService.sign(
      //encode with the secret that only the server knows and good for security
      {
        userId,
        mail,
      },
      {
        expiresIn: '1h',
        secret: this.configService.get('ACCESS_TOKEN_SECRET'), // use the env var for the secret
      }
    )

    const refreshToken = this.jwtService.sign(
      {
        userId,
        mail,
        accessToken,
      },
      {
        expiresIn: '2s', // change the expriesIn for testing
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      }
    )
    return {accessToken, refreshToken}
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    //TODO:  hash the refresh token ->  when check open the hash and then decode , check if expired and create it if needed etc
    const hashedRefreshToken = await argon.hash(refreshToken)
    await this.prisma.user.update({
      where: {id: userId},
      data: {hashedRefreshToken}, //TODO: need to maybe save the refreshTOkne without the hashing on the user
    })
  }

  //move this function to other place
  isRefreshTokenExpired(hashedRefreshToken) {
    //need to maybe save the refreshTOkne without the hashing on the user ,
    const refreshTokenData = this.jwtService.decode(hashedRefreshToken) as {
      exp: number
    }
    const expirationTimestamp = refreshTokenData.exp
    const currTimeStamp = Math.floor(Date.now() / 1000)
    console.log('expirationTimestamp', expirationTimestamp)
    console.log('currTimeStamp', currTimeStamp)

    return expirationTimestamp <= currTimeStamp
  }

  async logout(userId: string) {
    await this.prisma.user.updateMany({
      //not quite sure why updateMany here
      where: {id: userId, hashedRefreshToken: {not: null}}, //update refreshedTOkenHash to null , so we could now is logout
      data: {hashedRefreshToken: null},
    })
    return {loggedOut: true}
  }

  //Todo: implement refresh token
  //Todo test this func -> will get new tokens if the accessToken expired
  async getNewTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {id: userId},
    })
    console.log('user -> getNewTokens refresh', user)
    if (!user || !user.hashedRefreshToken)
      throw new ForbiddenException('Access Denied')
    //check if the refreshToken on the req is matching to the hashedRefreshToken on the user
    const refreshTokenMatches = await argon.verify(
      user.hashedRefreshToken,
      refreshToken
    )
    console.log('refreshTokenMatches', refreshTokenMatches)
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied')
    const tokens = await this.createTokens(user.id, user.mail)
    await this.updateRefreshToken(user.id, tokens.refreshToken)
    return tokens
  }
}
