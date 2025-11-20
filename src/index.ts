import { Client, GatewayIntentBits } from "discord.js";
import { config } from "./config";
import path from "path";
import { handleCommands } from "./functions/handleCommands";
import { handleEvents } from "./functions/handleEvents";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
}) as Client;

const commandsPath = path.join(__dirname, "./commands");
const eventsPath = path.join(__dirname, "./events");

(async () => {
  await handleCommands(client, commandsPath);
  handleEvents(client, eventsPath);
  client.login(config.DISCORD_TOKEN);
})();