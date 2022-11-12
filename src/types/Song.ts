import { Language } from './Language'
import { Variant } from '../constants/Variant'

export interface Song {
  artist: string,
  title: string,
  language: Language,
  variants: Variant[],
  dmx: number
}
