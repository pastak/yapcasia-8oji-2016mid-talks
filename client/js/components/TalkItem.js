const React = require('react')

module.exports = class TalkItem extends React.Component {
  constructor (props) {
    super(props)
  }

  reactionName2ImgUrl (name) {
    const emojiList = {
      '+1': '1f44d.png',
      '-1': '1f44e.png',
      laugh: '1f604.png',
      hooray: '1f389.png',
      confused: '1f615.png',
      heart: '2764.png'
    }
    return `https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.0/assets/png/${emojiList[name]}`
  }

  render () {
    const talk = this.props.talk
    return (<tr className='talk-item'>
      <td className='talk-title'>
        <a href={talk.html_url} target='_blank'>{talk.title}</a>
        <a href={`http://b.hatena.ne.jp/entry/s/github.com/hachiojipm/yapcasia-8oji-2016mid-timetable/issues/${talk.number}`}>
          <img src={`http://b.st-hatena.com/entry/image/https://github.com/hachiojipm/yapcasia-8oji-2016mid-timetable/issues/${talk.number}`} />
        </a>
      </td>
      <td className='talk-author'>
        <a href={talk.user.html_url} target='_blank'>
          <img src={talk.user.avatar_url} width='20'/>
          {talk.user.login}
        </a>
      </td>
      {Object.keys(talk.reactions).filter((k) => k !== 'url' && k !== 'total_count').map((reaction) => {
        return (<td key={reaction}>
          <img src={this.reactionName2ImgUrl(reaction)} width='20' /> {talk.reactions[reaction]}
        </td>)
      })}
      <td>{talk.reactions.total_count}</td>
    </tr>)
  }
}
