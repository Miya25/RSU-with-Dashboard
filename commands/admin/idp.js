const discord = require("discord.js");
const emoji = require('../../emoji.json')

module.exports = {
  name: "idpassword",
  category:"fun",
  run: async (client, message, args) => {
    
    if(!args[0]) {
      return message.channel.send(`${emoji.error} Please Give The Room ID`)
    }
    
    let pass = args.slice(1).join(" ")
    
    if(!pass) {
      return message.channel.send(`${emoji.error} Please Give The Room Password`);
    }

  let embed = new discord.MessageEmbed()
  .addField("Room ID", "`" + args[0] + "`")
  .addField("Password", "`" + pass + "`")
  .setColor("RANDOM")
  message.channel.send(embed)

  message.delete()
    
  }
}