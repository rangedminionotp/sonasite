import { NextRequest, NextResponse } from "next/server";

import LeoProfanity from "leo-profanity";

async function POST(request: NextRequest) {
  try {
    // Parse the JSON body
    const data = (await request.json()) as { data: { description: string } }[];

    // Use LeoProfanity to clean the data (assuming it's a string or array of strings)
    // Here we assume data is an array of strings
    const cleanedData = data.map((item) =>
      LeoProfanity.clean(item.data.description)
    );
    // Return the cleaned data as a JSON response
    return NextResponse.json(cleanedData);
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
