const Discord = require("discord.js");
const shorten = require("isgd");
const { MessageButton, default: discordButtons, MessageActionRow } = require("discord-buttons");
const emoji = require('../../emoji.json')

module.exports = {
 name: "shortener",
 aliases: ["url-shortener", "link-shortener"],
 description: "Shorter a url",
 category: "Utility",
 usage: "shortener <link>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | Please provide a link!",
     },
    });
   }
   shorten.shorten(args[0], function (res) {
    const urldone = new Discord.MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setTitle("🔗 Your shortened URL")
     .setDescription(`> **${res}**`);
    const url_button = new MessageButton() // Prettier
     .setStyle("url")
     .setLabel(`go to ${res}`)
     .setURL(`${res}`)
     .setEmoji("🤖");
    message.channel.send(urldone, url_button);
   });
  } catch (err) {
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};