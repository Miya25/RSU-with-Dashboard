const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'kick',
    aliases: ['k'], 
    description: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @param {Discord} discord
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(new MessageEmbed()
        .setDescription(`${emoji.error} You Can't Use This Command!`)
        .setColor("RED")
        )
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.reply( new MessageEmbed()
        .setDescription(`${emoji.error} Please mention Member to kick!`)
        .setColor('#303136')
        )

        if(
            message.member.roles.highest.position <=
            member.roles.highest.position
        ) return message.channel.send(`${message.author} ${emoji.error} You Cant Kick This User!`)

        const reason = args.slice(1).join(" ") || "No reason!";

        member.kick(reason);
        
        message.channel.send(new MessageEmbed()
        .setDescription(`${emoji.userkick} ${member.user.username} Has Been Kicked || for ${reason}`)
        .setFooter("Thanks For Using Me!")
        .setColor("RANDOM")
        .setTimestamp()
        )
        client.modlogs(
            {
            Member: member,
            Action: 'kick',
            Color: "RED",
            Reason: reason,
        }, 
        message
        );
    }
}