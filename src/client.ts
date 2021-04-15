import Glob from 'glob';
import consola, { Consola } from 'consola';
import { promisify } from 'util';
import { Client, Message, Collection, Intents, MessageEmbed, MessageEmbedOptions } from 'discord.js';
import { Config } from './types/config';
import { Command } from './types/command';
import { Event } from './types/event';

class Bot extends Client {
    public globPromise = promisify(Glob);
    public Config: Config;
    public logger: Consola = consola;
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public constructor() {
        super({ ws: { intents: Intents.ALL } })
    }
    public async start(config: Config): Promise<any> {
        this.Config = config;
        this.login(config.token);
        const commandFiles: string[] = await this.globPromise(`${__dirname}/commands/**/*{.ts,.js}`);
        commandFiles.map(async(value: string) => {
            const file: Command = await import(value);
            this.commands.set(file.name, file);
            this.logger.info(`Success load command: ${file.name}`);
        });
        const eventFiles: string[] = await this.globPromise(`${__dirname}/events/**/*{.ts,.js}`);
        eventFiles.map(async(value: string) => {
            const file: Event = await import(value);
            this.events.set(file.name, file);
            this.on(file.name, file.run.bind(null, this));
        });
    }
    public embed(options: MessageEmbedOptions): MessageEmbed {
        return new MessageEmbed({ ...options, color: 'RANDOM' }).setTimestamp();
    }
}

export { Bot }