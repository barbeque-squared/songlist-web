import type { Component } from 'solid-js';

import styles from './App.module.css';
import {createSignal, For, onMount} from "solid-js";
import {Song} from "./types/Song";
import SongBrowser from "./components/SongBrowser";

const App: Component = () => {
  const [ponySongs, setPonySongs] = createSignal<Song[]>([])
  const [nonPonySongs, setNonPonySongs] = createSignal<Song[]>([])
  const [category, setCategory] = createSignal('pony')

  onMount(async () => {
    fetch(`${import.meta.env.VITE_PONY_URL}`)
      .then(response => response.json())
      .then(json => setPonySongs(json.songlist))
    fetch(`${import.meta.env.VITE_NONPONY_URL}`)
      .then(response => response.json())
      .then(json => setNonPonySongs(json.songlist))
  })

  const radioCategory = (event: any) => {
    setCategory(event.currentTarget.value)
  }

  return (
    <div class={styles.App}>
      <div class={styles.category}>
        <For each={['pony', 'non-pony']}>{(c) =>
          <label>
            <input type={'radio'} name={'category'} value={c} onInput={radioCategory} checked={category() === c} />
            {c}
          </label>
        }</For>
      </div>
      <SongBrowser songs={category() === 'pony' ? ponySongs() : nonPonySongs()} />
    </div>
  )
}

export default App
