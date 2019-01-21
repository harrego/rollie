const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const adapter = new FileSync("roles.json")
const db = low(adapter)
db.defaults({ roles: [] })
.write()

function reload(client) {
  let collectors = db.get("roles")
  .value()

  collectors = collectors.forEach(item => {
    client.guilds.get(item.guild_id).channels.get(item.channel_id).messages.fetch(item.message_id)
    .then(message => {

      const collector = message.createReactionCollector(reaction => (reaction.emoji.id ? reaction.emoji.id : reaction.emoji.name) == item.emoji, {dispose: true})

      collector.on("collect", (reaction, user) => {
        console.log(reaction.emoji)
        let role = reaction.message.guild.roles.get(item.role_id)
        reaction.message.guild.members.get(user.id).roles.add(role, "Reaction Role").catch(console.log)
      })

      collector.on("remove", (reaction, user) => {
        let role = reaction.message.guild.roles.get(item.role_id)
        reaction.message.guild.members.get(user.id).roles.remove(role, "Reaction Role").catch(console.log)
      })

    })
    .catch(console.log)
  })
}
exports.reload = reload