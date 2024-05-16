import express from 'express'
import puppeteer, { Page } from 'puppeteer'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const PORT = 8080

const app = express()
app.listen(PORT, ()=> {console.log(`Server listening on port ${PORT}`)})

app.use(cors({
  origin: '*'
}))

app.get('/screenshot', async (req , res)=>{
    const {name} = req.query
    let page
    let browser
    console.log(`Name: ${name}`)
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hello World</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
    </head>
    <style>
        *{
            box-sizing: border-box;
            color: white;
            font-family: "Inter", sans-serif;
            padding:0;
            margin:0;
        }
        body{
            margin: 0;
            padding: 0;
            background-image: url('https://cdn.builder.io/api/v1/image/assets/TEMP/7d7f4c2c557b6c34a84a34bd839847f95120f9763904a4ef6ae674a64edb2cb7?placeholderIfAbsent=true');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            width: 100vw;
            height: 100vh;
            position: relative;
            display:flex;
            justify-content: center;
            align-items:center;
        }
        .main{
            width: 100%;
            height:100%;
            background-color: rgba(0, 0, 0, 0.5);
            display:flex;
            flex-direction: column;
            justify-content:space-between;
            align-items: center;
            padding: 3rem;
        }
        .navbar{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%
        }
        .left-nav{
            display: flex;
            gap: 1rem;
        }
        .left-nav div{
            border: 1px solid white;
            border-radius: 70px;
            padding:10px;
            color: rgb(255, 255, 255);
            text-align: center;
            width: 6rem;
            font-size: small;
        }
        .menu-bar{
            display:flex;
            flex-direction: column;
            align-items:center;
            justify-content: space-between;
            width:3.5rem;
            height:1.5rem;
        }
        .menu-line{
            width: 100%;
            background-color: white;
            height: 2px;
        }
        .menu-line-mid{
            width: 50%;
            background-color: white;
            height: 2px;
        }
        .mid-section{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width:100%
        }
        .mid-text{
            text-align: right;
            font-size: medium;
            font-weight: 100;
            width:30%
        }
        .hero-text{
            display: flex;
            flex-direction: column;
            gap:0;
        }
        h1{
            font-size:4.5rem;
            font-family: Playfair Display, sans-serif;
            font-weight:300;
            letter-spacing: -1px;
        }
        h2{
            font-size:xx-large;
            font-family: Inter, sans-serif;
            font-weight:100;
        }
        .hero-section{
            display: flex;
            flex-direction: column;
            gap: 30px;
            align-items: flex-start;
            width:100%;
        }
        .hero-cta{
            display: flex;
            flex-direction: column;
            gap:0;
        }
    
        .happy-clients {
        align-self: start;
        display: flex;
        gap: 5px;
        font-size: 11px;
        color: #fff;
        font-weight: 800;
        line-height: 84%;
        margin: 9px 0 0 10px;
      }
    
      @media (max-width: 991px) {
        .happy-clients {
          padding-right: 20px;
        }
      }
    
      .happy-clients__icon {
        width: 96px;
        aspect-ratio: 2.56;
        object-fit: auto;
        object-position: center;
      }
    
      .happy-clients__content {
        display: flex;
        flex-direction: column;
        margin: auto 0;
      }
    
      .happy-clients__image {
        width: 53px;
        aspect-ratio: 4.76;
        object-fit: auto;
        object-position: center;
      }
    
      .happy-clients__text {
        font-family: Playfair Display, sans-serif;
        margin-top: 4px;
      }
      .project-start-container {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 9px 0 0 10px;
        padding-right: 24px;
        font-size: 15px;
        color: #000;
        font-weight: 400;
        text-align: center;
      }
    
      @media (max-width: 991px) {
        .project-start-container {
          flex-wrap: wrap;
          padding-right: 20px;
        }
      }
    
      .project-start-text {
        font-family: Playfair Display, sans-serif;
        border-radius: 40px;
        background-color: var(--White, #fff);
        width: fit-content;
        padding: 14px 47px;
        flex-grow: 1;
        justify-content: center;
        color: black;
      }
    
      @media (max-width: 991px) {
        .project-start-text {
          max-width: 100%;
          padding: 0 20px;
        }
      }
    
      .profile-picture {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        object-fit: cover;
        margin: auto 0;
      }
      .image-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        width: 100%;
      }
    
      .image-1 {
        width: 100px;
        align-self: flex-end;
        aspect-ratio: 10;
        object-fit: cover;
        object-position: center;
      }
    
      .image-2 {
        width: 140px;
        max-width: 100%;
        aspect-ratio: 2.78;
        object-fit: cover;
        object-position: center;
        justify-self: center;
      }
    
      @media (max-width: 991px) {
        .image-container {
          flex-wrap: wrap;
        }
    
        .image-1 {
          margin-top: 40px;
        }
      }
        
    </style>
    <body>
        <main class="main">
            <div class="navbar">
                <div class="left-nav">
                    <div>
                        Projects
                    </div>
                    <div>
                        Contact
                    </div>
                </div>
                <div class="menu-bar">
                    <div class="menu-line"></div>
                    <div class="menu-line-mid"></div>
                    <div class="menu-line"></div>
                </div>
            </div>
            <div class="mid-section">
                <div class="mid-text">
                    We redefine urban living in stylish townhouse where sleek design harmonizes with cosmopolitan flair. Immense yourself in modern elegance and vibrant city energy as every space reflects your distinct sense of style
                </div>
            </div>
            <div class="hero-section">
                <div class="hero-text">
                    <h1>${name}</h1>
                    <h2>Award Wining Home Design</h2>
                </div>
                <div class="hero-cta">
                    <div class="happy-clients">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b6146c7c690612e984e3f040847a04cc8275409c06e6ec72555b9ce4853565b?apiKey=dd62c47acf914b2b9f1d0b1b8ebbd998&" alt="Happy clients icon" class="happy-clients__icon" />
                        <div class="happy-clients__content">
                          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f73ec7e4906b8f0cc68b4916aeeb8c610f03d68c13e6ee8eed7fda301808c5c?apiKey=dd62c47acf914b2b9f1d0b1b8ebbd998&" alt="100+ happy clients" class="happy-clients__image" />
                          <div class="happy-clients__text">100+ Happy Clients</div>
                        </div>
                    </div>
                    <div class="project-start-container">
                        <div class="project-start-text">Let's start a project together</div>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/930c357e97533c7bcf3c74cdb3dcf55f564986c20b63ca42cfc91e83b8177de3?apiKey=dd62c47acf914b2b9f1d0b1b8ebbd998&" alt="Profile picture" class="profile-picture" />
                    </div>
                </div>
                <div class="image-container">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7da144bbeaf2256720d2bdecc561f97d64279bd7d6c8e1bf1032fc02e2e87fd8?apiKey=dd62c47acf914b2b9f1d0b1b8ebbd998&" alt="Image 1" class="image-1" />
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/41727c1296a548d9d506a49cc079d4f1e4d2ec8cbe2297085d9bdaaa48c3e2fd?apiKey=dd62c47acf914b2b9f1d0b1b8ebbd998&" alt="Image 2" class="image-2" />
                </div>
            </div>
        </main>
    </body>
    </html>`
    try{
      if(!browser){
        browser = await puppeteer.launch({
          timeout: 180000,
          executablePath: process.env.NODE_ENV === 'production' ?
            process.env.PUPPETERR_EXECUTABLE_PATH:
            puppeteer.executablePath(),
          args: [
            `--disable-setuid-sandbox`,
            `--disable-dev-shm-usage`
        ]})
        console.log('Puppeteer is up and running')
      }
      page = await browser.newPage()
      console.log('New page opened')
      await page.setViewport({ width: 1440, height: 800 });
      page.setDefaultNavigationTimeout(120000)
      page.setContent(html)
      console.log('HTML set!')
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
      const screenshot = await page.screenshot({ encoding: 'base64', fullpage: true })
      console.log('Screenshot taken')
      res.json({src: screenshot}).status(200)
        
    } catch(error) {
      console.error(error)
      res.send({error}).status(500)
    }finally{
      await page.close()
    }
})