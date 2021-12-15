const schema = require('../../models/custom-commands');
const { MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name: "list",
    run: async(client, message, args) => {
        const data  = await schema.find({ Guild: message.guild.id });
        if(!!data === false) return message.channel.send(`${emoji.error} There is no custom commands!`);
        message.channel.send(
            new MessageEmbed()
                .setColor('BLUE')
                .setDescription(
                    data.map((cmd, i) => 
                        `${i + 1}: ${cmd.Command}`
                    ).join('\n')
                )
        )
    }
}