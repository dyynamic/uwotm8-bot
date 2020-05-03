// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
    client.user.setActivity(`discord.gg/QvyjkPs`);
});


client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.

    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot) return;

    // Also good practice to ignore any message that does not start with our prefix, 
    // which is set in the configuration file.
    if (message.content.indexOf(config.prefix) !== 0) return;

    // Here we separate our "command" name, and our "arguments" for the command. 
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    module.exports.run = async (bot, message, args) => {
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        };
        let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
        let region = {
            "brazil": ":flag_br: Brazil",
            "eu-central": ":flag_eu: Central Europe",
            "singapore": ":flag_sg: Singapore",
            "us-central": ":flag_us: U.S. Central",
            "sydney": ":flag_au: Sydney",
            "us-east": ":flag_us: U.S. East",
            "us-south": ":flag_us: U.S. South",
            "us-west": ":flag_us: U.S. West",
            "eu-west": ":flag_eu: Western Europe",
            "vip-us-east": ":flag_us: VIP U.S. East",
            "london": ":flag_gb: London",
            "amsterdam": ":flag_nl: Amsterdam",
            "hongkong": ":flag_hk: Hong Kong",
            "russia": ":flag_ru: Russia",
            "southafrica": ":flag_za:  South Africa"
        }
    };


    // mute mute mute mute mute mute mute mute mute mute mute mute 

    if(command === "mute") { // eslint-disable-line no-unused-varsthor
        if (message.member.permissions.has("MANAGE_MESSAGES") == true) {
            let member = message.mentions.members.first();
            if (!member)
                return message.reply("Please mention a valid member of this server");
            var guild = client.guilds.find(g => g.id == message.guild.id);
            var mutedRole = message.guild.roles.find(r => r.name == "Convicts");
            if (mutedRole == null) {
                guild.createRole({
                    name: "Convicts", color: "GRAY"
                    , permissions: ["READ_MESSAGE_HISTORY"]
                    , mentionable: false
                }, "For muting people")
                    .then(role => {
                        mutedRole = role;
                        for (var gc in guild.channels.values()) {
                            if (gc.type == "text") {
                                gc.overwritePermissions(role, {
                                    'SEND_MESSAGES': false,
                                    'ADD_REACTIONS': false
                                }, "To mute people");
                            } else {
                                gc.overwritePermissions(role, {
                                    'SPEAK': false
                                }, "To mute people")
                            }
                        }
                    });
            } else {
                mutedRole = mutedRole;
            }
            if (member.roles.find(r => r.id == mutedRole.id) != null) {
                return message.reply(`I cannnot mute someone who is already muted!`);
            }
            let reason = args.slice(1).join(' ');
            if (!reason) reason = "No reason provided";
            await member.addRole(mutedRole)
                .catch(error => {
                    return message.reply(`Sorry ${message.author} I couldn't mute this user`);
                });
            message.reply(`<@${member.user.id}> has been muted by <@${message.author.id}> because: ${reason}`);
            
        } else {
            message.channel.send("You don't have enough permissions to use this command!");
        }
    };

    // unmute unmute unmute unmute unmute unmute unmute unmute unmute

    if (command === "unmute") { // eslint-disable-line no-unused-varsthor
        if (message.member.permissions.has("MANAGE_MESSAGES") == true) {
            let member = message.mentions.members.first();
            if (!member)
                return message.reply("Please mention a valid member of this server");
            var guild = client.guilds.find(g => g.id == message.guild.id);
            var mutedRole = message.guild.roles.find(r => r.name == "Convicts");
            if (mutedRole == null)
                return;
            let reason = args.slice(1).join(' ');
            if (!reason) reason = "No reason provided";
            if (member.roles.find(r => r.id == mutedRole.id) == null) {
                return message.reply(`I cannnot unmute someone who is not muted!`);
            }
            await member.removeRole(mutedRole)
                .catch(error => {
                    return message.reply(`Sorry <@${message.author.id}> I couldn't mute this user`);
                });
            message.reply(`<@${member.user.id}> has been unmuted by <@${message.author.id}>`);
            
        } else {
            message.channel.send("You don't have enough permissions to use this command!");
        }
    };

    // info info info info info info info info info info info info info 
        if (command === "info") {
            var myinfo = new Discord.RichEmbed()
                .addField("About Me", "I'm a utility bot for UWOTM8")
                .addField("Join our server now!", "https://discord.gg/Ng6gYeW")
                .setColor(0x00FFFF)
                .setThumbnail(client.user.avatarURL)
                .setFooter("Thanks for asking, i hoped you understand more about me")

            message.channel.send(myinfo)
        }
    //ping ping ping ping ping ping ping ping ping ping ping 

        if (command === "ping") {
            // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
            // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
            const m = await message.channel.send("Ping?");
            m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);

        }
    // say say say say say say say say say say say say say say

        if (command === "say") {
            // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
            // To get the "message" itself we join the `args` back into a string with spaces: 
            const sayMessage = args.join(" ");
            // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
            message.delete().catch(O_o => { });
            // And we get the bot to say the thing: 
            message.channel.send(sayMessage);
        }

    //kick kick kick kick kick kick kick kick kick kick kick kick

    if (command === "kick") {
        if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) { return message.channel.send('You do not have the permission for kick users!'); }

        if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) { return message.channel.send('I don\'t have the permission for kick users!'); }

        if (message.mentions.users.size === 0) { return message.channel.send('You need to ping a user!'); }
        let kickMember = message.guild.member(message.mentions.users.first());
        if (!kickMember) { return message.channel.send('User not found!'); }

        kickMember.kick().then((member) => {
            message.channel.send('**' + member.displayName + '**' + " has been successfully kicked");
        })
    }

    //ban ban ban ban ban ban ban ban ban ban ban ban ban

    if (command === "ban") {
        if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) { return message.channel.send('You do not have the permission for ban users!'); }

        if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) { return message.channel.send('I don\'t have the permission for ban users!'); }

        if (message.mentions.users.size === 0) { return message.channel.send('You need to ping a user!'); }
        let banMember = message.guild.member(message.mentions.users.first());
        if (!banMember) { return message.channel.send('User not found!'); }

        banMember.ban().then((member) => {
            message.channel.send('**' + member.displayName + '**' + " has been successfully banned");
        })
    }

    //purge purge purge purge purge purge purge purge purge purge 

        if (command === "purge") {
            // This command removes all messages from all users in the channel, up to 100.

            // get the delete count, as an actual number.
            const deleteCount = parseInt(args[0], 10);

            // Ooooh nice, combined conditions. <3
            if (!deleteCount || deleteCount < 2 || deleteCount > 100)
                return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

            // So we get our messages, and delete them. Simple enough, right?
            const fetched = await message.channel.fetchMessages({ limit: deleteCount });
            message.channel.bulkDelete(fetched)
                .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
        }

    //serverinfo serverinfo serverinfo serverinfo serverinfo serverinfo serverinfo

        if (command === "serverinfo") {
            const sinfo = new Discord.RichEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL)
                .setTitle("UWOTM8's Serverinfo")
                .setColor(0x00FFFF)
                .addField("Name", message.guild.name, true)
                .addField("Server ID", message.guild.id, true)
                .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
                .addField("Total | Humans | Bots", `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
                .addField("Text Channels", message.guild.channels.filter((c) => c.type === "text").size, true)
                .addField("Voice Channels", message.guild.channels.filter((c) => c.type === "voice").size, true)
                .addField("Categories", message.guild.channels.filter((c) => c.type === "category").size, true)
                .addField("Roles", message.guild.roles.size, true)
                .addField('AFK Timeout', `${message.guild.afkTimeout / 60} minutes`, true)
                .addField('AFK Channel', `${message.guild.afkChannelID === null ? 'No AFK Channel' : client.channels.get(message.guild.afkChannelID).name}`, true)
                .addField("Emoji Count", `${message.guild.emojis.size}`, true)
                .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)}`, true)
                .setThumbnail(message.guild.iconURL)
            message.channel.send(sinfo);

            if (message.channel.type === "dm") {
                return message.channel.send(`:warning: This isn't a server! It's a DM`)
            }
        }

    //userinfo userinfo userinfo userinfo userinfo userinfo userinfo

    const status = {
        online: "Online",
        idle: "Idle",
        dnd: "Do Not Disturb",
        offline: "Offline/Invisible"
    };

    if (command === "userinfo") {
        var permissions = [];
        var acknowledgements = 'None';

        const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
        const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

        if (message.member.hasPermission("KICK_MEMBERS")) {
            permissions.push("Kick Members");
        }

        if (message.member.hasPermission("BAN_MEMBERS")) {
            permissions.push("Ban Members");
        }

        if (message.member.hasPermission("ADMINISTRATOR")) {
            permissions.push("Administrator");
        }

        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            permissions.push("Manage Messages");
        }

        if (message.member.hasPermission("MANAGE_CHANNELS")) {
            permissions.push("Manage Channels");
        }

        if (message.member.hasPermission("MENTION_EVERYONE")) {
            permissions.push("Mention Everyone");
        }

        if (message.member.hasPermission("MANAGE_NICKNAMES")) {
            permissions.push("Manage Nicknames");
        }

        if (message.member.hasPermission("MANAGE_ROLES")) {
            permissions.push("Manage Roles");
        }

        if (message.member.hasPermission("MANAGE_WEBHOOKS")) {
            permissions.push("Manage Webhooks");
        }

        if (message.member.hasPermission("MANAGE_EMOJIS")) {
            permissions.push("Manage Emojis");
        }

        if (permissions.length == 0) {
            permissions.push("No Key Permissions Found");
        }

        if (`<@${member.user.id}>` == message.guild.owner) {
            acknowledgements = 'Server Owner';
        }

        const uinfo = new Discord.RichEmbed()
            .setDescription(`<@${member.user.id}>`)
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
            .setColor(0x00FFFF)
            .setFooter(`ID: ${message.author.id}`)
            .setThumbnail(member.user.displayAvatarURL)
            .setTimestamp()
            .addField('Account Created', member.user.createdAt, true)
            .addField('Joined Server', member.joinedAt, true)
            .addField("Status", `${status[member.user.presence.status]}`, true)
            .addField("ID", `${(member.user.id)}`, true)
            .addField("Discriminator", `${(member.user.discriminator)}`, true)
            .addField("Acknowledgements", `${acknowledgements}`, true)
            .addField("Permissions: ", `${permissions.join(', ')}`, true)
            .addField(`Roles [${member.roles.filter(r => r.id !== message.guild.id).map(roles => '${ roles.name }').length}]`, `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id}>`).join(" **|** ") || "No Roles"}`, true);
      

        message.channel.send(uinfo);

    }

    //avatar avatar avatar avatar avatar avatar 
    if (command == "av") {

        var user;
        user = message.mentions.users.first(); //mentioned user, if any
        if (!user) { //if no one is mentioned
            if (!args[0]) { //if the command is only "!avatar". I.e. no one is mentioned and no id is specified
                user = message.author;
                getuseravatar(user);
            } else { //if a user id IS specified (need developer mode on on discord to get it)
                var id = args[0]
                client.fetchUser(id).then(user => {
                    getuseravatar(user) //get avatar of the user, whose id is specified

                }).catch(error => console.log(error))

            }

        } else { //if someone IS mentioned
            getuseravatar(user);
        }
        function getuseravatar(user) {
            var avatar = new Discord.RichEmbed()
                .setColor(0x00FFFF) //can specifiy color of embed here
                .setImage(user.avatarURL)
                .setAuthor(`${user.tag}`, user.displayAvatarURL)
                .setFooter(`ID: ${user.id}`)
            message.channel.send(avatar)

        }
    }

    });

 client.login(config.token);