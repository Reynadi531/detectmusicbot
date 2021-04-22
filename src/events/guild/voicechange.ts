import { RunFunction } from '../../types/event';
import { VoiceState } from 'discord.js';

const name: string = 'voiceStateUpdate';
const run: RunFunction = async(client, oldState: VoiceState, newState: VoiceState) => {
    const configcollection = client.db.get('config')
    if(newState.member.user.bot == false || oldState.member.user.bot == false) return

    // if(docs.length == 0) return
    // console.log(docs)
    configcollection.find({ guildId: newState.guild.id }).then(async(docs) => {
        if(!docs[0]) return
        const { roleId, channelId } = docs[0]
        const listofallbot = newState.guild.members.cache || oldState.guild.members.cache
        const musicbot = listofallbot.filter(a => a.user.bot == true && a['_roles'].includes(String(roleId)))
        const channeltargetedmessages = client.channels.cache.find(channel => channel.id == String(channelId));
        // @ts-ignore
        const fetchedmessage = await channeltargetedmessages.messages.fetch()
        const latestmessage = fetchedmessage.filter(a => a.author.id == client.user.id).first()
        const embed = client.embed({ title: 'Available bot:', description: String(musicbot.map(e => `${e.voice.channelID ? '❌' : '✅'} <@${e.id}>`).join('\n')) })
        latestmessage.edit(embed)
    }).catch(err => console.error)
}

export { name, run }
