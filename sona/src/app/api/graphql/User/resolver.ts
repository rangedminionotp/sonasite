import { Query, Resolver, Mutation, Arg, Authorized } from "type-graphql"
import { UserService } from "./service"
import { UserData, UserInfo, GmailUserInfo } from "./schema"

@Resolver()
export class UserResolver {
    @Query(() => [UserInfo])
    async getAllUser(): Promise<UserInfo[]> {
        return new UserService().getAllUsers()
    }

    @Mutation(() => UserInfo)
    async addUser( 
        @Arg("user") user: UserData
    ): Promise<UserInfo>{ 
        return new UserService().AddUser(user)
    }
    @Mutation(() => GmailUserInfo)
    async addGmailUser( 
        @Arg("user") user: UserData
    ): Promise<GmailUserInfo>{ 
        return new UserService().AddGmailUser(user)
    }

    @Query(() => GmailUserInfo)
    async getAGmailUser(
        @Arg("email") email: string
    ): Promise<GmailUserInfo | null> {
        return new UserService().getGmailUser(email)
    }
}