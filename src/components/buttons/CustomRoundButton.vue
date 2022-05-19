<template>
    <button @click="emit('toggle')"
        class="relative inline-flex items-center justify-center p-10 px-8 py-2 h-10 m-auto overflow-hidden font-medium text-dark_green transition duration-300 ease-out border-2 border-dark_orange rounded-full shadow-md group">
        <span
            class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-dark_orange group-hover:translate-x-0 ease">
            {{btnName}}
        </span>
        <span
            class="absolute flex items-center justify-center w-full h-full text-dark_orange transition-all duration-300 transform group-hover:translate-x-full ease">{{btnName}}</span>
        <span class="relative invisible">{{btnName}}</span>
        <slot></slot>
    </button>
</template>

<script setup>
 defineProps({
     btnName: {
         type: String,
         required: true
     }
 })

 const emit = defineEmits(['toggle'])
</script>