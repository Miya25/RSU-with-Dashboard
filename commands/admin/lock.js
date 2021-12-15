const Discord = module.require("discord.js");
const emoji = require('../../emoji.json')


module.exports = {
   name: "lock",
   description: "Locks a Channel",
   usage: "lock <channel>",
  args: true,
 category: "moderation",
   run: async(client, message, args) => {
   if (!message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
   return message.channel.send(`${emoji.error} You Don't Have Enough Permissions`)
   }
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        deny : ['SEND_MESSAGES'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   .setTitle("Channel Updates")
   .setDescription(`${emoji.channellock} ${message.channel} Has been Locked`)
   .setTimestamp()
   .setColor("RANDOM");
   await message.channel.send(embed);
   message.delete();
}
}