import '/node_modules/flag-icons/css/flag-icons.min.css'
import { Show } from "solid-js";

interface Props {
  language: string
}

function languageToIcon(language: string): string | undefined {
  switch (language) {
    case 'Czech': return 'cz'
    case 'Dutch': return 'nl'
    case 'French': return 'fr'
    case 'German': return 'de'
    case 'Hungarian': return 'hu'
    case 'Italian': return 'it'
    case 'Japanese': return 'jp'
    case 'Korean': return 'kr'
    case 'Norwegian': return 'no'
    case 'Polish': return 'pl'
    case 'Romanian': return 'ro'
    case 'Russian': return 'ru'
    case 'Spanish': return 'es'
    case 'Swedish': return 'se'
    case 'Ukrainian': return 'ua'
    default: return undefined
  }
}

const LanguageIcon = (props: Props) => {
  const icon = languageToIcon(props.language)
  if (props.language !== 'English' && icon === undefined && import.meta.env.DEV) {
    console.warn(`Unknown language: ${props.language}`)
  }

  return (
    <Show when={props.language !== 'English'}>
      <Show when={icon} fallback={` ?${props.language}`}>
        <span classList={{ ['fi']: true, [`fi-${icon}`]: true }} title={props.language} />
      </Show>
    </Show>
  )
}

export default LanguageIcon
