import { SlashCommandBuilder, ChatInputCommandInteraction, MessageFlags } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a player from the server')

    .addUserOption(Option =>
        Option.setName('player')
        .setDescription('Enter the name of from the player who you want to ban')
        .setRequired(true)

    )

    .addStringOption(option =>
        option.setName('reason')
        .setDescription('Enter the reason for banning the player')
        .setRequired(true)
    );

    export async function execute(interaction: ChatInputCommandInteraction){

        const member = interaction.options.getUser('player');
        const reason = interaction.options.getString('reason');

        const memberTarget = interaction.guild?.members.cache.get(member?.id as string);

        if(!memberTarget){
            return interaction.reply({ content: `User not found`, flags: MessageFlags.Ephemeral });
        }

        if(!memberTarget.bannable){
            return interaction.reply({ content: `You cannot ban this user`, flags: MessageFlags.Ephemeral });

        }

        try{
            await memberTarget.send(`You have been banned from ${interaction.guild?.name} for reason: ${reason}`);
        } catch (error){
            console.error('could not send the DM to the user');
        }

        try{
            await memberTarget.ban({ reason: reason ?? 'No reason provided' }).then(() => {
                interaction.reply({ content: `Banned member ${member?.tag ?? member?.id} for reason: ${reason}`, flags: MessageFlags.Ephemeral});
            });
        } catch (error){
            console.error(`failed to ban member: ${error}`);

        }
    }
    
