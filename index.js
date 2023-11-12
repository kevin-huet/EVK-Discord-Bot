"use strict";
exports.__esModule = true;
var framework_1 = require("@sapphire/framework");
var discord_js_1 = require("discord.js");
var client = new framework_1.SapphireClient({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
    ],
    loadMessageCommandListeners: true
});
client.once('ready', function () {
    console.log("Logged in as ".concat(client.user.tag, "!"));
});
client.on(discord_js_1.Events.VoiceStateUpdate, function (oldState, newState) {
    var newChannel = newState.channel;
    if (!newChannel || !newChannel.name.includes('Discussion Générale')) {
        return;
    }
    var channels = newChannel.guild.channels.cache.filter(function (channel) {
        return channel.type === discord_js_1.ChannelType.GuildVoice && channel.name && channel.name.includes('Discussion Générale');
    });
    var emptyChannels = channels.filter(function (channel) {
        return channel.type === discord_js_1.ChannelType.GuildVoice && channel.members.size === 0;
    });
    if (emptyChannels.size === 0) {
        createGeneralChannel(channels.last());
    }
});
client.on(discord_js_1.Events.Raw, function (event) {
    var _a;
    // @ts-ignore
    var guild = client.guilds.cache.get((_a = event === null || event === void 0 ? void 0 : event.d) === null || _a === void 0 ? void 0 : _a.guild_id);
    console.log(guild);
});
function createGeneralChannel(channel) {
    if (!channel) {
        return;
    }
    var channelName = modifyNumberInString(channel.name);
    channel = channel;
    channel.guild.channels.create({
        name: channelName,
        type: discord_js_1.ChannelType.GuildVoice,
        parent: channel.parentId,
        position: channel.position
    })
        .then(function (channel) {
        console.log("Nouveau canal vocal cr\u00E9\u00E9 : ".concat(channel.name));
    })["catch"](function (error) {
        console.error(error);
    });
}
function modifyNumberInString(input) {
    var matches = input.match(/\d+/);
    if (matches) {
        // Si un nombre existe, ajoute 1
        var existingNumber = parseInt(matches[0], 10);
        var newNumber = existingNumber + 1;
        return input.replace(/\d+/, newNumber.toString());
    }
    else {
        // Si aucun nombre n'existe, ajoute 2 à la fin
        return input + ' 2';
    }
}
client.login('').then(function (r) { return console.log(); });
