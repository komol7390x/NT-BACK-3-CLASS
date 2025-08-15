import { Telegraf, Markup } from "telegraf";
import { config } from "dotenv";
import { message } from "telegraf/filters";
import { join } from "path";
config();

const bot = new Telegraf(String(process.env.BOT_TOKEN));

const baseKeyboards = [
    'Menu', 'Sozlamalar', 'Biz haqimizda', 'Savat'
];

const filePath = join(process.cwd(), '1.png');

const foods = [
    {
        id: 1,
        name: 'Mastava',
        image: filePath
    },
    {
        id: 2,
        name: 'Mastava',
        image: filePath
    },
    {
        id: 3,
        name: 'Mastava',
        image: filePath
    },
    {
        id: 4,
        name: 'Mastava',
        image: filePath
    },
    {
        id: 5,
        name: 'Mastava',
        image: filePath
    },
    {
        id: 6,
        name: 'Mastava',
        image: filePath
    }
];

bot.start((ctx) => {
    return ctx.reply('Assalamu alaykum hurmatli foydalanuvchi',
        Markup.keyboard([
            [...baseKeyboards.slice(0, 2)],
            [...baseKeyboards.slice(2)]
        ]).resize()
    );
});


// keyboards
bot.hears(baseKeyboards, ctx => {
    if (ctx.message?.text === 'Biz haqimizda') {
        return ctx.replyWithPhoto({ source: filePath }, {
            caption: 'Bu botda siz ovqat buyurtma qilishingiz mumkin'
        });
    }

    if (ctx.message?.text === 'Menu') {
        for (let i of foods) {
            ctx.replyWithPhoto({ source: i.image }, {
                caption: i.name,
                ...Markup.inlineKeyboard([
                    [Markup.button.callback(`Savatga qo'shish`, `cart_${i.id}`)]
                ])
            }
            );
        }
    }
});

// inline keyboards
bot.action(/cart_(.+)/, ctx => {
    const data = ctx.callbackQuery?.data;
    if (data) {
        const food = foods.find(food => data.split('_')[1] == food.id);
        return ctx.replyWithPhoto({ source: food.image }, {
            caption: food.name
        });
    }
});

bot.help((ctx) => {
    return ctx.reply('Yordam olish uchun @DilshodGaibnazarov profiliga murojaat qiling 😊');
});

// bot.on(message(), ctx => {
//     const message = ctx.message;
//     if (message?.text) {
//         return ctx.reply(message.text);
//     }

//     if (message?.voice) {
//         return ctx.replyWithVoice(message.voice?.file_id);
//     }

//     if (message?.audio) {
//         return ctx.replyWithAudio(message.audio?.file_id);
//     }

//     if (message?.video) {
//         return ctx.replyWithVideo(message.video?.file_id);
//     }
// });

bot.launch();
console.log('Bot started');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
