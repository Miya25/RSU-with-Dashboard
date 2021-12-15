const { MessageEmbed } = require("discord.js");
const { invite_link } = require("./../../config.json");
const { MessageButton } = require("discord-buttons")
const emoji = require('../../emoji.json')

module.exports = {
  name: "invite",
  description: "*Invites The Bot*",
  category: "uptime",
  aliases: ["inv", "in", "invitebot"],
  botPermission: [],
  authorPermission: [],
  ownerOnly: false,
  run: async (client, message, args) => {
    let github_repo = "";


    let mybutton = new MessageButton() // prettier
      .setStyle('url').setLabel("Invite Link").setURL("https://dsc.gg/sundaybot") // XDD Change this
    let mybutton1 = new MessageButton() // prettier
      .setStyle('url').setLabel("Support Server").setURL("https://discord.gg/3Km6XE25pe") // XDD Change this
    //array of all buttons
      const allbuttons = [mybutton, mybutton1]


    return message.channel.send({
        embed: new MessageEmbed()
      .setTitle("Invite Me / Support Me.")
      .setDescription(
        "**Monday** Is a Free Discord Bot That Allows You To Make Your Projects Oline 24/7 Just By Using A Single Command With Other More Commands"
      )
      //.setColor("#a1eb34")
      .setColor("RANDOM")
      .addField(
        "<:link:807875763415416853> **Invite Me**",
        "[Click here](" + invite_link + ") To Invite Me To Your Server."
      )
      .addField(
        "<:link:807875763415416853> **Support Server**",
        "[Click here](https://discord.gg/3Km6XE25pe) To Join Our Support Server."
      )
      .setTimestamp()
      ,
        buttons: allbuttons
      });
  },
};


