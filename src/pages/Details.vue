<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import { recipeDetail, reviewCount } from '../graphql/queries/recipeDetail.query'
import { useStore } from 'vuex';

const router = useRouter()
const route = useRoute();
const store = useStore();

if (route.path == '/details') {
  route.params.recipeid = localStorage.getItem('RID')
}
if (!route.params.recipeid || Object.is(NaN, parseInt(route.params.recipeid))) {
  router.replace(`${route.path}notfound`)
}

const variables = ref({
  recipeId: parseInt(route.params.recipeid),
  userId: store.state.user ? store.state.user.id : null
})

const { result, loading } = useQuery(recipeDetail, variables, {
  fetchPolicy: 'cache-and-network',
})
const recipeDetailResult = computed(() => result.value?.recipes_by_pk ?? {})

const { result: reviews, refetch: updateCount } = useQuery(reviewCount, {
  recipeId: parseInt(route.params.recipeid),
})
const totalReviews = computed(() => reviews.value?.recipes_by_pk ?? {})

const images = computed(() => result.value?.recipes_by_pk?.images[0]?.image ?? [])
const allImages = computed(() => [result.value?.recipes_by_pk?.featured_image, ...images.value])

let featuredSrcIndx = ref(0)
const changeSrc = (index) => {
  featuredSrcIndx.value = index;
}

</script>
 
<template>
  <Loading v-if="loading" />

  <main v-else
    class="bg-white_soft bg-opacity-75 max-w-full min-h-full flex backdrop-blur-xl flex-col lg:flex-row flex-wrap ">
    <section class="flex-1  min-h-full p-2 w-fit">
      <img :src="allImages[featuredSrcIndx]" class="min-w-[96%] h-[24rem] object-cover rounded mb-2" alt="..." />

      <div class="relative w-full flex gap-1 overflow-x-auto cursor-pointer">
        <div v-for="(imgSrc, i) in allImages" :key="i" class="snap-start shrink-0  px-2 pb-2" @click="changeSrc(i)">
          <img :src="imgSrc" alt="..."
            class="shadow-lg rounded shrink-0 w-32 h-16 hover:scale-105 transition-transform duration-1500 ease-in-out flex flex-col items-center justify-center border-none" />
        </div>
      </div>

      <h2 class="p-3 font-bold text-2xl flex items-center justify-between">
        <h2> {{ recipeDetailResult?.title }}</h2>
        <p class="font-semibold text-base">{{ recipeDetailResult?.category }}</p>
      </h2>

      <div class="flex items-center justify-start flex-wrap w-full">
        <h5 class="text-slate-800 px-3 text-sm  rounded-full  font-bold cursor-pointer">By
          {{ recipeDetailResult?.user?.username }}</h5>
        <TextIconBtn class="m-1 text-dark_orange">
          <IconTime class="mx-1.5 my-1" />
          {{ recipeDetailResult?.time }}
        </TextIconBtn>

        <TextIconBtn class="m-1 text-slate-700">
          <IconServeFood class="mx-1.5 my-1" />
          {{ recipeDetailResult?.serves }} servings
        </TextIconBtn>
      </div>
      <div class="px-3 font-bold">Description: </div>
      <p class="indent-3 px-3 pb-3"> {{ recipeDetailResult?.description }}</p>

        <div
          class="py-2 px-3 flex items-center justify-start gap-2 flex-wrap rounded-t-md">
          <Likes :recipeId="route.params.recipeid" />
          <Bookmarks :recipeId="route.params.recipeid" />
        </div>
        <div class="py-1 px-3 flex items-center justify-start gap-2 flex-wrap ">
          <TextIconBtn class="m-1 text-dark_orange">
            <div class="mx-1.5 my-1 flex items-center">
              <IconStar v-for="i in 5" :key="i" class="mx-0.5 w-4 h-4"
                :fill="i <= totalReviews?.total_rate ? true : null" />
            </div>
            {{ totalReviews?.total_rate === null ? 0 : totalReviews?.total_rate }} ratings
          </TextIconBtn>
          <TextIconBtn class="m-1 text-black w-12">
            <IconComment class="mx-1.5 w-4 h-4" />
            {{ totalReviews?.total_comment }} comments
          </TextIconBtn>
        </div>

      <Ingredients :ingredients="recipeDetailResult?.get_ingredients ?? []" />

    </section>

    <section class="flex-1 min-h-full  w-full">

      <Steps :steps="recipeDetailResult?.get_steps ?? []" />

      <div class="py-3">
        <h2 class="font-bold text-xl px-12">Cook's Notes</h2>

        <p class="ml-4" v-if="recipeDetailResult?.cooks_note">
          {{recipeDetailResult?.cooks_note}}
        </p>
        <p v-else class="ml-4 pl-12">
             •••  
        </p>
      </div>
      <RatingAndComment :recipeId="route.params.recipeid" :updatReviews="updateCount" />
    </section>
  </main>
</template>

<route lang="yaml">
meta:
  layout: header
</route>