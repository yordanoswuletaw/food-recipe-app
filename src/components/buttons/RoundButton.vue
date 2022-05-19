<template>
    <button
        class="relative inline-block items-center justify-start px-10 py-2 overflow-hidden font-bold rounded-full group">
       
        <span
            class="absolute -top-1 -left-1 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 bg-white_soft opacity-80 -translate-x-8"></span>
        <span
            class="relative w-full text-left text-dark_violet transition-colors duration-200 ease-in-out group-hover:text-dark_green">{{btnName}}</span>
        <span class="absolute inset-0 border-2 border-orange-400 rounded-full"></span>
    </button>
</template>

<script setup>
 defineProps({
     btnName: {
         type: String,
         required: true
     }
 })
</script>