<script setup>
import { useMutation, useQuery } from '@vue/apollo-composable';
import { ref } from '@vue/reactivity';
import { computed, watchEffect } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { saveRecipe } from '../../graphql/mutations/saveRecipe.mutation'
import {isBookmark} from '../../graphql/queries/filterRecipes.query'

const props = defineProps({
    recipe: {
        type: Object,
        required: true,
    },
    update: Function
}) 
const store = useStore();
const router = useRouter();
const variables = ref({
     userId: store.state.user ? store.state.user.id : null,
      recipeId: props.recipe?.id
})
const { result, loading, error, refetch, fetchMore } = useQuery(isBookmark, variables, {
  fetchPolicy: 'cache-and-network',
})

const bookmarkResult = computed(() => result.value?.recipes_by_pk ?? [])
const { mutate: bookmark, onDone, onError } = useMutation(saveRecipe)
const bookmarkRecipe = (e) => {
    if (store.state.user) {
        bookmark({
            recipeId: props.recipe.id,
            userId: store.state.user.id
        }).then(result=>{
            //fetchMore({variables: variables})
            refetch()
        if(props.update){
            props.update()
        }
        }).catch((error)=>{})
    } else {
        router.push('/authpage')
    }
}
const gotoDetails = ()=>{
  localStorage.setItem('RID', props.recipe.id)
  router.push({ name: 'Details', params: { recipeid: props.recipe?.id } });
}
</script>
<template>
    <div
    
        class="group w-full h-[19rem]  bg-white bg-opacity-80 relative shadow rounded-lg  hover:shadow hover:bg-opacity-100 cursor-pointer group backdrop-blur-xl transition duration-500 ease-in-out">
        <img class="w-full h-[8.5rem] rounded-t-lg object-cover" :src="recipe.featured_image" />

        <button type="button" @click="bookmarkRecipe"
                class="shadow-2xl drop-shadow-2xl bg-white_soft bg-opacity-90 absolute top-[6.9rem] right-4 text-gray-900 w-9 h-9 flex items-center justify-center rounded-full transition-transform hover:-translate-y-1 ease-in-out">
                 <IconBookmark  class="w-5 h-5" :fill="bookmarkResult?.is_bookmark" />
            </button>

        <div class="px-3 py-2">
            <h5 class=" text-gray-900 w-full truncate mb-2 text-md font-bold tracking-tight break-all">{{ recipe.title
            }}</h5>

            <p class="text-sm overflow-hidden mb-0.5 w-full  h-[2.4rem]  text-black break-all">{{
                    recipe.description.length > 72 ? `${recipe.description.slice(0,70)}...` : recipe.description
            }}</p>
        </div>


        <div class="flex px-2 py-1  items-center justify-evenly flex-wrap">
            <div class="w-fit mr-0.5 h-fit flex items-center text-dark_red rounded-full p-1">
                <IconFav class="w-4 h-4" :fill="recipe.is_liked" />
                <p class="pl-1 text-sm font-medium">{{ recipe.total_like }}</p>
            </div>
            <div class="w-fit mr-0.5 h-fit flex items-center text-orange-400 rounded-full p-1">
                <IconStar class="w-4 h-4 mr-0.5" :fill="recipe.is_rated" />
                <p class="pl-0.5 text-sm font-medium">{{ recipe.total_rate == null ? 0 : Number.isInteger(recipe.total_rate) ? recipe.total_rate : recipe.total_rate.toFixed(1) }}</p>
            </div>
            <div class="w-fit mr-0.5 h-fit flex items-center text-gray-900 rounded-full p-1">
                <IconComment class="w-5 h-5" :fill="recipe.is_commented" />
                <p class="pl-0.5 text-sm font-medium">{{ recipe.total_comment }}</p>
            </div>
        </div>

        <div class="flex items-center justify-between min-w-full">
            <div @click="gotoDetails"
                class="border ml-1 focus:outline-none font-medium flex items-center rounded-lg text-sm px-5 py-2 text-center  mr-2 mb-2 transition-colors duration-50 ease-out text-gray-900 hover:font-bold">
                View Details
                <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </div>
            <div class="text-gray-900 font-semibold text-sm px-0.5 h-fit flex items-center rounded-full justify-center">
                <IconTime class="w-3.5 h-3.5" />
                <p class="px-0.5">{{ recipe.time }}</p>
            </div>
        </div>
    </div>
</template>