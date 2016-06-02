require('whatwg-fetch')
const React = require('react')
const ReactDOM = require('react-dom')
const sortBy = require('sort-by')
const cx = require('classnames')

const TalkItem = require('./components/TalkItem')

const {emojiList, reaction2image} = require('./libs/reaction')
const parseJson = res => res.json()

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      talks: [],
      sortSelected: null,
      showTalk: true,
      showLt: false,
    }
  }

  componentDidMount() {
    fetch('/talks')
      .then(parseJson)
      .then(talks => this.setState({talks: this.state.talks.concat(talks)}))
    fetch('/lts')
      .then(parseJson)
      .then(talks => this.setState({talks: this.state.talks.concat(talks)}))
  }

  sortTalksBy (params) {
    this.setState({talks: this.state.talks.sort(sortBy(params, 'number'))})
  }

  toggleLabel (label) {
    if (label == 'lt') {
      this.setState({showLt: !this.state.showLt})
    } else if (label === 'talk') {
      this.setState({showTalk: !this.state.showTalk})
    }
  }

  isLabeled (talk, labelName) {
    return talk.labels.filter((label) => label.name === labelName).length > 0
  }

  render() {

    const talks = this.state.talks.filter((talk) => {
      if (!this.state.showTalk && this.isLabeled(talk, 'トーク応募')) return false
      if (!this.state.showLt && this.isLabeled(talk, 'LT応募')) return false
      return true
    })

    return (<div>
      Sort by <span className="dropdown">
        <a className="dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          {(() => {
            switch (this.state.sortSelected) {
              case 'total_count':
                return (<span>Total Reactions Count</span>)
                break
              case null:
                return null
              default:
                return [<img width='16' src={reaction2image(this.state.sortSelected)} />, this.state.sortSelected]
            }
          })()}
          <span className="caret"></span>
        </a>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li><a onClick={() => {this.sortTalksBy('-reactions.total_count'); this.setState({sortSelected: 'total_count'})}}>Total Reactions Count</a></li>
          {Object.keys(emojiList).map((reaction) => {
            return (<li key={reaction}>
              <a href='#' onClick={() => {this.sortTalksBy(`-reactions.${reaction}`); this.setState({sortSelected: reaction})}}>
                <img width='16'src={reaction2image(reaction)} />{reaction}
              </a>
            </li>)
          })}
        </ul>
      </span>

      <div>
        <button onClick={() => this.toggleLabel('talk')} className={cx('btn', {'btn-default': !this.state.showTalk, 'btn-info': this.state.showTalk})}>トーク応募</button>
        <button onClick={() => this.toggleLabel('lt')} className={cx('btn', {'btn-default': !this.state.showLt, 'btn-info': this.state.showLt})}>LT応募</button>
      </div>

      <table className='table talk-list table-striped'>
        <thead>
          <tr>
            <th>Type</th>
            <th>Title</th>
            <th>author</th>
            <th colSpan='6'>
              Reactions
            </th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {talks.map((talk) => (<TalkItem key={talk.id} talk={talk}/>))}
        </tbody>
      </table>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('mainView'))
