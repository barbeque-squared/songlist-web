import styles from './LanguageIcon.module.css'
import '/node_modules/flag-icons/css/flag-icons.min.css'
import { Show } from "solid-js";

interface Props {
  language: string
}

function languageToIcon(language: string): string | undefined {
  switch (language) {
    case 'English': return 'gb'
    case 'Austrian': return 'at'
    case 'Czech': return 'cz'
    case 'Dutch': return 'nl'
    case 'French': return 'fr'
    case 'German': return 'de'
    case 'Hungarian': return 'hu'
    case 'Italian': return 'it'
    case 'Japanese': return 'jp'
    case 'Korean': return 'kr'
    case 'Norwegian': return 'no'
    case 'Other': return 'xx'
    case 'Polish': return 'pl'
    case 'Romanian': return 'ro'
    case 'Russian': return 'ru'
    case 'Spanish': return 'es'
    case 'Swedish': return 'se'
    case 'Ukrainian': return 'ua'
    default: {
      if (import.meta.env.DEV) {
        console.warn(`Unknown language: ${language}`)
      }
      return undefined
    }
  }
}

const LanguageIcon = (props: Props) => {
  const icons = props.language === 'English' ? [] : props.language.split(',')
    .map(l => languageToIcon(l.trim()))

  return (
    <Show when={props.language !== 'English'}>
      <span class={styles.LanguageIcon} title={props.language}>
        <For each={icons}>{(icon) => {
          return icon === undefined ? <span>??</span> :
            <span classList={{ ['fi']: true, [`fi-${icon}`]: true }} title={props.language} />
        }}</For>
      </span>
    </Show>
  )
}

export default LanguageIcon
