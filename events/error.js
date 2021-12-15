const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, message) => {
    console.error()
    const errorch = '888726946987528192'
    const channel = client.channels.cache.get(errorch);
    const errormsg = new MessageEmbed()
    .setTitle('an error occured')
    .setDescription(`${error}`)
    channel.send(errormsg)
}