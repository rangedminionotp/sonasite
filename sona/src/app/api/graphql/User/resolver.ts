import { Query, Resolver, Mutation, Arg, Authorized } from "type-graphql"
import { UserService } from "./service"
import { UserData, UserInfo } from "./schema"

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
}