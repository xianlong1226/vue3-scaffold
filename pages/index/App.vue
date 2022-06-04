<template>
  <div class="app">
    <div class="app__count">{{ count }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted, nextTick } from 'vue'

export default defineComponent({
  components: {
  },
  setup (props, { emit }) {
    const count = ref(0)

    setInterval(() => {
      count.value += 1
    }, 1000)

    return {
      count
    }
  }
})
</script>

<style lang="scss">
.app {
  color: red;

  &__count {
    font-size: 20px;
    animation: rotating 6s linear infinite;
  }
}
</style>