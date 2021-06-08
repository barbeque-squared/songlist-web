import React, {Component} from 'react';
import './App.css';
import SongBrowser from './components/SongBrowser'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ponySongs: [],
      nonPonySongs: [],
      category: 'pony',
    }
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_PONY_URL}`)
      .then(response => response.json())
      .then(json => this.setState({ponySongs: json.songlist}))
    fetch(`${process.env.REACT_APP_NONPONY_URL}`)
      .then(response => response.json())
      .then(json => this.setState({nonPonySongs: json.songlist}))
  }

  radioCategory = (event) => {
    this.setState({category: event.target.value})
  }

  render() {
    return (
      <div className={'App'}>
        <div className={'category'}>
          {['pony', 'non-pony'].map(c => {return (
            <label key={c}>
              <input type={'radio'} name={'category'} value={c} onChange={this.radioCategory} defaultChecked={this.state.category === c}/>
              {c}
            </label>
          )})}
        </div>
        <SongBrowser songs={this.state.category === 'pony' ? this.state.ponySongs : this.state.nonPonySongs} />
      </div>
    )
  }
}

export default App
