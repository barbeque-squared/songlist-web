import React, {PureComponent} from 'react'

import './SongRow.css'
import LanguageIcon from './LanguageIcon'
import type { Song } from '../types/Song'
import Variant from '../constants/Variant'

interface SongRowProps {
  song: Song;
  // make sure to give this as lowercase!!!
  filter: string;
  instrumental: boolean;
  duet: boolean;
  lossless: boolean;
}

class SongRow extends PureComponent<SongRowProps> {
  constructor(props) {
    super(props)
    this.lartist = props.song.artist.toLowerCase()
    this.ltitle = props.song.title.toLowerCase()
  }

  variantsIncludeAnyOf(options: Variant[]) {
    return this.props.song.variants.map(v => options.includes(v)).reduce((a, b) => a || b)
  }

  isInstrumental() {
    return this.variantsIncludeAnyOf([
      Variant.INSTRUMENTAL,
      Variant.LOSSLESS_INSTRUMENTAL
    ])
  }
  isDuet() {
    return this.variantsIncludeAnyOf([
      Variant.DUET,
      Variant.LOSSLESS_DUET
    ])
  }
  isLossless() {
    return this.variantsIncludeAnyOf([
      Variant.LOSSLESS,
      Variant.LOSSLESS_INSTRUMENTAL,
      Variant.LOSSLESS_DUET,
      Variant.LOSSLESS_INSTRUMENTAL_DUET
    ])
  }

  shouldRender() {
    if (
      (this.props.instrumental && !this.isInstrumental())
      || (this.props.duet && !this.isDuet())
      || (this.props.lossless && !this.isLossless())
    ) {
      return false
    }
    if (this.props.filter.length < 4) {
      return true
    }
    return (
      this.lartist.includes(this.props.filter)
      || this.ltitle.includes(this.props.filter)
    )
  }

  render() {
    if (!this.shouldRender()) {
      return null
    }
    const song = this.props.song
    return (
      <tr className={'SongRow'}>
        <td>{song.artist}</td>
        <td className={'language'}><LanguageIcon language={song.language} /></td>
        <td>{song.title}</td>
        <td className={'lossy'}>{song.variants.includes(Variant.LOSSY) ? '●' : ''}</td>
        <td className={'lossy'}>{song.variants.includes(Variant.INSTRUMENTAL) ? '●' : ''}</td>
        <td className={'lossy'}>{song.variants.includes(Variant.DUET) ? '●' : ''}</td>
        <td className={'lossy'}>{song.variants.includes(Variant.INSTRUMENTAL_DUET) ? '●': ''}</td>
        <td className={'lossless'}>{song.variants.includes(Variant.LOSSLESS) ? '●' : ''}</td>
        <td className={'lossless'}>{song.variants.includes(Variant.LOSSLESS_INSTRUMENTAL) ? '●' : ''}</td>
        <td className={'lossless'}>{song.variants.includes(Variant.LOSSLESS_DUET) ? '●' : ''}</td>
        <td className={'lossless'}>{song.variants.includes(Variant.LOSSLESS_INSTRUMENTAL_DUET) ? '●': ''}</td>
      </tr>
    )
  }
}

export default SongRow
