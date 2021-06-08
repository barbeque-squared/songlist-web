import type { Language } from './Language'
import type { Variant } from '../constants/Variant'

export interface Song {
  artist: string,
  title: string,
  language: Language,
  variants: Variant[]
}
