const Discord = require('discord.js')
const emoji = require('../../emoji.json')
const webhook = new Discord.WebhookClient('917887868502945843', 'dtavZ2SIo2pKbL-UUDouqTcpGJ2rjlSo_7eDEXVhmUlkBNNaacHwCAxIz-QevELdN7_g')
module.exports = {
  name: "feedback",
  description: "feedback command (embed style)",

  run: async(bot, message, args) => {

    if (!args[0]) return message.reply('please provide feedback! :)')
    message.react(`${emoji.succes}`)
    message.reply(`✉ | ${message.author.username}, Thanks For The Feedback! :)`)

    const feedbackEmbed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username}#${message.author.discriminator} (${message.author.id}) Feedback:`)
      .setDescription(`${args} 🗯`)
      .addField("On the server:", `${message.guild.name}`)
      .addField("Server ID:", `${message.guild.id}`)
      .setTimestamp()
      .setColor('#303136')

    webhook.send(feedbackEmbed)

    
  }
}