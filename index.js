const btn = require("discord-buttons");
const disbut = require("discord-buttons")
require("dotenv").config();
const { Collection, MessageEmbed } = require("discord.js");
const UrlsConfig = require("./database/models/UrlsConfig");
const fetchProjects = require("./fetchProjects");
const config = require('./config.json')
const { DiscordTogether } = require('discord-together');
const { timeout, disable_fetching } = require("./config.json");
const Discord = require("discord.js")
const Enmap = require("enmap");
const Nuggies = require('nuggies');
const emoji = require('./emoji.json')
const client = new Discord.Client({ disableMentions: 'everyone', intents: Discord.Intents.ALL, partials: ['MESSAGE', 'USER', 'REACTION'], ws: { properties: { $browser: "Discord iOS" }}});

(async () => {
  await Nuggies.handleInteractions(client)
  await Nuggies.connect(process.env.MONGO_URI)
  await require("./database/connect")();
  require('discord-buttons')(client)
  require('discord-reply');
  const discordTogether = new DiscordTogether(client);

  let pros = await UrlsConfig.find();

  client.commands = new Collection();
  client.aliases = new Collection();
  client.snipes = new Collection();//unknown
  client.projectsSize = 0;
  client.projects = pros.map((p) => p.projectURL);

  UrlsConfig.countDocuments({}, async (err, total) => {
    client.projectsSize = total;

    ["command", "events"].forEach((handler) => {
      require(`./handlers/${handler}`)(client);
    });
    ["erelahandler"].forEach((handler) => {
      require(`./musichandlers/${handler}`)(client);
    });
    require('./dashboard/server.js')(client)
    client.settings = new Enmap({ name: "setups", dataDir: "./musicdatabases/settings" })
    await client.login(process.env.BOT_TOKEN);

    
    if (!disable_fetching) fetchProjects(client.projects, client);
  });
})();
//--------------GIVEAWAY--------------------
const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: "#303136",
        embedColorEnd: '#303136',
        reaction: "🎉",
    }
});

// pinging
setInterval(async () => {
  UrlsConfig.countDocuments({}, (err, total) => {
    client.projectsSize = total;
    /*client.user.setActivity(`${total} Project(s) | ${client.guilds.cache.size} Servers `,
    {
      type: "WATCHING",
    });*/
  });

  if (!disable_fetching) fetchProjects(client.projects, client);
}, timeout);
//////////////////////
/////////////////////////////////////////////////
client.on('messageDelete', function(message, channel){
try{
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author.tag,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
} catch (e) {
  return;
}
})
///////////////////Guild-join/////////////////////
client.on('guildCreate', guild => {
   const botownerid = "745581095747059722";
   const botownerid2 = "729554449844011130";
   const serverjoinch = client.channels.cache.get(config.serverjoinc)
   //const botownerfix = client.users.fetch(botownerid);
   const botowner = client.users.cache.get("745581095747059722");
   const botowner2 = client.users.cache.get("729554449844011130");
   if(!botowner) console.log("Cannot find bot owner, fuck!")
   console.log(botowner)
    const join = new MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true }) || null)
    .setTitle(`Hi, Thanks For Inviting .Exe In ${guild.name}`)
    .setDescription("We've Looked Around And Found That We Don't Quite Have All The Permissions We Need To Function Properly Though. To Fix This So You Can Properly Use The Bot, A Link's Been Generated Which Will Give All The Relevent Permissions To The Bot\n\n" + `[**Fix Premissions**](https://discord.com/api/oauth2/authorize?client_id=882311254423765012&permissions=8&scope=bot)`)
    .setFooter("Thanks For Using Me!")
    .setColor("RANDOM")
    .setTimestamp();
    const ownerembed = new MessageEmbed()
    .setTitle(`${emoji.join} Joined A New Server | ${guild.name}`)
    .setDescription(`${emoji.members} **${guild.name}** | (\`${guild.id}\`)`)
    .setThumbnail(guild.iconURL({ dynamic: true }) || null)
    .addField("> Server Owner", `> ${emoji.dot} ${guild.owner}`)
    .addField("> Membercount", `> ${emoji.dot} ${guild.memberCount}`)
    .addField("> Server Bot Is In", `> ${emoji.dot} ${client.guilds.cache.size}`)
    .addField(`${emoji.leave} Get Bot Out Of There -`, `\`\`\`leaveserver ${guild.id}\`\`\``)
    .setFooter("Thanks For Using Me!")
    .setColor("RANDOM")
    .setTimestamp()
  try {
  botowner.send(ownerembed)
  botowner2.send(ownerembed)
  serverjoinch.send(ownerembed)
  } catch(err) {
    return;
  }
})
///////////////////////////////////////////
client.on('guildDelete', guild => {
  const owneridforleave = '745581095747059722';
  const owneridforleave2 = "729554449844011130";
  const serverleavech = client.channels.cache.get(config.serverleave)
  const botownerforleave = client.users.cache.get(owneridforleave);
  const botownerforleave2 = client.users.cache.get(owneridforleave2);
  const leaveembed = new MessageEmbed()
    .setTitle(`${emoji.leave} Left a Guild | ${guild.name}`)
    .setDescription(`${emoji.members} **${guild.name}** | (\`${guild.id}\`)`)
    .setThumbnail(guild.iconURL({ dynamic: true }) || null)
    .addField("> Server Owner", `> ${emoji.dot}  ${guild.owner}`)
    .addField("> MemberCount", `> ${emoji.dot} ${guild.memberCount}`)
    .addField("> Server Bot Is In", `> ${emoji.dot} ${client.guilds.cache.size}`)
    .setColor("RANDOM")
    .setTimestamp()
  try{
    //console.log(botownerforleave)
    botownerforleave.send(leaveembed)
    botownerforleave2.send(leaveembed)
    serverleavech.send(leaveembed)
  } catch (err) {
    return;
  }
});
//-------------MOD_LOGS---------------------------
const modlogSchema = require('./models/mod-logs')
client.modlogs = async function({ Member, Action, Color, Reason },message) {
  const data = await modlogSchema.findOne({ Guild: message.guild.id });
  if(!data) return;

  const channel = message.guild.channels.cache.get(data.Channel);
  const logsEmbed = new MessageEmbed()
  .setColor(Color)
  .setDescription(`Reason: ${Reason || 'No reason!'}`)
  .addField('Members', `${Member.user.tag} (${Member.id})`)
  .setTitle(`Action: ${Action}`)
  .setTimestamp()
  .setFooter(`By: ${message.author.username}`)
  channel.send(logsEmbed)
};
//MUSIC

