//@test_cli_to_telegram_bot:
const axios = require("axios");
const TelegramApi = require("node-telegram-bot-api");

const privatURL = "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5";
const monoURL = "https://api.monobank.ua/bank/currency";
const bot = new TelegramApi(token, { polling: true });
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 305 });

const getCurrencyPrivatbank = async (URL) => {
  if (myCache.has("privatData")) {
    console.log("Getting it from cache");
    let response = myCache.get("privatData");
    return response;
  } else {
    try {
      const response = await axios.get(`${URL}`);
      myCache.set("privatData", response.data);
      console.log("Getting it from API");
      return response.data;
    } catch (error) {
      console.error("Something wrong...", error);
    }
  }
};
const getCurrencyMonobank = async (URL) => {
  if (myCache.has("monoData")) {
    console.log("Getting it from cache");
    let response = myCache.get("monoData");
    return response;
  } else {
    try {
      const response = await axios.get(`${URL}`);
      myCache.set("monoData", response.data);
      console.log("Getting it from API");
      return response.data;
    } catch (error) {
      console.error("Something wrong...", error);
    }
  }
};

const buttonsOptions = {
  reply_markup: JSON.stringify({
    keyboard: [[{ text: "/Курс валют" }]],
  }),
};
const buttonsOptionsCurrency = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{ text: "/USD" }, { text: "/EUR" }],
      [{ text: "/Попереднє меню" }],
    ],
  }),
};

const start = () => {
  bot.on("message", async (msg) => {
    let text = msg.text;
    let chatId = msg.chat.id;
    if (text === "/start") {
      return await bot.sendMessage(chatId, `Вітаю!`, buttonsOptions);
    }

    if (text === "/Курс валют") {
      return await bot.sendMessage(
        chatId,
        `Виберіть валюту`,
        buttonsOptionsCurrency
      );
    }
    if (text === "/Попереднє меню") {
      return await bot.sendMessage(chatId, `Вітаю!`, buttonsOptions);
    }
    if (text === "/USD") {
      const privatCurrency = await getCurrencyPrivatbank(privatURL);
      const monoCurrency = await getCurrencyMonobank(monoURL);
      const { rateBuy, rateSell } = monoCurrency[0];
      const { ccy, buy, sale } = privatCurrency[1];
      return await bot.sendMessage(
        chatId,
        `Privatbank:\n ${ccy} покупка: ${buy} продажа: ${sale} Monobank:\n USD покупка: ${rateBuy} продажа: ${rateSell} `,
        buttonsOptionsCurrency
      );
    }
    if (text === "/EUR") {
      const privatCurrency = await getCurrencyPrivatbank(privatURL);
      const monoCurrency = await getCurrencyMonobank(monoURL);
      const { rateBuy, rateSell } = monoCurrency[1];
      const { ccy, buy, sale } = privatCurrency[0];
      return await bot.sendMessage(
        chatId,
        `Privatbank:\n ${ccy} покупка: ${buy} продажа: ${sale} Monobank:\n USD покупка: ${rateBuy} продажа: ${rateSell} `,
        buttonsOptionsCurrency
      );
    }

    return bot.sendMessage(chatId, "Така команда відсутня");
  });
};
start();
