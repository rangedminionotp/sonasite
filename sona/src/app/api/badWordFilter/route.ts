import { NextResponse } from "next/server"
import type { NextApiRequest, NextApiResponse } from 'next'

import LeoProfanity from "leo-profanity";

export async function POST(request, type) { 
  try {
    // Parse the JSON body
    
    const data = await request.json(); 
    // console.log('data', data)
    // Use LeoProfanity to clean the data (assuming it's a string or array of strings)
    // Here we assume data is an array of strings
    let cleanedData;
    if (type === 'abilityTips') {
      cleanedData = data.map( item => ({...item, description: LeoProfanity.clean(item.description)})); 
    }
    else if (type === 'skinReviews') {
 const cleanedData = data.map(item => ({
    ...item,
    data: {
      ...item.data,
      date: item.data.date.toISOString(),  // Convert date to ISO string
      description: LeoProfanity.clean(item.data.description)
    }
 }));
    } else if (type === 'skinLores') {
                  cleanedData = data.map( item => ({...item, description: LeoProfanity.clean(item.lore)})); 

    }
 
    // Return the cleaned data as a JSON response
    return NextResponse.json(cleanedData);
  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}