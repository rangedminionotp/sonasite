import { NextResponse } from "next/server"
import type { NextApiRequest, NextApiResponse } from 'next'

import LeoProfanity from "leo-profanity";

export async function POST( request ) { 
  try {
    // Parse the JSON body
    
    const data = await request.json(); 
    const dataList = data.tipsList
    const inputType = data.inputType 
    // Use LeoProfanity to clean the data (assuming it's a string or array of strings)
    // Here we assume data is an array of strings
    let cleanedData;
    if (inputType === 'abilityTips') {
      cleanedData = dataList.map( item => ({...item, description: LeoProfanity.clean(item.description)})); 
    }
    else if (inputType === 'skinReviews') {
   cleanedData = dataList.map(item => ({
    ...item,
    data: {
          ...item.data, 
          description: LeoProfanity.clean(item.data.description)
        }
 }));
    } else if (inputType === 'skinLores') {
                  cleanedData = dataList.map( item => ({...item, lore: LeoProfanity.clean(item.lore)})); 

    }
  
    // Return the cleaned data as a JSON response
    return NextResponse.json(cleanedData);
  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}