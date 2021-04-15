import { RunFunction } from '../../types/event';
import { VoiceState } from 'discord.js';

const name: string = 'voiceStateUpdate';
const run: RunFunction = async(client, oldState: VoiceState, newState: VoiceState) => {
    if(newState.member.user.bot == false || oldState.member.user.bot == false) return
    const listofallbot = newState.guild.members.cache || oldState.guild.members.cache
    const musicbot = listofallbot.filter(a => a.user.bot == true && a['_roles'].includes(String(process.env.musicbotroleid)))
    // @ts-ignore
    const channeltargetedmessages = await (client.channels.cache.find(channel => channel.id == String(process.env.updatechannel))).messages.fetch();
    const latestmessage = channeltargetedmessages.filter(a => a.author.id == client.user.id).first()
    const embed = client.embed({ title: 'Available bot:', description: String(musicbot.map(e => `${e.voice.channelID ? '❌' : '✅'} <@${e.id}>`).join('\n')) })
    latestmessage.edit(embed)
}

export { name, run }
