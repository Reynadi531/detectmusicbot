import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../types/command';

const name: string = 'ping';
const description: string = 'Return ping value to the bot';
const category: string = "Utility";
const aliases: string[] = ['p'];
const run: RunFunction = async(client, message) => {
    return message.channel.send('Pinging...').then(sent => {
        sent.edit(client.embed({ title: `ā Roundtrip latency: ${sent.createdTimestamp - message.createdTimestamp}ms\nā WebSocket: ${client.ws.ping}ms` }));
    });
}

export { name, description, run, category, aliases }