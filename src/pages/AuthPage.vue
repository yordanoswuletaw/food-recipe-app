<template>
    <div class="2xl:container h-full m-auto overflow-auto">

        <div hidden class="fixed inset-0 w-7/12 h-full md:block md:w-[30%] lg:w-6/12 overflow-auto">
            <div class="fixed flex flex-row p-8">
                <h1 class=" text-white_soft text-2xl font-bold">
                    food<span class="text-orange-400">recipe._</span>
                </h1>
            </div>

            <div
                class="fixed  w-full  text-dark_violet inset-x-[15%] -inset-y-1/4 z-50 flex flex-col justify-center align-middle">
                <!-- <img src="/logo-img.png" class="w-24" alt="food recipe app logo"> -->
                <h1 class=" text-white_soft text-3xl font-bold">
                    {{ loginPage ? "Welcome Back" : "Welcome" }}
                </h1>
                <p
                    class="text-white_soft  w-fit px-3 py-0.5 rounded-full bg-opacity-95 text-base font-semibold">
                    Visite ● Create ● Save Recipes</p>
            </div>

            <img src="https://i.ibb.co/YRb6pk8/bg-img-1.jpg" class="object-cover w-full h-full" alt="bg img">
        </div>

        <div hidden role="hidden" class="fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block">
        </div>

        <div class="fixed inset-0 h-full m-auto sm:ml-auto sm:mr-0 w-[90%] md:w-[70%]  lg:w-6/12 overflow-auto">
            <div class="m-auto py-12 px-8 sm:p-20 xl:w-10/12">
                <div class="space-y-8">

                    <div class="flex w-full justify-end items-center">
                        <div class="flex flex-row justify-evenly align-middle">
                            <p class="m-2 font-medium text-gray-600">{{ loginPage ? `Create account` : `Already have
                            anaccount?`}}</p>
                            <CustomRoundButton :btnName="loginPage ? 'SIGN UP' : 'LOG IN'" @toggle='togglePage' />
                        </div>
                    </div>
                    <div class="pl-2">

                        <p class="font-semibold text-xl text-dark_violet pt-4 pb-2 flex"><img src="/logo-icon.png" class="w-6 mr-2"
                                alt="food recipe app logo">food<span class="text-dark_orange">recipe._ </span> App</p>
                        <p class="text-black  w-fit rounded-full bg-opacity-80 text-sm font-semibold ">Visite •
                            Create • Save Recipes</p>
                    </div>
                </div>
                <Signin v-if="loginPage" />
                <Signup v-else />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

const route = useRoute();
const loginPage = ref(true);
const togglePage = () => loginPage.value = !loginPage.value

onMounted(() => {
    if(route.query.page){
        if(route.query.page === 'signup'){
            loginPage.value = false
        }
        else if(route.query.page === 'signin'){
            loginPage.value = true;
        }
    }
})
</script>