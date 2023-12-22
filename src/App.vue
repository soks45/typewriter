<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { FishTextService } from './services/fish-text.service';
  import { HighlightService } from './services/highlight.service';

  const fishText = ref('');
  const enteredText = ref('');

  const fishTextArray = computed(() => {
    return fishText.value.split('');
  });

  const highlightedTextArray = computed(() => {
    return fishTextArray.value.map((char, index) => {
      if (index > enteredText.value.length - 1) {
        return char;
      }

      const enteredChar: string = enteredText.value[index];
      const areSame: boolean = char === enteredChar;

      return areSame ? HighlightService.highlightCorrect(char) : HighlightService.highlightWrong(char);
    });
  });

  const highlightedText = computed(() => {
    return highlightedTextArray.value.join('');
  })

  function handleKeyPress(event: KeyboardEvent): void {
    const c = event.key;
    enteredText.value = enteredText.value.concat(c);
  }

  document.addEventListener("keypress", handleKeyPress);

  function getNewText(): void {
    FishTextService.getText().then((value) => fishText.value = value);
  }

  function restart(): void {
    getNewText();
    enteredText.value = '';
  }

  getNewText();

  const id = 'CoaQhwDIvOc';
  const src = 'https://www.youtube.com/embed/' + id + `?rel=0&enablejsapi=1&loop=1&playlist=${id}`;

  function startVideo(): void {
    const videoFrame = document.getElementById('videoFrame') as HTMLIFrameElement | null;
    if (videoFrame?.src) {
      videoFrame.src += '&autoplay=1';
    }
  }

  setTimeout(() => startVideo())
</script>

<template>
  <div class="root">
    <iframe
        id="videoFrame"
        width="1903"
        height="762"
        :src="src"
        title="Baki - Yujiro Laughs at Baki [4K]"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
    ></iframe>

    <div class="fish-text">
      <span v-html="highlightedText"></span>
      <button class="restart-button" @click="restart()">Restart</button>
    </div>
  </div>
</template>

<style scoped>
  iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 100vh;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
  .root {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .fish-text {
    max-width: 968px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5rem;

    .restart-button {
      padding: 0.6em 2em;
      border: none;
      outline: none;
      color: rgb(255, 255, 255);
      background: #111;
      cursor: pointer;
      position: relative;
      z-index: 0;
      border-radius: 10px;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    .restart-button:before {
      content: "";
      background: linear-gradient(
          45deg,
          #ff0000,
          #ff7300,
          #fffb00,
          #48ff00,
          #00ffd5,
          #002bff,
          #7a00ff,
          #ff00c8,
          #ff0000
      );
      position: absolute;
      top: -2px;
      left: -2px;
      background-size: 400%;
      z-index: -1;
      filter: blur(5px);
      -webkit-filter: blur(5px);
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      animation: glowing-restart-button 20s linear infinite;
      transition: opacity 0.3s ease-in-out;
      border-radius: 10px;
    }

    @keyframes glowing-restart-button {
      0% {
        background-position: 0 0;
      }
      50% {
        background-position: 400% 0;
      }
      100% {
        background-position: 0 0;
      }
    }

    .restart-button:after {
      z-index: -1;
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: #222;
      left: 0;
      top: 0;
      border-radius: 10px;
    }
  }
</style>
