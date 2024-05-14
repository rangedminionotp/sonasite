import { Resolver, Query, Args } from "type-graphql";
import { Credentials, User } from "./schema";
import { AuthService } from "./service";

@Resolver()
export class AuthResolver {
  @Query(() => User)
  async login(
    @Args() credentials: Credentials,
  ): Promise<User> {
    return new AuthService().login(credentials);
  }
}