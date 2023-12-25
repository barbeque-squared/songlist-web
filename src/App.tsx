import type { Component, Setter } from 'solid-js';

import styles from './App.module.css';
import {createSignal, For, onMount} from "solid-js";
import {Song} from "./types/Song";
import SongBrowser from "./components/SongBrowser";

const App: Component = () => {
  const [ponySongs, setPonySongs] = createSignal<Song[]>([])
  const [nonPonySongs, setNonPonySongs] = createSignal<Song[]>([])
  const [shimmerSongs, setShimmerSongs] = createSignal<Song[]>([])
  const [category, setCategory] = createSignal('pony')

  const fetchJson = (name: string, setter: Setter<Song[]>) => {
    fetch(`${import.meta.env.VITE_JSON_PREFIX}/${name}.json`)
      .then(response => response.json())
      .then(json => setter(json.songlist))
  }

  const getSongs = () => {
    switch(category()) {
      case 'pony': return ponySongs();
      case 'non-pony': return nonPonySongs();
      case 'shimmer': return shimmerSongs();
      default: return []
    }
  }

  onMount(async () => {
    fetchJson('pony', setPonySongs)
    fetchJson('nonpony', setNonPonySongs)
    fetchJson('shimmer', setShimmerSongs)
  })

  const radioCategory = (event: any) => {
    setCategory(event.currentTarget.value)
  }

  return (
    <div class={styles.App}>
      <div class={styles.category}>
        <For each={['pony', 'non-pony', 'shimmer']}>{(c) =>
          <label>
            <input type={'radio'} name={'category'} value={c} onInput={radioCategory} checked={category() === c} />
            {c}
          </label>
        }</For>
      </div>
      {category() === 'shimmer' && (
        <div class={styles.category_no_qa}>
          ⚠ not QA checked! ⚠
        </div>
      )}
      <SongBrowser songs={getSongs()} />
      <footer>
        Source: <a href="https://github.com/barbeque-squared/songlist-web">https://github.com/barbeque-squared/songlist-web</a>
      </footer>
    </div>
  )
}

export default App
