const {Bot} = require("grammy")
const express = require('express')
const app = express()
require('dotenv').config()
botToken = process.env.BOT_TOKEN || process.env.BOT_TOKEN_DEV
PORT = process.env.PORT || 5000
const bot = new Bot(botToken) 
app.get('/',(req,res)=>{ 
    res.json({message: "The bot is live"})
})
app.listen(PORT,console.log(`The bot is alive`))

bot.command('start',async (ctx) =>{
    const {first_name} = ctx.message.from 
    await ctx.reply("Please enter your birth date in the format YYYY-MM-DD")
})
bot.on('message:text',async (ctx) =>{
    const userId = ctx.from.id
    const {first_name} = ctx.message.from
    const birthDateInput = ctx.message.text
    const birthDate = new Date(birthDateInput)
    if(!isNaN(birthDate.getTime())){
        let days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
        let dayIndex = birthDate.getDay() 
        ctx.reply(`You were born on ${days[dayIndex]}`)
    }else{
        ctx.reply("Please enter the date format in the YYYY-MM--DD format")
    }
})  
bot.on('message:photo',async (ctx)=>{
    await ctx.reply("You sent us nice pic thank you")
})
bot.start()
module.exports = app