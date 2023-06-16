const { Command } = require("commander");
const TelegramApi = require("node-telegram-bot-api");

//!!!!!Telegram bot:  http://t.me/test_cli_to_telegram_bot

const token = "6148812560:AAGFCP95qD-L8tvBSOUWd5wp668hv96BDoo";
const bot = new TelegramApi(token, { polling: true });


function sendText(mes) {
   bot.on("message", async (msg) => {
    let chatId = msg.chat.id;
    await bot.sendMessage(chatId, `${mes}`);
    process.exit();
  });
}

function sendPhoto(photo) {
    bot.on("message", async (msg) => {
    let chatId = msg.chat.id;
    await bot.sendPhoto(chatId, photo,{},{contentType:'image/jpeg'});
   
    process.exit();
  });
}
const program = new Command();
program
  .name("Telegram console sender")
  .description("CLI to Telegram Bot")
  .version("0.8.0");

program
  .command("message")
  .description("Send message to Telegram Bot")
  .alias("m")
  .argument("<message>")
  .action((mes) => {
    sendText(mes);
  });
program
  .command("photo")
  .description("Send photo to Telegram Bot. Just drop it console after p-flag")
  .alias("p")
  .argument("<path>")
  .action((photo) => {
    sendPhoto(photo);
  });

program.parse();
