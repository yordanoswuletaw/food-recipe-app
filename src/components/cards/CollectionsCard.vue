<script setup>
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router"
import { useStore } from "vuex";
import { deleteRecipe } from '../../graphql/mutations/deleteRecipe.mutation';

const props = defineProps({
  recipe: {
    type: Object,
    required: true,
  },
  update: Function
})
const router = useRouter();
const store = useStore();

const { mutate, onDone, onError } = useMutation(deleteRecipe)

const handleDeleteRecipe = (e) => {
  if (store.state.user) {
    if (props.recipe) {
      if (props.recipe?.id) {
        mutate({
          recipeId: props.recipe.id,
        }).then(result => {
           props.update()
        })
      }
    }
  }
}

const gotoDetails = () => {
  localStorage.setItem('RID', props.recipe.id)
  router.push({ name: 'Details', params: { recipeid: props.recipe.id } });
}

</script>
<template>
  <div class="m-2 mb-4 py-2 bg-white rounded-lg border shadow-md">
    <div class="flex flex-col items-center pb-2">
      <img class="mb-3 w-24 h-24 rounded-full shadow-lg" :src="recipe.featured_image" alt="Bonnie image">
      <h5 class=" w-[15rem] text-center mb-2 px-2 text-xl font-medium text-gray-900">{{ recipe.title.length
          > 20 ? `${recipe.title.slice(0, 20)}...` : recipe.title
      }}</h5>
      <div
        class="text-dark_orange group-hover:text-white_soft px-0.5 h-fit flex items-center rounded-full font-semibold text-sm">
        <IconTime class="w-3.5 h-3.5" />
        <p class="px-0.5">{{ recipe.time }}</p>
      </div>
      <p class="text-sm text-center mb-2 w-[15rem] px-2 h-[2.4rem] break-all">{{
          recipe.description.length > 55 ? `${recipe.description.slice(0, 55)}...` : recipe.description
      }}</p>
      <div class="flex mt-2 items-center justify-evenly w-full">
        <Button type="button" @click="gotoDetails" class="w-24 h-9" btnName="Details" />
        <Button type="button" @click="handleDeleteRecipe"
          class="w-24 h-9 bg-gray-900 hover:bg-dark_violet focus:ring-gray-300 hover:ring-gray-400" btnName="Delete" />
      </div>
    </div>

    <div class="flex px-2  py-1 items-center justify-evenly flex-wrap">
      <div class="w-fit mr-0.5 h-fit flex items-center text-dark_red rounded-full p-1">
        <IconFav class="w-4 h-4" :fill="recipe.is_liked" />
        <p class="pl-1 text-sm font-medium">{{ recipe.total_like }}</p>
      </div>
      <div class="w-fit mr-0.5 h-fit flex items-center text-orange-400 rounded-full p-1">
        <IconStar class="w-4 h-4" :fill="recipe.is_rated" />
        <p class="pl-0.5 text-sm font-medium">{{ recipe.total_rate == null ? 0 : recipe.total_rate }}</p>
      </div>
      <div class="w-fit mr-0.5 h-fit flex items-center text-black rounded-full p-1">
        <IconComment class="w-4 h-4" :fill="recipe.is_commented" />
        <p class="pl-0.5 text-sm font-medium">{{ recipe.total_comment }}</p>
      </div>
    </div>
  </div>
</template>