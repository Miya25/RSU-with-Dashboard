const schema = require('../../models/custom-commands');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'create-command',
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permissions to use this command');

        const name = args[0]; const response = args.slice(1).join(" ");

        if(!name) return message.channel.send(`${emoji.error} Please specify a command name`);
        if(!response) return message.channel.send(`${emoji.error} Please specify a response`);

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(data) return message.channel.send('This custom commands exists already!');
        const newData =  new schema({
            Guild: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();
        message.channel.send(`${emoji.sucess} Saved **${name}** as a custom command!`);
    }
}