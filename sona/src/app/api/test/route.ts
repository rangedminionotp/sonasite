import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("I get hit.", "YESSSSSSSSSSSSSS");

  return NextResponse.json({
    message: "OK!",
  });
}
