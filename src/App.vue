<script setup>
import { onMounted, watchEffect } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { refresh } from './axios/'

const store = useStore();
const router = useRouter();

const interval = async () => {
  const data = await refresh();
  if (data.user) {
    if (store.state.user != data.user) {
      store.dispatch('SET_USER', data.user)
    }
  }
  else {
    store.dispatch('SET_USER', null)
    if (["/createrecipe", "/collections", "/savedrecipes", '/details'].includes(router.currentRoute.value.path))
      router.replace('/')
  }
  store.dispatch('SET_ACCESS_TOKEN', data.accessToken)
}

watchEffect(() => {
  // clean up interval after logout
  if (store.state.user === null) {
    clearInterval(interval)
    setInterval(interval, 10 * 60 * 1000)
  }
})

onMounted(() => {
  setInterval(interval, 10 * 60 * 1000)
})
router.beforeEach((to, from, next) => {
    if (["/createrecipe", "/collections", "/savedrecipes"].includes(to.path) && !store.state.user) {
      router.replace('/authpage')
    } else {
      next()
    };
  })
</script>

<template>
  <main class="flex flex-col md:flex-row  w-full h-full">
    <RouterView />
  </main>
</template>

<style>
#app {
  @apply min-h-screen
}
</style>
