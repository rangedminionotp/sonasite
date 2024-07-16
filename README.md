# sonasite
sona site -w- 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, ask repo owner for access to the `.env` file. 

Make sure you have Docker Desktop installed. 

```
cd sona
npm install 
npm run docker:build
``` 

Open [http://localhost:3000](http://localhost:3000) with your browser to see the localhost result.

You would need to change the ```POSTGRES_HOST=``` variable to ```POSTGRES_HOST=sonadb``` in .env to make containerization working. 

To containerize the backend, you would need to run ```docker compose up -d --build``` at the root directory, enjoy ^_^

## Tech Stack

### Frontend

- Next.js
- Tailwind CSS
- React (I only typed some of the components, most data schemas are typed in the backend since I used TS for backend, working on typing everything for frontend...)

### Backend

- Node.js
- TypeScript / TypeGraphQL 
- PostgreSQL
- Docker 
   