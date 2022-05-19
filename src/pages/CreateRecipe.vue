<script setup>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed, onMounted, watchEffect } from "@vue/runtime-core";
import { useForm } from "vee-validate";
import { recipeValidation } from '../validationschema/validationSchema'
import axios from "../axios/axiosConfig";
import { useMutation } from "@vue/apollo-composable";
import { createRecipe } from '../graphql/mutations/createRecipe.mutation'

const store = useStore()
const { mutate: mutateRecipe, onDone, onError } = useMutation(createRecipe)

const { validationSchema } = recipeValidation();
const { handleSubmit, resetForm } = useForm({ validationSchema: validationSchema });
const recipe = computed(() => store.state.recipe)

function onInvalidSubmit({ values, errors, results }) {
  showError.value = true;
}

const timeUnit = ref("hr");
const showError = ref(false);
const loadingState = ref(false);
const loadingTimeUnit = ref(1);

const onCreateRecipe = handleSubmit(async (values) => {
  if (store.state.recipe.featuredImage) {
    loadingState.value = true;
    loadingTimeUnit.value = store.state.recipe.images.length + 1;
    store.state.recipe.images.forEach((image, indx) => {
      axios.post("/uploadimage", {
        filename: store.state.recipe.imagesName[indx], base64img: image.split(',')[1]
      }).then(res => {
        if (res.data.url) {
          store.commit('updateRecipe', { imagesUrl: [...store.state.recipe.imagesUrl, res.data.url] })
          loadingTimeUnit.value -= 1;
        }
      }).catch(err => {
      }).finally(() => {
        if (store.state.recipe.images.length === store.state.recipe.imagesUrl.length) {
          const fImgIndex = store.state.recipe.images.indexOf(store.state.recipe.featuredImage)
          store.state.recipe.featuredImageUrl = store.state.recipe.imagesUrl.splice(fImgIndex, 1)[0];
          if (store.state.recipe.featuredImageUrl && recipe.value.ingredients.length > 0 && recipe.value.steps.length > 0) {
            store.commit('updateRecipe', { title: values.title, description: values.description, time: values.time + ` ${timeUnit.value}`, cooksNote: values.cooksnotes })
            showError.value = false;
            mutateRecipe({
              ...store.state.recipe,
              imagesUrl: store.state.recipe.imagesUrl.join("@@@"),
              ingredients: store.state.recipe.ingredients.join("@@@"),
              steps: store.state.recipe.steps.join("@@@"),
              userId: store.state.user.id
            }).then(result => {
              store.commit('clearHistory')
              resetForm()
              loadingState.value = false;
            })
          }
          else {
            showError.value = true;
          }
        }
      })
    })
  }
  else {
    showError.value = true;
  }
}, onInvalidSubmit);

const onClearHistory = () => {
  store.commit('clearHistory')
  showError.value = false;
  resetForm()
}


const onImageSelected = ({ target }) => {
  if (target.files.length > 0) {
    store.commit("updateRecipe", { imagesName: [], featuredImage: null, images: [], imagesUrl: [], featuredImageUrl: null })
    Object.values(target.files).forEach((file, indx) => {
      const reader = new FileReader()
      reader.addEventListener("load", ({ target }) => {
        store.commit('updateRecipe', { images: [...store.state.recipe.images, target.result] })
        store.commit('updateRecipe', { imagesName: [...store.state.recipe.imagesName, file.name] })
        if (indx === 0)
          store.commit('updateRecipe', { featuredImage: target.result })
      })
      reader.readAsDataURL(file);
    })
  }
}

