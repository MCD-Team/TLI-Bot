import { CommandInteraction, SlashCommandBuilder, Client } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

export async function execute(interaction: CommandInteraction, client: Client) {
  return interaction.reply(`Pong! ${client.ws.ping}ms`);
}