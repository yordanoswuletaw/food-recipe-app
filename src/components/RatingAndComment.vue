<script setup>
import { ref } from "@vue/reactivity";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { rateRecipe } from "../graphql/mutations/rateRecipe.mutation"
import { commentRecipe } from "../graphql/mutations/commentRecipe.mutation"
import { userReview, allReviews } from '../graphql/queries/recipeDetail.query'
import { useStore } from "vuex";
import { computed, watchEffect } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
    recipeId: String,
    updatReviews: Function
})

const route = useRoute();
const router = useRouter();
const store = useStore();
const variables = ref({
    recipeId: parseInt(route.params.recipeid),
    userId: store.state.user ? store.state.user.id : null
})

const { mutate: rateR, onDone: onRateRecipe } = useMutation(rateRecipe)
const { mutate: commentR, onDone: onCommentRecipe, onError } = useMutation(commentRecipe)

const { result, refetch } = useQuery(userReview, variables)
const userReviewsResult = computed(() => result.value?.recipes_by_pk ?? {})
const myReviewsData = computed(() => userReviewsResult.value?.user_review ?? [])

const { result: allReviewsResult, refetch: updatAllReviewsResult } = useQuery(allReviews, variables)
const allReviewsData = computed(() => allReviewsResult.value?.all_review ?? [])

const comment = ref("");
const ratePoint = ref(0);
const rateData = ref([false, false, false, false, false])

watchEffect(() => {
    if (myReviewsData.value?.length > 0) {
        comment.value = myReviewsData.value[0]?.comment
        ratePoint.value = myReviewsData.value[0]?.rate;
        rateData.value = [0, 1, 2, 3, 4].map((each) => {
            if (ratePoint.value >= each) return true
            else return false;
        })
    }
})

const handleSubmit = (e) => {
    if (store.state.user) {
        if (props.recipeId) {
            if (rateData.value.includes(true) && comment.value) {
                rateR({
                    recipeId: props.recipeId,
                    userId: store.state.user.id,
                    rateValue: rateData.value.lastIndexOf(true)
                })
                commentR({
                    recipeId: props.recipeId,
                    userId: store.state.user.id,
                    userComment: comment.value
                }).then(result => {
                    refetch();
                    props.updatReviews()
                    updatAllReviewsResult()
                })
            }
            else if (rateData.value.includes(true)) {
                rateR({
                    recipeId: props.recipeId,
                    userId: store.state.user.id,
                    rateValue: rateData.value.lastIndexOf(true)
                }).then(result => {
                    refetch();
                    props.updatReviews()
                    updatAllReviewsResult()
                })
            }
            else if (comment.value) {
                commentR({
                    recipeId: props.recipeId,
                    userId: store.state.user.id,
                    userComment: comment.value
                }).then(result => {
                    refetch();
                    props.updatReviews()
                    updatAllReviewsResult()
                })
            }
        }

    } else {
        router.push('/authpage')
    }
}

const rate = (index) => {
    if (rateData.value[index]) {
        const prevIndex = rateData.value.lastIndexOf(true)
        if (prevIndex <= index)
            rateData.value = rateData.value.map(data => false)
        else {
            rateData.value = rateData.value.map((data, i) => i <= index)
        }
    }
    else {
        rateData.value = rateData.value.map((data, i) => i <= index)
    }
}

</script>
<template>
    <div class="px-3 py-4 max-w-full ">
        <div class="bg-white bg-opacity-50 shadow-sm border-light-orange rounded p-3 flex flex-col items-end w-full">

            <div class="flex items-center w-full mb-2">
                <h3 class="font-bold pr-1">Rate</h3>
                <div v-for="i in [0,1,2,3,4]" :key="i" class="text-dark_orange px-1 cursor-pointer" @click="rate(i)">
                    <IconStar v-if="rateData[i]" :fill="true" class="w-[1.35rem] h-[1.35rem]" />
                    <IconStar v-else class="w-[1.35rem] h-[1.35rem]" />
                </div>
            </div>

            <div class="flex my-4 items-start w-full flex-col relative">
                <h3 class="font-bold ml-4 px-0.5 bg-white opacity-90 absolute -top-3 backdrop-blur-3xl">Comment</h3>
                <textarea v-model="comment"
                    class="mb-2 mx-1 p-1 rounded-md border-2 border-dark_orange focus:outline-none focus:border-dark_orange text-left max-w-full overflow-y-hidden resize-none w-[90%] bg-white bg-opacity-50"
                    cols="36" rows="2">

                </textarea>
            </div>

            <div class="flex items-end w-full justify-end">
                <Button type="button" @click="handleSubmit" class="" btnName="">
                    <IconEdit class="h-5 w-5 text-white_soft mr-1" v-if="myReviewsData[0]?.comment" />
                    {{ myReviewsData[0]?.comment ? " Edit and Submit" : "Submit" }}
                </Button>
            </div>

        </div>
        <div class="py-4 max-w-full  w-full">
            <h2 class="font-bold text-base px-8">Comments and Rates</h2>
            <p v-if="allReviewsData?.length <= 0" class="indent-16">•••</p>
            <div class="py-2 bg-white bg-opacity-40 my-2 p-2 shadow-sm rounded" v-for="(review, i) in allReviewsData"
                :key="i">
                <h2 class="font-bold">{{ review?.user?.username }}</h2>
                <div class="flex items-center" v-if="review?.rate > 0" >
                    <IconStar v-for="i in [0,1,2,3,4]" :key="i" :fill="i <= review?.rate ? true : null"
                        class="text-dark_orange px-0.5 w-5 h-5" />
                </div>
                <p class="px-0.5">{{ review?.comment }}</p>
            </div>
        </div>
    </div>
</template>