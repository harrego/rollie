# rollie

Reaction-based role assignment Discord bot

## Setup

Install NPM dependencies, set your `DISCORDTOKEN` enviroment variable as your Discord application token and run `node index.js`.

It's important to note that `rollie` is based on the `master` branch of `discord.js`, a notoriously experimental version of the module. Because of its volatile nature `rollie` may not work as intended with the latest commit at the time you are reading this.

At the time of writing the commit `8230255` on branch `master` works as intended.

## Usage

Add your bot to a guild and add a reaction to an existing message with the command syntax `r!addrole <role channel> <message id> <role> <emoji>`, unless stated otherwise, use `@` and `#` to refer to roles and channels.

To get a message ID you must enable developer mode within the Discord preferences.