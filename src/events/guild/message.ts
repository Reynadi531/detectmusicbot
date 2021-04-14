import { Command } from '../../types/command';
import { RunFunction } from '../../types/event';
import { Message } from 'discord.js';

const name: string = 'message';
const run: RunFunction = async(client, message: Message) => {
    if(message.author.bot || !message.guild) return;
    if(!message.content.startsWith(client.Config.prefix)) return
    const args: string[] = message.content.slice(client.Config.prefix.length).trim().split(/ +/g);
    const cmd: string = args.shift();

    const command: Command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    if(!command) return;
    if(!message.guild.me.hasPermission(command.permissionBot)) return message.reply("Bot doesn't have permission to execute the command")
    if(!message.member.hasPermission(command.permissionUser)) return message.reply("You don't have permission for this command")
    command.run(client, message, args).catch((reason: any) => message.channel.send(client.embed({ description: reason, title: 'Erorr ocure' }, message)))
}

export { name, run }