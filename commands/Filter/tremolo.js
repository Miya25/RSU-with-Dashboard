const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require('../../emoji.json')
module.exports = {
  name: `tremolo`,
  category: `👀 Filter`,
  aliases: [``],
  description: `Applies a Tremolo Filter`,
  usage: `tremolo`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      player.node.send({
        op: "filters",
        guildId: message.guild.id,
        equalizer: player.bands.map((gain, index) => {
            var Obj = {
              "band": 0,
              "gain": 0,
            };
            Obj.band = Number(index);
            Obj.gain = Number(gain)
            return Obj;
          }),
        tremolo: {
            "frequency": 4.0, // 0 < x
            "depth": 0.75      // 0 < x ≤ 1
        },
      });
      player.set("filter", "🏮 Tremolo");
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        
        .setTitle(`${emoji.msg.SUCCESS} Applying the \`TREMOLO\` Filter`)
        .setDescription(`Note: *It might take up to 5 seconds until you hear the Filter*`)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        
        .setTitle(`${emoji.error} An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
