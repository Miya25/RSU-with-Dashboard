const Discord = require("discord.js");
const progressbar = require("percentagebar");
const emoji = require('../../emoji.json')

module.exports = {
 name: "ship",
 aliases: [],
 description: "Ship members",
 category: "Fun",
 usage: "ship <member> <member>",
 run: async (client, message, args) => {
  try {
   const user1 = args[0];
   if (!user1) {
    return message.channel.send({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | Please mention a user to ship!",
     },
    });
   }
   const user2 = args[1];
   if (!user2) {
    return message.channel.send({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | Please mention a secound user to ship!",
     },
    });
   }
   const ship = Math.floor(Math.random() * 100) + 1;
   const bar = progressbar(100, ship, 10, "<:bar:872174647804850227>", "<:bar2:872174744814882816>", "💔 ", " ❤️", false);
   const mehh = new Discord.MessageEmbed() // Prettier()
    .setTitle(
     ":twisted_rightwards_arrows: This isn't a match",
     message.guild.iconURL({
      dynamic: true,
      format: "png",
     })
    )
    .setThumbnail("https://cdn.discordapp.com/emojis/853644938867769454.gif?v=1")
    .setDescription(`I shipped **${user1}** with **${user2}** and it is **${ship}%**\n${bar}`)
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setColor("RED");
   const love = new Discord.MessageEmbed() // Prettier()
    .setTitle(
     ":twisted_rightwards_arrows: They are born for each others!",
     message.guild.iconURL({
      dynamic: true,
      format: "png",
     })
    )
    .setThumbnail("https://cdn.discordapp.com/emojis/797365365595439104.gif?v=1")
    .setDescription(`I shipped **${user1}** with **${user2}** and it is **${ship}%**\n${bar}`)
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setColor("GREEN");
   if (ship > 50) {
    message.channel.send(love);
   } else {
    message.channel.send(mehh);
   }
  } catch (err) {
   message.channel.send({
    embed: {
     color: 16734039,
     description: "<:error:872104702626639922> Somthing Wents Wrong",
    },
   });
  }
 },
};
// coded by: IgorKowalczyk