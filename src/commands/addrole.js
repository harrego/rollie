const emoji = require("../emoji")
const collector = require("../collector")

const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const adapter = new FileSync("roles.json")
const db = low(adapter)
db.defaults({ roles: [] })
  .write()

const syntax = "r!addrole <role channel> <message id> <role> <emoji>"
exports.syntax = syntax

function command(msg) {

  const msg_split = msg.content.split(" ")
  if (msg.mentions.channels.size == 1 && msg.mentions.roles.size == 1) {
    const roles_channel = msg.mentions.channels.first()
    const role = msg.mentions.roles.first()

    let given_emoji = emoji.parse(msg_split[4])

    roles_channel.messages.fetch(msg_split[2]).then(roles_message => {
      roles_message.react(given_emoji).then(reaction => {
        db.get("roles")
          .push({ role_id: role.id, message_id: roles_message.id, channel_id: roles_channel.id, guild_id: msg.guild.id, emoji: given_emoji })
          .write()
        collector.reload(msg.client)
      })
      .catch(err => {
        if (err.code == 10014) {
          msg.channel.send("I don't know that emoji, try using a Unicode emoji or one created in this guild")
        }
      })

    })
  } else {
    msg.channel.send(`\`${syntax}\``)
  }
}
exports.command = command
