const { MessageEmbed } = require("discord.js")
const { MessageButton } = require('discord-buttons')
const emoji = require('../../emoji.json')

module.exports = {
	name: "developer",
	category: "🔰 Info",
	aliases: ["dev", "sakshyam"],
	description: "*Shows Information About The Developer*",
	useage: "developer",
	run: async (client, message, args) => {
		try {
			let button_public_invite = new MessageButton().setStyle('url').setLabel('Invite Our Bot').setURL("https://dsc.gg/sundaybot")
			let button_support_dc = new MessageButton().setStyle('url').setLabel('Support Server').setURL("https://discord.gg/3Km6XE25pe")
			let button_invite = new MessageButton().setStyle('url').setLabel('Bot List Website').setURL(`https://topicz.xyz/`)
			const allbuttons = [button_public_invite, button_support_dc, button_invite]
			message.channel.send({embed: new MessageEmbed()
				.setColor("RANDOM")
				.setFooter("")
				.setTimestamp()
				.setThumbnail("https://images-ext-2.discordapp.net/external/oUP4U0sZ33M7Pe1e1zfP4TRckF04yemZvFs_owvBJHQ/%3Fsize%3D512/https/cdn.discordapp.com/avatars/745581095747059722/ca13e740175a778d779cd2f8d0e4084e.webp?width=410&height=410")
				.setTitle("- SΛКSHЏΛM \ Developer Of Uptimer")
				.setURL("https://discord.gg/3Km6XE25pe")
				.setDescription(`
 Hello I Am **BoyNight** <@882978452918128641>
Hyrox Is The Best Discord Bot With 300+ Commands!
 **Please Thank Our Contributors !**
 > <@810818118322225152>
 > <@831196752798547978>
 > <@745581095747059722>
 > <@440200028292907048>`),
buttons: allbuttons
			}).catch(error => console.log(error));
		} catch (e) {
			console.log(String(e.stack).bgRed)
			return message.channel.send(new MessageEmbed()
				.setColor("RANDOM")
				.setFooter("aaaa")
				.setTitle(`${emoji.error} An error occurred`)
				.setDescription(`\`\`\`${String(e.stack).substr(0, 2000)}\`\`\``)
			);
		}
	}
}