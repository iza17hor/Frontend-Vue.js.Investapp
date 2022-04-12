<template>
  <div class="home">
    <Artykul-list></Artykul-list>
  </div>
</template>
<script>
import ArtykulList from './Artykul-list.vue'

export default {
  name: 'Home',
  components: {
    ArtykulList
  }
}
</script>
