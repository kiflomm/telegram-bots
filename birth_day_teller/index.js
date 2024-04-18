const {Bot} = require("grammy")
const express = require('express')
const app = express()
require('dotenv').config()
botToken = process.env.BOT_TOKEN
PORT = process.env.PORT || 5000
const bot = new Bot(botToken) 
app.get('/',(req,res)=>{ 
    res.json({message: "the bot is live"})
})
app.listen(PORT,console.log(`server is listening to port ${PORT}`))

bot.command('start',async (ctx) =>{
    const {first_name} = ctx.message.from
    console.log(`A new user ${first_name} has subscribed for this bot`) 
    await ctx.reply("Please enter your birth date in the format YYYY-MM-DD")
})
bot.on('message',async (ctx) =>{
    const userId = ctx.from.id
    const {first_name} = ctx.message.from
    const birthDateInput = ctx.message.text
    const birthDate = new Date(birthDateInput)
    if(!isNaN(birthDate.getTime())){
        let days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
        let dayIndex = birthDate.getDay()
        console.log(`The user was born on ${days[dayIndex]}`)
        ctx.reply(`You were born on ${days[dayIndex]}`)
    }else{
        ctx.reply("Please enter the date format in the YYYY-MM--DD format")
    }
})  
bot.start()
module.exports = app