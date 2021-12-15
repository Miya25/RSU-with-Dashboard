const Discord = require('discord.js')
const db = require('quick.db')
const emoji = require('../../emoji.json')

module.exports = {
        name: "getinvite",
        aliases: ['getinv', 'gi'],
        category: "owner",
        description: "Generates an invitation to the server in question.",
        usage: "[ID]",
        accessableby: "Owner",
    run: async(client, message, args) => {
        if(message.author.id !== "593536295507329049") return message.reply(new Discord.MessageEmbed()
        .setTitle(`${emoji.error} Error Occured!`)
        .setDescription(`You Can't Run This Command Only <@852749695020564490> Can Run This Command `)
        .setFooter("Thanks For Using Me")
        .setColor("RED")
        .setTimestamp()
        )
        let guild = null;

        if (!args[0]) return message.channel.send(new Discord.MessageEmbed()
        .setTitle("Invliad name/id")
        .setDescription(`Usages \`<Prefix>leaveserver <id>\``)
        )

        if(args[0]){
            let fetched = client.guilds.cache.find(g => g.name === args.join(" "));
            let found = client.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
                  return message.channel.send(new Discord.MessageEmbed()
      .setTitle(`${emoji.error} Error!`)
      .setDescription(`Invliad Name`)
      .setFooter("Thanks For Using Me")
      .setColor("RANDOM")
      .setTimestamp()
      );
    }
        if(guild) {
            let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel) {
                return message.channel.send("An Error Has Occured Try Again!"); 
            }
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return message.channel.send(`${err} has occured!`);
            });
            const ps = db.get(`guild_${message.guild.id}_prefix`) || ","
            message.channel.send(new Discord.MessageEmbed()
            .setTitle(`${emoji.succes} Invite Link For` + ` ${guild.name}`)
            .setDescription(`[Click here To Join The Server](${invite.url})`)
            .addField("> Server Owner", `> ${emoji.dot} ${guild.owner.user.username} | ${guild.owner}`)
          .addField("> Membercount", `> ${emoji.dot} ${guild.memberCount}`)
          .addField("> Server Bot Is In", `> ${emoji.dot} ${client.guilds.cache.size}`)
         .addField(`${emoji.leave} Get Bot Out Of There -`, `\`\`\`${ps}leaveserver ${guild.id}\`\`\``)
         .setFooter("Thanks For Using Me!")
         .setColor("RANDOM")
         .setTimestamp()
            );
        } else {
            return message.channel.send(`\`${args.join(' ')}\` - Bot is Not in this server`);
        }
    }
}