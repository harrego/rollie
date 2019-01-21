function parse(emoji) {
  let emoji_match = emoji.match(/[0-9]{1,}>$/g)
  if (emoji_match) {
    emoji = emoji_match[0].slice(0, emoji_match[0].length - 1)
  }

  return emoji
}
exports.parse = parse