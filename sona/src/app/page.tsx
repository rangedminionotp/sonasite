
import React from "react";
import AllComponents from "./AllComponents";
import { SonaService } from "./api/graphql/fetchdata/service";
const sonaService = new SonaService();

export default async function App() {
  const data = await sonaService.FetchVersion();

  return (
    <>
      <AllComponents data={data} />
    </>
  );
}
