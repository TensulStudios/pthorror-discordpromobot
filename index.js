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

client.once(Events.ClientReady, () => {
   console.log('Bot is online!');
   client.user.setStatus(PresenceUpdateStatus.Online);
   client.channels.fetch('1490423167985127476').then(channel => {
      const now = new Date();
      const hash = crypto.createHash('sha256').update(`${now.getUTCFullYear()}${now.getUTCMonth() + 1}${now.getUTCDate()}`).digest();
      const code = (hash.readUInt32BE(0) % 100000).toString().padStart(5, '0');
      
      channel.send({ embeds: [new EmbedBuilder()
         .setColor(0x0099ff)
         .setTitle('PT Hat Bot')
         .addFields({ name: '\u200B', value: `Today's code:\n\`\`\`\n${code}\n\`\`\``, inline: true })
      ]})
   }).catch(console.error);
});

client.login(process.env.BOT_TOKEN);