<template>
  <div v-cloak class="container mx-auto">
    <h2 class="my-2 text-xl font-semibold text-center uppercase">Demo</h2>
    <DemoForm />
  </div>
</template>

<script>
import DemoForm from './components/DemoForm.vue'

import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    DemoForm
  }
});

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
[v-cloak] {
  display: none;
}
</style>
