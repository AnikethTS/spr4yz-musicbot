import { Client, GatewayIntentBits } from "discord.js";
import { DisTube } from "distube";
import { YouTubePlugin } from "@distube/youtube";
import keepAlive from "./keep_alive.js";

keepAlive();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.distube = new DisTube(client, {
  plugins: [new YouTubePlugin()]
});

client.on("clientReady", () => {
  console.log(`🎵 Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!play")) {
    if (!message.member.voice.channel)
      return message.reply("❌ Join a voice channel first!");

    const song = message.content.replace("!play ", "");

    try {
      await client.distube.play(message.member.voice.channel, song, {
        textChannel: message.channel,
        member: message.member,
      });
    } catch (e) {
      console.error(e);
      message.reply("⚠️ Error playing that song.");
    }
  }

  if (message.content === "!pause") {
    client.distube.pause(message);
    message.reply("⏸ Paused!");
  }

  if (message.content === "!resume") {
    client.distube.resume(message);
    message.reply("▶ Resumed!");
  }

  if (message.content === "!skip") {
    client.distube.skip(message);
    message.reply("⏭ Skipped!");
  }
});

client.login(process.env.TOKEN);
