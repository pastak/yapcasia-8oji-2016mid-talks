const emojiList = {
  '+1': '1f44d.png',
  '-1': '1f44e.png',
  laugh: '1f604.png',
  hooray: '1f389.png',
  confused: '1f615.png',
  heart: '2764.png'
}

const reaction2image = (name) => {
  return `https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.0/assets/png/${emojiList[name]}`
}

module.exports = {reaction2image, emojiList}
