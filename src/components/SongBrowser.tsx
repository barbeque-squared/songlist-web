import styles from './SongBrowser.module.css'
import type { Song } from '../types/Song'
import {createMemo, createSignal, For} from "solid-js";
import SongRow from "./SongRow";
import {Variant} from "../constants/Variant";

interface SongBrowserProps {
  songs: Song[]
}

const SongBrowser = (props: SongBrowserProps) => {
  const [filterInput, setFilterInput] = createSignal('')
  const [filter, setFilter] = createSignal('')
  const [instrumental, setInstrumental] = createSignal(false)
  const [duet, setDuet] = createSignal(false)
  const [lossless, setLossLess] = createSignal(false)
  const [languageFilter, setLanguageFilter] = createSignal('')
  const [yearFrom, setYearFrom] = createSignal(0)
  const [yearTo, setYearTo] = createSignal(0)

  const clearFilter = () => {
    setFilterInput('')
    setFilter('')
  }

  const updateFilter = (event: any) => {
    const newValue = event.target.value
    setFilterInput(newValue)
    if (newValue.length > 3) {
      setFilter(newValue.toLowerCase())
    } else {
      setFilter('')
    }
  }

  const updateLanguage = (event: any) => {
    setLanguageFilter(event.target.value)
  }

  const updateYearFrom = (event: any) => {
    setYearFrom(event.target.value)
  }

  const updateYearTo = (event: any) => {
    setYearTo(event.target.value)
  }

  const checkInstrumental = (event: any) => {
    setInstrumental(event.target.checked)
  }
  const checkDuet = (event: any) => {
    setDuet(event.target.checked)
  }
  const checkLossless = (event: any) => {
    setLossLess(event.target.checked)
  }

  //region a bunch of functions on songs
  const variantsIncludeAnyOf = (song: Song, options: Variant[]) => {
    return song.variants.some(v => options.includes(v))
  }

  const isInstrumental = (song: Song) => {
    return variantsIncludeAnyOf(song, [
      Variant.INSTRUMENTAL,
      Variant.LOSSLESS_INSTRUMENTAL
    ])
  }
  const isDuet = (song: Song) => {
    return variantsIncludeAnyOf(song, [
      Variant.DUET,
      Variant.LOSSLESS_DUET
    ])
  }
  const isLossless = (song: Song) => {
    return variantsIncludeAnyOf(song, [
      Variant.LOSSLESS,
      Variant.LOSSLESS_INSTRUMENTAL,
      Variant.LOSSLESS_DUET,
      Variant.LOSSLESS_INSTRUMENTAL_DUET
    ])
  }

  const shouldRender = (song: Song) => {
    if (
        (instrumental() && !isInstrumental(song))
        || (duet() && !isDuet(song))
        || (lossless() && !isLossless(song))
    ) {
      return false
    }
    if (yearFrom() > 0 && (song.year === null || song.year < yearFrom())) {return false}
    if (yearTo() > 0 && (song.year === null || song.year >= yearTo())) {return false}
    if (languageFilter().length > 0) {
      switch (languageFilter()) {
        case 'English': if (song.language !== 'English') {return false} break
        case 'German': if (song.language !== 'German') {return false} break
        case 'Other': if (song.language === 'English' || song.language === 'German') {return false}
      }
    }
    if (filter().length < 4) {
      return true
    }
    return (song.artist.toLowerCase().includes(filter()) || song.title.toLowerCase().includes(filter()))
  }
  //endregion

  const filteredList = createMemo(() => props.songs.filter(shouldRender))

  return (
    <div class={styles.Songbrowser}>
      <div class={styles.inputs}>
        <div class={styles.text}>
          <select onChange={updateLanguage}>
            <option selected value={''}>Any</option>
            <option value={'English'}>English</option>
            <option value={'German'}>German</option>
            <option value={'Other'}>Other</option>
          </select>
          <input type="text" value={filterInput()} oninput={updateFilter} placeholder="Filter... (needs at least 4 characters)" />
          <button onClick={clearFilter} disabled={filterInput() === ''}>✖</button>
        </div>
        <div class={styles.checkboxes}>
          <label>
            <input type={'checkbox'} checked={instrumental()} oninput={checkInstrumental} />
            Instrumental
          </label>
          <label>
            <input type={'checkbox'} checked={duet()} onChange={checkDuet} />
            Duet
          </label>
          <label>
            <input type={'checkbox'} checked={lossless()} onChange={checkLossless} />
            Lossless
          </label>
          <label>
            <select onChange={updateYearFrom}>
              <option selected value={0}>From</option>
              {[1900, 1970, 1980, 1990, 2000, 2010, 2015, 2020].map(year => (
                <option value={year}>{year}</option>
              ))}
            </select>
            {' - '}
            <select onChange={updateYearTo}>
              <option selected value={0}>To</option>
              {[1970, 1980, 1990, 2000, 2010, 2015, 2020, 2025].map(year => (
                <option value={year}>{year}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th class={styles.left}>Artist</th>
              <th class={styles.language}/>
              <th class={styles.left}>Title</th>
              <th class={styles.left}>Year</th>
              <th colSpan={4} class={styles.qualityHeader}>Lossy</th>
              <th colSpan={4} classList={{[styles.qualityHeader]: true, [styles.lossless]: true}}>Lossless</th>
              <th class={styles.dmx}>DMX</th>
            </tr>
          </thead>
          <tbody>
            <For each={filteredList()}>{(song) =>
                <SongRow song={song} />
            }</For>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SongBrowser
