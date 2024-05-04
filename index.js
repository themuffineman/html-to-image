import express from 'express'
import puppeteer from 'puppeteer'

const PORT = 8080

const app = express()

app.listen(PORT, ()=> {console.log(`Server listening on port ${PORT}`)})

app.get('/screenshot', async (req , res)=>{
    const {name} = req.query
    console.log(`Name: ${name}`)
    const html = `<main style='display: flex; padding: 2rem; flex-direction: column; gap: 1rem; font-family: Arial, Helvetica, sans-serif;'><header><h1 style='font-size: 1rem; color: black; font-weight: bold; margin: .4rem;'>Greetings ${name}! </h1><p style='font-size: 1rem; color: black; font-weight: light; margin: .4rem;'>I hope you're doing well! I'm Petrus, and I specialize in creating top-notch websites for architectural and interior design firms.</p><p style='font-size: 1rem; color: black; font-weight: light; margin: .4rem;'>After checking out your website, I believe there's huge potential to elevate its design to convey trust and showcase your expertise even more effectively. That's why I'm reaching out to redesign your homepage for free.</p><p style='font-size: 1rem; color: black; font-weight: light; margin: .4rem;'>This way I can demonstrate how your website could stand out among the best in the industry. If you like the redesign, we can discuss further collaboration. If not, no worries, there's absolutely no obligation or cost involved.</p><p style='font-size: 1rem; color: black; font-weight: light; margin: .4rem;'>If you're interested, simply let me know or book a call using the link <a href="https://cal.com/pendora/30" target="_blank" style="color: blue; text-decoration: underline;">here</a>. Looking forward to potentially working together!</p></header><section style="display: flex; flex-direction: column; gap: 0;"><p style='font-weight: normal; margin: 0; padding-left: .4rem;'>Best regards</p><p style='font-weight: bold; margin: 0; padding-left: .4rem;'>Petrus</p></section></main>`
    try {
        const browser = await puppeteer.launch();
        console.log('Puppeteer has launched')
        const page = await browser.newPage()
        console.log('New page opened')
        await page.setViewport({ width: 1024, height: 1000 });
        page.setDefaultNavigationTimeout(100000)
        page.setContent(html)
        console.log('HTML set!')
        await new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve()
            },10000)
        })
        const screenshot = await page.screenshot({ encoding: 'base64', fullpage: true })
        console.log('Screenshot taken')
    
        res.json({src: screenshot}).status(200)
        
    } catch (error) {
        console.error(error)
        res.send(`Error', ${error}`).status(500)
    }
    
})