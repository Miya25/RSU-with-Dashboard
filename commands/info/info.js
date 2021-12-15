const { MessageEmbed } = require("discord.js");
const { dependencies } = require("../../package.json");
const moment = require("moment");
const os = require("os");
const emoji = require('../../emoji.json')
const osutils = require("os-utils");
require("moment-duration-format");

module.exports = {
  name: "info",
  description: "*Shows Info About Uptimer*",
  category: "uptime",
  botPermission: [],
  authorPermission: [],
  ownerOnly: false,
  run: async (client, message, args) => {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("***.Exe Stats***")
      .setDescription("** General Information**")
      .addField(`${emoji.owner} Developers", " <@852749695020564490> **,** <@745581095747059722>`)
      .addField(`${emoji.servers} Guilds Count`, "```" + client.guilds.cache.size + "```", true)
      .addField(`${emoji.member} Members Count`, "```" + client.guilds.cache.reduce((a, g) => a + g.memberCount, 0) + "```", true)
      .addField(`${emoji.channel} Channels Count`, "```" + client.channels.cache.size + "```", true)
      .addField("⏳ Uptime", `\`${duration}\``, true)
      .addField("🏓 Ping", "`" + Math.round(client.ws.ping) + "ms`", true)
      .addField(`${emoji.micro}  Platform`, "`" + capitalize(osutils.platform()) + "`", true)
      .addField(`${emoji.djs} Discord.js`, "`" + dependencies["discord.js"].replace("^", "v") + "`", true)
      .addField(`${emoji.node.js} Node`, "`" + process.version + "`", true)
      .addField(`${emoji.cpu} CPU`, "```Intel(R) Xeon(R)```")
      .addField(`${emoji.ram} Total Memory`, "```" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1] + "MB```")
      .addField(`${emoji.ram} RAM Usage (VPS)`, `\`\`\`${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}MB (${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[1]}%)\`\`\``)
      .addField(`${emoji.ram} RAM Usage (BOT)`, "```" + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB/" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1] + "MB " + `(${((100 * (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)) / osutils.totalmem().toString().split(".")[0]).toFixed(2)}%)` + "```")
      .addField("🔗 Useful Links", `[Support Server](https://discord.gg/Zm2sEAmjHf) | [Invite Me](https://discord.com/oauth2/authorize/?permissions=8&scope=bot&client_id=${client.user.id})`)
      .setFooter('Thanks For Using Me!')
    // I copied this from my bot XDDDD Lol
    message.channel.send(embed);
  }
}