client.queue = new Map();

//Ticket
/*client.on('clickButton', async (b) => {
  const user = b.clicker.user.username;
        if(b.id !== "ticket_create_12676515") return;
       b.guild.channels.create(`${b.clicker.user.username} - ticket`, {
          permissionOverwrites: [
          {
            id: b.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },{
            id: b.clicker.user.id,
            allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
          }
          ],
         parent: b.channel.parentID
          }).then(async (channel) => {
            channel = channel
            const chembed = new MessageEmbed()
            .setAuthor(`${b.clicker.user.username} Ticket!`)
            .setDescription(`Hey <@${b.clicker.id}> Thanks for opening ticket Some one help you soon!`)
            .setFooter(`Ticket For - ${b.clicker.user.username}`)
            .setColor('BLUE')
            .setTimestamp()
            const delet = new btn.MessageButton()
            .setLabel('Delete')
            .setEmoji('883344003968405504')
            .setStyle('red')
            .setID('delete')
            const close = new btn.MessageButton()
            .setLabel('🔒 Close')
            .setStyle('blurple')
            .setID('close')
            let chbtn = new btn.MessageActionRow()
            .addComponents(delet, close);
            channel.send(`Welcome <@${b.clicker.id}> !`)
            channel.send(chembed, chbtn).then(msg => {
              msg.pin();
            })
            const userch = channel.id;
            b.reply.send(`<@${b.clicker.id}> ** Your ticket Has been created in ** <#${userch}>`, true)
            
          })
          //
      })
      const verifyembed = new MessageEmbed()
      .setDescription(`<a:yes:880128360456531998> Verify The Step To Close The Ticket!`)
      .setColor("GREEN")
      .setFooter("Thanks For Using Me")
      .setTimestamp()
      const verifybtn = new btn.MessageButton()
      .setLabel('Click to verify')
      .setStyle('green')
      .setID('verify')
      .setEmoji('880128360456531998')

      client.on('clickButton', async (h) => {
        if(h.id !== "delete") return;
        if(!h.clicker.member.hasPermission("ADMINISTRATOR")) return h.reply.send(`<@${h.clicker.id}> you can\'t do it`, true)
        //h.reply.defer();
    try{
      h.channel.send(`<@${h.clicker.id}>`)
      h.channel.send(verifyembed, verifybtn)
        
        h.reply.defer();
    } catch (e) {
      console.log(e)
    }
})
client.on('clickButton', async (muji) => {
  if(muji.id ==="verify") {
    const verifyembedfinish = new MessageEmbed()
    .setTitle('<a:r_dot:882480749524185108> Successfully')
    .setDescription("** Deleteing Ticket In 5 Seconds! **")
    .setFooter("Thanks For Using Me")
    .setColor("RANDOM")
    .setTimestamp()
    muji.channel.send(verifyembedfinish)
    setTimeout(() => {
          muji.channel.delete();
        }, 1000 * 4.3)
        muji.reply.defer();
  }
})*/
//

