require('dotenv').config();
const crypto = require('crypto');

const {
   Client,
   GatewayIntentBits,
   Partials,
   PresenceUpdateStatus,
   Events,
   EmbedBuilder
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

function generateCode() {
   const now = new Date();
   const hash = crypto.createHash('sha256').update(`${now.getUTCFullYear()}${now.getUTCMonth() + 1}${now.getUTCDate()}`).digest();
   return (hash.readUInt32BE(0) % 100000).toString().padStart(5, '0');
}

async function postDailyCode(channel) {
   const hash = crypto.createHash('sha256').update(`${now.getUTCFullYear()}${now.getUTCMonth() + 1}${now.getUTCDate()}`).digest();
   const code = (hash.readUInt32BE(0) % 100000).toString().padStart(5, '0');
   return channel.send({ embeds: [new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('PT Hat Bot')
      .addFields({ name: '\u200B', value: `Today's code:\n\`\`\`\n${code}\n\`\`\``, inline: true })
   ]});
}

function scheduleMidnightRefresh(channel) {
   const now = new Date();
   const msUntilMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)) - now;

   setTimeout(async () => {
      if (cachedMessage) await cachedMessage.delete().catch(console.error);
      cachedMessage = await postDailyCode(channel);
      scheduleMidnightRefresh(channel);
   }, msUntilMidnight);
}

let cachedMessage = null;

client.once(Events.ClientReady, async () => {
   console.log('Bot is online!');
   client.user.setStatus(PresenceUpdateStatus.Online);

   const channel = await client.channels.fetch('1490423167985127476');
   cachedMessage = await postDailyCode(channel);
   scheduleMidnightRefresh(channel);
});

client.login(process.env.BOT_TOKEN);
