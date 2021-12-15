const db = require("quick.db");
const Discord = require("discord.js");
const colors = require('./../../colors.json')
const emoji = require('../../emoji.json')

module.exports = {
  name: "auto-official-role",
  aliases: ["auto-official", "auto-name-role","anr", "af", "autoofficial"],
  run: async (client, message, args) => {
     if (!message.member.hasPermission("MANAGE_SERVER")) {
       return;
     }
if(!args[0])
{
  return message.reply(`${emoji.error} You Didnt Give Me Role Or Nickname To Set\n Example - .anr role @Officials or .anr name Hydrox`);
}
if(args[0] == "role")
{
  var role2 = message.mentions.roles.first();
  if(role2)
  {
    var role2 = message.mentions.roles.first().id;
  }
  else if(!role2){
    var role2 = args[1];
  }
  if(!role2){
    return message.reply(`${emoji.error} You didnt Gave me a valid role`);
  }
  db.set(`tagg_${message.guild.id}`, role2);
  return message.reply(`${emoji.sucess} Done now i will give this role when someone add your given tag to his username`);
}
if(args[0] == "name")
{
 let name = args[1]; 
 if(!name)
 {
   return message.reply(`${emoji.error} Please Give a Name To Set Name In My Database`);
 }
 db.set(`tagn_${message.guild.id}`, name);
 return message.reply(`${emoji.sucess} Done now i will give role when someone add this name to his/her username`);
}
  }
}
