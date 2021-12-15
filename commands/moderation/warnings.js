const db = require("quick.db");
const emoji = require('../../emoji.json')

const Discord = require('discord.js')


module.exports = {
  name: "warnings",
  description: "Get the warnings of yours or mentioned person",
  category: "moderation",
  aliases: ["warns"],
  async run (client, message, args)  {
    const user = message.mentions.members.first() || message.author;

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) warnings = 0;

    message.channel.send(`${user} Have **${warnings}** Warning(s)`);
  }
};