const Discord = require("discord.js")
const db = require('quick.db')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'roleinfo',
    aliases: ['rl'], 
    description: 'gives you the role info',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      
      var r = message.mentions.roles.first()
      if (!r) return message.channel.send(`**${emoji.error} Mentions a Role First**`)

      var embed = new Discord.MessageEmbed()
      .setThumbnail(message.guild.iconURL({dynamic: true, size: 1024}))
    .setTitle(`${r.name} info`)
    .setColor(r.hexColor)
    .addField(`${emoji.discordlogo} Server name : ` + message.guild.name,true)
    .addField(`${emoji.discordlogo}  Role : ` + r.name,true)
    .addField(`${emoji.discordlogo} Role ID : ` + r.id,true)
    .addField(`${emoji.discordlogo} Role Created At :` + r.createdAt,true)
    .addField(`${emoji.discordlogo} Role color :` + r.hexColor,true)
    .addField(`${emoji.discordlogo} Role Members :` + r.members,true)
    .addField('Permissions : '+ `${r.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
    .setFooter('Made By _Exe_ Øp !¡#0001')
    message.channel.send(embed)

    }
} 