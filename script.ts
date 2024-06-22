import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://leagueoflegends.fandom.com/wiki/Sona/LoL';

async function fetchData() {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error('Error fetching the URL:', error);
    throw error;
  }
}

async function scrapeData() {
    const html = await fetchData();
    const $ = cheerio.load(html);

    // Example of extracting data: get the title of the page
    const title = $('title').text();
    console.log('Page Title:', title);

    //   const loreDivs: string[] = [];
    //   $('div.skinviewer-info-lore').each((index, element) => {
    //     loreDivs.push($(element).text().trim());
    //   });

    //   console.log('Lore Divs:', loreDivs);

    //     const prices: string[] = [];
    //   $('div.skinviewer-price').each((index, element) => {
    //     prices.push($(element).text().trim());
    //   });
    //     console.log('prices:', prices);
    
    // const dates: string[] = []
    // $('div').each((i, elem) => {
    //   const style = $(elem).attr('style');
    //   if (style && style.includes('text-align:center;padding-right:2px;color:#c9aa71;flex:1 1 0px;font-size:smaller')) {
    //       let stuff = ($(elem).text().trim())
    //       let part1 = stuff.slice(3, 5)
    //       let part2 = stuff.slice(0, 2)
    //       let part3 = stuff.slice(6, 10)
    //       stuff = `${part1}/${part2}/${part3}`
    //     //   console.log(stuff)
    //       dates.push(stuff);
    //   }
    // }); 
    // console.log(dates)
    
//     const texts: string[] = []
//     const imageUrls: string[] = []

// $('div[style="padding-right:1em; text-align:center;"] img[alt="Artist"]').each((index, element) => {
//         const text = $(element).parent().text().trim();
//                 texts.push(text);
 
//         });
//     console.log(texts)

    const threeD: string[] = []

// $('div[style="padding-right:1em; text-align:center;"] span[class="plainlinks"]').each((index, element) => {
//         const text = $(element).parent().text().trim();
//                 threeD.push(text);
 
    //         });
    const href = $('a.external.text').attr('href'); 

    console.log(href)
}
scrapeData().catch(error => console.error('Error scraping data:', error));