const Discord = require("discord.js");
const ownerid = ["852749695020564490"];
const ownerid2 = ["852749695020564490"];
const emoji = require('../../emoji.json')

module.exports = {
    name: "leaveserver",
    aliases: [""],
    category: "owner",
    description: "Displays the list of servers the bot is in!",
    usage: " ",
    accessableby: "Owner",
  run: async (client, message, args) => {
    if (message.author.id == ownerid || ownerid2) {
		
		    const guildId = args[0];
 
    if (!guildId) {
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle(`${emoji.error} Error Occured!`)
      .setDescription(`Please Provide A Valid Server ID`)
      .setFooter("Thanks For Using Me")
      .setColor("RANDOM")
      .setTimestamp()
      );
    }
 
    const guild = client.guilds.cache.find((g) => g.id === guildId);
 
    if (!guild) {
      message.react(`${emoji.error}`)
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle(`${emoji.error} Error Occured!`)
      .setDescription(`I Am Not In Server`)
      .setFooter("Thanks For Using Me")
      .setColor("RANDOM")
      .setTimestamp()
      );
    }
 
    try {
      await guild.leave();
      message.react(`${emoji.leave}`)
      return message.channel.send(new Discord.MessageEmbed()
      .setThumbnail(guild.iconURL({ dynamic: true }) || null)
      .setTitle(`${emoji.dot} Successfully `)
      .setDescription(`${emoji.sucess} Successfully Left Guild - **${guild.name}**`)
      .setFooter("Thanks For Using Me")
      .setColor("RANDOM")
      .setTimestamp()
      );
    } catch (e) {
      console.error(e);
      return message.channel.send(`${emoji.error} An error occurred leaving that guild`);
    }
    }
    }
  }