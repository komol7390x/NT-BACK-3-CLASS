import axios from "axios"

const BOT_TOKEN = '8212477198:AAGO9daxuCTrhUBdzmQAGp6p4jlfukv4Px8'
const BOT_URL=`https://api.telegram.org/bot${BOT_TOKEN}`
const getBotMessage=`${BOT_URL}/getUpdates`

const TelegramBot=async(botURL)=>{
    const result=(await axios.get(getBotMessage)).data
    if(!result.ok) throw 'Telegrom error'
    const messages=result.result
    const id=messages.at(-1).message.chat.id
    const message=messages.at(-1).message.text
    if(message){
        sendMessage(botURL,{
            chat_id:id,
            text:"Nima gap "+message
        })
    }
}

const sendMessage=async(url,options)=>{
    const response=await axios.post(`${url}/sendMessage`,options)
}

// TelegramBot(BOT_URL)
setInterval(()=>{
    TelegramBot(BOT_URL)
},10000)