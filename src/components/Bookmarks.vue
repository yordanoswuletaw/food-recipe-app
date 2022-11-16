<template>
    <TextIconBtn class="m-1 text-dark_violet" :elivated="true" @click="bookmarkRecipe">
          <IconBookmark class="mx-1.5 my-1" :fill="resultData?.is_bookmark" />
          bookmark
        </TextIconBtn>
</template>
<script setup>
import { useQuery, useMutation } from '@vue/apollo-composable'
import { computed, ref } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {bookmarksQuery} from '../graphql/queries/recipeDetail.query'
import {saveRecipe} from '../graphql/mutations/saveRecipe.mutation'

const props = defineProps({
    recipeId: String
})

const route = useRoute();
const router = useRouter();
const store = useStore();
const variables = ref({
    recipeId: parseInt(route.params.recipeid),
    userId: store.state.user ? store.state.user.id : null
})

const { mutate, onDone, onError } = useMutation(saveRecipe)
const { result, error, refetch,  } = useQuery(bookmarksQuery,  variables)
const resultData = computed(() => result.value?.recipes_by_pk)

const bookmarkRecipe = (e) => {
  if (store.state.user) {
    mutate({
      recipeId: parseInt(route.params.recipeid),
      userId: store.state.user.id
    }).then(result => {
      refetch()
    }).catch((error)=>{})
  } else {
    router.push('/authpage')
  }
}

</script>