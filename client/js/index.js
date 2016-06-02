require('whatwg-fetch')
const React = require('react')
const ReactDOM = require('react-dom')
const TalkItem = require('./components/TalkItem')

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

  render() {
    console.log(this.state.talks)
    return (<table className='table talk-list table-striped'>
      <thead>
        <tr>
          <th>Title</th>
          <th>author</th>
          <th colSpan='6'>Reactions</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {this.state.talks.map((talk) => (<TalkItem key={talk.id} talk={talk}/>))}
      </tbody>
    </table>)
  }
}

ReactDOM.render(<App />, document.getElementById('mainView'))
