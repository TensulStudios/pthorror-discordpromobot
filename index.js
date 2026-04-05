require('dotenv').config();
const crypto = require('crypto');

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
   Events,
   EmbedBuilder
} = require('discord.js');

function generateDateEmbed()
{
   // https://github.com/TensulStudios/tapkey/blob/main/api/daily.js
   const now = new Date();
   const year = now.getUTCFullYear();
   const month = now.getUTCMonth() + 1;
   const day = now.getUTCDate();
 
   const seed = `${year}${month}${day}`;
   const hash = crypto.createHash('sha256').update(seed).digest('hex');
   const code = hash.slice(0, Math.min(64, parseInt(5))).replace(/[^0-9]/g, '');

   return new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('PT Hat Bot')
      .addFields(
         { name: '\u200B', value: `Today's code:\n\`\`\`\n${code}\n\`\`\``, inline: true }
      )
}

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
   client.channels.fetch('1490423167985127476').then(channel =>{
      channel.send({ embeds: [generateDateEmbed() ] })
   }).catch(console.error);
});

client.login(process.env.BOT_TOKEN);