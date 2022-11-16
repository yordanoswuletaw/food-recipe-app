<template>
    <TextIconBtn class="m-1 text-dark_red" :elivated="true" @click="handleLike">
        <IconFav class="mx-1.5 my-1 w-5 h-5 " :fill="resultData?.is_liked" />
        {{ resultData?.total_like }} likes
    </TextIconBtn>
</template>

<script setup>
import { useQuery, useMutation } from '@vue/apollo-composable'
import { computed, onMounted, onUpdated, ref } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { likeRecipe } from '../graphql/mutations/likeRecipe.mutation'
import { likesQuery } from '../graphql/queries/recipeDetail.query'

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

const { mutate, onDone: onLikeRecipe } = useMutation(likeRecipe)
const { result, error, refetch, fetchMore } = useQuery(likesQuery,  variables)
const resultData = computed(() => result.value?.user_like[0])

const handleLike = (e) => {
    if (store.state.user) {
        mutate({
            recipeId: props.recipeId,
            userId: store.state.user.id
        }).then(result =>{
            fetchMore({variables: variables})
        }).catch((error)=>{})
    } else {
        router.push('/authpage')
    }
}
</script>