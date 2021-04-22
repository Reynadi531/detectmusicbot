import { RunFunction } from '../../types/command';

const name: string = 'setup';
const description: string = 'Setup check bot';
const category: string = "Utility";
const aliases: string[] = ['s'];
const run: RunFunction = async(client, message, args) => {
    const configcollection = client.db.get('config')
    if(args[0].toLowerCase() == 'delete') {
        configcollection.find({ guildId: message.guild.id }).then(docs => {
            if(docs.length == 0) return message.reply('No settings was saved')
            configcollection.remove({ guildId: message.guild.id }).then(e => {
                message.channel.send('Success remove settings')
            }).catch(err => {
                console.error(err)
                message.reply('Failed remove settings')
            })
        })
    }else {
        configcollection.find({ guildId: message.guild.id }).then(docs => {
            if(docs.length != 0) return message.reply('Settings already exist, please delete current settings');
            if(!message.mentions.roles.first() && !message.mentions.channels.first()) return message.reply('Please mention channel and role')
            configcollection.insert({ guildId: message.guild.id, channelId: message.mentions.channels.first().id, roleId: message.mentions.roles.first().id }).then(a => {
                message.channel.send('Success saving settings')
            }).catch(err => {
                message.reply('Failed saving settings')
                console.error(err)
            })
        }).catch(err => {
            message.reply('Failed load data')
            console.error(err)
        })
    }
}

export { name, description, run, category, aliases }