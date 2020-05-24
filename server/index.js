const Discord = require('discord.js');
const client = new Discord.Client();
const Server = require("./src/core/Server");
const Metadata = require("./src/utils/Metadata");

require('dotenv').config();

client.on('message', async msg => {
    if (msg.author.bot) return;
    if (!msg.channel.guild) return;

    if (msg.content === "%new") {
        const DMChannelIds = Array.from(client.channels.cache.filter(channel => channel.type === "dm").keys());
        for (const DMChannelId of DMChannelIds) {
            const channel = await client.channels.fetch(DMChannelId);
            
            if (channel.authorID === msg.author.id) {
                const messages = channel.messages.cache.array();
                for (const message of messages.reverse()) {
                    if (Metadata.isMetadata(message.content)) {
                        const parsed = Metadata.parse(message.content);
            
                        if (parsed.action !== "close") {
                            return msg.channel.send(`<@${msg.author.id}>, you already have an open ticket. Please resolve it first before considering opening a new one! (REF # ${parsed.ticket})`);
                        }
                    }
                }
            }
        }
    
        const ticket = Array(8).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');

        const metadata = {
            guild: msg.guild.id,
            ticket,
            action: "open"
        };
    
        await msg.author.send(`__**New Support Ticket # ${ticket}**__`);
        await msg.author.send(Metadata.generate(metadata));
        await msg.author.send(`Dear ${msg.author.username},\nYour ticket has successfully been created. Your ticket ID is ${ticket}.\nYou can now write a message, an agent will answer you as soon as possible.`)
    }
});

client.login(process.env.BOT_TOKEN).then(() => {
    console.log(`Discord bot connected as ${client.user.tag}!`);
    new Server(client).start();
});