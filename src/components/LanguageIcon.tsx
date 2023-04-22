import '/node_modules/flag-icons/css/flag-icons.min.css'
import { Show } from "solid-js";

interface Props {
  language: string
}

const LanguageIcon = (props: Props) => {
  let icon
  switch (props.language) {
    case 'Czech': icon = 'cz'; break
    case 'Dutch': icon = 'nl'; break
    case 'Flemish': icon = 'be'; break
    case 'French': icon = 'fr'; break
    case 'German': icon = 'de'; break
    case 'Hungarian': icon = 'hu'; break
    case 'Italian': icon = 'it'; break
    case 'Japanese': icon = 'jp'; break
    case 'Polish': icon = 'pl'; break
    case 'Romanian': icon = 'ro'; break
    case 'Russian': icon = 'ru'; break
    case 'Spanish': icon = 'es'; break
    case 'Ukrainian': icon = 'ua'; break
    default: icon = undefined
  }

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
