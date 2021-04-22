import { RunFunction } from '../../types/command';

const name: string = 'checkbot';
const description: string = 'Check available music bot';
const category: string = "Utility";
const aliases: string[] = ['cb'];
const run: RunFunction = async(client, message) => {
    const configcollection = client.db.get('config')
    configcollection.find({ guildId: message.guild.id }).then(docs => {
        if(docs.length == 0 ) return message.reply('Please settings the bot first')
        const musicbot = message.guild.members.cache.filter(a => a.user.bot == true && a['_roles'].includes(String(docs[0].roleId)))
        const embed = client.embed({ title: 'Available bot:', description: String(musicbot.map(e => `${e.voice.channelID ? '❌' : '✅'} <@${e.id}>`).join('\n')) })
        message.channel.send(embed)
    }).catch(err => {
        message.reply('Failed load data from database')
        console.error(err)
    })
}

export { name, description, run, category, aliases }