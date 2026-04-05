require('dotenv').config();

const deployCommands = async () => {
   
}

const {
   REST,
   Routes,
   Client,
   GatewayIntentBits,
   Partials,
   Collection,
   ActivityType,
   PresenceUpdateStatus,
   Events
} = require('discord.js');

const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences
   ],
   partials: [Partials.Message, Partials.Channel, Partials.User, Partials.GuildMember]
})

client.once(Events.ClientReady, () => {
   console.log('Bot is online!');
   client.user.setActivity('PT Horror', { type: ActivityType.Watching });
   client.user.setStatus(PresenceUpdateStatus.Online);
});

client.login(process.env.BOT_TOKEN);