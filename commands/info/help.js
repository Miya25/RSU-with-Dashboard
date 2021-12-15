const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const emoji = require('../../emoji.json')
const { default_prefix } = require("./../../config.json");
const { MessageButton, MessageActionRow } = require('discord-buttons')

module.exports = {
  name: "oldhelp",
  aliases : ['?'],
  description: "Shows all available bot commands.",
  run: async (client, message, args) => {

    if (!args[0]) {
      let categories = [];

      const emoji = {
       info: "<a:settings:915999243410473010>",
       admin: "<a:mod:915553535641411595>",
       uptimer: "<:m_:915553543052742676>",
       general: "<:cpu:916025537242206358>",
       owner: "<a:Crown:915553532101414922>",
       giveaway: "<a:Giveaway:847688270833647616>",
       moderation: "<a:mod:915553535641411595>",
       fun: "<a:emoji_16:915553559729291264>",
       ultility: "<a:settings:915999243410473010>",
       chatbot: "<a:chat:916191808336314369>",
       music: "<a:logo:915553528666288138>",
       ticket: "<a:ticket:916192051085836288>",
       image: "<:image:915553527051452426>",
       nsfw: "",       
       music: "<a:logo:915553528666288138>",
       }


      readdirSync("./commands/").forEach((dir) => {
        const e = `${emoji[dir]} ${dir.toLocaleUpperCase()}`
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "`In Progress.`";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: e,
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const invite = new MessageButton()
      .setStyle('url')
      .setLabel("Invite Me")
      .setURL("https://discord.com/api/oauth2/authorize?client_id=872733933018693684&permissions=2147875904&scope=bot")
     .setEmoji("872032870099714088")
    const support = new MessageButton()
      .setStyle('url')
      .setLabel("Support Server")
      .setEmoji("872035574427578398")
      .setURL("https://discord.gg/Zm2sEAmjHf")
    const tutorial = new MessageButton() // prettier
      .setStyle('url')
      .setLabel("Tutorial Video")
      .setURL("https://www.youtube.com/")
      .setEmoji("872035032846454805")

      const contents =
      "<a:un_arrow1:851463725688160297> ***Uptimer*** **Is An Free Discord Bot That Allows You To Make Your Projects ( Bot ) Online 24/7 Just By Using A Single Command.**";

      const embed = new MessageEmbed()
        .setTitle("<a:793968555188027392:847688082097569803> Here Are My Commands")
        .setDescription(contents)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true}))
        .addFields(categories)
        .setFooter(
          `Requested By ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor('#303136');

      let row = new MessageActionRow()
      .addComponents(invite, support, tutorial);

       message.channel.send(embed, row);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${default_prefix}help\` for all of my commands!`)
          .setColor("#303136");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${default_prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${default_prefix}${command.name} ${command.usage}\``
            : `\`${default_prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested By ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor("#303136");
      return message.channel.send(embed);
    }
  },
};
