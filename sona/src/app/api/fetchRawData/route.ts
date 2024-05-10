import { NextResponse} from "next/server"
// To handle a GET request to /api
export async function GET(request) {
  // Do whatever you want
  const res = await fetch('https://raw.communitydragon.org/latest/game/data/characters/sona/sona.bin.json', {
    next: { revalidate: 100000}, 
  })
  const data = await res.json() 
  return Response.json(data)
}