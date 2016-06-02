const React = require('react')
const {reaction2image} = require('../libs/reaction')

module.exports = class TalkItem extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const talk = this.props.talk
    return (<tr className='talk-item'>
      <td>
        {talk.labels.map((label) => {
          return (<span className="label" key={label.color} style={{backgroundColor: '#' + label.color}}>{label.name}</span>)
        })}
      </td>
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
          <img src={reaction2image(reaction)} width='20' /> {talk.reactions[reaction]}
        </td>)
      })}
      <td>{talk.reactions.total_count}</td>
    </tr>)
  }
}
