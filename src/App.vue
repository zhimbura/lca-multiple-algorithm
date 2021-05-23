<template>
  <TreeViewer/>
</template>

<script>
import TreeViewer from './components/TreeViewer.vue'

export default {
  name: 'App',
  components: {
    TreeViewer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
