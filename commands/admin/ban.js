const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'ban',
    aliases: ['b'], 
    description: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`${emoji.error} You Cant Use This Command!`)
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.reply( new MessageEmbed()
        .setDescription("please mention Member to ban!")
        .setColor('#303136')
        )

        if(
            message.member.roles.highest.position <=
            member.roles.highest.position
        ) return message.channel.send(`${emoji.error} ${message.author} You Cant Ban This User!`)

        const reason = args.slice(1).join(" ") || "No reason!";

        member.ban({reason});
        
        message.channel.send(new MessageEmbed()
        .setImage('https://cdn.discordapp.com/attachments/396964573007052800/535898524857008149/ban14CUT.gif')
        .setDescription(`**${emoji.userban} Banned \`${member.user.username}\` From The Server ** || **Reason** **${reason}**`)
        )
        client.modlogs(
            {
            Member: member,
            Action: 'Ban',
            Color: "RED",
            Reason: reason,
        }, 
        message
        );
    }
}