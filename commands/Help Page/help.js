const Discord = require('discord.js');
const disbut = require("discord-buttons");
const { MessageMenuOption, MessageMenu } = require("discord-buttons");
const db = require("quick.db")
const { MessageButton } = require("discord-buttons")
const { MessageActionRow } = require("discord-buttons")
const emoji = require('../../emoji.json')

module.exports = {
  name: "help",
   aliases: ["hlp"],
  run: async (client, message, args ) => {
    const prefix = db.get(`guild_${message.guild.id}_prefix`) || ',';
      //--------------------------------------S T A R T---------------------------------------
        const embed = new Discord.MessageEmbed() 
        .setTitle(`${emoji.category} **__My Features__**`) 
        .setDescription(`> One of the Best ${emoji.mod} **Al In One Discord Bot!** **Moderation**, Info, **Utility**, **Economy**, And Also A New Awesome ${emoji.security} **Security** System! ${emoji.discordlogo} Many **Minigames** And ${emoji.fun} **Fun Commands** (200+) ${emoji.settings} **Administration** and **Auto-Moderation** and Way Much More!`)
      .addField(`${emoji.question} **__How Do You Use Me?__**`,
      `>>> __Add The Bot To Your Discord Server__
      Type \`${prefix}howtouse\` And Get Information ${emoji.tree}`)
      .addField(`**${emoji.dot} Uptime Command Info**`, `>>> Uptimer Is An Free Discord Bot That Allows You To Make Your Projects ( Bot ) Online 24/7 Just By Using A **Single** Command.,
        __Uptimer Commands__${emoji.tree}
      \`add\` \`howtouse\` \`ping\` \`project\` \`remove\` \`stats\` \`total\` \`uptime\``)
      .addField(":chart_with_upwards_trend: **__STATS:__**",
      `>>> ${emoji.king} **${client.commands.map(a=>a).length} Commands**
     <:774623574496378891:906270705124016169> on **${client.guilds.cache.size} Servers**
    <:875933762972692510:912944567706333196> **\`${Math.floor(client.ws.ping)}ms\` Ping**`)
        .setColor("RANDOM")
        .setImage('https://share.creavite.co/6gmEGO1wSmlSSMac.gif')
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setFooter(`Requested By ${message.author.username}`)
        .setFooter('Page 1/12' , client.user.displayAvatarURL({ dynamic: true}))
        .setTimestamp()
        const embed1 = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`${emoji.admin} Admin & Moderation | ${emoji.sucess} **ENABLED**`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .addField("<a:mod:915553535641411595> Admin commands",`>>> \`addrole\`   \`ban\`  \`dm\`  \`hackban\`  \`kick\`  \`lock\`  \`nuke\`  \`removerole\`  \`addemoji\`  \`unban\`  \`unlock\`  \`welcometoggle\` \`idpassword\` `)
        .addField(" <a:mod:915553535641411595> Moderation",`>>> \`purge\`  \`resetwarns\`  \`Userid\`  \`lockchannel\`  \`mute\`  \`purge\`  \`say\`   \`slowmode\`  \`unlockchannel\`  \`unmute\`  \`warn\`  \`warnings\`  \`Userinfo\``)
        .setColor("RANDOM")
        .setFooter('Page 2/12', client.user.displayAvatarURL({ dynamic: true}))
        .setTimestamp()
        
        const embed2 = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emoji.fun} Fun & General | ${emoji.sucess} **ENABLED**`)
        .addField("<:lol:916024389168943185> Fun Commands", `>>> \`deepfry\`  \`coinflip\`  \`corona\` , \`drake\`  \`eightball\`  \`flipcoin\`  \`google\`  \`hack\`  \`hangman\`  \`hug\`  \`joke\`  \`meme\` \`ship\`  \`slap\`  \`snake\`  \`snipe\`  \`sudo\`  \`tictactoe\`  \`triggered\` \`trivia\`  \`tictactoe\`  \`youtube\` \`clyde\` \`afk\`  \`howgay\``)
        .addField("<a:settings:915999243410473010> General Commands", `>>> \`afk\` \`akinator\` \`ascii\` \`base64\`, \`battleship\`  \`choose\` \`colar\` \`country\` \`dashboard\` \`emojify\` \`fristmesssage\` \`invite\`  \`leaderboard\` \`postion\` \`reverse\` \`rps\` \`servericon\` \`servericon\` \`support\` \`trivia\` \`lb\` \`weather\` `)
       .addField("<:m_:915553543052742676> School Commands", `>>> \`gmail\`  \`remind\` \`spacepics\`, `)
        .setColor("RANDOM")
        .setFooter('Page 3/12' , client.user.displayAvatarURL({ dynamic: true}))
        .setTimestamp()

        const embed3 = new Discord.MessageEmbed()
        .setColor("RED")
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emoji.discordlogo} Uptime & Information | ${emoji.sucess} **ENABLED**`)
        .addField("<:m_:915553543052742676> Uptime Commands",`>>> \`add\`  \`howtouse\`  \`ping\`  \`projects\`  \`remove\`  \`stats\`  \`total\`  \`uptime\``)
        .addField("<a:settings:915999243410473010> Information",`>>> \`botinfo\`   \`botinvite\`  \`report-bug\`  \`commandscount\`  \`developer\`  \`djs\`  \`feedback\`  \`github\`  \`help\`  \`info\`  \`roleinfo\`  \`serverinfo\`  \`userinfo\` \`status\` \`leaderboard\` \`covid\` \`firstmessage\` \`add-these\` \`trivia\` \`screenshot\``)
        .addField("<a:settings:915999243410473010> Programming",`>>> \`coliru\`   \`compile\`  \`npm\`  \`github\`  \`httpsstatus\`  \`npmpgsize\` `)
        .setColor("RANDOM")
        .setFooter('Page 4/12' , client.user.displayAvatarURL({ dynamic: true}))
        .setTimestamp()

        

        const embed5 = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emoji.music} Music & Filter | ${emoji.sucess} **ENABLED**`)
        .addField("**<a:logo:915553528666288138> Music Commands**", `>>> \`addprevious\` \`autoplay\` \`clearqueune\`  \`forward\` \`grab\` \`join\` \`jump\` \`loop\` \`loopqueue\` \`loopsong\` \`lyrics\` \`move\` \`moveme\` \`nowplaying\` \`pause\` \`play\` \`playlist\` \`playmusicmix\` \`playprevious\` \`playsc\` \`playskip\` \`playskipsc\` \`playtop\` \`queue\` \`queuestatus\` \`removedupes\` \`removetrack\` \`removevoteskip\` \`restart\` \`resume\` \`rewind\` \`search\` \`searchsc\` \`seek\` \`shufftle\` \`skip\` \`stop\` \`unshuffle\` \`volume\``)
        .addField("**<a:logo:915553528666288138> Filter Commands**",`>>> \`3d\` \`bassboost\` \`china\` \`chipmunk\` \`cleareq\` \`clearfilter\` \`darthvader\` \`rqualizer\` \`nightcore\` \`pitch\` \`rate\` \`slowmo\` \`speed\` \`tremolo\` \`vibrate\` \`vibrato\``)
        .setColor("RANDOM")
        .setFooter('Page 6/12' , client.user.displayAvatarURL({ dynamic: true}))
        .setTimestamp() 

        const euembed = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emoji.utility} Utility & Economy | ${emoji.sucess} **ENABLED**`)
        .addField(`${emoji.discordlogo} Utility`, `>>> \`advice\` \`announce\` \`binary\` \`members\` \`membercount\` \`minecraft\` \`poll\` \`prefix\` \`rank\` \`serverinfo\` \`shortener\` \`whatsapp\` \`worldclock\` \`yt\` \`backupcreate\` \`backupload\` \`backupinfo\` \`hastbin\` \`iphonex\` \`anime\``)
        .addField(":money_with_wings: Economy", `>>> \`addmoney\` \`balance\` \`beg\` \`daily\` \`deposite\` \`removemoney\` \`top\` \`withdraw\` \`pay\` \`avatarfusion\` \`sell\` \`slots\` \`weekly\` \`leaderboard\``)
        .setColor("RANDOM")
        .setFooter('Page 7/12' , client.user.displayAvatarURL({ dynamic: true}))
        .setTimestamp()
 
        const setupembed = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emoji.mod} Setup & SoundBoard | ${emoji.sucess} **ENABLED**`)
        .addField("**<a:logo:915553528666288138>SoundBoard Comand**", `>>> \`ahh\` \`ahshit\` \`araara\` \`areyoucomedyme\` \`bruh\` \`fart\` \`gameover\` \`habhaikeselagi\` \`hellmpmotherfucker\` \`hoya\` \`john-cena\` \`lajkinab\` \`laugh\` \`margayamc\` \`nani\` \`nikallaude\` \`noob\` \`phintro\` \`pikachu\` \`rickroll\` \`sheesh\` \`suprise\` \`wow\` \`yeet\` `)
       .setColor("RANDOM")
        .setFooter('Page 8/12' , client.user.displayAvatarURL({ dynamic: true}))
       .setTimestamp()
   
        const ownere = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emoji.developer} Owner & Giveaway | ${emoji.sucess} **ENABLED**`)
        .addField(`**<a:Crown:915553532101414922> Bot Owner Commands**`, `>>>  \`eval\` \`serverlist\` \`leaveserver\` \`changestatus\` \`block\` \`unblock\` `)
        .addField("**<a:Crown:915553532101414922> Giveaway**", ">>> \`start\` \`create` \`end\` \`reroll\`")
        .addField("**📤 Suggestion**", ">>> \`suggeest\` \`sreply\` \`setsuggest\`")
        .setColor("RANDOM")
        .setFooter('Page 9/12' , client.user.displayAvatarURL({ dynamic: true}))
        .setTimestamp()

         const automode = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emoji.mod} AutoMod & | ${emoji.sucess} **ENABLED**`)
        
        .addField("**<a:mod:915553535641411595> AutoMod Comands**", `>>> \`antialt\`, \`antilink\` \`autooffcial\` \`autooffciald\` \`autorole\` \`add-role-all\` `)
        .setColor("RANDOM")
        .setFooter('Page 10/12' , client.user.displayAvatarURL({ dynamic: true}))
        .setTimestamp()

        const expired = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`${emoji.error} This Help Menu Is Expired!\n Retype:\`${prefix}help\` To Do Again!`)
        .setColor("RANDOM")
        .setFooter('Page 11/12' , client.user.displayAvatarURL({ dynamic: true}))
        .setTimestamp()
       
      
        //-----------------------------OPTIONS----------------------

        let option1 = new MessageMenuOption()
        .setLabel('Admin & Moderation')
        .setEmoji('892090597433823323')
        .setValue('option1')
        .setDescription('Use Admin & Moderation Commands')

        let option2 = new MessageMenuOption()
        .setLabel('Fun , School & General')
        .setEmoji('915999243410473010')
        .setValue('option2')
        .setDescription('Use Fun , School & General Commands')

        let option3 = new MessageMenuOption()
        .setLabel('Uptime , Information & Programming')
        .setEmoji('917049346476883970')
        .setValue('option3')
        .setDescription('Use Uptime & Information & Programming Commands')

        let music = new MessageMenuOption()
        .setLabel('Music & Filter')
        .setEmoji('891240754993844244')
        .setValue('music')
        .setDescription('Use Music & Filter Commands!')

        let home = new MessageMenuOption()
        .setLabel('Home')
        .setEmoji('915999243410473010')
        .setValue('home')
        .setDescription('Return To Home')

        let owner = new MessageMenuOption()
        .setLabel('Owner , Giveaway & Suggestion')
        .setEmoji('892078131765190686')
        .setValue('owner')
        .setDescription('Use Onwer & Giveaway Commands!')

        let auto = new MessageMenuOption()
        .setLabel('Auto mode')
        .setEmoji('891459284183941170')
        .setValue('auto')
        .setDescription('Use Automode Commands!')

         let cmdsetup = new MessageMenuOption()
        .setLabel('Setup & SoundBoard')
        .setEmoji('891421874884599808')
        .setValue('setup')
        .setDescription('Use Setup & SoundBoard Commands!')

        let ue = new MessageMenuOption()
        .setLabel('Ultility & Economy')
        .setEmoji('💰')
        .setValue('ue')
        .setDescription('Use Ultility & Economy!')

    let select = new MessageMenu()
        .setID('selector')
        .setPlaceholder('.Exe Help Menu!')
        .setMaxValues(1)
        .setMinValues(1)
        .addOptions(home, option1, option2, option3, music, owner, auto, ue, cmdsetup)

        //-----------------------------OPTIONS----------------------
    
    const Sendmenu = await message.channel.send(embed, select);
    const filter = ( button ) => message.guild;
    let collector = Sendmenu.createMenuCollector(filter, { time : 180000 });
    collector.on("collect", (b, menu) => {
      if(b.clicker.id !== message.author.id) return b.reply.send(`${emoji.error} <@${b.clicker.id}> You Can't Use That!`, true)
        if(b.values[0] == "option1") {
            Sendmenu.edit(embed1, select, true)
        }

        if(b.values[0] == "option2") {
            Sendmenu.edit(embed2, select, true)
        }

        if(b.values[0] == "option3") {
            Sendmenu.edit(embed3, select, true)
        }

        if(b.values[0] == "music") {
          Sendmenu.edit(embed5, select, true)
        }

        if(b.values[0] == "owner") {
          Sendmenu.edit(ownere, select)
        }
        if(b.values[0] == "auto") {
         Sendmenu.edit(automode, select)
        }
        if(b.values[0] == "home") {
          Sendmenu.edit(embed, select, true)
        }

        if(b.values[0] == "ue") {
          Sendmenu.edit(euembed, select)
        }
        if(b.values[0] == "setup") {
          Sendmenu.edit(setupembed, select)
        }

        b.reply.defer();

    collector.on("end", (b) => {
        Sendmenu.edit(expired)
    })
    })
 
  }
}

