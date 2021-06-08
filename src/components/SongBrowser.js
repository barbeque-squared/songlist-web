import React, {PureComponent} from 'react'

import './SongBrowser.css'
import LanguageIcon from './LanguageIcon'
import type { Song } from '../types/Song'
import Variant from '../constants/Variant'

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
    this.setState({filter: event.target.value})
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

  variantsIncludeAnyOf(variants: Variant[], options: Variant[]) {
    return variants.map(v => options.includes(v)).reduce((a, b) => a || b)
  }

  isInstrumental(song) {
    return this.variantsIncludeAnyOf(song.variants,
      [Variant.INSTRUMENTAL, Variant.LOSSLESS_INSTRUMENTAL]
    )
  }
  isDuet(song) {
    return this.variantsIncludeAnyOf(song.variants,
      [Variant.DUET, Variant.LOSSLESS_DUET]
    )
  }
  isLossless(song) {
    return this.variantsIncludeAnyOf(song.variants,
      [Variant.LOSSLESS, Variant.LOSSLESS_INSTRUMENTAL, Variant.LOSSLESS_DUET, Variant.LOSSLESS_INSTRUMENTAL_DUET]
    )
  }

  render() {
    return (
      <div className={'Songbrowser'}>
        <div className={'inputs'}>
          <input type="text" value={this.state.filter} onChange={this.updateFilter.bind(this)} placeholder="Filter" />
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
                <th>Artist</th>
                <th/>
                <th>Title</th>
                <th title="Regular">R</th>
                <th title="Instrumental">I</th>
                <th title="Duet">D</th>
                <th title="Duet Instrumental">DI</th>
                <th className={'lossless'} title="Lossless">R</th>
                <th className={'lossless'} title="Lossless Instrumental">I</th>
                <th className={'lossless'} title="Lossless Duet">D</th>
                <th className={'lossless'} title="Lossless Duet Instrumental">DI</th>
              </tr>
            </thead>
            <tbody>
              {this.props.songs
                .filter(song =>
                  (
                    song.artist.toLowerCase().includes(this.state.filter.toLowerCase()) ||
                    song.title.toLowerCase().includes(this.state.filter.toLowerCase())
                  ) && (this.state.instrumental ? this.isInstrumental(song) : true)
                  && (this.state.duet ? this.isDuet(song) : true)
                  && (this.state.lossless ? this.isLossless(song) : true)
                )
                .map((song) => (
                <tr key={song.artist+song.title}>
                  <td>{song.artist}</td>
                  <td><LanguageIcon language={song.language} /></td>
                  <td>{song.title}</td>
                  <td>{song.variants.includes(Variant.LOSSY) ? '●' : ''}</td>
                  <td>{song.variants.includes(Variant.INSTRUMENTAL) ? '●' : ''}</td>
                  <td>{song.variants.includes(Variant.DUET) ? '●' : ''}</td>
                  <td>{song.variants.includes(Variant.INSTRUMENTAL_DUET) ? '●': ''}</td>
                  <td className={'lossless'}>{song.variants.includes(Variant.LOSSLESS) ? '●' : ''}</td>
                  <td className={'lossless'}>{song.variants.includes(Variant.LOSSLESS_INSTRUMENTAL) ? '●' : ''}</td>
                  <td className={'lossless'}>{song.variants.includes(Variant.LOSSLESS_DUET) ? '●' : ''}</td>
                  <td className={'lossless'}>{song.variants.includes(Variant.LOSSLESS_INSTRUMENTAL_DUET) ? '●': ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default SongBrowser
