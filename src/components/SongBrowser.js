import React, {PureComponent} from 'react'

import './SongBrowser.css'
import type { Song } from '../types/Song'
import SongRow from './SongRow'

interface SongBrowserProps {
  songs: Song[]
}

class SongBrowser extends PureComponent<SongBrowserProps> {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      instrumental: false,
      duet: false,
      lossless: false
    }
  }

  updateFilter(event) {
    const newValue = event.target.value
    if (newValue.length > 3) {
      this.setState({ filter: newValue.toLowerCase() })
    } else {
      this.setState({ filter: '' })
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
          <div className={'text'}>
            <input type="text" defaultValue={''} onChange={this.updateFilter.bind(this)} placeholder="Filter... (needs at least 4 characters)" />
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
              <input type={'checkbox'} value={this.state.lossless} onChange={this.checkLossless} />
              Lossless
            </label>
          </div>
        </div>
        <div className="scrolltable">
          <table>
            <thead>
              <tr>
                <th colSpan={3} />
                <th colSpan={4}>Lossy</th>
                <th colSpan={4} className={'lossless'}>Lossless</th>
              </tr>
              <tr>
                <th className={'left'}>Artist</th>
                <th className={'language'}/>
                <th className={'left'}>Title</th>
                <th className={'lossy'} title="Regular">R</th>
                <th className={'lossy'} title="Instrumental">I</th>
                <th className={'lossy'} title="Duet">D</th>
                <th className={'lossy'} title="Duet Instrumental">DI</th>
                <th className={'lossless'} title="Lossless">R</th>
                <th className={'lossless'} title="Lossless Instrumental">I</th>
                <th className={'lossless'} title="Lossless Duet">D</th>
                <th className={'lossless'} title="Lossless Duet Instrumental">DI</th>
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
