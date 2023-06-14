
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class SignUpUser {
    username: string;
    password: string;
    name: string;
    mail: string;
    phone: string;
}

export class SignInUser {
    mail: string;
    password: string;
}

export class GetNewTokensInput {
    userId?: Nullable<string>;
    refreshToken?: Nullable<string>;
}

export class NewPost {
    title: string;
    text: string;
}

export class UpdatePost {
    id: string;
    title?: Nullable<string>;
    text?: Nullable<string>;
    isPublished?: Nullable<boolean>;
}

export class NewUser {
    username: string;
    hashedPassword: string;
    hashedRefreshToken?: Nullable<string>;
    name: string;
    mail: string;
    phone: string;
}

export class UpdateUser {
    id: string;
    username?: Nullable<string>;
    name?: Nullable<string>;
    mail?: Nullable<string>;
    phone?: Nullable<string>;
}

export class User {
    id: string;
    username: string;
    hashedPassword: string;
    hashedRefreshToken?: Nullable<string>;
    name: string;
    mail: string;
    phone: string;
}

export class SignResponseDto {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export class LogoutResponseDto {
    loggedOut: boolean;
}

export class NewTokensResponse {
    accessToken: string;
    refreshToken: string;
}

export abstract class IMutation {
    abstract signUp(input: SignUpUser): SignResponseDto | Promise<SignResponseDto>;

    abstract signIn(input: SignInUser): SignResponseDto | Promise<SignResponseDto>;

    abstract logOut(id: string): LogoutResponseDto | Promise<LogoutResponseDto>;

    abstract getNewTokens(): Nullable<NewTokensResponse> | Promise<Nullable<NewTokensResponse>>;

    abstract createPost(input: NewPost): Post | Promise<Post>;

    abstract updatePost(input: UpdatePost): Nullable<Post> | Promise<Nullable<Post>>;

    abstract deletePost(id: string): Nullable<Post> | Promise<Nullable<Post>>;

    abstract createUser(input: NewUser): User | Promise<User>;

    abstract updateUser(input: UpdateUser): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class Post {
    id: string;
    title: string;
    text: string;
    isPublished: boolean;
}

export abstract class IQuery {
    abstract posts(): Post[] | Promise<Post[]>;

    abstract post(id: string): Nullable<Post> | Promise<Nullable<Post>>;

    abstract Users(): User[] | Promise<User[]>;

    abstract User(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class ISubscription {
    abstract postCreated(): Nullable<Post> | Promise<Nullable<Post>>;

    abstract UserCreated(): Nullable<User> | Promise<Nullable<User>>;
}

export type Request = any;
type Nullable<T> = T | null;
