# Ouija AI

Dual-agent conversation demo using **Google Gemini API**.

## Run locally

```bash
npm install
cp .env.example .env   # add your GEMINI_API_KEY
npm start
```

Open http://localhost:3001

## Deploy (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect this repo, set **Root Directory** to `ouija-ai`
3. Build: `npm install` · Start: `npm start`
4. Add env var: `GEMINI_API_KEY`

## Stack

Node.js · Express · Gemini API · Vanilla JS
