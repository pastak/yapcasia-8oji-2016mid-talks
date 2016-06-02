require('whatwg-fetch')
const React = require('react')
const ReactDOM = require('react-dom')
const TalkItem = require('./components/TalkItem')
const sortBy = require('sort-by')

const parseJson = res => res.json()

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      talks: []
    }
  }

  componentDidMount() {
    fetch('/talks')
      .then(parseJson)
      .then(talks => this.setState({talks}))
  }

  sortTalksBy (params) {
    this.setState({talks: this.state.talks.sort(sortBy(this.state.talks, params))})
  }

  render() {
    return (<div>
      Sort by <span className="dropdown">
        <a className="dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          <span className="caret"></span>
        </a>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li><a onClick={() => this.sortTalksBy('-reactions.total_count')}>Total Reactions Count</a></li>
          <li><a href='#' onClick={() => this.sortTalksBy('-reactions.+1')}><img width='16'src='https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.0/assets/png/1f44d.png' /></a></li>
          <li><a href='#' onClick={() => this.sortTalksBy('-reactions.-1')}><img width='16'src='https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.0/assets/png/1f44e.png' /></a></li>
          <li><a href='#' onClick={() => this.sortTalksBy('-reactions.laugh')}><img width='16'src='https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.0/assets/png/1f604.png' /></a></li>
          <li><a href='#' onClick={() => this.sortTalksBy('-reactions.hooray')}><img width='16'src='https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.0/assets/png/1f389.png' /></a></li>
          <li><a href='#' onClick={() => this.sortTalksBy('-reactions.confused')}><img width='16'src='https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.0/assets/png/1f615.png' /></a></li>
          <li><a href='#' onClick={() => this.sortTalksBy('-reactions.heart')}><img width='16'src='https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.0/assets/png/2764.png' /></a></li>
        </ul>
      </span>
      <table className='table talk-list table-striped'>
        <thead>
          <tr>
            <th>Title</th>
            <th>author</th>
            <th colSpan='6'>
              Reactions
            </th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {this.state.talks.map((talk) => (<TalkItem key={talk.id} talk={talk}/>))}
        </tbody>
      </table>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('mainView'))
