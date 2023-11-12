"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const client = new framework_1.SapphireClient({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
    ],
    loadMessageCommandListeners: true
});
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on(discord_js_1.Events.VoiceStateUpdate, (oldState, newState) => {
    const newChannel = newState.channel;
    if (!newChannel || !newChannel.name.includes('Discussion Générale')) {
        return;
    }
    const channels = newChannel.guild.channels.cache.filter((channel) => {
        return channel.type === discord_js_1.ChannelType.GuildVoice && channel.name && channel.name.includes('Discussion Générale');
    });
    const emptyChannels = channels.filter((channel) => {
        return channel.type === discord_js_1.ChannelType.GuildVoice && channel.members.size === 0;
    });
    if (emptyChannels.size === 0) {
        createGeneralChannel(channels.last());
    }
});
client.on(discord_js_1.Events.Raw, (event) => {
    const guild = client.guilds.cache.get(event?.d?.guild_id);
    console.log(guild);
});
function createGeneralChannel(channel) {
    if (!channel) {
        return;
    }
    const channelName = modifyNumberInString(channel.name);
    channel = channel;
    channel.guild.channels.create({
        name: channelName,
        type: discord_js_1.ChannelType.GuildVoice,
        parent: channel.parentId,
        position: channel.position
    })
        .then((channel) => {
        console.log(`Nouveau canal vocal créé : ${channel.name}`);
    })
        .catch((error) => {
        console.error(error);
    });
}
function modifyNumberInString(input) {
    const matches = input.match(/\d+/);
    if (matches) {
        const existingNumber = parseInt(matches[0], 10);
        const newNumber = existingNumber + 1;
        return input.replace(/\d+/, newNumber.toString());
    }
    else {
        return input + ' 2';
    }
}
client.login('').then(r => console.log());
