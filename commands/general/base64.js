const Discord = require("discord.js");
const emoji = require('../../emoji.json')

module.exports = {
 name: "base64",
 aliases: ["b64", "base-64"],
 description: "Encode text to Base64 format",
 category: "Utility",
 usage: "base64 <text>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "${emoji.error} | You must enter a text to encode!",
     },
    });
   }
   if (!args[0].lenght > 50) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "${emoji.error} | You must enter a text shorer than 50 characters!",
     },
    });
   }
   const buffer = new Buffer.from(args.join(" "), "utf-8");
   const base64 = buffer.toString("base64");
   const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setTitle(`✨ Base64 Encoder`)
    .addField("📥 Text to Encode", `\`\`\`${args.join(" ")}\`\`\``)
    .addField("📤 Encoded text", `\`\`\`${base64 || "An unknown error ocurred while encoding!"}\`\`\``);
   message.lineReply(embed);
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};