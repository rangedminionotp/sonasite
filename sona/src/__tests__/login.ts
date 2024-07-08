import { Credentials } from "@/app/api/graphql/Auth/schema";
import TestAgent from "supertest/lib/agent";
export const molly = {
  email: "molly@books.com",
  password: "mollymember",
};

export const anna = {
  email: "anna@books.com",
  password: "annaadmin",
};

export const nobby = {
  email: "nobby@books.com",
  password: "nobbynobody",
};

async function login(
  request: TestAgent,
  member: Credentials
): Promise<string | undefined> {
  const res = await request.post("/api/graphql").send({
    query: `{login(email: "${member.email}" password: 
      "${member.password}") { accessToken }}`,
  });

  return res.body.data.login.accessToken;
}

export async function asMolly(request: TestAgent): Promise<string | undefined> {
  return await login(request, molly);
}

export async function asAnna(request: TestAgent): Promise<string | undefined> {
  return await login(request, anna);
}

export async function asNobby(request: TestAgent): Promise<string | undefined> {
  return await login(request, nobby);
}
