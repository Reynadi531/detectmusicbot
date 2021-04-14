import { RunFunction } from '../../types/event';
import { VoiceState, MessageEmbed } from 'discord.js';

const name: string = 'voiceStateUpdate';
const run: RunFunction = async(client, oldState: VoiceState, newState: VoiceState) => {
    if(newState.member.user.bot == false || oldState.member.user.bot == false) return
    const listofallbot = newState.guild.members.cache.filter(a => a.user.bot == true ) || oldState.guild.members.cache.filter(a => a.user.bot == true )
    const bothasperm = listofallbot.filter(a => a.hasPermission(['SPEAK', 'CONNECT']))
    // @ts-ignore
    const channelwewant = await (client.channels.cache.find(channel => channel.id == String(process.env.updatechannel)).messages.fetch()
    const messagefromus = channelwewant.filter(a => a.author.id == client.user.id)
    const latestmessage = messagefromus.first()
    const embed = new MessageEmbed({ title: 'Available bot:', description: String(bothasperm.map(e => `${e.voice.channelID ? '❌' : '✅'} <@${e.id}>`).join('\n')) })
    latestmessage.edit(embed)
}

export { name, run }
