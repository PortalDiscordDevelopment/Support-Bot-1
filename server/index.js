const Discord = require('discord.js');
const client = new Discord.Client();
const Server = require("./src/core/Server");
const Metadata = require("./src/utils/Metadata");

client.on('message', async msg => {
    if (msg.author.bot) return;
    if (!msg.channel.guild) return;

    if (msg.content === "%new") {
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

    //io.emit('chat message', { author: msg.author.username, content: msg.content });
});

client.login('NjQzNDEyNTI0NjQ1MjIwMzcz.Xr_m6g.47qoTcggD8O9QcR5KosWNqMIIfs').then(() => {
    console.log(`Discord bot connected as ${client.user.tag}!`);
    new Server(client).start();
});