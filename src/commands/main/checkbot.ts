import { RunFunction } from '../../types/command';

const name: string = 'checkbot';
const description: string = 'Check available music bot';
const category: string = "Utility";
const aliases: string[] = ['cb'];
const run: RunFunction = async(client, message) => {
    const musicbot = message.guild.members.cache.filter(a => a.user.bot == true && a['_roles'].includes(String(process.env.musicbotroleid)))
    const embed = client.embed({ title: 'Available bot:', description: String(musicbot.map(e => `${e.voice.channelID ? '❌' : '✅'} <@${e.id}>`).join('\n')) })
    message.channel.send(embed)
}

export { name, description, run, category, aliases }