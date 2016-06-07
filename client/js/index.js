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
      showDay1: true,
      showDay2: true
    }
  }

  componentDidMount() {
    fetch('/talks')
      .then(parseJson)
      .then(talks => this.setState({talks: this.state.talks.concat(talks)}))
      .then(() => this.sortTalksBy('-number'))
    fetch('/lts')
      .then(parseJson)
      .then(talks => this.setState({talks: this.state.talks.concat(talks)}))
      .then(() => this.sortTalksBy('-number'))
  }

  sortTalksBy (...params) {
    if (params.length === 0) params = ['-number']
    this.setState({talks: this.state.talks.sort(sortBy(...params))})
  }

  toggleLabel (label) {
    if (label == 'lt') {
      this.setState({showLt: !this.state.showLt})
    } else if (label === 'talk') {
      this.setState({showTalk: !this.state.showTalk})
    } else if (label === 'day1') {
      this.setState({showDay1: !this.state.showDay1})
    } else if (label === 'day2') {
      this.setState({showDay2: !this.state.showDay2})
    }
  }

  isLabeled (talk, regExp) {
    return talk.labels.filter((label) => regExp.test(label.name)).length > 0
  }

  render() {

    const talks = this.state.talks.filter((talk) => {
      if (!this.state.showTalk && this.isLabeled(talk, /トーク応募/)) return false
      if (!this.state.showLt && this.isLabeled(talk, /LT応募/)) return false
      if (this.state.showDay1 || this.state.showDay2) {
        if (this.state.showDay1 && this.isLabeled(talk, /7\/2/)) return true
        if (this.state.showDay2 && this.isLabeled(talk, /7\/3/)) return true
        return false
      }
      return true
    })

    return (<div>
      <div>
        Talk Type <button onClick={() => this.toggleLabel('talk')} className={cx('btn', {'btn-default': !this.state.showTalk, 'btn-info': this.state.showTalk})}>トーク応募</button>
        <button onClick={() => this.toggleLabel('lt')} className={cx('btn', {'btn-default': !this.state.showLt, 'btn-info': this.state.showLt})}>LT応募</button>
        <span style={{marginLeft: 50}}></span>
        <button onClick={() => this.toggleLabel('day1')} className={cx('btn', {'btn-default': !this.state.showDay1, 'btn-primary': this.state.showDay1})}>1日目</button>
        <button onClick={() => this.toggleLabel('day2')} className={cx('btn', {'btn-default': !this.state.showDay2, 'btn-success': this.state.showDay2})}>2日目</button>
        <div className="btn-group" style={{float: 'right'}}>
          <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <span>SortBy </span>
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
          </button>
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
        </div>
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
