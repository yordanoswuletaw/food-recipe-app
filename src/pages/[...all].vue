<template>
    <div class="min-w-full min-h-screen flex items-center justify-center">
        <div class="flex items-center justify-center flex-col">
            <h1 class="text-red-600 font-bold text-lg m-3">404 Page Not Found</h1>
            <button @click="goback"><CustomRoundButton btnName="Back to Home" /></button>
        </div>
    </div>

</template>
<script setup>
import { useRouter } from 'vue-router';
import CustomRoundButton from '../components/buttons/CustomRoundButton.vue';

const router = useRouter();

const goback = () => {
    router.replace('/')
}

</script>
