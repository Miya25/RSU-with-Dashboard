const { MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
        name: "channelinfo",
        aliases: ['ci', 'channeli', 'cinfo'],
        category: "info",
        description: "Shows Channel Info",
        usage: "[ channel mention | channel name | ID] (optional)",
        accessableby: "everyone",
    run: async (bot, message, args) => {
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        if (!channel) return message.channel.send(`**${emoji.error} Channel Not Found!**`);

        let channelembed = new MessageEmbed()
            .setTitle(`Channel Information for ${channel.name}`)
            .setThumbnail(message.guild.iconURL())
            .addField("📢 **NSFW**", channel.nsfw, true)
            .addField("**🛠 Channel ID**", channel.id, true)
            .addField("**🎈 Channel Type**", channel.typet, true)
            .addField("**🎗 Channel Description**", `${channel.topic || "No Description"}`, true)
            .addField("**♠ Channel Created At**", channel.createdAt, true)
            .setColor("GREEN")
        message.channel.send(channelembed);
    }
}