//////////////////////////////////////////////////////////////
const universalColor = "#8015EA";
let imageLink = "https://cdn.discordapp.com/attachments/754486041494159440/776295051210129408/photo-1523821741446-edb2b68bb7a0.png";

const canvas = require('discord-canvas'),
    welcomeCanvas = new canvas.Welcome(),
    leaveCanvas = new canvas.Goodbye()
    const Schema = require('./models/welcome')
    //
    client.on('guildMemberAdd', async member => {
      Schema.findOne({ Guild: member.guild.id}, async (e, data) => {
        if(!data) return;
    let image = await welcomeCanvas
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(member.user.displayAvatarURL({
            format: 'png'
        }))
        .setColor("border", universalColor)
        .setColor("username-box", universalColor)
        .setColor("discriminator-box", universalColor)
        .setColor("message-box", universalColor)
        .setColor("title", universalColor)
        .setColor("avatar", universalColor)
        .setBackground(imageLink)
        .toAttachment()


    let welcomeattachment = new Discord.MessageAttachment(image.toBuffer(), "Hydrox-welcome.png");
    const welcomechannel = client.channels.cache.get(data.channel)
    welcomechannel.send(welcomeattachment)
    })
})

/*client.on('guildMemberRemove', async member => {
    let image = await leaveCanvas
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(member.user.displayAvatarURL({
            format: 'png'
        }))
        .setColor("border", universalColor)
        .setColor("username-box", universalColor)
        .setColor("discriminator-box", universalColor)
        .setColor("message-box", universalColor)
        .setColor("title", universalColor)
        .setColor("avatar", universalColor)
        .setBackground(imageLink)
        .toAttachment()


    let attachment = new Discord.MessageAttachment(image.toBuffer(), "leave-image.png");

    member.guild.channels.cache.find(c => c.id === channel).send(attachment)
})*/
/*client.on('guildMemberAdd', async member => {
    let image = await welcomeCanvas
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(member.user.displayAvatarURL({
            format: 'png'
        }))
        .setColor("border", universalColor)
        .setColor("username-box", universalColor)
        .setColor("discriminator-box", universalColor)
        .setColor("message-box", universalColor)
        .setColor("title", universalColor)
        .setColor("avatar", universalColor)
        .setBackground(imageLink)
        .toAttachment()


    let attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");
    const channel = "883585618192498698";
    member.guild.channels.cache.find(c => c.id === channel).send(attachment)
})*/
//Costum Commands//
client.on('message', async message => {
const db = require('quick.db')
const prefix = db.get(`guild_${message.guild.id}_prefix`) || ',';
if(message.author.bot) return;
if(!message.guild) return;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const cmd = args.shift().toLowerCase();
const Costumschema = require('./models/custom-commands')
const data = await Costumschema.findOne({ Guild: message.guild.id, Command: cmd});
if(data) message.channel.send(data.Response)
})

