export type JwtPayload = {
  mail: string
  userId: string
}

export type JwtPayloadWithRefreshToken = JwtPayload & {refreshToken: string}
