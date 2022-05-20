<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "../../axios/axiosConfig";

const showMobileDrawer = ref(false)
// useing mobile droawer while window width less than 764
const listener = (e) => {
    if (window.innerWidth >= 764) {
        showMobileDrawer.value = false;
    }
}
const router = useRouter()
const store = useStore();
const signout = async () => {
    const response = await axios.get("/signout", { withCredentials: true });
    store.dispatch('SET_USER', null)
    // pull out user from protected routes
    if (["/createrecipe", "/collections", "/savedrecipes", "/details"].includes(router.currentRoute.value.path))
        router.replace('/')
}
onMounted(() => {
    window.addEventListener('resize', listener)
})

onUnmounted(() => {
    window.removeEventListener('resize', listener)
})
</script>

<template>
    <section class="relative flex-1 m-w-full  pl-6 md:px-10 py-6 flex flex-row justify-start items-center  gap-7
    md:flex-col md:justify-start md:items-start md:gap-10">
        <IconCategory @click="() => showMobileDrawer = true"
            class="inline-flex md:hidden w-7 h-7 cursor-pointer hover:text-dark_orange transition-all ease-in-out duration-200" />

        <RouterLink to="/" class="inline-flex items-center ">
            <img src="/logo-icon.png" class="w-6 h-6" alt="food recipe app logo">
            <div class="text-dark_violet font-medium text-lg pl-2">food<span class="text-dark_orange">recipe._ </span>
            </div>
        </RouterLink>

        <div class="hidden md:flex md:flex-col md:justify-start md:items-start md:gap-10">
            <DesktopDrawer />
        </div>

        <MobileDrawer :class="{ mobile_drawer_opend: showMobileDrawer, mobile_drawer_closed: !showMobileDrawer }"
            @showmobiledrawer="() => showMobileDrawer = false" />
    </section>

    <section class="flex items-center relative">
        <div data-tooltip-target="tooltip-default" type="button" @click="signout" v-if="store.state.user"
            class="flex flex-col h-[4rem] w-[13rem] md:w-[16rem] items-stretch px-2 m-y-0 justify-center bg-transparent bg-opacity-95 md:rounded-br-2xl">
            <div class="flex items-center justify-between ">
                <div class="flex items-center">
                    <div class="flex flex-col ml-3">
                        <div class="font-semibold leading-none text-orange-500">{{ store.state.user?.username }}</div>
                        <p class="text-sm font-medium text-gray-900 leading-none mt-1">{{ store.state.user?.email }}
                        </p>
                    </div>
                </div>
                <div class="cursor-pointer flex flex-col items-center justify-start group">
                    <p
                        class="text-xs rounded-sm font-semibold scale-0 px-1 text-orange-400 group-hover:scale-100 transition-transform duration-200 ease-in">
                        signout</p>
                    <IconSignout class="w-7 h-7 text-gray-900 mr-2" />
                </div>
            </div>
        </div>
        <div class="ring-1 ring-gray-500 w-full py-1.5 mb-1.5 mr-0.5 rounded-md" v-if="!store.state.user">
            <RouterLink to="/authpage?page=signup"
                class="pl-[16px] text-dark font-semibold cursor-pointer uppercase transition-all ease-linear duration-200 hover:text-dark_orange">
                Sign up </RouterLink>
            <RouterLink to="/authpage?page=signin"
                class="pr-[16px] text-dark font-semibold cursor-pointer uppercase transition-all ease-linear duration-200 hover:text-dark_orange">
                <span class="text-dark_orange px-[2px]">/</span>Sign in
            </RouterLink>
        </div>
    </section>
</template>

<style>
.mobile_drawer_opend {
    @apply translate-x-0 transition-all ease-in-out duration-300;
}

.mobile_drawer_closed {
    @apply -translate-x-72 transition-all ease-in-out duration-300;
}
</style>