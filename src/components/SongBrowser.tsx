import * as React from 'react'
import {PureComponent} from 'react'

import './SongBrowser.css'
import type { Song } from '../types/Song'
import SongRow from './SongRow'

interface SongBrowserProps {
  songs: Song[]
}
interface State {
  filterInput: string
  filter: string
  instrumental: boolean
  duet: boolean
  lossless: boolean
}

class SongBrowser extends PureComponent<SongBrowserProps, State> {
  constructor(props) {
    super(props)
    this.state = {
      filterInput: '',
      filter: '',
      instrumental: false,
      duet: false,
      lossless: false
    }
  }

  updateFilter(event) {
    const newValue = event.target.value
    if (newValue.length > 3) {
      this.setState({ filterInput: newValue, filter: newValue.toLowerCase() })
    } else {
      this.setState({ filterInput: newValue, filter: '' })
    }
  }

  checkInstrumental = (event) => {
    this.setState({ instrumental: event.target.checked })
  }
  checkDuet = (event) => {
    this.setState({ duet: event.target.checked })
  }
  checkLossless = (event) => {
    this.setState({ lossless: event.target.checked })
  }

  render() {
    return (
      <div className={'Songbrowser'}>
        <div className={'inputs'}>
          <div className={'text' + (this.state.filterInput !== '' ? ' with-button' : '')}>
            <input type="text" value={this.state.filterInput} onChange={this.updateFilter.bind(this)} placeholder="Filter... (needs at least 4 characters)" />
            {this.state.filterInput !== '' && (
              <button onClick={() => this.setState({filterInput: '', filter: ''})}>✖</button>
            )}
          </div>
          <div className={'checkboxes'}>
            <label>
              <input type={'checkbox'} checked={this.state.instrumental} onChange={this.checkInstrumental} />
              Instrumental
            </label>
            <label>
              <input type={'checkbox'} checked={this.state.duet} onChange={this.checkDuet} />
              Duet
            </label>
            <label>
              <input type={'checkbox'} checked={this.state.lossless} onChange={this.checkLossless} />
              Lossless
            </label>
          </div>
        </div>
        <div className="scrolltable">
          <table>
            <thead>
              <tr>
                <th className={'left'}>Artist</th>
                <th className={'language'}/>
                <th className={'left'}>Title</th>
                <th colSpan={4} className={'quality-header'}>Lossy</th>
                <th colSpan={4} className={'quality-header lossless'}>Lossless</th>
                <th className={'dmx'}>DMX</th>
              </tr>
            </thead>
            <tbody>
              {this.props.songs.map((song) => (
                <SongRow
                  key={song.artist+song.title}
                  song={song}
                  filter={this.state.filter}
                  instrumental={this.state.instrumental}
                  duet={this.state.duet}
                  lossless={this.state.lossless}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default SongBrowser
