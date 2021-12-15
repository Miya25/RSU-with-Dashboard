const db = require("quick.db");
const Discord = require("discord.js");
const colors = require('./../../colors.json')
const emoji = require('../../emoji.json')

module.exports = {
  name: "auto-official-role-disable",
  aliases: ["auto-official-disable", "auto-name-role-disable","anr-disable", "af-disable", "autoofficial-disable"],
  run: async (client, message, args) => {
    if (message.member.hasPermission("MANAGE_SERVER")) {
db.delete(`tagg_${message.guild.id}`);
db.delete(`tagn_${message.guild.id}`);
return message.reply(`${emoji.sucess} Done Deleted Official role and tag from my database`);
  }
  }
}

