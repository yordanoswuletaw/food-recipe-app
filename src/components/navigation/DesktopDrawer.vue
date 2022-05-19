<script setup>
import { onUnmounted, ref, watch } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

const route = useRoute()

const currentTab = ref(route.path)

const routeWatch = watch(
    () => route.path,
    () => {
        currentTab.value = route.path
    }
)

onUnmounted(() => {
   routeWatch();
})

</script>
<template>
    <RouterLink to="/">
        <NavMenu name="Overview" :currentPath="currentTab === '/'" :class="{ active: currentTab === '/' }">
            <IconCategory class="w-5 h-5" />
        </NavMenu>
    </RouterLink>

    <RouterLink to="/savedrecipes">
        <NavMenu name="Saved Recipes" :currentPath="currentTab === '/savedrecipes'"
            :class="{ active: currentTab === '/savedrecipes' }">
            <IconBookmark :fill="true" />
        </NavMenu>
    </RouterLink>

    <RouterLink to="/collections">
        <NavMenu name="Collections" :currentPath="currentTab === '/collections'"
            :class="{ active: currentTab === '/collections' }">
            <IconCollections />
        </NavMenu>
    </RouterLink>

     <RouterLink to="/createrecipe">
        <NavMenu name="Create Recipe" :currentPath="currentTab === '/createrecipe'"
            :class="{ active: currentTab === '/createrecipe' }">
            <IconRecipe />
        </NavMenu>
    </RouterLink>
</template>

<style>
.active {
    @apply text-dark_orange
}
</style>