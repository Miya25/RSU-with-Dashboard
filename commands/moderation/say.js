const Discord = require("discord.js");
const emoji = require('../../emoji.json')

module.exports = {
 name: "say",
 aliases: [],
 description: "Send a message using bot",
 category: "Moderation",
 usage: "say <channel> <message>",
 run: async (client, message, args) => {
  if (message.member.hasPermission("MANAGE_MESSAGES")) {
   message.delete();
   const taggedChannel = await message.mentions.channels.first();
   if (taggedChannel) {
    await taggedChannel.send(args.join(" ").replace(taggedChannel, ""));
   } else {
    const saymessage = await args.join(" ");
    if(saymessage.include == "@") return message.reply(':x: Please Dont Mention Anyone 😏')
    if (saymessage.length >= 1) {
     await message.channel.send(saymessage + "\n\n~Message Sent By <@" + message.author + ">");
    } else {
     await message.channel.send({
      embed: {
       color: 16734039,
       description: "✨ | You Need To Enter A Message!",
      },
     });
    }
   }
  } else {
   message.channel.send({
    embed: {
     color: 16734039,
     description: `${emoji.error} | You don't have permission to send this message by me!`,
    },
   });
  }
 },
};