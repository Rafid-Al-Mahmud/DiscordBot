const fs = require('fs');
const { Client, IntentsBitField } = require('discord.js');
const { REST, Routes } = require('discord.js');
const myIntents = new IntentsBitField();
myIntents.add(IntentsBitField.Flags.GuildPresences, IntentsBitField.Flags.GuildMembers);
const client = new Client({ intents: myIntents });
const prefix = '-'
const TOKEN = 'MTAzNzAzMjc0MjkxNjk5NzIyMQ.GKBMfm.84owBAvs5zb4Ne96wlsfVtC8LGr5dGmHXE86uQ';
const CLIENT_ID = "1037032742916997221";
const { SlashCommandBuilder } = require('@discordjs/builders');

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    new SlashCommandBuilder().setName('time').setDescription('Get current time of your device'),
    new SlashCommandBuilder().setName('rafid').setDescription('Get current time of your device'),
    new SlashCommandBuilder().setName('ideal-school').setDescription('Get Photo'),
    new SlashCommandBuilder().setName('isc').setDescription('Get Photo'),
    new SlashCommandBuilder().setName('yt').setDescription('Our Youtube Channel'),
    new SlashCommandBuilder().setName('yt-videos').setDescription('Our Videos'),
    new SlashCommandBuilder().setName('yt-videos-all').setDescription('Our Videos'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const yt = {
    channel: "https://www.youtube.com/channel/UC4CK4lIBaakhBGjdtlqUlTA",
    videos:
        [
            "https://www.youtube.com/channel/UC4CK4lIBaakhBGjdtlqUlTA/videos",
            "https://youtu.be/f1P72QJLo1w",
            "https://youtu.be/DbYcNU2rp3M",
            "https://youtu.be/AaD6GswIGVc"
        ]
};

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    let hours = new Date().getHours();
    if (hours>12) hours-=12;
    let am_pm = (new Date().getHours()>12)? "p.m.":"a.m.";

    let i = 0;
    const cmd = interaction.commandName;
    if (cmd === 'ping') await interaction.reply('Pong!');
    else if (cmd === 'ideal-school' || cmd === 'isc') await interaction.reply('https://iscmedu.com/cmsfiles/images/MBRANCH.png');
    else if (cmd === 'yt') await interaction.reply(`Youtube: ${yt.channel}`);
    else if (cmd === 'yt-videos') await interaction.reply(`Youtube: ${yt.videos[0]}`);
    else if (cmd === 'yt-videos-all') {await interaction.reply(`
        Youtube Videos
        Video 1: ${yt.videos[1]}
        Video 2: ${yt.videos[2]}
        Video 3: ${yt.videos[3]}
    `);}
    else if (cmd === 'note') {y
        
        await interaction.reply(`Enter text`);
        fs.writeFile('db.json', data, function (err) {
            if (err) throw err;
            console.log('New data added! Write request no: '+i);
            i++
        });
    }
    else if (cmd === "time") await interaction.reply(`Time
    24 Hours Format - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}
     12 Hours Format - ${hours}:${new Date().getMinutes()+" "+am_pm}
    `);
    else if (cmd === "rafid") await interaction.reply(`One of Staff of this server.`);
});

client.login(TOKEN);

/*
client.[once/on]
client.once('messege', messege => {
    if(!messege.content.startWith(prefix) || messege.auther.bot) return;
    const args = messege.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === 'ping')messege.channel.send('pong!');
});*/
