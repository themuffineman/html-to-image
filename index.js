import express from 'express'
import puppeteer from 'puppeteer'

const PORT = 8080

const app = express()

app.listen(PORT, ()=> {console.log(`Server listening on port ${PORT}`)})

app.post('/screenshot', (req , res)=>{
    const {name, service, location} = req.body
    console.log(`Name: ${name}, Service: ${service}, Location: ${location}`)
})