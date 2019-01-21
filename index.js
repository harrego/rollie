const Discord = require('discord.js')
const client = new Discord.Client()

const collector = require("./src/collector")

const commands = {
  "addrole": require("./src/commands/addrole")
}

const prefix = "r!"

client.on('ready', () => {
  console.log("Running")

  collector.reload(client)
})

client.on("message", msg => {

  if (msg.content.slice(0, prefix.length) == prefix) {
    let command = msg.content.split(" ")[0].slice(prefix.length)

    switch (command) {

    case "addrole":
      if (msg.member.hasPermission("ADMINISTRATOR")) commands.addrole.command(msg)
      break;
    }
  }

})

client.login(process.env.DISCORDTOKEN)