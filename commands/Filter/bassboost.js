const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require('../../emoji.json')
module.exports = {
  name: `bassboost`,
  category: `👀 Filter`,
  aliases: [`bb`],
  description: `Changes the Bass gain`,
  usage: `bassboost <none/low/medium/high>`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      let level = `none`;
      if (!args.length || (!client.bassboost[args[0].toLowerCase()] && args[0].toLowerCase() != `none`))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.error} Bass boost level must be one of the following: \`none\`, \`low\`, \`medium\`, \`high\`, \`earrape\``)
          .setDescription(`Usage: \`${prefix}bassboost <Level>\`\n\nExample: \`${prefix}bassboost low\``)
        );
      level = args[0].toLowerCase();
      switch (level) {
        case `none`:
          player.setEQ(client.bassboost.none);
          player.set("eq", "🎚 No Bass");
          player.set("filter", "🎚 No Bass");
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
            timescale: {
                  "speed": 1.0,
                  "pitch": 1.0,
                  "rate": 1.0
              },
          });
          break;
        case `low`:
          player.set("filter", "🎚 Low Bass");
          player.setEQ(client.bassboost.low);
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
          });
          break;
        case `medium`:
          player.set("filter", "🎚 Medium Bassboos");
          player.setEQ(client.bassboost.medium);
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
          });
          break;
        case `high`:
          player.set("filter", "🎚 High Bass");
          player.setEQ(client.bassboost.high);
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
          });
        case `earrape`:
          player.set("filter", "🎚 Earrape Bass");
          player.setEQ(client.bassboost.high);
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
          });
          break;
      }
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`${emoji.msg.SUCCESS} Bassboost set the to \`${level}\``)
        .setDescription(`Note: *It might take up to 5 seconds until you hear the new Equalizer*`)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        
        .setTitle(`${emoji.msg.ERROR} An error occurred`)
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