//LOL
/*client.on('message', async (message) => {
  if(message.author.bot) return;
if(message.author.id === "729554449844011130") {
  return message.channel.send('you have been blocked ')
}
})*/
//chatbot
client.on('message', async (message) => {
  const db = require('quick.db')
  const fetch = require("node-fetch");
  const channel = await db.get(`chatbot_${message.guild.id}`);
	if(!channel) return;
	const sChannel = message.guild.channels.cache.get(channel);
	if (!sChannel) return;
	if (message.author.bot || sChannel.id !== message.channel.id) return;
	message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
	if (message.content.includes(`@`)) {
		return sChannel.send(`**:x: Please dont mention anyone**`);
	}
	sChannel.startTyping();
	if (!message.content) return sChannel.send("Please say something.");
	fetch(`https://api.deltaa.me/chatbot?message=${encodeURIComponent(message.content)}&name=${client.user.username}&gender=Male`)
	.then(res => res.json())
	.then(data => {
		message.lineReply(`${data.message}`);
	});
	sChannel.stopTyping();
})
// afk 
client.on('message', async (message) => {
  if(message.author.bot) return;
  const db = require('./models/afk')
  const moment = require('moment');
  db.findOne({ Guild: message.guild.id, Member: message.author.id }, async(err, data) => {
    if(err) throw err;
    if(data) {
      data.delete()
      const afk = new MessageEmbed()
      .setTitle('Afk Removed')
      .setDescription(`${message.author.tag} afk has been removed`)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setColor('RANDOM')
      .setTimestamp()
    try{
      message.member.setNickname("")
    } catch (err){
      return;
    }
      message.channel.send(afk)
    } else return;
  })
  
  if(message.mentions.members.first()) {
    db.findOne({ Guild: message.guild.id, Member: message.mentions.members.first().id }, async(err, data) => {
      if(err) throw err;
      if(data) {
        const member = message.guild.members.cache.get(data.Member);
        const afk = new MessageEmbed()
        .setTitle(`${member.user.tag} Is Afk`)
        .setDescription(`${data.Content} - ${moment(parseInt(data.TimeAgo)).fromNow()}`)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        
        message.channel.send(afk)
      } else return;
    })
  }
})
//ticket 
client.on('clickButton', async button => {
  try {
            await button.reply.defer();
            if (button.id == 'create_Ticket') {
                var nameer = `ticket-${button.clicker.user.username}`
                var checkTickets = button.guild.channels.cache.find(c => c.name == nameer.split(' ').join('-').toLocaleLowerCase());
                if (checkTickets) {
                    button.channel.send({
                        embed: {
                            color: 0xFF0000,
                            title: `**❌ | Error**`,
                            description: `You already have a ticket open before`
                        }
                    }).then(async function(m) {
                        setTimeout(() => {
                            m.delete();
                        }, 1000 * 7);
                    });
                    return
                }
                button.guild.channels.create(`ticket-${button.clicker.user.username}`, {
                    permissionOverwrites: [{
                            id: button.clicker.user.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        },
                        {
                            id: require('quick.db').fetch(`TicketAdminRole_${button.guild.id}`),
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        }, {
                            id: button.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"]
                        }
                    ],
                    type: 'text'
                }).then(async function(channel) {
                    require('quick.db').set(`TicketControl_${channel.id}`, button.clicker.user.id);
                    let btn = new MessageButton()
                        .setStyle("grey")
                        .setEmoji("🔒")
                        .setID("configTicket");
                    let row = new MessageActionRow()
                        .addComponent(btn);
                    channel.send(`<@${button.clicker.user.id}>`, {
                        embed: {
                            description: `Please wait for a **ADMIN** response!!
                    Press **"🔒"** to close this ticket`,
                            color: 0x2F3136
                        },
                        component: row
                    });
                });
            } else if (button.id == 'configTicket') {
                if (!button.channel.name.includes("ticket-")) {
                    return;
                }
                var member = require('quick.db').fetch(`TicketControl_${button.channel.id}`);
                button.channel.overwritePermissions([{
                        id: member,
                        deny: ['SEND_MESSAGES'],
                        allow: ['VIEW_CHANNEL']
                    },
                    {
                        id: require('quick.db').fetch(`TicketAdminRole_${button.guild.id}`),
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    }, {
                        id: button.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    }
                ]);
                button.channel.send({
                    embed: {
                        description: `Ticket has been Closed By <@!${button.clicker.user.id}>`,
                        color: 0xFFE700
                    }
                }).then(async function(m) {
                    setTimeout(() => {
                        m.delete();
                    }, 1000 * 5);
                });
                let btn = new MessageButton()
                    .setStyle("grey")
                    .setEmoji("🔓")
                    .setID("reopenTicket");
                let btn2 = new MessageButton()
                    .setStyle("grey")
                    .setEmoji("⛔")
                    .setID("deleteTicket");
                let row = new MessageActionRow()
                    .addComponent(btn2)
                    .addComponent(btn);
                button.channel.send({
                    embed: {
                        description: 'Press **"⛔"** to delete the ticket\nPress **"🔓"** to reopen the ticket',
                        color: 0xFF0000
                    },
                    component: row
                }).then(async function(m) {
                    setTimeout(() => {
                        m.delete();
                    }, 1000 * 25);
                });
            } else if (button.id == "deleteTicket") {
                require('quick.db').delete(`TicketControl_${button.channel.id}`);
                button.channel.send({
                    embed: {
                        description: 'Ticket will be deleted in a few seconds',
                        color: 0xFF0000
                    }
                });
                setTimeout(() => {
                    button.channel.delete();
                }, 1000 * 4.3);
            } else if (button.id == "reopenTicket") {
                button.channel.send({
                    embed: {
                        description: `Ticket has been reopened By <@!${button.clicker.user.id}>`,
                        color: 0xFFE700
                    }
                }).then(async function(m) {
                    setTimeout(() => {
                        m.delete();
                    }, 1000 * 5);
                })
                var member = require('quick.db').fetch(`TicketControl_${button.channel.id}`);
                button.channel.overwritePermissions([{
                        id: member,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: require('quick.db').fetch(`TicketAdminRole_${button.guild.id}`),
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    }, {
                        id: button.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    }
                ]);
            } else if (button.id == 'closeTicketTrue') {
                require('quick.db').delete(`TicketControl_${button.channel.id}`);
                button.channel.send({
                    embed: {
                        description: 'Ticket will be deleted in a few seconds',
                        color: 0xFF0000
                    }
                });
                setTimeout(() => {
                    button.channel.delete();
                }, 1000 * 4.3);
            } else if (button.id == 'closeTicketFalse') {
                var msg = require('quick.db').fetch(`DeleteMessage_${button.channel.id}`);
                button.channel.messages.fetch(msg).then(message => message.delete()).catch(err => { return });
                require('quick.db').delete(`DeleteMessage_${button.channel.id}`);
            } else if (button.id == 'createTicketFalse') {
                var msg = require('quick.db').fetch(`DeleteOpen_${button.channel.id}`);
                button.channel.messages.fetch(msg).then(message => message.delete()).catch(err => { return });
                require('quick.db').delete(`DeleteOpen_${button.channel.id}`);
            } else if (button.id == 'createTicketTrue') {
                var msg = require('quick.db').fetch(`DeleteOpen_${button.channel.id}`);
                button.channel.messages.fetch(msg).then(message => message.delete()).catch(err => { return });
                require('quick.db').delete(`DeleteOpen_${button.channel.id}`);
                button.guild.channels.create(`ticket-${button.clicker.user.username}`, {
                    permissionOverwrites: [{
                            id: button.clicker.user.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        },
                        {
                            id: require('quick.db').fetch(`TicketAdminRole_${button.guild.id}`),
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        }, {
                            id: button.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"]
                        }
                    ],
                    type: 'text'
                }).then(async function(channel) {
                    require('quick.db').set(`TicketControl_${channel.id}`, button.clicker.user.id);
                    let btn = new MessageButton()
                        .setStyle("grey")
                        .setEmoji("🔒")
                        .setID("configTicket");
                    let row = new MessageActionRow()
                        .addComponent(btn);
                    channel.send(`<@${button.clicker.user.id}>`, {
                        embed: {
                            description: `Please wait for a **ADMIN** response!!
                    Press **"🔒"** to close this ticket`,
                            color: 0x2F3136
                        },
                        component: row
                    });
                });
            } else if (button.id == 'renameTicketFalse') {
                var msg = require('quick.db').fetch(`DeleteRenameMessage_${button.channel.id}`);
                button.channel.messages.fetch(msg).then(message => message.delete()).catch(err => { return });
                require('quick.db').delete(`DeleteRenameMessage_${button.channel.id}`);
            } else if (button.id == 'renameTicketTrue') {
                var msg = require('quick.db').fetch(`DeleteRenameMessage_${button.channel.id}`);
                button.channel.messages.fetch(msg).then(message => message.delete()).catch(err => { return });
                button.channel.setName('ticket-' + require('quick.db').fetch(`RenameTicket_${button.channel.id}`));
                button.channel.send({
                            embed: {
                                title: '✅',
                                description: `this ticket name has been renamed to \`${require('quick.db').fetch(`RenameTicket_${button.channel.id}`)}\``,
                    color: 0x00D700
                }
            })
            require('quick.db').delete(`DeleteRenameMessage_${button.channel.id}`);
        }
    } catch (err) {
        console.log(err)
    }
})
