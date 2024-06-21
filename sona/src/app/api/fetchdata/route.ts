import { NextResponse} from "next/server"
// To handle a GET request to /api
export async function GET(request) {
  // Do whatever you want
  const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json', {
    next: { revalidate: 100000}, 
  })
  const data = await res.json()
  const champURL = `https://ddragon.leagueoflegends.com/cdn/${data[0]}/data/en_US/champion/Sona.json`
  const champRES = await fetch(champURL)
  const endData = await champRES.json()

  const irl = 'https://leagueoflegends.fandom.com/wiki/Sona/LoL'
  const something = await fetch(irl) 
  return Response.json(endData)
}