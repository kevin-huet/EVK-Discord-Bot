import {SapphireClient} from '@sapphire/framework';
import {
  VoiceState,
  GatewayIntentBits,
  BaseGuildVoiceChannel,
  ChannelType,
  Guild,
  Events,
  VoiceChannel,
  VoiceBasedChannel, GuildBasedChannel
} from 'discord.js';

const client = new SapphireClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
  loadMessageCommandListeners: true
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user!.tag}!`);
});

client.on(Events.VoiceStateUpdate, (oldState: VoiceState, newState: VoiceState) => {
  const newChannel = newState.channel;
  if (!newChannel || !newChannel.name!.includes('Discussion Générale')) {
    return;
  }
  const channels = newChannel.guild.channels.cache.filter((channel: GuildBasedChannel) => {
    return channel.type === ChannelType.GuildVoice && channel.name && channel.name.includes('Discussion Générale');
  });
  const emptyChannels = channels.filter((channel: GuildBasedChannel) => {
    return channel.type === ChannelType.GuildVoice && channel.members.size === 0;
  });
  if (emptyChannels.size === 0) {
    createGeneralChannel(channels.last());
  }
});

client.on(Events.Raw, (event) => {

  // @ts-ignore
  const guild = client.guilds.cache.get(event?.d?.guild_id);
  console.log(guild);
})

function createGeneralChannel(channel?: GuildBasedChannel) {
  if (!channel) {
    return;
  }
  const channelName = modifyNumberInString(channel.name);
  channel = <VoiceBasedChannel>channel;
  channel.guild.channels.create({
    name: channelName,
    type: ChannelType.GuildVoice,
    parent: channel.parentId,
    position: channel.position
  })
    .then((channel: any) => {
      console.log(`Nouveau canal vocal créé : ${channel.name}`);
    })
    .catch((error: any) => {
      console.error(error);
    });
}

function modifyNumberInString(input: string): string {
  const matches = input.match(/\d+/);

  if (matches) {
    // Si un nombre existe, ajoute 1
    const existingNumber = parseInt(matches[0], 10);
    const newNumber = existingNumber + 1;
    return input.replace(/\d+/, newNumber.toString());
  } else {
    // Si aucun nombre n'existe, ajoute 2 à la fin
    return input + ' 2';
  }
}

client.login(process.env.DISCORD_TOKEN).then(r => console.log());