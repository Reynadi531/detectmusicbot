import { RunFunction } from '../../types/command';
import { MessageEmbed } from 'discord.js'

const name: string = 'checkbot';
const description: string = 'Check available music bot';
const category: string = "Utility";
const aliases: string[] = ['cb'];
const run: RunFunction = async(client, message) => {
    const listofallbot = message.guild.members.cache.filter(a => a.user.bot == true )
    const bothasperm = listofallbot.filter(a => a.hasPermission(['SPEAK', 'CONNECT']))
    const embed = new MessageEmbed({ title: 'Available bot:', description: String(bothasperm.map(e => `${e.voice.channelID ? '❌' : '✅'} <@${e.id}>`).join('\n')) })
    message.channel.send(embed)
}

export { name, description, run, category, aliases }