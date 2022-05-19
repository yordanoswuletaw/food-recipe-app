<script setup>
import { onUnmounted, ref, watch } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

const route = useRoute()

const currentTab = ref(route.path)
const emit = defineEmits(['showmobiledrawer'])

const routeWatch = watch(
    () => route.path,
    () => {
        currentTab.value = route.path
    }
)
onUnmounted(() => {
    routeWatch()
})
</script>

<template>
    <section
        class="absolute top-0 bottom-0 left-0 bg-white bg-opacity-100  backdrop-blur-xl h-16  shadow-sm items-start z-50 flex justify-start w-[15rem]   flex-col min-h-screen pl-6 gap-10 py-6 transition-all ease-out duration-500">
        <RouterLink to="/" class="inline-flex items-center">
            <div class="text-dark_violet  font-medium text-lg sm:inline-flex ">food<span
                    class="text-dark_orange">recipe._ </span>
            </div>
        </RouterLink>

        <IconBackArrow @click="() => emit('showmobiledrawer')" class="absolute w-6 h-6 right-1 mr-3 text-dark_orange cursor-pointer" />

        <RouterLink to="/" @click="() => emit('showmobiledrawer')">
            <NavMenu name="Overview" :currentPath="currentTab === '/'" :class="{ active: currentTab === '/' }">
                <IconCategory class="w-5 h-5" />
            </NavMenu>
        </RouterLink>

        <RouterLink to="/savedrecipes" @click="() => emit('showmobiledrawer')">
            <NavMenu name="Saved Recipes" :currentPath="currentTab === '/savedrecipes'"
                :class="{ active: currentTab === '/savedrecipes' }">
                <IconBookmark :fill="true" />
            </NavMenu>
        </RouterLink>

        <RouterLink to="/collections" @click="() => emit('showmobiledrawer')">
            <NavMenu name="Collections" :currentPath="currentTab === '/collections'"
                :class="{ active: currentTab === '/collections' }">
                <IconCollections />
            </NavMenu>
        </RouterLink>

        <RouterLink to="/createrecipe" @click="() => emit('showmobiledrawer')">
            <NavMenu name="Create Recipe" :currentPath="currentTab === '/createrecipe'"
                :class="{ active: currentTab === '/createrecipe' }">
                <IconRecipe />
            </NavMenu>
        </RouterLink>
    </section>
</template>

<style>
.active {
    @apply text-dark_orange
}
</style>