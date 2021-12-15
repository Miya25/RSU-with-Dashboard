const { default_prefix, owners } = require("../config.json");
const Discord = require("discord.js");
const disbut = require("discord-buttons");
const db = require("quick.db")
module.exports.run = async (client, message) => {
    if (!message.guild) {
   try {
    const embed = new Discord.MessageEmbed()
     .setTitle(`:thinking: Hmm?`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
     .setColor("RANDOM")
     .setDescription(`Why Are You DM Me? I Can Only Respond To Commands On Servers.\n [Maybe You Want To Invite Me?](https://discord.com/oauth2/authorize?client_id=872733933018693684&permissions=8&scope=bot)`)
     .setTimestamp()
     .setFooter(`Thanks For Using Me!`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }));
    return message.author.send(embed);
   } catch (err) {
    return;
   }
  }

    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
      const inv = new disbut.MessageButton()
      .setLabel('Invite Me')
      .setStyle("url")
      .setEmoji("888115192947425350")
      .setURL('https://dsc.gg/sundaybot')

      const ss = new disbut.MessageButton()
      .setLabel('Support Server')
      .setStyle("url")
      .setEmoji("887742009387941908")
      .setURL('https://discord.gg/3Km6XE25pe')

      const tutorial = new disbut.MessageButton() // prettier
      .setStyle('url')
      .setLabel("Tutorial Video")
      .setURL("https://www.youtube.com/")
      .setEmoji("887748711143338005")
      const ps = db.get(`guild_${message.guild.id}_prefix`) || ',';
     const embed = new Discord.MessageEmbed()
        .setTitle('Hi, Im Hydrox. Need help?')
        .setThumbnail('https://media.discordapp.net/attachments/887954197918654505/889166309751939082/standard_12.gif?format=gif&width=400&height=51')
        .setDescription(`You Can See Everything I Can Do By Using The \`${ps}help\` command.`)
        .addField('Invite Me',`
          You Can Add Me To Your Server By Clicking 
          [Here](https://dsc.gg/sundaybot)`)
        .addField('Support',`
          If You Have Questions, Suggestions, Or Found A Bug, Please Join The [Support Server](https://discord.gg/3Km6XE25pe)!
        `)
      .setColor("RANDOM")
      .setTimestamp()
      return message.channel.send(embed, {
        buttons: [inv, ss, tutorial]
      });
    }
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.content.split(" ").forEach(m => {
        // if (is_url(m)) {
        //  message.delete().catch(err => {})
        // return message.channel.send("You are not allowed to send links :/")
        //} else if (badwords.find(x => x.toLowerCase() === m.toLowerCase())) {
        //message.delete().catch(err => {});
        //return message.channel.send(
        // "You are not allowed to use (**" + m + "**) word here"
      });
    }
  
  const PREFIX = db.get(`guild_${message.guild.id}_prefix`) || ","
    if (!message.content.startsWith(PREFIX || default_prefix)) return;
     const blockeduser = db.fetch(`blocked_users_${message.author.id}`, "blocked");
     const blocked_embed = new Discord.MessageEmbed()
      .setTitle(`<:gun:913728600484761610> User Blocked!`)
      .setDescription(`You Have Been Blocked From The Bot`)
      .setFooter("Thanks For Using Me")
      .setColor("RANDOM")
      .setTimestamp()
  if(blockeduser) return message.channel.send(blocked_embed);


    if (!message.member) message.member = await message.guild.members.fetch(message);
  
    const args = message.content
      .slice(default_prefix.length || PREFIX.lenght)
      .trim()
      .split(/ +/g);
    const cmd = args.shift().toLowerCase();
  
    if (cmd.length === 0) return;
  
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
  
    if (!command) return;
    if (command.botPermission) {
      let neededPerms = [];
  
      command.botPermission.forEach(p => {
        if (!message.guild.me.hasPermission(p)) neededPerms.push("`" + p + "`");
      });
  
      if (neededPerms.length)
        return message.channel.send(
          `I need ${neededPerms.join(", ")} permission(s) to run this command!`
        );
    } else if (command.authorPermission) {
      let neededPerms = [];
  
      command.authorPermission.forEach(p => {
        if (!message.member.hasPermission(p)) neededPerms.push("`" + p + "`");
      });
  
      if (neededPerms.length)
        return message.channel.send(
          `You need ${neededPerms.join(
            ", "
          )} permission(s) to run this command!`
        );
    }
  
    if (command.ownerOnly) {
      if (!owners.includes(message.author.id))
        // if (message.author.id !== ownerID)
        return message.channel.send("This command can only be used by the bot owner.");
    }

    if (command) command.run(client, message, args);
  };