const schema = require('../../models/custom-commands');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'delete-Command',
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${emoji.error} You do not have permissions to use this command`);

        const name = args[0];

        if(!name) return message.channel.send(`${emoji.error} Please specify a command name`);

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(!data) return message.channel.send(`${emoji.error} That custom command does not exist!`);
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });
        message.channel.send(`${emoji.sucess} Removed **${name}** from custom commands!`);
    }
}