</script>
<template>

  <form @submit="onCreateRecipe" class="w-full min-h-[calc(100vh-4rem)] md:min-h-full">

    <div class="fixed left-[50%] -translate-x-[50%] z-50 bottom-0 flex items-center">
      <Button btnName="Clear History" @click="onClearHistory" type="button" :disabled="loadingState"
        class=" bg-dark_violet hover:bg-dark_red focus:bg-dark_red hover:gray-900">
        <IconDelete class="w-5 h-5 mr-3" />
      </Button>

      <Button btnName="Create Recipe" type="submit" class="">
        <IconLoading v-if="loadingState" class="w-5 h-5 mr-3" />
        <IconRight v-else class="w-5 h-5 mr-3" />
      </Button>
    </div>

    <div v-if="loadingState"
      class="fixed top-8 transition-transform duration-200 ease-in-out right-0 z-50 flex items-center bg-white w-[24rem] h-[4rem] rounded-2xl rounded-r-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 mx-2 text-orange-400" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <div class="flex flex-col ml-3">
        <div class="font-medium leading-none">Creating Your Recipes</div>
        <p class="text-sm text-gray-600 leading-none mt-1">{{ loadingTimeUnit }} Time Unit Remaining!
        </p>
      </div>
    </div>

    <div
      class="flex flex-col items-center py-2 h-[25vh] w-full bg-fixed bg-cover bg-left-bottom bg-no-repeat bg-[url('https://i.ibb.co/FmgVyy0/bg-img.jpg')]">
      <h1 class="text-2xl font-bold text-white_soft text-opacity-95">Create Recipes</h1>
    </div>

    <section
      class="absolute top-14 left-3 right-3 bottom-2 bg-white_soft bg-opacity-80 drop-shadow-sm backdrop-blur-xl rounded flex flex-col lg:flex-row overflow-x-auto">
      <section class="flex-1">

        <div class="px-6 py-3 flex items-center justify-start w-fit rounded overflow-hidden">
          <h3 class="font-bold pr-2 text-black">Category</h3>
          <select id="countries"
            class="h-full border-none focus:border-none focus:outline-none bg-transparent border text-gray-900 font-semibold text-sm rounded-lg block w-full p-2.5"
            v-model="recipe.category">
            <option v-for="(category, i) in store.getters.recipeCategories()" :key="i" :value="category.name">
              {{ category.name }}</option>
          </select>
        </div>

        <div class="px-6 py-3 relative rounded">
          <h3 class="font-semibold py-0.5 text-black">Title:</h3>
          <RecipeInputField type="text" placeholder="Title" name="title" />
        </div>

        <div class="px-6 ">
          <h3 class="font-semibold py-0.5">Description:</h3>
          <RecipeTextArea placeholder="Description" name="description" />
        </div>
        <div class="px-6 ">
          <h3 class="font-semibold py-0.5">Cook's Notes:</h3>
          <RecipeTextArea placeholder="Cook's Notes" name="cooksnotes" />
        </div>

        <div class="px-6 py-3 flex items-end gap-1">
          <div>
            <h3 class="font-semibold py-0.5">Time:</h3>
            <div class="flex items-start">
              <RecipeInputField type="number" placeholder="Time" name="time" />
              <select
                class="h-[2.67rem] text-base font-bold bg-white_soft text-dark_violet rounded-r pl-2 border-none focus:border-none focus:outline-none"
                v-model="timeUnit">
                <option value="hr">hr</option>
                <option value="min">min</option>
                <option value="sec">sec</option>
              </select>
            </div>
          </div>
          <div class="flex items-center flex-col">
            <label for="images"
              class="hover:text-white border-orange-400 border-2 focus:ring-2 focus:outline-none focus:ring-orange-300 font-medium flex items-center rounded-lg text-sm px-5 py-2 text-center mx-2 text-gray-900 hover:bg-orange-400 focus:bg-orange-500">
              <IconImage class="h-5 w-5 mr-1" /> Select Images
            </label>
            <input type="file" name="images" id="images" accept="image/*" @change="onImageSelected" multiple hidden>
            <p v-if="!recipe.featuredImage && showError" class="px-6 text-xs text-dark_red">At list one image is
              required!</p>
          </div>
        </div>

        <div v-if="store.state.recipe.featuredImage" class="px-6 py-3">
          <h3 class="font-semibold" v-if="recipe.featuredImage">Selected Images</h3>
          <div class="flex items-center overflow-x-scroll w-[40%]] py-2">
            <div v-for="(image, i) in recipe.images" :key="i" class="flex items-center px-2 min-w-fit">
              <label :for="'featuredImage' + i" class="font-semibold text-gray-900 relative">
                <img :src="image" alt="img"
                  class="h-14 w-14 rounded-full hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer">
                <input type="radio" :id="'featuredImage' + i" name="featuredImage"
                  v-model="store.state.recipe.featuredImage" :value="image"
                  class="absolute right-0 bottom-0 animate-pulse bg-gray-900 focus:bg-gray-900">
              </label>
            </div>
          </div>
          <div v-if="recipe.featuredImage"
            class="w-6/12 sm:w-4/12 max-h-64 mx-2 my-1  relative shadow-lg rounded overflow-hidden">
            <img :src="recipe.featuredImage" alt="..."
              class="shadow-lg rounded max-w-full h-auto align-middle border-none" />
            <p
              class="absolute right-0 left-0 bottom-0 bg-dark_violet bg-opacity-70 text-center text-white_soft font-semibold">
              featured image</p>
          </div>
        </div>
      </section>

      <section class="flex-1 md:max-w-[50%]">
        <div
          class="px-6 py-6 mb-3 flex items-center justify-between w-fit drop-shadow bg-transparent rounded ml-6 pl-3 bg-opacity-100 overflow-hidden h-10">
          <h3 class="font-semibold text-black">Serves: </h3>
          <div class="flex items-center w-fit rounded-md overflow-hidden">
            <button type="button" class="text-gray-900 font-semibold text-3xl px-4 cursor-pointer text-center"
              @click="() => { if (recipe.serves > 1) store.commit('updateRecipe', { serves: recipe.serves - 1 }) }">-
            </button>
            <h3 class="text-dark_violet font-semibold text-3xl min-w-[3rem] text-center">{{ recipe.serves }}</h3>
            <button type="button" class="text-gray-900 font-semibold text-3xl px-3 cursor-pointe text-center"
              @click="() => { store.commit('updateRecipe', { serves: recipe.serves + 1 }) }">+</button>
          </div>
        </div>

        <CreateIngredients />
        <p v-if="recipe.ingredients.length <= 0 && showError"
          class="px-6 flex items-center justify-end text-xs text-dark_red">At list one Ingredient is required!</p>
        <CreateSteps />
        <p v-if="recipe.steps.length <= 0 && showError"
          class="px-6 flex items-center justify-end text-xs text-dark_red">
          At list one Step is required!</p>
        <div class="h-16"></div>
      </section>
    </section>
  </form>
</template>

<route lang="yaml">
meta:
  layout: header
</route>