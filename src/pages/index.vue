<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useQuery } from '@vue/apollo-composable';
import { filterRecipes } from '../graphql/queries/filterRecipes.query'
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const searchType = ref("title")
const search = ref("")
const currentCategory = ref(store.state.categories[0].name);

const variables = ref({
  filter: searchType.value,
  search: search.value,
  category: currentCategory.value,
  userId: store.state.user ? store.state.user.id : null
})
const { result, loading, error, refetch, fetchMore } = useQuery(filterRecipes, variables)

const filterRecipesResult = computed(() => result.value?.filter_recipes ?? [])

onMounted(()=>{
  fetchMore({variables: variables})
})

const handleSearch = (sValue) => {
  search.value = sValue
  variables.value = {
    filter: searchType,
    search,
    category: currentCategory.value,
    userId: store.state.user ? store.state.user.id : null
  }
}

const handleSelect = (sType) => {
  searchType.value = sType
  variables.value = {
    filter: searchType,
    search,
    category: currentCategory.value,
    userId: store.state.user ? store.state.user.id : null
  }
}

const onCategorySelected = (catName) => {
  currentCategory.value = catName
  variables.value = {
    filter: searchType,
    search,
    category: currentCategory.value,
    userId: store.state.user ? store.state.user.id : null
  }
}

const scrollBar = ref(null)

</script>

<template>
  <div
    class="flex flex-col justify-evenly items-center h-52 w-full bg-fixed bg-cover bg-bottom bg-no-repeat bg-[url('https://i.ibb.co/FmgVyy0/bg-img.jpg')]  bg-gray-900 ">
    <CustomSearch @onSearch="handleSearch" @onSelect="handleSelect" />
    <h1 class="text-2xl font-semibold text-white text-opacity-95">Visite • Create • Save Recipes</h1>
  </div>

  <h1 class="text-2xl w-full text-center my-1.5 font-bold text-gray-900 text-opacity-95">
    <span class="text-orange-400">Categories </span>{{ currentCategory }}
  </h1>

  <div class="relative group overflow-hidden w-full py- flex items-center justify-center">
    <button type="button">
      <IconBackArrow
      class="text-gray-900 peer w-6 h-6 ring-2 ring-gray-900 rounded-full p-1 absolute top-[50%] -translate-y-[50%] left-2.5 group-hover:block  sm:hidden block cursor-pointer"
      @click="() => { scrollBar.scrollLeft += 300 }" />
    </button>
    <div
      class="relative peer  flex items-center justify-start gap-1 overflow-x-auto mx-12 rounded-full my-3 transition-transform duration-300 ease-in-out"
      ref="scrollBar">
      <div v-for="(category, i) in $store.state.categories" :key="i"
        class=" cursor-pointers rounded-full min-w-fit h-fit items-center justify-center "
        @click="onCategorySelected(category.name)">
        <h3
          :class="{ active_category: category.name === currentCategory, category: category.name !== currentCategory }">
          {{ category.name }}</h3>
      </div>
    </div>
    <button type="button">
      <IconForwardArrow
      class=" text-gray-900 peer w-6 h-6 ring-2 ring-gray-900 rounded-full p-1 absolute top-[50%] -translate-y-[50%] right-2.5 group-hover:block block sm:hidden cursor-pointer"
      @click="() => { scrollBar.scrollLeft -= 300 }" />
    </button>
  </div>

  <Loading v-if="loading" />
  <RecipeNotFound v-else-if="error || filterRecipesResult?.length <= 0" message="No Recipes Found"/>

  <div v-else
    class="grid p-2 gap-2 place-items-center w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
    <div v-for="recipe in filterRecipesResult" :key="recipe.id" class="max-w-sm">
      <RecipeCard :recipe="recipe" />
    </div>
  </div>
</template>

<style>
.active_category {
  @apply text-dark_orange text-opacity-95 rounded-full text-left font-semibold text-base flex items-center w-fit mx-8 cursor-pointer transition-all ease-in-out duration-200;
}

.category {
  @apply text-black hover:text-dark_orange text-opacity-95 rounded-full text-left font-semibold text-base items-center w-fit mx-8 cursor-pointer transition-all ease-in-out duration-200;
}
</style>

<route lang="yaml">
meta:
  layout: header
</route>
