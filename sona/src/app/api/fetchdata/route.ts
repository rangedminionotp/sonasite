import { NextResponse} from "next/server"
// To handle a GET request to /api
export async function GET(request) {
  // Do whatever you want
  const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json', {
    next: { revalidate: 86400}, 
  })
  const data = await res.json()
  const version = data[0]
  const champURL = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/Sona.json`
  const champRES = await fetch(champURL, {
    next: { revalidate: 86400},
  })
  const endData = await champRES.json()

  // const irl = 'https://leagueoflegends.fandom.com/wiki/Sona/LoL'
  // const something = await fetch(irl) 
  return Response.json(endData)
}