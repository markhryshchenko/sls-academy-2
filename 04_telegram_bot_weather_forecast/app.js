const axios = require("axios");
const TelegramApi = require("node-telegram-bot-api");

const URL = "https://api.openweathermap.org/data/2.5/forecast?";
const currentCity = "Харків";

const bot = new TelegramApi(token, { polling: true });

const getWeather = async (dataInterval, chatId) => {
  try {
    const response = await axios.get(`${URL}`, {
      params: {
        q: currentCity,
        appid: userKey,
        units: "metric",
        lang: "ua",
        //cnt: 6,
      },
    });

    if (dataInterval == 3) {
      for (item of response.data.list) {
        let { name, main, weather, dt_txt } = item;
        let tempCurrent = Math.round(main.temp);
        let tempFeels = Math.round(main.feels_like);
        bot.sendMessage(
          chatId,
          `Погода в ${currentCity}, ${dt_txt} температура: ${
            tempCurrent > 0
              ? "+" + tempCurrent
              : tempCurrent < 0
              ? "-" + tempCurrent
              : tempCurrent
          } відчувається: ${
            tempFeels > 0
              ? "+" + tempFeels
              : tempFeels < 0
              ? "-" + tempFeels
              : tempFeels
          }, ${weather[0].description} `
        );
      }
    } else if (dataInterval == 6) {
      for (let i = 0; i < response.data.list.length; i++) {
        if (i % 2 == 0) {
          let { name, main, weather, dt_txt } = response.data.list[i];
          let tempCurrent = Math.round(main.temp);
          let tempFeels = Math.round(main.feels_like);
          bot.sendMessage(
            chatId,
            `Погода в ${currentCity}, ${dt_txt} температура: ${
              tempCurrent > 0
                ? "+" + tempCurrent
                : tempCurrent < 0
                ? "-" + tempCurrent
                : tempCurrent
            } відчувається: ${
              tempFeels > 0
                ? "+" + tempFeels
                : tempFeels < 0
                ? "-" + tempFeels
                : tempFeels
            }, ${weather[0].description} `
          );
        }
      }
    }
  } catch (error) {
    console.error("Something wrong...", error);
  }
};

const buttonsOptionsCity = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Погода в Харкові", callback_data: "Харків" }]],
  }),
};
const buttonsOptionsInterval = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "3 години", callback_data: "3" },
        { text: "6 годин", callback_data: "6" },
      ],
    ],
  }),
};

const start = () => {
  bot.on("message", async (msg) => {
    let text = msg.text;
    let chatId = msg.chat.id;
    if (text === "/start") {
      return await bot.sendMessage(
        chatId,
        `Ласкаво просимо! Виберіть місто`,
        buttonsOptionsCity
      );
    }
    return bot.sendMessage(chatId, "Така команда відсутня");
  });
  bot.on("callback_query", (msg) => {
    const chatId = msg.message.chat.id;
    bot.sendMessage(chatId, `Вибери інтервал: `, buttonsOptionsInterval);
    bot.on("callback_query", (msg) => {
      const chatId = msg.message.chat.id;
      const data = msg.data;
      getWeather(data, chatId);
    });
  });
};
start();
