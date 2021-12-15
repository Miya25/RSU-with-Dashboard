const db = require("quick.db");
const colors = require('../../colors.json')
const Discord = require("discord.js")
const emoji = require('../../emoji.json')

module.exports = {
  name: "anti-alt",
  aliases: ["antialt"],
  run: async (client, message, args) => {
       if (!message.member.hasPermission("MANAGE_GUILD"))
    {
       message.channel.send(
        "You need `MANAGE GUILD` to configure the anti alt settings!"
      );
      return;
}
 var wchannel = args[0];
 if(!wchannel)
 {
   return message.reply(`${emoji.error} Please Give Me enable Or disable`)
 }
 if(wchannel == "enable")
 {
   db.set(`antialt_${message.guild.id}`, wchannel);
   message.reply(`${emoji.sucess} OK now anti-alt is enabled`);
   return;
 }
 else if(wchannel == "disable")
 {
   db.delete(`antialt_${message.guild.id}`);
   message.reply(`OK now anti-alt is disabled`);
   return;
 }else {
 return message.reply(`${emoji.error} You didnt enter enable or disable`)
 }


  }
}