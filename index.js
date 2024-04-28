import express from 'express'
import puppeteer from 'puppeteer'

const PORT = 8080

const app = express()

app.listen(PORT, ()=> {console.log(`Server listening on port ${PORT}`)})

app.get('/screenshot', async (req , res)=>{
    const {name, service, location} = req.body
    console.log(`Name: ${name}, Service: ${service}, Location: ${location}`)
    const html = `helow`
    const browser = await puppeteer.launch();
    const page = browser.newPage()
    page.setDefaultNaviagtionTimout(100000)
    page.setContent(html)
    const screeenshot = page.screenshot({ encoding: 'base64' })

    res.json({src: screenshot})
    
})