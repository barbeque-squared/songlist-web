import styles from './SongRow.module.css'
import LanguageIcon from './LanguageIcon'
import { Song } from '../types/Song'
import { Variant } from '../constants/Variant'

interface SongRowProps {
  song: Song;
}

const currentYear = new Date().getFullYear()

const SongRow = (props: SongRowProps) => {
  const variantsInclude = (option: Variant) => props.song.variants.includes(option)

  const dmxString = () => {
    switch (props.song.dmx) {
      case 0: return null
      case 1: return '●'
      default: return props.song.dmx
    }
  }

  const renderYear = (year: number | null) => {
    if (year === null) {
      return null
    }
    if (year > currentYear || year < currentYear - 97) {
      return year
    }
    const yearString = year.toString()
    return <>
      <span class={styles.century}>{yearString.substring(0, 2)}</span>
      {yearString.substring(2)}
    </>
  }

  return(
    <tr class={styles.SongRow}>
      <td>{props.song.artist}</td>
      <td class={styles.language}><LanguageIcon language={props.song.language} /></td>
      <td>{props.song.title}</td>
      <td>{renderYear(props.song.year)}</td>
      <td classList={{[styles.quality]: true, [styles.lossy]: true}}>{variantsInclude(Variant.LOSSY) && 'r'}</td>
      <td classList={{[styles.quality]: true, [styles.lossy]: true}}>{variantsInclude(Variant.INSTRUMENTAL) && 'i'}</td>
      <td classList={{[styles.quality]: true, [styles.lossy]: true}}>{variantsInclude(Variant.DUET) && 'd'}</td>
      <td classList={{[styles.quality]: true, [styles.lossy]: true}}>{variantsInclude(Variant.INSTRUMENTAL_DUET) && 'di'}</td>
      <td classList={{[styles.quality]: true, [styles.lossless]: true}}>{variantsInclude(Variant.LOSSLESS) && 'r'}</td>
      <td classList={{[styles.quality]: true, [styles.lossless]: true}}>{variantsInclude(Variant.LOSSLESS_INSTRUMENTAL) && 'i'}</td>
      <td classList={{[styles.quality]: true, [styles.lossless]: true}}>{variantsInclude(Variant.LOSSLESS_DUET) && 'd'}</td>
      <td classList={{[styles.quality]: true, [styles.lossless]: true}}>{variantsInclude(Variant.LOSSLESS_INSTRUMENTAL_DUET) && 'di'}</td>
      <td class={styles.dmx}>{dmxString()}</td>
    </tr>
  )
}

export default SongRow
