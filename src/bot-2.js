import TelegramBot from "node-telegram-bot-api";

const TOKEN = '8212477198:AAGO9daxuCTrhUBdzmQAGp6p4jlfukv4Px8'
// const BOT_URL=`https://api.telegram.org/bot${TOKEN}`

const telegram = new TelegramBot(
    TOKEN, { polling: true }
)

const keyboard = [['1', '2', '3', '4', '5', '6', '7'], ['4', '5', '6', '7']]

telegram.on('message', (update) => {
    telegram.sendMessage(update.chat.id, 'Salom', {
        reply_markup: {
            inline_keyboard:
                [
                    [{ text: 'salom', url: 'google.com' }],
                    [{ text: 'salom', callback_data: 'hayr' }]
                ]

        }
    })
})

console.log('Telegram bot is runing');
