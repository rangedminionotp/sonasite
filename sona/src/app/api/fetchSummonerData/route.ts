import { NextResponse} from "next/server"
// To handle a GET request to /api
export async function GET(request) {
  // Do whatever you want
  let res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json', {
    next: { revalidate: 86400}, 
  })
  const data = await res.json()
  const version = data[0]

  const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`
  res = await fetch(url, {
    next: { revalidate: 86400}, 
  })
  const endData = await res.json()

  return Response.json(endData)
}