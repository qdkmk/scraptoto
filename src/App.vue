<template>
  <div id="app">
    <div class="top">
      <h1>scrapboxまとめて検索</h1>
    </div>
    <Container/>
  </div>
</template>

<script>
import Container from './components/Container.vue'

export default {
  name: 'app',
  components: {
    Container
  }
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, 'Noto Sans JP',sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}
.top{
  padding: 2rem;
}
</style>
