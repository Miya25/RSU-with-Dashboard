const db = require("quick.db");
const colors = require('./../../colors.json')
const Discord = require("discord.js")
const emoji = require('../../emoji.json')

module.exports = {
  name: "antilink",
  aliases: ["anti-link"],
  _run: async (client, message, args) => {
    let embed = db.fetch(`embed_${message.guild.id}`);

    if (!message.member.hasPermission("MANAGE_GUILD")) {
      message.channel.send(
        `${emoji.error} You need `, MANAGE, GUILD` to configure the anti link settings!`
      );
      return;
    }
    let content = args[0];

    var prefix = db.fetch(`guildprefix_${message.guild.id}`);
    if (!prefix) {
      var prefix = ".";
    }
    if (!content) {
      message.channel.send(`${emoji.error} You Wanna Enable It Or Disable? Please Provide! E.g - ${prefix}antilink on/off`);
      return;
    }
    if (content.toLowerCase() === "on") {
      let antilink1 = db.fetch(`antilink_${message.guild.id}`);
      if (antilink1 == "on") {
        message.channel.send(`${emoji.error} You Have Already Turned On The Antilink`);
        return;
      }
      let on1 = "on";
      db.set(`antilink_${message.guild.id}`, on1);
      message.channel.send(`${emoji.succes} Done Anit Link Is Succesfully Enabled For This Server!`);
    }
    else if (content.toLowerCase() === "off") {
      let antilink1 = db.fetch(`antilink_${message.guild.id}`);
      if (antilink1 == "off") {
        message.channel.send("You have already turned off the antilink");
        return;
      }
      let off1 = "off";
      db.set(`antilink_${message.guild.id}`, off1);
      message.channel.send("Ok now i will not Delete the message when someone sends the link in chat");
    }
    else {
      return message.reply(`${emoji.error} You Wanna Enable It Or Disable? Please Provide!`);
    }
  },
  get run() {
    return this._run;
  },
  set run(value) {
    this._run = value;
  },
}
