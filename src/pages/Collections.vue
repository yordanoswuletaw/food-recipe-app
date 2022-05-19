<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useQuery } from '@vue/apollo-composable';
import { collections } from '../graphql/queries/collections.query'

const store = useStore();
const variables = ref({
  userId: store.state.user ? store.state.user.id : null
})
const { result, loading, error, refetch, fetchMore } = useQuery(collections, variables)

onMounted(()=>{
  fetchMore({variables: variables})
})

const collectionsResult = computed(() => result.value?.collections ?? [])
</script>

<template>
  <div
    class=" flex flex-col justify-evenly items-center h-36 w-full bg-fixed bg-bottom  bg-no-repeat bg-[url('https://i.ibb.co/gSYkT3J/bg-img-2.jpg')]  bg-gray-900 bg-opacity-0">
    <h1 class="text-3xl font-bold text-white  text-opacity-90">Your Recipes
    </h1>
    <h1 class="text-2xl font-semibold text-white_soft text-opacity-95">Visite • Create • Save Recipes</h1>
  </div>

  <Loading v-if="loading" />
  <RecipeNotFound v-else-if="error || collectionsResult?.length <= 0" message="You Have No Recipes">
      <RouterLink to="/createrecipe">
       <CustomRoundButton class="mt-4" btnName="Create Recipes"/>
     </RouterLink>
  </RecipeNotFound>

  <div v-else
    class="grid md:px-5 gap-1 place-items-center w-full sm:p-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
    <div v-for="recipe in collectionsResult" :key="recipe.id">
      <CollectionsCard :recipe="recipe" :update="refetch" />
    </div>
  </div>

</template>

<route lang="yaml">
meta:
  layout: header
</route>
