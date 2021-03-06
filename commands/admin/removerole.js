const { Message } = require('discord.js')
const emoji = require('../../emoji.json')

module.exports = {
  name: "removerole",
  aliases: [],
  usage: "*removeroel",
  description: "unbans member",
  run: async (client, message, args) => {
        //lets use parameters (optional)
        /**
         * @param {Message} message
         */
        //so firstly we will check whether the author of the message has permissions
        //this line means if the author doesn't have manage roles permission it will stop the process and send the following text
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`${emoji.error} You do not have permission.`)
        //next we define some variables
        const target = message.mentions.members.first() //member = mentions
        if(!target) return message.channel.send(`${emoji.error} No Member Specified`) //when no member is pinged
        const role = message.mentions.roles.first() // roles = mentions
        if(!role) return message.channel.send(`${emoji.error} No role specified`) //when no role is specified or pinged
        //now the code!
        await target.roles.remove(role) // removeing the role to the user
        message.channel.send(`${target.user.username} ${emoji.sucess} Roles Has Been Removed`) //this is optional and editable
    }
}